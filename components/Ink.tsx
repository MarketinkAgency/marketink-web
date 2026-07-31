"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Movimiento del sitio: scroll con inercia, tinta que recorre la pantalla,
 * revelado por scroll, línea de avance y cursor de punto rojo.
 *
 * Reglas duras:
 *  - El texto se lee desde el primer frame. El arte va detrás.
 *  - Ninguna animación bloquea el scroll.
 *  - El cursor solo existe con ratón real y desaparece con teclado,
 *    en campos de texto y con `prefers-reduced-motion`.
 */
export default function Ink() {
  const spine = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ── scroll con inercia ────────────────────────────────────
    let lenis: Lenis | null = null;
    let rafId = 0;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // los anclas del nav deben seguir funcionando con Lenis
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if (!id || id === "#") return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          lenis?.scrollTo(target as HTMLElement, { offset: -90 });
        });
      });
    }

    // ── revelado ──────────────────────────────────────────────
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".reveal, .mask-line").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 65}ms`;
      io.observe(el);
    });

    // ── línea de avance ───────────────────────────────────────
    let sRaf = 0;
    const onScroll = () => {
      if (sRaf) return;
      sRaf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (spine.current) spine.current.style.transform = `scaleX(${p})`;
        sRaf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── cursor de punto rojo ──────────────────────────────────
    let cRaf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a, button, summary, .flash-cell");
      dot.current?.classList.toggle("big", interactive);
      if (dot.current) dot.current.style.opacity = "1";
    };
    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      cRaf = requestAnimationFrame(loop);
    };
    // al usar teclado, devolvemos el cursor del sistema
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      document.body.classList.remove("has-cursor");
      if (dot.current) dot.current.style.opacity = "0";
    };
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
    };

    if (finePointer && !reduced) {
      document.body.classList.add("has-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("keydown", onKey);
      document.addEventListener("mouseleave", onLeave);
      cRaf = requestAnimationFrame(loop);
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-cursor");
      if (rafId) cancelAnimationFrame(rafId);
      if (sRaf) cancelAnimationFrame(sRaf);
      if (cRaf) cancelAnimationFrame(cRaf);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={spine} className="spine w-full scale-x-0" aria-hidden />
      <div ref={dot} className="cursor-dot opacity-0" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="ink-a absolute size-[52vw]" />
        <div className="ink-b absolute size-[44vw]" />
        <div className="ink-c absolute size-[38vw]" />
      </div>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
