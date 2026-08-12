"use client";

import { useState } from "react";
import type { Lang } from "@/lib/copy";

/**
 * Lo que cuesta la fuga — con SUS números, no con los nuestros.
 *
 * Es la misma decisión que la calculadora de la portada y por el mismo
 * motivo: no proyectamos lo que MarketINK conseguiría, multiplicamos lo
 * que él ya tiene. Así se puede ser contundente sin afirmar nada que no
 * podamos sostener, y de paso el artista llega a la llamada habiendo
 * hecho la cuenta él mismo, que convence más que cualquier cifra que le
 * pongamos delante.
 *
 * Los valores iniciales son un punto de partida visible, no una
 * estimación de su negocio. Por eso el texto le pide moverlos.
 */
export default function AuditCost({
  lang,
  labels,
}: {
  lang: Lang;
  labels: { a: string; b: string; c: string; out: string; year: string; note: string };
}) {
  const [ticket, setTicket] = useState(350);
  const [dms, setDms] = useState(12);
  const [books, setBooks] = useState(2);

  const fmt = (n: number) =>
    "$" + n.toLocaleString(lang === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 0 });

  /* Dos citas más al mes. No es una cifra elegida para impresionar: es
     el suelo de lo que mueve cerrar la puerta de entrada, y deja el
     resultado por debajo de lo que promete cualquiera. */
  const mes = ticket * 2;
  const anio = mes * 12;

  const semana = Math.max(0, dms - books);

  const barra = (v: number, min: number, max: number, set: (n: number) => void, label: string, out: string, step = 1) => (
    <div>
      <label className="mb-3 flex items-baseline justify-between gap-4">
        <span className="text-[13.5px] leading-snug text-muted">{label}</span>
        <b className="text-[24px] font-bold tabular-nums tracking-tight text-bone">{out}</b>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => set(+e.target.value)}
        aria-label={label}
        className="range-ink"
      />
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="space-y-8">
        {barra(ticket, 100, 2000, setTicket, labels.a, fmt(ticket), 25)}
        {barra(dms, 1, 60, setDms, labels.b, String(dms))}
        {barra(books, 0, Math.max(1, dms), setBooks, labels.c, String(books))}
        <p className="text-[12.5px] leading-relaxed text-faint">{labels.note}</p>
      </div>

      <div className="flex flex-col justify-center gap-6 rounded-[22px] p-8 ring-1 ring-white/[0.09] sm:p-10">
        {semana > 0 && (
          <p className="text-[14px] leading-relaxed text-muted">
            <b className="tabular-nums text-bone">{semana}</b>{" "}
            {lang === "es"
              ? "conversaciones a la semana que no terminan en una cita."
              : semana === 1
                ? "conversation a week that doesn't end in a chair."
                : "conversations a week that don't end in a chair."}
          </p>
        )}
        <div>
          <p className="mb-2 text-[13px] uppercase tracking-[0.14em] text-faint">{labels.out}</p>
          <p className="flash-type text-[clamp(44px,8vw,84px)] text-blood">{fmt(anio)}</p>
          <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-faint">{labels.year}</p>
        </div>
        <p className="text-[13px] leading-relaxed text-muted">
          {fmt(mes)} {lang === "es" ? "al mes" : "a month"}
        </p>
      </div>
    </div>
  );
}
