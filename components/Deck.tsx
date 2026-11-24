"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/presentaciones/andy-instagram";

/**
 * EL DECK
 *
 * Una presentación 16:9 para compartir pantalla, que también se lee en
 * el celular porque después se la mandamos al cliente.
 *
 *  · Flechas, espacio, clic (mitad derecha avanza, mitad izquierda
 *    retrocede) y swipe en móvil.
 *  · Barra de progreso y «n de N».
 *  · F o el botón: pantalla completa del escenario.
 *  · N: notas del presentador, ocultas por defecto. Van debajo del
 *    escenario, no encima, para que al compartir solo la ventana del
 *    navegador el cliente no las vea si Nick comparte solo el área.
 *
 * El tamaño del texto se mide en `cqw` (ancho del contenedor): la slide
 * se ve igual a 390 px, a 1280 px y en pantalla completa, sin saltos de
 * breakpoint. El escenario es `container-type: inline-size`.
 */

type Ui = {
  of: string;
  notes: string;
  notesHint: string;
  full: string;
  exitFull: string;
  prev: string;
  next: string;
};

export default function Deck({ slides, ui }: { slides: Slide[]; ui: Ui }) {
  const [i, setI] = useState(0);
  const [notes, setNotes] = useState(false);
  const [full, setFull] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = slides.length;

  const go = useCallback(
    (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d))),
    [n]
  );

  /* Arranca en la slide del hash (#s7) para poder mandar un enlace a una
     slide concreta, y lo mantiene al moverse. */
  useEffect(() => {
    const leer = () => {
      const m = /^#s(\d+)$/.exec(window.location.hash);
      if (m) setI(Math.min(n - 1, Math.max(0, Number(m[1]) - 1)));
    };
    /* Después de hidratar, no durante: el HTML estático siempre es la
       slide 1 y el salto se hace en el siguiente cuadro. Y si cambia el
       hash (un enlace a #s7 dentro de la misma página), se obedece. */
    const id = requestAnimationFrame(leer);
    window.addEventListener("hashchange", leer);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", leer);
    };
  }, [n]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    history.replaceState(null, "", `#s${i + 1}`);
  }, [i]);

  const toggleFull = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(n - 1);
      else if (e.key === "n" || e.key === "N") setNotes((v) => !v);
      else if (e.key === "f" || e.key === "F") toggleFull();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n, toggleFull]);

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function onStageClick(e: React.MouseEvent<HTMLDivElement>) {
    const t = e.target as HTMLElement;
    if (t.closest("a,button")) return;
    const r = e.currentTarget.getBoundingClientRect();
    go(e.clientX - r.left < r.width * 0.3 ? -1 : 1);
  }
  function onTouchStart(e: React.TouchEvent) {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  }

  const s = slides[i];

  return (
    <div ref={wrap} className="deck-wrap">
      <div
        className={`deck-stage ${s.theme === "andy" ? "deck-andy" : ""}`}
        onClick={onStageClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="slide"
        aria-label={`${i + 1} ${ui.of} ${n}`}
      >
        <SlideView s={s} key={s.n} />

        {/* cabecera: número y botones */}
        <div className="deck-bar">
          <span className="tabular-nums">
            {String(i + 1).padStart(2, "0")} <span className="opacity-50">{ui.of}</span> {String(n).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-[1.2cqw]">
            <button type="button" onClick={() => setNotes((v) => !v)} className={`deck-btn ${notes ? "is-on" : ""}`} aria-pressed={notes} title={`${ui.notes} (N)`}>
              N
            </button>
            <button type="button" onClick={toggleFull} className="deck-btn" title={`${full ? ui.exitFull : ui.full} (F)`}>
              {full ? "✕" : "⛶"}
            </button>
          </span>
        </div>

        <div className="deck-progress" aria-hidden>
          <i style={{ width: `${((i + 1) / n) * 100}%` }} />
        </div>
      </div>

      {/* controles táctiles / ratón, fuera del escenario */}
      <div className="mt-3 flex items-center justify-between gap-4 text-[12px] text-faint">
        <button type="button" onClick={() => go(-1)} disabled={i === 0} className="deck-nav">
          ← {ui.prev}
        </button>
        <span className="hidden sm:inline">{ui.notesHint}</span>
        <button type="button" onClick={() => go(1)} disabled={i === n - 1} className="deck-nav">
          {ui.next} →
        </button>
      </div>

      {notes && (
        <aside className="deck-notes" aria-label={ui.notes}>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blood">
            {ui.notes} · {String(i + 1).padStart(2, "0")}
          </p>
          <p className="text-[15px] leading-relaxed text-bone">{s.notes}</p>
        </aside>
      )}
    </div>
  );
}

/* ── una slide ─────────────────────────────────────────────────── */

function Field({ text }: { text: string }) {
  /* [campos] resaltados; lo demás tal cual. */
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, k) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <mark key={k} className="deck-field">{p}</mark>
        ) : (
          <span key={k}>{p}</span>
        )
      )}
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <p className="deck-tag">{children}</p>;
}

