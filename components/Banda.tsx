"use client";

import { useEffect, useState } from "react";
import { freeSpots } from "@/lib/capacity";
import type { Lang } from "@/lib/copy";

/**
 * BANDA DE ACCIÓN
 *
 * Un corte a sangre en rojo cada pocas secciones: una frase y un botón.
 * La página es larga, y el que lee de arriba abajo no debería tener que
 * volver al menú para actuar — el momento de decidir llega justo después
 * de ver la cifra que pierde y justo después de ver que a otro le
 * funcionó. Ahí se pone la puerta.
 *
 * Lleva encima los cupos que quedan porque la urgencia solo trabaja si
 * viaja con el botón; arriba del todo, donde nadie está mirando, no
 * empuja a nadie. El número sale de lib/capacity.ts, que es el único
 * sitio donde vive la verdad de cuánta gente cabe este mes.
 *
 * Se calcula en el navegador: el nombre del mes tiene que ser el del
 * visitante, no el del día que se compiló la página.
 */
export default function Banda({
  line,
  cta,
  href,
  lang,
  spotsLabels,
}: {
  line: string;
  cta: string;
  href: string;
  lang: Lang;
  spotsLabels?: { intake: string; remaining: string; remaining1: string };
}) {
  const [spots, setSpots] = useState<{ free: number; month: string } | null>(null);

  useEffect(() => {
    if (!spotsLabels) return;
    const now = new Date();
    setSpots({
      free: freeSpots(),
      month: now.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { month: "long" }),
    });
  }, [lang, spotsLabels]);

  const aviso =
    spotsLabels && spots && spots.free > 0
      ? `${spots.free} ${spots.free === 1 ? spotsLabels.remaining1 : spotsLabels.remaining} · ${spotsLabels.intake
          .replace("{mes}", spots.month)
          .replace("{month}", spots.month)}`
      : null;

  return (
    <section className="rupture">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-9 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <p className="flash-type max-w-[22ch] text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.05] text-white">
          {line}
        </p>

        <div className="flex-none">
          {/* Espacio reservado siempre que haya etiquetas, para que la
              barra no dé un salto cuando el navegador calcula el mes. */}
          {spotsLabels && (
            <p className="mb-3 flex min-h-[16px] items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">
              {aviso && (
                <>
                  <i className="dot-live size-1.5 rounded-full bg-white" aria-hidden />
                  {aviso}
                </>
              )}
            </p>
          )}
          <a
            href={href}
            className="inline-block bg-white px-9 py-5 text-[15px] font-bold uppercase tracking-[0.02em] text-void transition-transform duration-300 hover:-translate-y-0.5"
          >
            {cta} →
          </a>
        </div>
      </div>
    </section>
  );
}
