"use client";

import { useEffect, useState } from "react";
import { capacity, freeSpots } from "@/lib/capacity";
import type { Lang } from "@/lib/copy";

type Labels = {
  intake: string;   // «ENTRADA DE {mes}»
  remaining: string; // «cupos disponibles» / «cupo disponible»
  filled: string;    // «ocupado»
  open: string;      // «libre»
  days: string;      // «Cierra en {d} días»
  closedT: string;   // «ENTRADA DE {mes} CERRADA»
  closedS: string;   // «Escríbenos y entras a la lista de septiembre»
};

/**
 * Etiqueta industrial de cupos.
 *
 * No es un contador de infoproducto: es una ficha de capacidad, con
 * las casillas ocupadas marcadas una a una. Se lee de un vistazo y no
 * promete nada que no puedas cumplir — el número sale de las variables
 * que tú controlas en Vercel (ver lib/capacity.ts).
 *
 * Se calcula en el navegador para que refleje el mes real del visitante
 * y no quede congelado en la fecha de compilación.
 */
export default function Spots({
  lang,
  labels,
  className = "",
}: {
  lang: Lang;
  labels: Labels;
  className?: string;
}) {
  const [d, setD] = useState<{ free: number; days: number; month: string; next: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const loc = lang === "es" ? "es-ES" : "en-US";
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    setD({
      free: freeSpots(),
      days: last - now.getDate() + 1,
      month: now.toLocaleDateString(loc, { month: "long" }),
      next: new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleDateString(loc, { month: "long" }),
    });
  }, [lang]);

  // Reserva de espacio para que no salte el diseño al hidratar.
  if (!d) return <div className={className} style={{ minHeight: 168 }} aria-hidden />;

  const { free, days, month, next } = d;
  const total = capacity.perMonth;
  const taken = total - free;
  const fill = (s: string) =>
    s
      .replace("{n}", String(free))
      .replace("{total}", String(total))
      .replace("{d}", String(days))
      .replace("{mes}", month)
      .replace("{month}", month)
      .replace("{sig}", next)
      .replace("{nextm}", next);

  const closed = free === 0;

  return (
    <div className={`intake ${closed ? "is-closed" : ""} ${className}`} aria-live="polite">
      {/* cabecera */}
      <p className="intake-eyebrow">
        <i className="dot-live" aria-hidden />
        {fill(labels.intake)}
      </p>

      {closed ? (
        <>
          <p className="intake-num intake-closed-t">{fill(labels.closedT)}</p>
          <p className="intake-foot">{fill(labels.closedS)}</p>
        </>
      ) : (
        <>
          {/* cifra */}
          <p className="intake-num">
            <span className="intake-big">{free}</span>
            <span className="intake-word">{fill(labels.remaining)}</span>
          </p>

          {/* casillas de capacidad */}
          <div className="intake-slots" role="img" aria-label={`${taken}/${total}`}>
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={`slot ${i < taken ? "taken" : ""}`}>
                <b>{i < taken ? fill(labels.filled) : fill(labels.open)}</b>
              </span>
            ))}
          </div>

          <p className="intake-foot">{fill(labels.days)}</p>
        </>
      )}
    </div>
  );
}
