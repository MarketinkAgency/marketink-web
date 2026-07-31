"use client";

import { useState } from "react";
import type { Copy, Lang } from "@/lib/copy";

/**
 * Calculadora del costo de no responder.
 *
 * No proyecta resultados de MarketINK: multiplica los propios números del
 * visitante. Por eso puede ser contundente sin afirmar nada falso — la cuenta
 * la hace él, con su ticket y sus consultas perdidas.
 */
export default function Calculator({ t, lang }: { t: Copy["calc"]; lang: Lang }) {
  const [value, setValue] = useState(800);
  const [missed, setMissed] = useState(10);

  const month = value * missed;
  const year = month * 12;
  const fmt = (n: number) =>
    "$" + n.toLocaleString(lang === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 0 });

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* controles */}
      <div className="space-y-10">
        <div>
          <label className="mb-4 flex items-baseline justify-between gap-4">
            <span className="text-[14.5px] text-muted">{t.valueLabel}</span>
            <b className="text-[28px] font-bold tabular-nums tracking-tight text-bone">{fmt(value)}</b>
          </label>
          <input
            type="range"
            min={150}
            max={4000}
            step={50}
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            aria-label={t.valueLabel}
            className="range-ink"
          />
        </div>

        <div>
          <label className="mb-4 flex items-baseline justify-between gap-4">
            <span className="text-[14.5px] text-muted">{t.missedLabel}</span>
            <b className="text-[28px] font-bold tabular-nums tracking-tight text-bone">{missed}</b>
          </label>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={missed}
            onChange={(e) => setMissed(+e.target.value)}
            aria-label={t.missedLabel}
            className="range-ink"
          />
        </div>

        <p className="text-[12.5px] leading-relaxed text-faint">{t.note}</p>
      </div>

      {/* resultado */}
      <div className="flash-cell flex flex-col justify-center p-10 sm:p-12">
        <p className="flash-sub mb-3 text-[10.5px] tracking-[0.2em] text-faint">{t.monthLabel}</p>
        <p
          className="flash-type text-[clamp(2.6rem,7vw,4.6rem)] tabular-nums text-signal"
          aria-live="polite"
        >
          {fmt(month)}
        </p>

        <div className="mt-8 border-t border-white/[0.09] pt-7">
          <p className="flash-sub mb-2 text-[10.5px] tracking-[0.2em] text-faint">{t.yearLabel}</p>
          <p className="flash-type text-[clamp(1.7rem,4vw,2.6rem)] tabular-nums text-bone">{fmt(year)}</p>
        </div>

        <p className="mt-9 text-[15.5px] leading-relaxed">
          {t.kicker} <span className="text-signal">{t.kickerEm}</span>
        </p>
      </div>
    </div>
  );
}
