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

    const root = document.documentElement;
    let lenis: Lenis | null = null;
    let rafId = 0;

    const startLenis = () => {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    // los anclas del nav funcionan con o sin Lenis
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
    };
    document.addEventListener("click", onAnchor);

    /* ── SONDA DE RENDIMIENTO ───────────────────────────────────
       El adorno no manda: manda la máquina. Encendemos la deriva de
       tinta, medimos 700 ms reales y, si no sostiene 45 fps, la
       apagamos junto con el cristal esmerilado y el scroll con
       inercia. En un PC capaz no se nota; en uno justo, el sitio
       pasa de arrastrarse a ir fluido.                            */
    let probe = 0;
    let probeTimer = 0;
    const capabilityCheck = () => {
      if ((navigator.hardwareConcurrency ?? 8) <= 2) {
        root.classList.add("low-power");
        return;
      }
      root.classList.add("ink-live");
      let frames = 0;
      const t0 = performance.now();
      const tick = () => {
        frames++;
        const dt = performance.now() - t0;
        if (dt < 700) {
          probe = requestAnimationFrame(tick);
          return;
        }
        probe = 0;
        const fps = frames / (dt / 1000);
        if (fps < 45) {
          root.classList.remove("ink-live");
          root.classList.add("low-power");
        } else {
          startLenis();
        }
      };
      probe = requestAnimationFrame(tick);
    };

    /* La sonda espera a que la página se asiente. Medir durante la
       hidratación y la carga de fuentes daba falsos negativos: un PC
       capaz quedaba marcado como lento por unos frames de arranque. */
    if (!reduced) probeTimer = window.setTimeout(capabilityCheck, 1100);

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
      if (!cRaf) cRaf = requestAnimationFrame(loop);
    };
    // El bucle se apaga cuando el punto alcanza al ratón. Un rAF eterno
    // mantiene despierto al compositor y quema batería sin pintar nada.
    const loop = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * 0.22;
      cy += dy * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        cRaf = 0;
        return;
      }
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
    }

    return () => {
      io.disconnect();
      document.removeEventListener("click", onAnchor);
      if (probe) cancelAnimationFrame(probe);
      if (probeTimer) clearTimeout(probeTimer);
      root.classList.remove("ink-live", "low-power");
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
        <div className="ink-a absolute size-[64vw]" />
        <div className="ink-b absolute size-[56vw]" />
        <div className="ink-c absolute size-[48vw]" />
      </div>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
