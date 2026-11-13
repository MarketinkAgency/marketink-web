"use client";

import { useState, type CSSProperties } from "react";
import type { Copy, Lang } from "@/lib/copy";

/**
 * Calculadora del costo de no responder.
 *
 * No proyecta resultados de MarketINK: multiplica los propios números del
 * visitante. Por eso puede ser contundente sin afirmar nada falso — la cuenta
 * la hace él, con su ticket y sus consultas perdidas.
 *
 * Es un cartel, no un formulario: la cifra que se pierde al mes ocupa el
 * ancho de la pantalla y da un pequeño golpe cada vez que cambia.
 */
const VALUE = { min: 150, max: 4000, step: 50 };
const MISSED = { min: 1, max: 40, step: 1 };

/** cuánto del deslizador va lleno, para pintar la pista en rojo hasta el pulgar */
const fill = (v: number, r: { min: number; max: number }) =>
  ({ "--p": `${((v - r.min) / (r.max - r.min)) * 100}%` }) as CSSProperties;

export default function Calculator({ t, lang }: { t: Copy["calc"]; lang: Lang }) {
  const [value, setValue] = useState(800);
  const [missed, setMissed] = useState(10);

  const month = value * missed;
  const year = month * 12;
  const fmt = (n: number) =>
    "$" + n.toLocaleString(lang === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 0 });

  return (
    <div>
      {/* los dos números del visitante */}
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <label htmlFor="calc-value" className="mb-3 flex items-end justify-between gap-4">
            <span className="max-w-[24ch] text-[14.5px] leading-snug text-muted">{t.valueLabel}</span>
            <b className="flash-type text-[clamp(2rem,3.4vw,3rem)] font-normal leading-none text-bone">{fmt(value)}</b>
          </label>
          <input
            id="calc-value"
            type="range"
            min={VALUE.min}
            max={VALUE.max}
            step={VALUE.step}
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            aria-label={t.valueLabel}
            className="range-flash"
            style={fill(value, VALUE)}
          />
        </div>

        <div>
          <label htmlFor="calc-missed" className="mb-3 flex items-end justify-between gap-4">
            <span className="max-w-[24ch] text-[14.5px] leading-snug text-muted">{t.missedLabel}</span>
            <b className="flash-type text-[clamp(2rem,3.4vw,3rem)] font-normal leading-none text-bone">{missed}</b>
          </label>
          <input
            id="calc-missed"
            type="range"
            min={MISSED.min}
            max={MISSED.max}
            step={MISSED.step}
            value={missed}
            onChange={(e) => setMissed(+e.target.value)}
            aria-label={t.missedLabel}
            className="range-flash"
            style={fill(missed, MISSED)}
          />
        </div>
      </div>

      {/* la cifra, a escala de cartel */}
      <div className="mt-14 border-t-2 border-bone pt-8 sm:mt-20">
        <p className="flash-sub text-[11px] tracking-[0.22em] text-bone">{t.monthLabel}</p>
        <p className="calc-big" aria-live="polite">
          {/* la clave cambia con la cifra: el número vuelve a «golpear» en cada cambio */}
          <span key={month} className="calc-tick">
            {fmt(month)}
          </span>
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-20">
          <p>
            <span className="block flash-sub text-[11px] tracking-[0.22em] text-muted">{t.yearLabel}</span>
            <span className="mt-1 block flash-type text-[clamp(2.4rem,5.4vw,5.2rem)] leading-none text-bone">
              {fmt(year)}
            </span>
          </p>
          {/* el dinero que se pierde va en rojo; el verde queda para micro-acentos, como pide la marca */}
          <p className="max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold leading-snug tracking-[-0.02em] text-muted lg:justify-self-end lg:pb-1">
            {t.kicker} <span className="text-bone">{t.kickerEm}</span>
          </p>
        </div>

        <p className="mt-10 text-[12.5px] leading-relaxed text-faint">{t.note}</p>
      </div>
    </div>
  );
}
