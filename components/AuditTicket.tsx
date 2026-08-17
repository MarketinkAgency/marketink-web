"use client";

import { useState } from "react";
import type { Lang } from "@/lib/copy";

/**
 * LA HORA DEL BARBERO CONTRA LA HORA DEL TATUADOR
 *
 * Para el artista que hoy vive de la barbería y quiere vivir del
 * tatuaje. La comparación no es de precios —un corte y un tatuaje no se
 * comparan— sino de **lo que vale una hora de su silla en cada oficio**.
 * Esa es la cifra que decide si le conviene mover su agenda, y casi
 * ninguno la ha calculado.
 *
 * Los números los pone él. Nosotros no sabemos qué cobra, y una
 * comparación con cifras inventadas se cae en el primer segundo: es el
 * único dato de la página que él conoce mejor que nosotros.
 *
 * Los valores de partida son un punto visible desde el que mover, no una
 * estimación de su negocio, y el texto se lo dice.
 */
export default function AuditTicket({
  lang,
  labels,
}: {
  lang: Lang;
  labels: {
    aTitle: string;
    aPrice: string;
    aMin: string;
    bTitle: string;
    bPrice: string;
    bHours: string;
    hourA: string;
    hourB: string;
    gap: string;
    note: string;
  };
}) {
  const [corte, setCorte] = useState(30);
  const [minutos, setMinutos] = useState(45);
  const [tatuaje, setTatuaje] = useState(400);
  const [horas, setHoras] = useState(3);

  const fmt = (n: number) =>
    "$" + Math.round(n).toLocaleString(lang === "es" ? "es-CO" : "en-US");

  const horaBarba = corte / (minutos / 60);
  const horaTinta = tatuaje / horas;
  const veces = horaBarba > 0 ? horaTinta / horaBarba : 0;

  const barra = (
    v: number, min: number, max: number, step: number,
    set: (n: number) => void, label: string, out: string,
  ) => (
    <div>
      <label className="mb-3 flex items-baseline justify-between gap-4">
        <span className="text-[13.5px] leading-snug text-muted">{label}</span>
        <b className="text-[21px] font-bold tabular-nums tracking-tight text-bone">{out}</b>
      </label>
      <input
        type="range" min={min} max={max} step={step} value={v}
        onChange={(e) => set(+e.target.value)}
        aria-label={label}
        className="range-ink"
      />
    </div>
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
      <div className="rounded-[20px] px-7 py-8 ring-1 ring-white/[0.09]">
        <h3 className="flash-sub mb-7 text-[13px] text-faint">{labels.aTitle}</h3>
        <div className="space-y-7">
          {barra(corte, 10, 120, 5, setCorte, labels.aPrice, fmt(corte))}
          {barra(minutos, 15, 120, 5, setMinutos, labels.aMin, `${minutos} min`)}
        </div>
        <p className="mt-8 border-t border-white/[0.08] pt-6 text-[13px] uppercase tracking-[0.12em] text-faint">
          {labels.hourA}
        </p>
        <p className="flash-type mt-1 text-[clamp(30px,4vw,44px)] text-bone">{fmt(horaBarba)}</p>
      </div>

      <div className="rounded-[20px] px-7 py-8 ring-1 ring-blood/30">
        <h3 className="flash-sub mb-7 text-[13px] text-blood">{labels.bTitle}</h3>
        <div className="space-y-7">
          {barra(tatuaje, 80, 3000, 20, setTatuaje, labels.bPrice, fmt(tatuaje))}
          {barra(horas, 1, 10, 1, setHoras, labels.bHours, `${horas} h`)}
        </div>
        <p className="mt-8 border-t border-white/[0.08] pt-6 text-[13px] uppercase tracking-[0.12em] text-faint">
          {labels.hourB}
        </p>
        <p className="flash-type mt-1 text-[clamp(30px,4vw,44px)] text-blood">{fmt(horaTinta)}</p>
      </div>

      <div className="flex flex-col justify-center gap-5 rounded-[20px] px-7 py-8 ring-1 ring-white/[0.09]">
        <p className="flash-type text-[clamp(44px,7vw,76px)] text-bone">
          {veces >= 100 ? "99+" : veces.toFixed(1)}
          <span className="text-[0.42em]">×</span>
        </p>
        <p className="text-[14.5px] leading-[1.7] text-muted">{labels.gap}</p>
        <p className="text-[12.5px] leading-relaxed text-faint">{labels.note}</p>
      </div>
    </div>
  );
}
