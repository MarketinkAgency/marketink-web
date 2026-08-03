"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/copy";

const KEY = "mk-consent";
export type Choice = "all" | "necessary";

/** Lee la decisión guardada. Devuelve null si todavía no ha decidido. */
export function readConsent(): Choice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Banda de consentimiento.
 *
 * No es decoración legal: el píxel de Meta y Google Analytics escriben
 * cookies que no son necesarias para que la web funcione, y en la UE y
 * el Reino Unido eso exige permiso ANTES de cargarlas. Por eso los
 * scripts de medición viven detrás de esta decisión (ver Analytics.tsx)
 * y no al revés.
 *
 * Aparece a los 1,2 s para no tapar el hero en el primer vistazo.
 */
export default function Consent({ lang, t }: { lang: Lang; t: {
  title: string; body: string; all: string; necessary: string; more: string;
} }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const id = window.setTimeout(() => setShow(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const decide = (c: Choice) => {
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      /* navegación privada: se respeta la decisión solo en esta sesión */
    }
    setShow(false);
    window.dispatchEvent(new CustomEvent("mk-consent", { detail: c }));
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="consent fixed bottom-4 left-4 right-4 z-[70] max-w-[420px] border border-white/15 bg-[rgba(10,10,12,0.97)] p-6 sm:bottom-6 sm:left-6 sm:right-auto"
    >
      <p className="flash-sub mb-3 text-[10.5px] tracking-[0.2em] text-blood">{t.title}</p>
      <p className="text-[13.5px] leading-relaxed text-muted">{t.body}</p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <button type="button" onClick={() => decide("all")} className="btn !px-5 !py-3 !text-[12.5px]">
          {t.all}
        </button>
        <button
          type="button"
          onClick={() => decide("necessary")}
          className="btn btn-ghost !px-5 !py-3 !text-[12.5px]"
        >
          {t.necessary}
        </button>
      </div>

      <Link
        href={`/${lang}/legal/privacidad`}
        className="mt-4 inline-block text-[12px] text-faint underline underline-offset-4 transition hover:text-muted"
      >
        {t.more}
      </Link>
    </div>
  );
}
