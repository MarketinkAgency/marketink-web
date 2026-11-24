"use client";

import { useState } from "react";
import { flushSync } from "react-dom";

/**
 * EL GRID, ORDENADO
 *
 * La pantalla que sustituye a «los doce puntos». Primero el grid del
 * artista tal cual lo ve un desconocido; un botón y las mismas fotos se
 * agrupan por estilo, con el recuento de cada montón. Las dos familias
 * «core» quedan marcadas en rojo: ahí está el artista que el perfil
 * debería enseñar.
 *
 * La animación es la View Transitions API (cada miniatura lleva su
 * nombre); donde no existe, el cambio es instantáneo y no se pierde nada.
 */

type Tile = { id: string; f: string; alt: string };
type Fam = { id: string; name: string; core?: boolean };

export default function GridSorter({
  tiles,
  familias,
  base,
  ui,
}: {
  tiles: Tile[];
  familias: readonly Fam[];
  base: string;
  ui: { sort: string; unsort: string; of: string; posts: string; coreNote: string };
}) {
  const [sorted, setSorted] = useState(false);

  function toggle() {
    const next = !sorted;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(() => flushSync(() => setSorted(next)));
    } else {
      setSorted(next);
    }
  }

  const img = (t: Tile, core?: boolean) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={t.id}
      src={`${base}${t.id}.webp`}
      alt={t.alt}
      loading="lazy"
      className={`kalm-tile ${core ? "is-core" : ""}`}
      style={{ viewTransitionName: `t-${t.id}` }}
    />
  );

  return (
    <div>
      <button type="button" onClick={toggle} className="kalm-sort-btn" aria-pressed={sorted}>
        <span className="kalm-sort-dot" aria-hidden />
        {sorted ? ui.unsort : ui.sort}
      </button>

      {!sorted ? (
        <div className="kalm-grid mt-8">{tiles.map((t) => img(t))}</div>
      ) : (
        <div className="mt-8 space-y-7">
          {familias.map((f) => {
            const own = tiles.filter((t) => t.f === f.id);
            if (!own.length) return null;
            return (
              <div key={f.id} className={`kalm-fam ${f.core ? "is-core" : ""}`}>
                <p className="kalm-fam-label">
                  <b className="tabular-nums">{own.length}</b>
                  <span className="text-faint"> {ui.of} {tiles.length}</span>
                  <i aria-hidden />
                  <span>{f.name}</span>
                </p>
                <div className="kalm-fam-row">{own.map((t) => img(t, f.core))}</div>
              </div>
            );
          })}
          <p className="max-w-[60ch] text-[15px] leading-relaxed text-bone">{ui.coreNote}</p>
        </div>
      )}
    </div>
  );
}
