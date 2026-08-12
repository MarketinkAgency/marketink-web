/**
 * EL ENLACE DE PAGO
 *
 * Sale de una variable de entorno y no del código por la misma razón que
 * los cupos: se cambia desde el panel de Vercel en cuarenta segundos, sin
 * tocar un archivo ni esperar a nadie. Y si un día hay que apagarlo —una
 * subida de precio, un plan que se retira— se borra la variable y el
 * botón desaparece solo de todas las auditorías a la vez.
 *
 * Panel de Vercel → el proyecto → Settings → Environment Variables:
 *
 *   NEXT_PUBLIC_PLAN_URL = https://buy.stripe.com/xxxxxxxx
 *
 * Ese enlace se crea en Stripe: Product catalog → producto con precio
 * recurrente mensual → «Create payment link». Stripe aloja la página de
 * pago, cobra todos los meses, guarda la tarjeta y manda el recibo.
 *
 * Dos ajustes del enlace que no son opcionales:
 *
 *  · «After the payment» → redirigir a /{idioma}/welcome. Sin eso, el
 *    artista acaba en una pantalla gris de Stripe que no dice qué pasa
 *    ahora, y el primer minuto después de pagar es justo donde se decide
 *    si se siente bien o se siente estafado.
 *
 *  · Activar el portal del cliente. Si alguien quiere cancelar y no
 *    encuentra cómo, escribe a la tarjeta en vez de a nosotros, y una
 *    disputa cuesta más que el mes que se quería ahorrar.
 *
 * Si la variable está vacía, la auditoría solo ofrece la llamada. Es
 * mejor un camino que un botón roto.
 */

const raw = process.env.NEXT_PUBLIC_PLAN_URL?.trim();

export const plan = {
  /** El enlace de pago, o cadena vacía si todavía no existe. */
  url: raw && /^https:\/\//.test(raw) ? raw : "",
};
