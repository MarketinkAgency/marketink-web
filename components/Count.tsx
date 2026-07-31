"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contador que sube al entrar en pantalla.
 *
 * Recibe la cifra ya escrita ("130+", "~$14.400", "≈8×") y solo anima la
 * parte numérica, conservando prefijo, sufijo y el separador de miles del
 * idioma. Si no hay número, pinta el texto tal cual.
 */
export default function Count({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState<string | null>(null);

  const m = value.match(/^([^\d]*)([\d.,]+)([\s\S]*)$/);
  const pre = m?.[1] ?? "";
  const raw = m?.[2] ?? "";
  const post = m?.[3] ?? "";
  const sep = raw.includes(".") ? "." : raw.includes(",") ? "," : "";
  const target = Number(raw.replace(/[.,]/g, ""));

  useEffect(() => {
    if (!m || !Number.isFinite(target)) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const group = (n: number) =>
      sep ? n.toLocaleString("en-US").replace(/,/g, sep) : String(n);

    setOut(pre + group(0) + post);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          // easeOutExpo — arranca rápido y aterriza suave.
          const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setOut(pre + group(Math.round(target * e)) + post);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {out ?? value}
    </span>
  );
}
