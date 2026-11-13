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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const locale = pickLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
