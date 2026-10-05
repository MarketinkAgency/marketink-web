"use client";

import { useState } from "react";

/**
 * Lo que valió el mes — con sus números, no con los nuestros.
 *
 * Misma decisión que la calculadora de las auditorías y por el mismo
 * motivo: no afirmamos cuántas citas cerró. No lo sabemos, lo sabe
 * ella, y una cifra nuestra inventada en la única sección que habla de
 * dinero es la forma más rápida de que deje de creerse el resto del
 * reporte.
 *
 * Así que ella mueve el número delante de nosotros en la reunión. El
 * resultado lo calcula su propio ticket, que además nos lo dijo ella en
 * el diagnóstico. Es más contundente que cualquier promesa y no admite
 * discusión: es su aritmética.
 */
export default function ClientRoi({
  spend,
  ticket: ticketInicial,
  labels,
}: {
  /** Gasto publicitario real del mes. Viene del dato, no se toca. */
  spend: number;
  ticket: number;
  labels: {
    bookings: string;
    ticket: string;
    revenue: string;
    invested: string;
    net: string;
    perBooking: string;
    note: string;
  };
}) {
  const [bookings, setBookings] = useState(2);
  const [ticket, setTicket] = useState(ticketInicial);

  const fmt = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  const revenue = bookings * ticket;
  const net = revenue - spend;
  const perBooking = bookings > 0 ? spend / bookings : 0;

  const barra = (
    v: number,
    min: number,
    max: number,
    step: number,
    set: (n: number) => void,
    label: string,
    out: string,
  ) => (
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
        {barra(bookings, 0, 15, 1, setBookings, labels.bookings, String(bookings))}
        {barra(ticket, 100, 1200, 25, setTicket, labels.ticket, fmt(ticket))}
        <p className="text-[12.5px] leading-relaxed text-faint">{labels.note}</p>
      </div>

      <div className="flex flex-col justify-center gap-7 rounded-[22px] p-8 ring-1 ring-white/[0.09] sm:p-10">
        <div>
          <p className="text-[12.5px] uppercase tracking-[0.14em] text-faint">{labels.revenue}</p>
          <p className="flash-type mt-1 text-[clamp(40px,7.4vw,78px)] text-blood">{fmt(revenue)}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-white/[0.09] pt-7">
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{labels.invested}</p>
            <p className="mt-1 text-[22px] font-bold tabular-nums text-bone">{fmt(spend)}</p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{labels.net}</p>
            <p
              className={`mt-1 text-[22px] font-bold tabular-nums ${net >= 0 ? "text-bone" : "text-blood"}`}
            >
              {net >= 0 ? "+" : "−"}
              {fmt(Math.abs(net))}
            </p>
          </div>
        </div>

        {bookings > 0 && (
          <p className="border-t border-white/[0.09] pt-7 text-[14px] leading-[1.7] text-muted">
            {labels.perBooking}{" "}
            <b className="whitespace-nowrap text-bone">{fmt(perBooking)}</b>.
          </p>
        )}
      </div>
    </div>
  );
}
