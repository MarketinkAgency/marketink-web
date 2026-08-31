"use client";

import { useEffect, useState } from "react";
import { freeSpots } from "@/lib/capacity";

/**
 * LOS CUPOS, EN LA AUDITORÍA
 *
 * Mismo número que la portada, para que quien vea las dos páginas no
 * lea dos cifras distintas.
 *
 * Es un componente de cliente por la misma razón que el reloj: la
 * auditoría se prerenderiza al desplegar, así que un recuento calculado
 * en el servidor se quedaría congelado en la fecha del despliegue y
 * seguiría contando los cupos de agosto en octubre. Aquí se calcula
 * contra el mes de quien mira.
 *
 * Si no queda ninguno, no se pinta nada: un «0 cupos» junto al botón de
 * empezar es una puerta cerrada al lado de una invitación.
 */
export default function CuposAudit({
  uno,
  varios,
  nota,
}: {
  uno: string;
  varios: string;
  nota: string;
}) {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    setN(freeSpots());
  }, []);

  if (n === null || n <= 0) return null;

  return (
    <div className="mt-12 border-l-2 border-blood pl-6">
      <p className="flex flex-wrap items-baseline gap-x-3">
        <b className="flash-type text-[clamp(28px,3.6vw,40px)] text-blood">{n}</b>
        <span className="text-[15px] uppercase tracking-[0.1em] text-bone">{n === 1 ? uno : varios}</span>
      </p>
      <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-faint">{nota}</p>
    </div>
  );
}
