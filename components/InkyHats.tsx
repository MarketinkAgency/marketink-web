"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Hat } from "@/lib/inky";

/**
 * Selector de industria («¿qué sombrero llevas hoy?»).
 *
 * Pestañas de verdad (patrón ARIA tabs): flechas, Inicio y Fin mueven el
 * foco y la selección; solo la pestaña activa entra en el orden de Tab.
 * Las pestañas se envuelven en varias filas en móvil en vez de hacer
 * scroll horizontal, que esconde opciones.
 */
export default function InkyHats({
  items,
  label,
  dmLabel,
  doesLabel,
}: {
  items: Hat[];
  label: string;
  dmLabel: string;
  doesLabel: string;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hat = items[active];

  const go = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(items.length - 1);
    }
  };

  return (
    <div className="mt-12 sm:mt-16">
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2.5">
        {items.map((h, i) => {
          const on = i === active;
          return (
            <button
              key={h.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`hat-tab-${h.id}`}
              aria-selected={on}
              aria-controls="hat-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`min-h-[44px] px-4 py-2.5 flash-sub text-[12px] tracking-[0.14em] ring-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-blood ${
                on ? "bg-bone text-void ring-bone" : "text-muted ring-white/15 hover:text-bone hover:ring-white/40"
              }`}
            >
              {h.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="hat-panel"
        aria-labelledby={`hat-tab-${hat.id}`}
        tabIndex={0}
        className="mt-10 grid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blood gap-10 border-t border-white/[0.1] pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
      >
        <div key={`dm-${hat.id}`} className="hat-in">
          <p className="mb-5 flash-sub text-[10.5px] tracking-[0.2em] text-faint">{dmLabel}</p>
          <p className="max-w-[30ch] rounded-[22px] rounded-bl-[8px] bg-white/[0.055] px-6 py-5 text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-bone ring-1 ring-white/[0.08]">
            {hat.dm}
          </p>
        </div>

        <div key={`does-${hat.id}`} className="hat-in">
          <p className="mb-5 flash-sub text-[10.5px] tracking-[0.2em] text-faint">{doesLabel}</p>
          <ol className="border-t border-white/[0.1]">
            {hat.does.map((d, i) => (
              <li key={d} className="flex items-baseline gap-5 border-b border-white/[0.1] py-5">
                <span className="flash-type text-[clamp(1.6rem,2.6vw,2.2rem)] leading-none text-blood" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[46ch] text-[15.5px] leading-relaxed text-bone">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
