"use client";

import { useState } from "react";
import type { MsgGroup } from "@/lib/presentaciones/andy-instagram";

/**
 * La biblioteca de mensajes: pestañas ES / EN y un botón «Copiar» por
 * mensaje. Lo que va entre [corchetes] se resalta como campo a cambiar,
 * pero se copia tal cual, con los corchetes, para que al pegarlo en
 * Instagram se vea qué falta por rellenar.
 */
export default function MessageLibrary({
  groups,
  ui,
}: {
  groups: MsgGroup[];
  ui: { copy: string; copied: string; field: string };
}) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [done, setDone] = useState<string | null>(null);

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* navegadores sin permiso: selección manual */
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(key);
    window.setTimeout(() => setDone((v) => (v === key ? null : v)), 1600);
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <div className="inline-flex border border-white/[0.15]" role="tablist" aria-label="Idioma">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={lang === l}
              onClick={() => setLang(l)}
              className={`px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] transition ${lang === l ? "bg-bone text-void" : "text-muted hover:text-bone"}`}
            >
              {l === "es" ? "Español" : "English"}
            </button>
          ))}
        </div>
        <p className="text-[12.5px] text-faint">
          <mark className="deck-field">[así]</mark> = {ui.field}
        </p>
      </div>

      <div className="grid gap-px bg-white/[0.08] lg:grid-cols-2">
        {groups.map((g) => (
          <section key={g.id} className="bg-void px-7 py-9 sm:px-9">
            <h3 className="flash-type text-[clamp(22px,2.4vw,30px)] leading-[1.05] text-bone">{g.title}</h3>
            {g.hint && <p className="mt-2 max-w-[56ch] text-[13.5px] leading-relaxed text-faint">{g.hint}</p>}
            <ul className="mt-6 space-y-4">
              {g.items.map((m) => {
                const key = `${g.id}-${m.label}-${lang}`;
                const text = m[lang];
                return (
                  <li key={m.label} className="bg-panel px-5 py-5 ring-1 ring-white/[0.07]">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">{m.label}</p>
                      <button
                        type="button"
                        onClick={() => copy(key, text)}
                        className={`shrink-0 border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition ${done === key ? "border-bone bg-bone text-void" : "border-white/[0.25] text-muted hover:border-bone hover:text-bone"}`}
                      >
                        {done === key ? ui.copied : ui.copy}
                      </button>
                    </div>
                    <p className="whitespace-pre-line text-[15px] leading-[1.7] text-bone">
                      {text.split(/(\[[^\]]+\])/g).map((p, k) =>
                        /^\[[^\]]+\]$/.test(p) ? <mark key={k} className="deck-field">{p}</mark> : <span key={k}>{p}</span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
