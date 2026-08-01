"use client";

import { useEffect, useState } from "react";
import { capacity, freeSpots } from "@/lib/capacity";
import type { Lang } from "@/lib/copy";

type Labels = {
  /** «{n} de {total} cupos de {mes} disponibles» */
  spots: string;
  /** «Quedan {d} días de {mes}» */
  days: string;
  full: string;
};

/**
 * Cupos del mes y días restantes.
 *
 * Se calcula en el navegador para que refleje el mes real del visitante
 * y no quede congelado en la fecha de compilación. Durante el render en
 * servidor no se pinta nada, así no hay salto de hidratación.
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
  const [data, setData] = useState<{ free: number; days: number; month: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    setData({
      free: freeSpots(),
      days: lastDay - now.getDate() + 1,
      month: now.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { month: "long" }),
    });
  }, [lang]);

  if (!data) return <div className={className} style={{ minHeight: 44 }} aria-hidden />;

  const { free, days, month } = data;
  const pct = Math.round((free / capacity.perMonth) * 100);
  const fill = (s: string) =>
    s
      .replace("{n}", String(free))
      .replace("{total}", String(capacity.perMonth))
      .replace("{d}", String(days))
      .replace("{mes}", month)
      .replace("{month}", month);

  return (
    <div className={`inline-flex flex-col items-start gap-3 ${className}`}>
      <p className="flex items-center gap-2.5 text-[14px] text-bone" aria-live="polite">
        <i className="dot-live size-2 shrink-0 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.8)]" />
        <span>
          {free === 0 ? (
            fill(labels.full)
          ) : (
            <>
              <b className="font-bold text-blood">{free}</b> {fill(labels.spots).replace(`${free} `, "")}
            </>
          )}
        </span>
      </p>

      {/* barra de ocupación */}
      <div className="h-[3px] w-full min-w-[220px] max-w-[300px] overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-blood transition-[width] duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-[12.5px] text-faint">{fill(labels.days)}</p>
    </div>
  );
}
