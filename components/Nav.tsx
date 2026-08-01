"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/copy";

type Item = { href: string; label: string };

/** marketINK• — el punto es la gota de tinta y el punto final de la frase. */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline tracking-[-0.035em] ${className}`} aria-label="MarketINK">
      <span className="font-medium">market</span>
      <span className="font-extrabold">INK</span>
      <span
        aria-hidden
        className="dot-live ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood shadow-[0_0_18px_5px_rgba(225,6,0,0.7)]"
      />
    </span>
  );
}

/**
 * Barra de navegación.
 *
 * En móvil, hasta ahora, la página era un scroll infinito sin salida:
 * ni menú, ni forma de saltar a agendar. Aquí se resuelve con una hoja
 * a pantalla completa que bloquea el scroll de fondo, se cierra con
 * Escape, con el botón o al elegir un destino.
 */
export default function Nav({
  lang,
  other,
  items,
  cta,
  ctaHref,
}: {
  lang: Lang;
  other: Lang;
  items: Item[];
  cta: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="glass nav-pill flex w-full max-w-[980px] items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5 lg:w-auto lg:justify-start lg:gap-7 lg:pl-6">
          <Link href={`/${lang}`} aria-label="MarketINK" onClick={() => setOpen(false)}>
            <Wordmark className="text-[16px]" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {items.map((i) => (
              <a key={i.href} href={i.href} className="text-[13.5px] text-muted transition-colors duration-300 hover:text-bone">
                {i.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${other}`}
              className="rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ring-1 ring-white/15 transition hover:text-bone hover:ring-white/35"
            >
              {other}
            </Link>

            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="hidden rounded-full bg-blood px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_24px_-8px_rgba(225,6,0,0.8)] transition duration-500 hover:-translate-y-0.5 sm:block"
            >
              {cta}
            </a>

            {/* hamburguesa */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? (lang === "es" ? "Cerrar menú" : "Close menu") : lang === "es" ? "Abrir menú" : "Open menu"}
              className="burger relative grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-white/15 transition hover:ring-white/35 lg:hidden"
            >
              <span className={`burger-l ${open ? "a" : ""}`} />
              <span className={`burger-l ${open ? "b" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* hoja móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className={`fixed inset-0 z-40 bg-void/97 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden ${open ? "sheet-in" : ""}`}
      >
        <ul className="flex flex-col">
          {items.map((i, n) => (
            <li key={i.href} style={{ animationDelay: `${60 + n * 55}ms` }} className="sheet-row border-b border-white/[0.07]">
              <a
                href={i.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-5 text-[26px] font-black uppercase tracking-[-0.035em] text-bone"
              >
                <span className="text-[11px] font-bold tracking-[0.2em] text-blood">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={ctaHref}
          onClick={() => setOpen(false)}
          className="sheet-row mt-10 block rounded-full bg-blood py-4 text-center text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_38px_-10px_rgba(225,6,0,0.85)]"
          style={{ animationDelay: "340ms" }}
        >
          {cta}
        </a>
      </div>
    </>
  );
}
