import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, LOCALES } from "@/lib/copy";
import { SITE_URL } from "@/lib/site";
import { POSTS, blogUi, byKey, findPost, readingMinutes } from "@/lib/blog";
import { AUTHORS } from "@/lib/authors";
import BlogShell, { AuditCta, AuthorCard } from "@/components/BlogShell";
import Prose, { headings } from "@/components/Prose";

/**
 * UN ARTÍCULO
 *
 * Una plantilla, todos los artículos. Lo que cambia vive en lib/blog/.
 *
 * Lo que esta página le da a Google que la portada no puede darle:
 *  · una URL por pregunta, con su título y su descripción;
 *  · hreflang entre la versión en español y la inglesa (son el mismo
 *    artículo, no dos que compiten);
 *  · BlogPosting con autor real, fechas y editor, y BreadcrumbList;
 *  · enlaces internos hacia /webs, la portada y los demás artículos.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => POSTS.map((p) => ({ lang, slug: p[lang].slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const post = findPost(lang, slug);
  if (!post) return {};
  const t = post[lang];
  const url = `${SITE_URL}/${lang}/blog/${t.slug}`;
  const title = t.seoTitle ?? `${t.title} | MarketINK`;
  return {
    title,
    description: t.desc,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/blog/${post.es.slug}`,
        en: `${SITE_URL}/en/blog/${post.en.slug}`,
        "x-default": `${SITE_URL}/en/blog/${post.en.slug}`,
      },
    },
    openGraph: {
      title,
      description: t.desc,
      url,
      siteName: "MarketINK",
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [AUTHORS[post.author].name],
    },
    twitter: { card: "summary_large_image", title, description: t.desc },
    robots: { index: true, follow: true },
  };
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const post = findPost(lang, slug);
  if (!post) notFound();

  const t = post[lang];
  const u = blogUi[lang];
  const a = AUTHORS[post.author];
  const url = `${SITE_URL}/${lang}/blog/${t.slug}`;
  const fmt = (iso: string) =>
    new Date(iso + "T12:00:00Z").toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const toc = headings(t.body);
  const related = post.related.map(byKey).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: t.title,
        description: t.desc,
        url,
        mainEntityOfPage: url,
        inLanguage: lang,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        image: `${url}/opengraph-image`,
        author: {
          "@type": "Person",
          name: a.name,
          jobTitle: a.role[lang],
          image: `${SITE_URL}${a.img}`,
          sameAs: a.sameAs,
          worksFor: { "@id": `${SITE_URL}/#org` },
        },
        publisher: { "@id": `${SITE_URL}/#org` },
        isPartOf: { "@id": `${SITE_URL}/${lang}/blog#blog` },
        keywords: t.keywords.join(", "),
        about: { "@type": "Thing", name: lang === "es" ? "Marketing para tatuadores" : "Tattoo marketing" },
        audience: { "@type": "Audience", audienceType: lang === "es" ? "Tatuadores y estudios de tatuajes" : "Tattoo artists and studios" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: u.breadcrumbHome, item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: u.title, item: `${SITE_URL}/${lang}/blog` },
          { "@type": "ListItem", position: 3, name: t.title, item: url },
        ],
      },
    ],
  };

  return (
    <BlogShell lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <article>
        <header className="wrap pt-36 pb-14 sm:pt-44 sm:pb-16">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-faint">
            <Link href={`/${lang}`} className="transition hover:text-bone">{u.breadcrumbHome}</Link>
            <span aria-hidden>/</span>
            <Link href={`/${lang}/blog`} className="transition hover:text-bone">{u.title}</Link>
          </nav>
          <h1 className="flash-type max-w-[20ch] text-[clamp(36px,6vw,80px)] leading-[1.03]">{t.title}</h1>
          <p className="mt-7 max-w-[64ch] text-[18px] leading-relaxed text-muted">{t.desc}</p>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.14em] text-faint">
            <span>
              {u.by} <b className="text-bone">{a.name}</b>
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{fmt(post.date)}</time>
            {post.updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {u.updated} <time dateTime={post.updated}>{fmt(post.updated)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{readingMinutes(t.body)} {u.read}</span>
          </p>
        </header>

        <div className="wrap grid gap-14 pb-24 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
          <div className="min-w-0">
            <Prose md={t.body} cta={<AuditCta lang={lang} />} copyLabel={lang === "es" ? "Copia esto" : "Copy this"} />

            <div className="mt-16">
              <AuditCta lang={lang} end />
            </div>

            <div className="mt-14">
              <AuthorCard lang={lang} author={post.author} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              {toc.length > 2 && (
                <nav aria-label={lang === "es" ? "Contenido" : "Contents"}>
                  <p className="flash-sub mb-4 text-[10.5px] tracking-[0.16em] text-faint">{lang === "es" ? "En este artículo" : "In this article"}</p>
                  <ol className="space-y-2.5 border-l border-white/[0.1]">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13.5px] leading-snug text-muted transition hover:border-blood hover:text-bone">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="wrap pb-24">
            <p className="sec-tag mb-7">
              <b>→</b>
              <i aria-hidden />
              <span>{u.also}</span>
            </p>
            <ul className="grid gap-px bg-white/[0.08] md:grid-cols-3">
              {related.map((r) => (
                <li key={r.key} className="bg-void">
                  <Link href={`/${lang}/blog/${r[lang].slug}`} className="group block h-full px-7 py-8 transition hover:bg-panel">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{readingMinutes(r[lang].body)} {u.read}</p>
                    <h3 className="flash-type mt-3 text-[clamp(20px,2vw,26px)] leading-[1.08] text-bone">{r[lang].title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">{r[lang].excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href={`/${lang}/blog`} className="text-[13.5px] text-muted underline underline-offset-4 transition hover:text-bone">
                {u.all} →
              </Link>
            </p>
          </section>
        )}
      </article>
    </BlogShell>
  );
}
