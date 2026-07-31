"use client";

import { useEffect, useRef } from "react";

/** Barra de acción fija en móvil. Aparece pasado el hero, nunca antes. */
export default function StickyCta({ href, label }: { href: string; label: string }) {
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

  return (
    <div ref={bar} className="sticky-cta">
      <a
        href={href}
        className="block rounded-full bg-blood py-4 text-center text-[15.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_30px_-8px_rgba(225,6,0,0.9)]"
      >
        {label}
      </a>
    </div>
  );
}
