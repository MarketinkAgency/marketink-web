"use client";

import { useEffect, useState } from "react";
import { freeSpots } from "@/lib/capacity";

/**
 * Los cupos del mes, en una sola píldora para la cabecera de la auditoría.
 *
 * Mismo recuento que la portada y que el cierre (lib/capacity.ts), y por
 * la misma razón es de cliente: la página se prerenderiza al desplegar y
 * un número calculado en el servidor seguiría contando el mes pasado.
 *
 * Si no queda ninguno no se pinta nada: una píldora de «0 cupos» en la
 * primera pantalla es una puerta cerrada antes de empezar a leer.
 */
export default function CuposChip({ label, label1 }: { label: string; label1: string }) {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    setN(freeSpots());
  }, []);

  if (n === null || n <= 0) return null;

  return (
    <li className="flex items-center gap-2 rounded-full bg-blood px-4 py-2 text-white">
      <i className="dot-live size-1.5 rounded-full bg-white" aria-hidden />
      <b className="tabular-nums">{n}</b> {n === 1 ? label1 : label}
    </li>
  );
}
