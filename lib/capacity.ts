/**
 * CUPOS DEL MES — lo único que tienes que mantener a mano.
 *
 * La urgencia solo funciona si es verdad. Un contador que se inventa
 * los cupos y se reinicia solo es una mentira que un tatuador detecta
 * en dos visitas, y encima te expone: si publicas «quedan 2 cupos» y
 * aceptas al décimo cliente, eso es publicidad engañosa.
 *
 * Por eso el número sale de aquí, y lo pones tú:
 *
 *   1. `perMonth` es cuántos clientes nuevos puedes atender bien al mes.
 *      No lo subas por vender más de la cuenta.
 *   2. `taken` es cuántos ya cerraste este mes. Lo actualizas cuando
 *      firmas a alguien. Es literalmente cambiar un número y desplegar.
 *
 * Si un mes no aparece en `taken`, se asume 0 cupos ocupados: el mes
 * arranca lleno de disponibilidad, que es lo cierto.
 *
 * La cuenta atrás de días del mes, en cambio, siempre es verdad y no
 * necesita mantenimiento. Esa es la urgencia que trabaja gratis.
 */
export const capacity = {
  /** Clientes nuevos que aceptas al mes. */
  perMonth: 6,

  /** Clientes ya cerrados por mes, en formato AAAA-MM. */
  taken: {
    "2026-08": 2,
  } as Record<string, number>,
};

/** Cupos libres del mes indicado, nunca por debajo de 0. */
export function freeSpots(year: number, month: number) {
  const key = `${year}-${String(month + 1).padStart(2, "0")}`;
  const used = capacity.taken[key] ?? 0;
  return Math.max(0, capacity.perMonth - used);
}
