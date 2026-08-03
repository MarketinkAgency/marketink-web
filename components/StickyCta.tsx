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
        className="btn w-full justify-center"
      >
        {label}
      </a>
    </div>
  );
}
