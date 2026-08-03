import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/copy";
import { LEGAL_SLUGS } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

/**
 * Mapa del sitio con alternancia de idioma.
 *
 * Cada URL declara su equivalente en el otro idioma. Sin esto, Google
 * trata /es y /en como páginas que compiten entre sí en vez de como
 * dos versiones de la misma.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (path: string) => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  });

  const home = LOCALES.map((l) => ({
    url: `${SITE_URL}/${l}`,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: alt(""),
  }));

  const legal = LOCALES.flatMap((l) =>
    LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${l}/legal/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: alt(`/legal/${slug}`),
    }))
  );

  return [...home, ...legal];
}