function SlideView({ s }: { s: Slide }) {
  const go =
    s.go && (
      <a href={`#${s.go.to}`} className="deck-go">
        {s.go.label} ↓
      </a>
    );

  switch (s.kind) {
    case "cover":
      return (
        <div className="deck-slide justify-end">
          <p className="deck-wordmark">
            market<b>INK</b>
            <i aria-hidden />
          </p>
          <h1 className="deck-h1 mt-auto">{s.title}</h1>
          <p className="deck-sub">{s.sub}</p>
          <p className="deck-foot">{s.tag}</p>
        </div>
      );

    case "thanks":
      return (
        <div className="deck-slide justify-center">
          <h2 className="deck-h1">{s.title}</h2>
          <p className="deck-sub">{s.sub}</p>
          <ul className="mt-[4cqw] flex flex-wrap gap-x-[3cqw] gap-y-[1cqw] text-[1.6cqw] text-muted">
            {s.points?.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="deck-wordmark mt-[5cqw]">
            market<b>INK</b>
            <i aria-hidden />
          </p>
        </div>
      );

    case "text":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2">{s.title}</h2>
          {s.sub && <p className="deck-sub">{s.sub}</p>}
          {s.points && (
            <ul className="deck-points">
              {s.points.map((p) => (
                <li key={p}><Field text={p} /></li>
              ))}
            </ul>
          )}
        </div>
      );

    case "funnel":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2 deck-h2--sm">{s.title}</h2>
          <ol className="deck-funnel">
            {s.funnel?.map((f, k) => (
              <li key={f}>
                <b>{String(k + 1).padStart(2, "0")}</b>
                <span>{f}</span>
              </li>
            ))}
          </ol>
          {s.sub && <p className="deck-sub">{s.sub}</p>}
        </div>
      );

    case "stat":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2 deck-h2--sm">{s.title}</h2>
          <ul className="deck-stat">
            {s.stat?.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="deck-close">{s.stat?.close}</p>
        </div>
      );

    case "adjust":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2">{s.title}</h2>
          {s.sub && <p className="deck-sub"><Field text={s.sub} /></p>}
          {s.points && (
            <ul className="deck-points">
              {s.points.map((p) => (
                <li key={p}><Field text={p} /></li>
              ))}
            </ul>
          )}
          {s.ba && (
            <div className="deck-ba">
              <div>
                <p className="deck-label">Antes</p>
                <p className="line-through decoration-blood/60">{s.ba.before}</p>
              </div>
              <div className="is-after">
                <p className="deck-label is-blood">Después</p>
                <p><Field text={s.ba.after} /></p>
              </div>
            </div>
          )}
          {go}
        </div>
      );

    case "table":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2 deck-h2--sm">{s.title}</h2>
          {s.sub && <p className="deck-sub"><Field text={s.sub} /></p>}
          <table className="deck-table">
            <thead>
              <tr>
                {s.table?.cols.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table?.rows.map((r, k) => (
                <tr key={k}>
                  {r.map((c, j) => (
                    <td key={j}><Field text={c} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cols":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2 deck-h2--sm">{s.title}</h2>
          {s.sub && <p className="deck-sub">{s.sub}</p>}
          <div className={`deck-cols ${s.cols && s.cols.length === 2 ? "is-two" : ""}`}>
            {s.cols?.map((c) => (
              <div key={c.h}>
                <p className="deck-label is-blood">{c.h}</p>
                <ul>
                  {c.items.map((x) => (
                    <li key={x}><Field text={x} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {go}
        </div>
      );

    case "kit":
      return (
        <div className="deck-slide">
          <Tag>{s.tag}</Tag>
          <h2 className="deck-h2 deck-h2--sm">{s.title}</h2>
          <ul className="deck-points">
            {s.points?.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {go}
        </div>
      );
  }
}
