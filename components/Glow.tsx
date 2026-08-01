"use client";

import { useEffect } from "react";

/**
 * Da vida a las celdas `.spot`.
 *
 * En escritorio: el resplandor rojo sigue al cursor dentro de la celda.
 * Un solo listener delegado en el documento escribe dos variables CSS;
 * el degradado ya está compuesto, así que no hay repintado por celda.
 *
 * En táctil no hay cursor, así que la celda que está centrada en el
 * carrusel se enciende sola. El dedo mueve la luz.
 */
export default function Glow() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ── escritorio: la luz sigue al ratón ──────────────────────
    let raf = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      pending = { el, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (pending) {
          pending.el.style.setProperty("--mx", `${pending.x}%`);
          pending.el.style.setProperty("--my", `${pending.y}%`);
        }
        raf = 0;
      });
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    // ── táctil: se enciende la tarjeta que está en el centro ───
    let io: IntersectionObserver | null = null;
    if (!fine) {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            const el = e.target as HTMLElement;
            el.classList.toggle("lit", e.intersectionRatio > 0.7);
            if (e.intersectionRatio > 0.7) {
              el.style.setProperty("--mx", "50%");
              el.style.setProperty("--my", "0%");
            }
          }),
        { threshold: [0, 0.7, 1], rootMargin: "0px -18% 0px -18%" }
      );
      document.querySelectorAll<HTMLElement>(".spot").forEach((el) => io!.observe(el));
    }

    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return null;
}
