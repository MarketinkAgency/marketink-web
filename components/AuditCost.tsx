"use client";

import { useState } from "react";
import type { Lang } from "@/lib/copy";

/**
 * Lo que cuesta la fuga — con SUS números, no con los nuestros.
 *
 * Es la misma decisión que la calculadora de la portada y por el mismo
 * motivo: no proyectamos lo que MarketINK conseguiría, multiplicamos lo
 * que él ya tiene. Así se puede ser contundente sin afirmar nada que no
 * podamos sostener, y de paso el artista llega a la llamada habiendo
 * hecho la cuenta él mismo, que convence más que cualquier cifra que le
 * pongamos delante.
 *
 * DOS COSAS QUE ESTABAN MAL Y POR QUÉ IMPORTAN
 *
 * 1. El resultado era `ticket × 2`: solo dependía del precio de la
 *    pieza. Se podía mover «consultas que recibes» de 5 a 60 y la cifra
 *    grande no se movía ni un peso. Una calculadora donde dos de los
 *    tres mandos no hacen nada no se lee como conservadora: se lee como
 *    rota, y quien la toca deja de creerse el resto de la página.
 *    Ahora la cuenta parte de las conversaciones que él mismo declara
 *    perdidas, así que los tres deslizadores mueven el número.
 *
 * 2. Las cifras eran dólares para todo el mundo. A una tatuadora de
 *    Bogotá, «$700 por pieza» no le dice nada — o peor, le dice que
 *    esto no está escrito para ella. La moneda viene en el dato de cada
 *    auditoría, con sus propios topes: no tiene sentido que un
 *    deslizador en pesos se mueva de 25 en 25.
 *
 * La proporción que se recupera —1 de cada 20— va escrita en la propia
 * frase y no escondida en el código. Es deliberadamente pequeña: si la
 * cuenta ya es grande con el supuesto más modesto, no hace falta
 * inflarla, y el que la lee puede comprobarla con la calculadora del
 * teléfono. Eso es lo que la separa de una promesa.
 */

type Moneda = "COP" | "USD";

/* Un deslizador en pesos y uno en dólares no pueden compartir escala:
   moverse de 25 en 25 entre 100 y 2.000 tiene sentido en dólares y
   ninguno en pesos, donde el paso útil son decenas de miles. */
const ESCALAS: Record<Moneda, { min: number; max: number; step: number; inicial: number }> = {
  USD: { min: 100, max: 2000, step: 25, inicial: 350 },
  COP: { min: 150_000, max: 4_000_000, step: 50_000, inicial: 600_000 },
};

/** Semanas por mes. 52/12, no 4: usar 4 se come casi un mes al año. */
const SEMANAS_MES = 52 / 12;

export default function AuditCost({
  lang,
  moneda = "USD",
  labels,
}: {
  lang: Lang;
  moneda?: Moneda;
  labels: { a: string; b: string; c: string; out: string; month: string; one: string; note: string; zero: string };
}) {
  const escala = ESCALAS[moneda];
  const [ticket, setTicket] = useState(escala.inicial);
  const [dms, setDms] = useState(12);
  const [books, setBooks] = useState(2);

  const es = lang === "es";

  /* En pesos se redondea a la decena de millar: «$2.166.667 al mes» tiene
     una precisión que la cuenta no tiene, y esa falsa exactitud es justo
     lo que hace sospechar de una cifra estimada. */
  const fmt = (n: number) => {
    const v = moneda === "COP" ? Math.round(n / 10_000) * 10_000 : Math.round(n);
    return "$" + v.toLocaleString(moneda === "COP" || es ? "es-CO" : "en-US", { maximumFractionDigits: 0 });
  };

  /* Agendar más de las que te escriben no existe. El deslizador de
     abajo tiene por tope el de arriba, pero el tope solo actúa cuando lo
     arrastras: si primero pones 14 agendadas y luego bajas las consultas
     a 5, el estado se queda en 14 y la cuenta daba cero — la calculadora
     entera se apagaba de golpe. Se recorta aquí, en el cálculo. */
  const agendadas = Math.min(books, dms);

  /* Las que ya le escriben y no terminan en camilla. Sale de sus dos
     deslizadores, no de un supuesto nuestro. */
  const perdidasSemana = Math.max(0, dms - agendadas);
  const perdidasMes = perdidasSemana * SEMANAS_MES;

  /* Lo que ya le están pidiendo y no se convierte. Es multiplicación
     pura de sus tres cifras: nada aquí es un supuesto nuestro, y por eso
     se puede comprobar con la calculadora del teléfono. */
  const valorPerdido = perdidasMes * ticket;

  /* Y el aterrizaje: una sola cita más por semana. Es la unidad más
     pequeña que se puede pedir, sale del mismo sitio, y convierte una
     cifra enorme en algo que se ve alcanzable. */
  const unaMas = SEMANAS_MES * ticket;

  const barra = (
    v: number, min: number, max: number, set: (n: number) => void,
    label: string, out: string, step = 1,
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
        {barra(ticket, escala.min, escala.max, setTicket, labels.a, fmt(ticket), escala.step)}
        {/* Al bajar las consultas, las agendadas bajan con ellas: si no,
            quedaban 14 agendadas de 5 consultas, que no existe. */}
        {barra(dms, 1, 80, (n) => { setDms(n); if (books > n) setBooks(n); }, labels.b, String(dms))}
        {/* El techo de «cuántas agendan» es cuántas llegan: agendar más
            de las que te escriben no existe, y dejarlo suelto permitía
            llegar a un estado imposible. */}
        {barra(agendadas, 0, Math.max(1, dms), setBooks, labels.c, String(agendadas))}
        <p className="text-[12.5px] leading-relaxed text-faint">{labels.note}</p>
      </div>

      <div className="flex flex-col justify-center gap-6 rounded-[22px] p-8 ring-1 ring-white/[0.09] sm:p-10">
        {/* En meses, no en semanas: el resultado es mensual, y saltar de
            una unidad a otra en mitad de la cuenta es justo lo que hace
            que no se entienda de dónde sale la cifra. */}
        {perdidasSemana > 0 && (
          <p className="text-[14px] leading-relaxed text-muted">
            <b className="tabular-nums text-bone">{Math.round(perdidasMes)}</b>{" "}
            {es
              ? "conversaciones al mes que no terminan en una cita."
              : "conversations a month that don't end in a chair."}
          </p>
        )}

        {/* Si agenda todas las que le escriben no hay fuga, y la cuenta
            da cero. Es correcto, pero un «$0» gigante y solo se lee como
            que la calculadora se rompió. Se dice con palabras. */}
        {perdidasSemana === 0 ? (
          <p className="max-w-[34ch] text-[15px] leading-[1.7] text-muted">{labels.zero}</p>
        ) : (
          <>
            <div>
              <p className="mb-2 max-w-[34ch] text-[13px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                {labels.out}
              </p>
              <p className="flash-type text-[clamp(40px,7.4vw,78px)] text-blood">{fmt(valorPerdido)}</p>
              <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-faint">{labels.month}</p>
            </div>

            {/* El aterrizaje. Sin esto la cifra de arriba es tan grande
                que se lee como exageración; con esto se convierte en una
                tarea concreta: de esas, cerrar una. */}
            <p className="border-t border-white/[0.09] pt-6 text-[14px] leading-[1.7] text-muted">
              {labels.one}{" "}
              <b className="whitespace-nowrap text-bone">+{fmt(unaMas)}</b>{" "}
              {es ? "al mes." : "a month."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
