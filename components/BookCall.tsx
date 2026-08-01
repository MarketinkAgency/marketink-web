"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/copy";

/**
 * Calendario incrustado.
 *
 * El script de Calendly pesa ~90 kB y monta un iframe. Cargarlo en el
 * primer render castigaría a todo el que nunca baja hasta aquí, así que
 * se inyecta solo cuando la sección entra en pantalla.
 *
 * Si el script no carga (bloqueador, red caída), se pinta un enlace
 * normal a Calendly: nadie se queda sin poder agendar.
 */
export default function BookCall({
  url,
  lang,
  labels,
}: {
  url: string;
  lang: Lang;
  labels: { loading: string; fallback: string };
}) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setState("loading");

        const existing = document.querySelector<HTMLScriptElement>("script[data-calendly]");
        if (existing) {
          setState("ready");
          return;
        }

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://assets.calendly.com/assets/external/widget.css";
        document.head.appendChild(css);

        const s = document.createElement("script");
        s.src = "https://assets.calendly.com/assets/external/widget.js";
        s.async = true;
        s.dataset.calendly = "1";
        s.onload = () => setState("ready");
        s.onerror = () => setState("failed");
        document.head.appendChild(s);

        // Si en 8 s no cargó, damos la salida manual.
        window.setTimeout(() => setState((v) => (v === "ready" ? v : "failed")), 8000);
      },
      { rootMargin: "300px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parámetros para que el widget herede la paleta de la marca.
  const src =
    `${url}?hide_gdpr_banner=1&background_color=0d0d0f&text_color=ede6dc&primary_color=e10600` +
    `&hide_landing_page_details=1&hide_event_type_details=0`;

  return (
    <div ref={box} className="relative">
      {state === "ready" ? (
        <div
          className="calendly-inline-widget overflow-hidden rounded-[22px] ring-1 ring-white/[0.09]"
          data-url={src}
          style={{ minWidth: "320px", height: "760px" }}
          lang={lang}
        />
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-[22px] px-8 text-center ring-1 ring-white/[0.09]">
          {state === "failed" ? (
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-blood px-9 py-4 text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_14px_38px_-10px_rgba(225,6,0,0.85)]"
            >
              {labels.fallback}
            </a>
          ) : (
            <>
              <span className="size-2.5 animate-ping rounded-full bg-blood" />
              <p className="text-[14px] text-faint">{labels.loading}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
