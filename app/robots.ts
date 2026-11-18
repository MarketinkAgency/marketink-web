import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * En producción, todo abierto (las auditorías y los reportes de
 * clientes se protegen con `noindex` en su propia página, no aquí:
 * un Disallow en robots impediría que Google leyera precisamente la
 * etiqueta que le dice que no indexe).
 *
 * En las previsualizaciones de Vercel (*.vercel.app) se cierra todo:
 * sirven el mismo HTML que el dominio real y, si se indexan, compiten
 * con él como contenido duplicado.
 */
export default function robots(): MetadataRoute.Robots {
  const preview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";
  if (preview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
