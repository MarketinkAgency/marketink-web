/**
 * CUPOS DEL MES — se cambian desde Vercel, sin tocar código.
 *
 * Panel de Vercel → tu proyecto → Settings → Environment Variables:
 *
 *   NEXT_PUBLIC_SPOTS_TOTAL = 6    ← cuántos clientes nuevos aceptas al mes
 *   NEXT_PUBLIC_SPOTS_TAKEN = 2    ← cuántos ya cerraste este mes
 *
 * Cambias el valor, le das a «Redeploy» y en 40 segundos está en línea.
 *
 * Por qué el número lo pones tú y no se inventa solo: si publicas
 * «quedan 2 cupos» y aceptas al décimo, eso es publicidad engañosa, y
 * vendes desde una LLC estadounidense a clientes en la UE. Además, un
 * tatuador que vuelve dos veces y ve siempre el mismo número sabe que
 * es decorado, y ahí pierdes justo la credibilidad que construye el
 * resto de la página.
 *
 * La cuenta atrás de días del mes sí es automática y siempre cierta.
 * Esa es la urgencia que trabaja gratis.
 */

function num(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export const capacity = {
  perMonth: num(process.env.NEXT_PUBLIC_SPOTS_TOTAL, 6),
  taken: num(process.env.NEXT_PUBLIC_SPOTS_TAKEN, 0),
};

/** Cupos libres, nunca por debajo de 0 ni por encima del total. */
export function freeSpots() {
  return Math.min(capacity.perMonth, Math.max(0, capacity.perMonth - capacity.taken));
}
