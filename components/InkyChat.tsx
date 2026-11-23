"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChatMsg } from "@/lib/inky";

/**
 * El objeto del hero de /inky: una conversación de ejemplo, del primer DM
 * a la cita en el calendario. Es literalmente lo que hace INKY.
 *
 * Se reproduce UNA vez al cargar (≈5 s, la regla de la casa es que nada se
 * mueva solo más de eso) y se puede repetir con el botón. Con
 * prefers-reduced-motion se ve completa desde el principio: las burbujas
 * usan `.bubble`, que globals.css deja quieta en ese modo.
 */

/** Un QR de mentira pero creíble: tres esquinas de búsqueda y módulos fijos. */
function FakeQr() {
  const n = 21;
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    const ring = (ox: number, oy: number) => {
      const dx = x - ox;
      const dy = y - oy;
      const edge = dx === 0 || dy === 0 || dx === 6 || dy === 6;
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return edge || core;
    };
    if (inBox(0, 0)) return ring(0, 0);
    if (inBox(n - 7, 0)) return ring(n - 7, 0);
    if (inBox(0, n - 7)) return ring(0, n - 7);
    return null;
  };
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      const on = f ?? ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0);
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="size-24 bg-white" aria-hidden shapeRendering="crispEdges">
      <path d={d} fill="#070708" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}

export default function InkyChat({
  t,
  logo,
}: {
  t: { label: string; studio: string; status: string; client: string; inky: string; replay: string; msgs: ChatMsg[] };
  logo: string;
}) {
  const [run, setRun] = useState(0);

  return (
    <figure className="glass w-full max-w-[440px] overflow-hidden">
      <figcaption className="sr-only">{t.label}</figcaption>

      <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
        <Image
          src={logo}
          alt=""
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full bg-void object-contain ring-1 ring-white/15"
        />
        <div className="min-w-0 flex-1">
          <b className="block truncate text-[14px] font-semibold tracking-[-0.015em]">{t.studio}</b>
          <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-bone/80">
            <i className="dot-live size-1.5 rounded-full bg-signal" aria-hidden />
            {t.status}
          </span>
        </div>
      </div>

      <ol key={run} className="flex flex-col gap-2 px-4 py-4">
        {t.msgs.map((m, i) => {
          const mine = m.from === "inky";
          return (
            <li
              key={i}
              className={`bubble max-w-[86%] text-[13.5px] leading-[1.45] ${
                mine
                  ? "self-end rounded-[17px] rounded-br-[6px] bg-blood px-4 py-2.5 font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_24px_-14px_rgba(225,6,0,0.9)]"
                  : "self-start rounded-[17px] rounded-bl-[6px] bg-white/[0.055] px-4 py-2.5 text-bone ring-1 ring-white/[0.08]"
              }`}
              style={{ animationDelay: `${0.4 + i * 0.55}s` }}
            >
              <span className="sr-only">{mine ? t.inky : t.client}: </span>
              {m.text}
              {m.kind === "qr" && (
                <span className="mt-3 flex items-center gap-3 rounded-[10px] bg-white/[0.12] p-2.5">
                  <FakeQr />
                  <span className="text-[11.5px] font-semibold uppercase leading-snug tracking-[0.08em] text-white/90">
                    {m.note}
                  </span>
                </span>
              )}
              {m.kind === "event" && (
                <span className="mt-3 flex items-center gap-2 rounded-[8px] bg-bone px-3 py-2 text-[12px] font-semibold text-void">
                  <CalendarIcon />
                  {m.note}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] py-2 pl-5 pr-2">
        <span aria-hidden className="text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
          {t.label}
        </span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="inline-flex min-h-[44px] items-center gap-2 px-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted transition hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {t.replay}
        </button>
      </div>
    </figure>
  );
}
