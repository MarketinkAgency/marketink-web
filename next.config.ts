import type { NextConfig } from "next";

/**
 * CABECERAS DE SEGURIDAD
 *
 * Este sitio es HTML estático servido desde una CDN: no hay base de
 * datos, ni sesiones, ni formularios que escriban en ningún sitio. La
 * superficie de ataque real es pequeña. Estas cabeceras cierran lo que
 * queda: que alguien meta la web dentro de un iframe para engañar a un
 * visitante, que un script ajeno se cuele, o que el navegador filtre
 * hacia dónde navega la gente.
 *
 * Terceros permitidos, y solo estos:
 *   · Calendly — el calendario incrustado
 *   · Google Fonts — por si algún estilo pide la fuente remota
 *   · Vercel — la infraestructura
 *
 * Si algún día añades Meta Pixel o Google Analytics, hay que sumarlos
 * a `script-src`, `connect-src` e `img-src` o el navegador los bloquea
 * y te quedas sin medición sin entender por qué.
 */
const csp = [
  "default-src 'self'",
  // Calendly inyecta su widget. 'unsafe-inline' hace falta para los
  // estilos y scripts que Next escribe en línea al hidratar.
  // Medición: los dominios ya están permitidos para que el día que
  // enciendas el píxel funcione sin tocar nada. Mientras las variables
  // no existan, no se carga ningún script de estos.
  "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://assets.calendly.com https://*.calendly.com https://www.facebook.com https://*.google-analytics.com https://www.googletagmanager.com",
  // GA4 manda los datos a www.google-analytics.com o a un subdominio regional
  // (region1.google-analytics.com para visitantes en la UE): por eso el comodín.
  "connect-src 'self' https://calendly.com https://*.calendly.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://connect.facebook.net",
  "frame-src https://calendly.com https://*.calendly.com https://www.facebook.com",
  // Nadie puede meter este sitio dentro de un iframe.
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Fuerza HTTPS durante dos años, subdominios incluidos.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Refuerzo de frame-ancestors para navegadores viejos.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No pedimos cámara, micrófono ni ubicación. Que ni se puedan pedir.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/**
 * ENLACES LEGALES VIEJOS
 *
 * Las políticas vivían en Shopify bajo /policies/*, y Meta y Google
 * siguen teniendo esas URLs registradas (apps, formularios, anuncios).
 * Sin esto daban error. 308 = permanente: los buscadores y las
 * plataformas actualizan el enlace guardado.
 *
 * Las redirecciones de next.config se evalúan antes que proxy.ts, así
 * que no pasan por la detección de idioma. El apex (sin www) ya redirige
 * a www desde Vercel, así que esto cubre los dos.
 */
const legacyPolicies = [
  { source: "/policies/privacy-policy", destination: "/en/legal/privacidad" },
  { source: "/policies/terms-of-service", destination: "/en/legal/terminos" },
  { source: "/policies/refund-policy", destination: "/en/legal/reembolsos" },
];

const nextConfig: NextConfig = {
  // No revelamos qué framework hay detrás.
  poweredByHeader: false,
  headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  redirects() {
    return legacyPolicies.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
