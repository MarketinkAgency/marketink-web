"use client";

import { useState } from "react";

/** Un bloque de texto con botón «Copy». Se copia tal cual, corchetes incluidos. */
export default function CopyText({ text, label, done }: { text: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setOk(true);
    window.setTimeout(() => setOk(false), 1600);
  }

  return (
    <div className="relative rounded-[14px] bg-panel ring-1 ring-white/[0.08]">
      <button
        type="button"
        onClick={copy}
        className={`absolute top-3 right-3 border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition ${ok ? "border-bone bg-bone text-void" : "border-white/[0.25] text-muted hover:border-bone hover:text-bone"}`}
      >
        {ok ? done : label}
      </button>
      <p className="whitespace-pre-line px-5 pt-12 pb-5 text-[14.5px] leading-[1.7] text-bone sm:px-6">
        {text.split(/(\[[^\]]+\])/g).map((p, k) =>
          /^\[[^\]]+\]$/.test(p) ? (
            <mark key={k} className="rounded-[3px] bg-blood/20 px-1 text-bone">
              {p}
            </mark>
          ) : (
            <span key={k}>{p}</span>
          )
        )}
      </p>
    </div>
  );
}
