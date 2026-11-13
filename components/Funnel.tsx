import type { Copy } from "@/lib/copy";

/**
 * El recorrido, dibujado como una cadena.
 *
 * En escritorio (≥ 1280 px) se lee de izquierda a derecha, como una tira:
 * anuncio → DM → calificación → consulta → depósito. Una línea roja une los
 * cinco nodos y se va llenando con el scroll; cada nodo se enciende cuando
 * la línea llega a él. Debajo, una flecha de vuelta: lo que no cierra entra
 * en seguimiento y regresa al DM.
 *
 * En móvil y tablet es la misma cadena en vertical.
 *
 * Cada paso trae una miniinterfaz real —el anuncio, el DM, la ficha de
 * calificación, el calendario, el comprobante— porque una promesa que se ve
 * deja de ser una promesa. Todo es HTML y CSS: ni una imagen, ni JavaScript.
 * Sin soporte de animaciones por scroll (o con reduced-motion) la cadena se
 * ve completa y encendida desde el principio.
 */

type Step = Copy["funnel"]["steps"][number];

/* ── las miniinterfaces ─────────────────────────────────────── */

function Chrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="w-full max-w-[360px] border border-white/[0.14] bg-[rgba(13,13,15,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/[0.1] px-3.5 py-2.5">
        <span className="size-1.5 rounded-full bg-blood" aria-hidden />
        <span className="flash-sub text-[9px] tracking-[0.2em] text-faint">{label}</span>
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

function Ui({ s }: { s: Step }) {
  if (s.kind === "ad") {
    const ui = s.ui as unknown as { t: string; s: string; cta: string };
    return (
      <Chrome label="AD">
        <div className="mb-3 h-[74px] w-full bg-[linear-gradient(135deg,rgba(225,6,0,0.28),rgba(225,6,0,0.05)_60%,transparent)] ring-1 ring-inset ring-white/[0.08]" />
        <p className="text-[13px] font-semibold leading-snug text-bone">{ui.t}</p>
        <p className="mt-1 text-[11px] text-faint">{ui.s}</p>
        <p className="mt-3 bg-blood px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white">
          {ui.cta}
        </p>
      </Chrome>
    );
  }

  if (s.kind === "dm") {
    const ui = s.ui as unknown as { a: string; b: string };
    return (
      <Chrome label="DM">
        <p className="mb-2 max-w-[86%] bg-white/[0.06] px-3 py-2 text-[12px] leading-snug text-bone ring-1 ring-white/[0.07]">
          {ui.a}
        </p>
        <p className="ml-auto max-w-[86%] bg-blood px-3 py-2 text-[12px] font-medium leading-snug text-white">
          {ui.b}
        </p>
      </Chrome>
    );
  }

  if (s.kind === "qual") {
    const ui = s.ui as unknown as { rows: [string, string][] };
    return (
      <Chrome label="PROJECT">
        <dl className="divide-y divide-white/[0.08]">
          {ui.rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-[10.5px] uppercase tracking-[0.14em] text-faint">{k}</dt>
              <dd className="text-right text-[12px] font-medium text-bone">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 inline-block border border-signal/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-signal">
          Qualified
        </p>
      </Chrome>
    );
  }

  if (s.kind === "cal") {
    const ui = s.ui as unknown as { d1: string; d2: string; ok: string };
    return (
      <Chrome label="CALENDAR">
        <div className="grid grid-cols-2 gap-2">
          <p className="border border-blood bg-blood/15 px-2 py-2.5 text-center text-[11.5px] font-semibold text-bone">
            {ui.d1}
          </p>
          <p className="border border-white/[0.12] px-2 py-2.5 text-center text-[11.5px] text-faint">{ui.d2}</p>
        </div>
        <p className="mt-3 flex items-center gap-2 text-[11.5px] text-signal">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden />
          {ui.ok}
        </p>
      </Chrome>
    );
  }

  const ui = s.ui as unknown as { label: string; v: string; n: string };
  return (
    <Chrome label="DEPOSIT">
      <p className="flash-sub text-[9.5px] tracking-[0.2em] text-faint">{ui.label}</p>
      <p className="mt-1.5 flash-type text-[38px] text-signal">{ui.v}</p>
      <p className="mt-2.5 flex items-center gap-2 text-[11.5px] text-muted">
        <span className="size-1.5 rounded-full bg-signal" aria-hidden />
        {ui.n}
      </p>
    </Chrome>
  );
}

/* ── la cadena ──────────────────────────────────────────────── */

export default function Funnel({ t }: { t: Copy["funnel"] }) {
  return (
    <div className="flow">
      <ol className="flow-track">
        {t.steps.map((s, i) => (
          <li key={s.k} className="flow-step reveal">
            {/* el nodo numerado y el tramo de línea que lo une al siguiente */}
            <div className="flow-head" aria-hidden>
              <span className="flow-node">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow-bar" />
            </div>
            <h3 className="flow-title flash-type">{s.k}</h3>
            <p className="flow-desc">{s.d}</p>
            <div className="flow-ui">
              <Ui s={s} />
            </div>
          </li>
        ))}
      </ol>

      {/* lo que no cierra vuelve al DM: la flecha de regreso */}
      <p className="flow-loop reveal">
        <span className="flow-loop__icon" aria-hidden>
          ↺
        </span>
        {t.follow}
      </p>
    </div>
  );
}
