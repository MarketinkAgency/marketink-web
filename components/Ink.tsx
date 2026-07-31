"use client";

import { useEffect, useRef } from "react";

/**
 * Capa de tinta, línea de avance y revelado por scroll.
 *
 * La tinta no es decoración: es el material de la marca. Se expande, sangra
 * y no se borra. El texto nunca depende de la animación para leerse.
 */
export default function Ink() {
  const spine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.13, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });

    // el trazo de la aguja: avanza con el scroll y no retrocede visualmente
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (spine.current) spine.current.style.transform = `scaleX(${p})`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={spine} className="spine w-full scale-x-0" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="ink-a absolute -left-[16vw] -top-[20vw] size-[64vw]" />
        <div className="ink-b absolute -right-[12vw] top-[45vh] size-[54vw]" />
        <div className="ink-c absolute left-[28vw] top-[130vh] size-[48vw]" />
      </div>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
