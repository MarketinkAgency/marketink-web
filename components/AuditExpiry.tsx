"use client";

import { useEffect, useState } from "react";

/**
 * EL RELOJ DE LA AUDITORÍA
 *
 * Una barra fija arriba, siempre a la vista, contando lo que le queda a
 * la parte gratuita. Y cuando llega a cero, **pasa algo**: los tres
 * arreglos y el guion se bloquean y en su sitio queda el motivo.
 *
 * Esa segunda mitad no es un adorno. Un contador que llega a cero y deja
 * todo igual enseña exactamente lo contrario de lo que queríamos: que
 * los plazos que ponemos no significan nada. Si la cuenta atrás existe,
 * la caducidad tiene que existir.
 *
 * Por qué la caducidad se decide aquí, en el cliente, y no en el
 * servidor: la página se prerenderiza al desplegar, así que un `if` en
 * el servidor congelaría el estado del día del despliegue y la
 * auditoría seguiría «viva» para siempre. Aquí se compara contra el
 * reloj de quien mira, cada segundo.
 *
 * Lo que NO se bloquea: el diagnóstico, los doce puntos y el mercado.
 * Eso es lo que le hace ver el problema, y quitárselo sería castigarlo
 * por llegar tarde. Lo que caduca es lo que se llevaba puesto.
 */

type Unidades = { d: string; h: string; m: string; s: string };

function restante(hasta: number, ahora: number) {
  const ms = hasta - ahora;
  if (ms <= 0) return null;
  const t = Math.floor(ms / 1000);
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
  };
}

export default function AuditExpiry({
  expira,
  lang,
  labels,
}: {
  expira: string;
  lang: string;
  labels: { tag: string; done: string; cta: string; units: Unidades };
}) {
  const hasta = new Date(expira).getTime();

  /* Arranca en null y no con el valor calculado: en el servidor no hay
     reloj del visitante, y pintar una cuenta atrás en el HTML estático
     provocaría un desajuste de hidratación y, peor, un número viejo
     visible durante un instante. */
  const [q, setQ] = useState<ReturnType<typeof restante> | undefined>(undefined);

  useEffect(() => {
    const tic = () => {
      const r = restante(hasta, Date.now());
      setQ(r);
      /* El resto de la página escucha por aquí. Un atributo en <html> en
         vez de un contexto de React: así el bloqueo lo aplica el CSS,
         sin volver a pintar media página cada segundo. */
      document.documentElement.dataset.auditExpirado = r ? "0" : "1";
    };
    tic();
    const id = window.setInterval(tic, 1000);
    return () => {
      window.clearInterval(id);
      delete document.documentElement.dataset.auditExpirado;
    };
  }, [hasta]);

  const fecha = new Date(hasta).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
  });

  const u = labels.units;
  const caducada = q === null;

  return (
    <div className="audit-clock">
      <div className="mx-auto flex max-w-[1180px] items-center gap-x-4 gap-y-1 px-6 sm:px-10">
        <i className={`size-1.5 flex-none rounded-full bg-blood ${caducada ? "" : "dot-live"}`} aria-hidden />

        <p className="min-w-0 flex-1 truncate text-[12px] font-semibold uppercase tracking-[0.1em]">
          {caducada ? (
            <span className="text-faint">
              {labels.done} · {fecha}
            </span>
          ) : (
            <>
              <span className="text-faint">{labels.tag}</span>{" "}
              {/* Mientras no hay reloj todavía, un espacio del mismo ancho:
                  sin esto la barra da un salto en cuanto hidrata. */}
              <span className="tabular-nums text-bone" suppressHydrationWarning>
                {q ? `${q.d}${u.d} ${q.h}${u.h} ${String(q.m).padStart(2, "0")}${u.m} ${String(q.s).padStart(2, "0")}${u.s}` : "—"}
              </span>
            </>
          )}
        </p>

        <a href={labels.cta ? "#empezar" : "#"} className="flex-none text-[12px] font-bold uppercase tracking-[0.1em] text-blood hover:text-bone">
          {labels.cta} →
        </a>
      </div>
    </div>
  );
}
