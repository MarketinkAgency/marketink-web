import type { Lang } from "@/lib/copy";
import type { AuthorKey } from "@/lib/authors";

/**
 * EL BLOG
 *
 * Existe por una razón concreta: Google posiciona páginas, no marcas.
 * La portada está escrita para convertir al que ya llegó; estas páginas
 * están escritas para que llegue. Cada una responde a una búsqueda real
 * de un tatuador —«cómo cobrar el depósito», «how much for a tattoo» en
 * el DM, «marketing para tatuadores»— desde nuestro ángulo, que es el
 * único que nadie más tiene: lo que pasa entre el mensaje y el depósito.
 *
 * Reglas, y son las mismas que en el resto del sitio:
 *
 *  · Un artículo son dos páginas: /es/blog/<slug-es> y /en/blog/<slug-en>,
 *    con hreflang entre ellas. Nunca se publica en un idioma solo.
 *  · Cero cifras inventadas. Si un dato no es nuestro y comprobable, no
 *    entra. Un artículo puede ser contundente sin estadísticas.
 *  · Cada artículo termina en la auditoría gratis. Es el único CTA.
 *  · El cuerpo es Markdown reducido (ver components/Prose.tsx). Lo que no
 *    está soportado ahí no se usa.
 *  · Firmado por una persona (lib/authors.ts).
 */

export type PostLang = {
  slug: string;
  title: string;
  /** Para <title>. Si falta, se usa title + " | MarketINK". */
  seoTitle?: string;
  desc: string;
  /** Lo que aparece en el índice del blog. */
  excerpt: string;
  /** Markdown reducido. */
  body: string;
  /** Palabras clave a las que apunta, para no duplicar temas. */
  keywords: string[];
};

export type Post = {
  key: string;
  author: AuthorKey;
  /** ISO. La fecha de publicación. */
  date: string;
  /** ISO. Cuándo se tocó por última vez; la lee el sitemap. */
  updated?: string;
  /** Claves de otros artículos para «lee también». */
  related: string[];
  es: PostLang;
  en: PostLang;
};

import { marketingTatuadores } from "./posts/marketing-tatuadores";
import { masClientes } from "./posts/mas-clientes";
import { deposito } from "./posts/deposito";
import { cotizarInstagram } from "./posts/cotizar-instagram";
import { publicidad } from "./posts/publicidad";

/* Orden de publicación: el más nuevo primero. */
export const POSTS: Post[] = [publicidad, cotizarInstagram, deposito, masClientes, marketingTatuadores];

export const byKey = (key: string) => POSTS.find((p) => p.key === key);

export function postsFor(lang: Lang) {
  return POSTS.map((p) => ({ post: p, t: p[lang] })).sort((a, b) => (a.post.date === b.post.date ? 0 : a.post.date < b.post.date ? 1 : -1));
}

export function findPost(lang: Lang, slug: string) {
  return POSTS.find((p) => p[lang].slug === slug);
}

/** Minutos de lectura a 220 palabras por minuto, redondeados hacia arriba. */
export function readingMinutes(md: string) {
  const words = md.replace(/[#>*`\-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

export const blogUi = {
  es: {
    title: "Blog",
    h1: "Lo que pasa entre el mensaje y el depósito.",
    sub: "Guías para tatuadores y estudios: cómo cobrar el depósito, cómo cotizar por Instagram sin perder al cliente, cómo hacer publicidad que trae citas y no solo likes. Sin cifras inventadas y con los textos listos para copiar.",
    metaTitle: "Blog de marketing para tatuadores | MarketINK",
    metaDesc: "Guías prácticas de marketing para tatuadores y estudios: depósitos, cotizaciones por Instagram, anuncios, agenda y cómo convertir mensajes en citas.",
    by: "Por",
    read: "min de lectura",
    updated: "Actualizado",
    published: "Publicado",
    also: "Lee también",
    all: "Todos los artículos",
    ctaTag: "Antes de que sigas leyendo",
    ctaTitle: "Te decimos dónde se te están perdiendo las consultas. Gratis.",
    ctaBody: "Quince minutos. Revisamos tu perfil, tus DM y tu proceso de reserva como lo ve un cliente nuevo, y te señalamos los puntos exactos por donde se escapan las citas. Si no vemos una oportunidad clara, te lo decimos en la misma llamada.",
    ctaBtn: "Pedir la auditoría gratis",
    endTag: "Lo siguiente",
    endTitle: "Esto se arregla en una semana, no en un año.",
    endBody: "Todo lo que leíste se puede montar: precio visible, depósito, respuesta en minutos, seguimiento. Pide la auditoría y te mostramos por dónde empezar en tu caso.",
    authorTag: "Quién escribe",
    breadcrumbHome: "Inicio",
    back: "Volver al blog",
    homeTeaserTag: "Del blog",
    homeTeaserTitle: "Guías para tatuadores que quieren agenda, no likes.",
    homeTeaserCta: "Ver todos los artículos",
  },
  en: {
    title: "Blog",
    h1: "What happens between the DM and the deposit.",
    sub: "Guides for tattoo artists and studios: how to charge a deposit, how to answer \"how much?\" without losing the client, how to run ads that bring bookings and not just likes. No made-up numbers, and the scripts ready to copy.",
    metaTitle: "Tattoo marketing blog for artists and studios | MarketINK",
    metaDesc: "Practical tattoo marketing guides: deposits, pricing inquiries in your DMs, Instagram and Facebook ads, booking systems and how to turn messages into appointments.",
    by: "By",
    read: "min read",
    updated: "Updated",
    published: "Published",
    also: "Read next",
    all: "All articles",
    ctaTag: "Before you keep reading",
    ctaTitle: "We'll show you where your inquiries are getting lost. Free.",
    ctaBody: "Fifteen minutes. We go through your profile, your DMs and your booking flow the way a new client does, and point at the exact spots where bookings leak. If we don't see a clear opportunity, we'll tell you on the call.",
    ctaBtn: "Get the free audit",
    endTag: "What's next",
    endTitle: "This gets fixed in a week, not a year.",
    endBody: "Everything you just read can be installed: visible pricing, a deposit, replies in minutes, follow-up. Book the audit and we'll show you where to start in your case.",
    authorTag: "Who's writing",
    breadcrumbHome: "Home",
    back: "Back to the blog",
    homeTeaserTag: "From the blog",
    homeTeaserTitle: "Guides for artists who want a full calendar, not likes.",
    homeTeaserCta: "See all articles",
  },
} as const;
