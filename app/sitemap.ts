import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/copy";
import { LEGAL_SLUGS } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/blog";

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

  /* La página de webs es un producto con búsqueda propia —«web para
     tatuadores con agenda»— así que va en el mapa con prioridad alta,
     justo por debajo de la portada. */
  const productos = LOCALES.map((l) => ({
    url: `${SITE_URL}/${l}/webs`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: alt("/webs"),
  }));

  const legal = LOCALES.flatMap((l) =>
    LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${l}/legal/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: alt(`/legal/${slug}`),
    }))
  );

  /* El blog: el índice y cada artículo, con la fecha real de su último
     cambio. `lastModified` es lo que le dice a Google qué volver a leer
     sin tener que rastrear todo cada vez. */
  const ultima = POSTS.reduce((m, p) => ((p.updated ?? p.date) > m ? (p.updated ?? p.date) : m), "2026-01-01");
  const blogIndex = LOCALES.map((l) => ({
    url: `${SITE_URL}/${l}/blog`,
    lastModified: new Date(ultima + "T12:00:00Z"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: alt("/blog"),
  }));
  const posts = LOCALES.flatMap((l) =>
    POSTS.map((p) => ({
      url: `${SITE_URL}/${l}/blog/${p[l].slug}`,
      lastModified: new Date((p.updated ?? p.date) + "T12:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((x) => [x, `${SITE_URL}/${x}/blog/${p[x].slug}`])),
      },
    }))
  );

  return [...home, ...productos, ...blogIndex, ...posts, ...legal];
}
