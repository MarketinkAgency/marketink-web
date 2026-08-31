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

/* Los valores de hoy, 30 de agosto de 2026: cinco al mes, cuatro
   cerrados. Van aquí y no solo en Vercel para que el número por defecto
   sea el cierto y no uno inventado — un valor de relleno optimista es
   exactamente la mentira que este archivo intenta evitar. La variable de
   entorno sigue mandando por encima.

   `mes` es a qué mes pertenece ese recuento, y existe por una razón muy
   concreta: sin él, el 1 de septiembre la web seguiría diciendo «queda 1
   cupo» con los cuatro de agosto todavía contados. Nadie se acuerda de
   poner el contador a cero el primer día del mes, y una escasez que no
   se actualiza es peor que no tener contador. Cuando el mes del visitante
   no es el del recuento, la capacidad vuelve a estar entera — que es lo
   cierto: el mes nuevo empieza vacío.

   NEXT_PUBLIC_SPOTS_MONTH = 2026-09  ← al cerrar el primero de septiembre
   NEXT_PUBLIC_SPOTS_TAKEN = 1 */
export const capacity = {
  perMonth: num(process.env.NEXT_PUBLIC_SPOTS_TOTAL, 5),
  taken: num(process.env.NEXT_PUBLIC_SPOTS_TAKEN, 4),
  mes: (process.env.NEXT_PUBLIC_SPOTS_MONTH ?? "2026-08").trim(),
};

/**
 * Cupos libres, nunca por debajo de 0 ni por encima del total.
 *
 * Se le pasa la fecha de quien mira para poder decidir si el recuento
 * sigue siendo del mes en curso. Los componentes la llaman dentro de un
 * `useEffect`, así que la fecha es la del navegador y no la del día en
 * que se compiló la página.
 */
export function freeSpots(ahora: Date = new Date()) {
  const mesAhora = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}`;
  const ocupados = capacity.mes && capacity.mes !== mesAhora ? 0 : capacity.taken;
  return Math.min(capacity.perMonth, Math.max(0, capacity.perMonth - ocupados));
}
