import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];

/* Spanish-speaking countries (ISO 3166-1 alpha-2). Everyone else gets English. */
const SPANISH_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ", "GT",
  "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

/**
 * Language is decided by the visitor's country (Vercel sets x-vercel-ip-country).
 * With no country (local dev, some bots) it falls back to the browser language.
 * An explicit /es or /en URL always wins, so links and the EN/ES switch keep working.
 */
function pickLocale(request: NextRequest): Locale {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country) return SPANISH_COUNTRIES.has(country) ? "es" : "en";

  const header = request.headers.get("accept-language") ?? "";
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("es") ? "es" : "en";
}

/**
 * Páginas con fecha de caducidad. A partir de la fecha, la ruta (y sus
 * archivos) responde 404 aunque el deploy siga teniéndolos. Así no hace
 * falta publicar nada el día que vencen; los archivos se borran después.
 */
const EXPIRAN: { prefijos: string[]; hasta: string }[] = [
  /* Sesión de cierre de Andy: se apaga el lunes 30-11-2026, 00:00 de Bogotá. */
  { prefijos: ["/es/presentaciones/andy-instagram", "/recursos/andy/"], hasta: "2026-11-30T00:00:00-05:00" },
  /* Auditoría de Kalm: caduca entera el 1-12-2026 a las 23:59 de Chicago. */
  { prefijos: ["/en/audit/kalm-tattoos", "/audit/kalm/"], hasta: "2026-12-01T23:59:00-06:00" },
];

function caducada(pathname: string) {
  const ahora = Date.now();
  return EXPIRAN.some((e) => ahora >= new Date(e.hasta).getTime() && e.prefijos.some((p) => pathname.startsWith(p)));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (caducada(pathname)) {
    const lang = pathname.match(/^\/(es|en)\//)?.[1];
    if (lang) {
      /* Una ruta que no existe: Next pinta su 404. */
      request.nextUrl.pathname = `/${lang}/caducada`;
      return NextResponse.rewrite(request.nextUrl, { status: 404 });
    }
    return new NextResponse(null, { status: 404 });
  }
  /* Los archivos (imágenes, zip…) pasan por aquí solo para poder caducar: nunca se redirigen. */
  if (/\.[a-z0-9]+$/i.test(pathname)) return;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const locale = pickLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)", "/recursos/:path*", "/audit/:path*"],
};
