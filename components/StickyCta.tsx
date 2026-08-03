"use client";

import { useEffect, useRef, useState } from "react";
import { capacity, freeSpots } from "@/lib/capacity";
import type { Lang } from "@/lib/copy";

/**
 * Barra de acción fija en móvil. Aparece pasado el hero, nunca antes.
 * Lleva encima los cupos que quedan: la urgencia viaja con el botón
 * en vez de quedarse arriba, donde ya nadie la ve.
 */
export default function StickyCta({
  href,
  label,
  lang,
  spotsLabels,
}: {
  href: string;
  label: string;
  lang: Lang;
  spotsLabels: { intake: string; remaining: string };
}) {
  const [spots, setSpots] = useState<{ free: number; month: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    setSpots({
      free: freeSpots(),
      month: now.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { month: "long" }),
    });
  }, [lang]);

  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        bar.current?.classList.toggle("show", window.scrollY > window.innerHeight * 0.85);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const line =
    spots && spots.free > 0
      ? `${spots.free} ${spotsLabels.remaining} · ${spotsLabels.intake.replace("{mes}", spots.month).replace("{month}", spots.month)}`
      : null;

  return (
    <div ref={bar} className="sticky-cta">
      {line && (
        <p className="mb-2 flex items-center justify-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-blood">
          <i className="dot-live size-1.5 rounded-full bg-blood" aria-hidden />
          {line}
        </p>
      )}
      <a href={href} className="btn w-full justify-center">
        {label}
      </a>
    </div>
  );
}
