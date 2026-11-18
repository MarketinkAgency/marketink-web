import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLang, LOCALES } from "@/lib/copy";
import { SITE_URL } from "@/lib/site";
import { blogUi, postsFor, readingMinutes } from "@/lib/blog";
import { AUTHORS } from "@/lib/authors";
import BlogShell, { AuditCta } from "@/components/BlogShell";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = isLang(lang) ? lang : "en";
  const u = blogUi[l];
  const url = `${SITE_URL}/${l}/blog`;
  return {
    title: u.metaTitle,
    description: u.metaDesc,
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es/blog`, en: `${SITE_URL}/en/blog`, "x-default": `${SITE_URL}/en/blog` },
    },
    openGraph: {
      title: u.metaTitle,
      description: u.metaDesc,
      url,
      siteName: "MarketINK",
      locale: l === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [`${SITE_URL}/${l}/opengraph-image`],
    },
    twitter: { card: "summary_large_image", title: u.metaTitle, description: u.metaDesc },
    robots: { index: true, follow: true },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const u = blogUi[lang];
  const posts = postsFor(lang);
  const fmt = (iso: string) =>
    new Date(iso + "T12:00:00Z").toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/${lang}/blog#blog`,
    url: `${SITE_URL}/${lang}/blog`,
    name: u.metaTitle,
    description: u.metaDesc,
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#org` },
    blogPost: posts.map(({ post, t }) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/${lang}/blog/${t.slug}#article`,
      headline: t.title,
      url: `${SITE_URL}/${lang}/blog/${t.slug}`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: AUTHORS[post.author].name },
    })),
  };

  return (
    <BlogShell lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <header className="wrap pt-36 pb-16 sm:pt-44 sm:pb-20">
        <p className="sec-tag mb-7">
          <b>{u.title}</b>
          <i aria-hidden />
          <span>MarketINK</span>
        </p>
        <h1 className="flash-type max-w-[16ch] text-[clamp(40px,7vw,96px)] leading-[1.02]">{u.h1}</h1>
        <p className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-muted">{u.sub}</p>
      </header>

      <section className="wrap pb-24">
        <ol className="grid gap-px bg-white/[0.08] md:grid-cols-2">
          {posts.map(({ post, t }, i) => {
            const a = AUTHORS[post.author];
            return (
              <li key={post.key} className={`bg-void ${i === 0 ? "md:col-span-2" : ""}`}>
                <Link href={`/${lang}/blog/${t.slug}`} className="group block h-full px-7 py-10 transition hover:bg-panel sm:px-10 sm:py-12">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-faint">
                    <span>{fmt(post.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{readingMinutes(t.body)} {u.read}</span>
                  </p>
                  <h2 className={`flash-type mt-5 text-bone ${i === 0 ? "max-w-[22ch] text-[clamp(30px,4.6vw,60px)]" : "max-w-[24ch] text-[clamp(24px,2.6vw,34px)]"} leading-[1.05]`}>
                    {t.title}
                  </h2>
                  <p className="mt-5 max-w-[64ch] text-[15.5px] leading-relaxed text-muted">{t.excerpt}</p>
                  <p className="mt-7 flex items-center gap-3 text-[13px] text-muted">
                    <Image src={a.img} alt="" width={28} height={28} className="size-7 object-cover grayscale" />
                    <span>
                      {u.by} <b className="font-semibold text-bone">{a.name}</b> · {a.role[lang]}
                    </span>
                    <span className="ml-auto flash-type text-[18px] text-blood transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="mt-20">
          <AuditCta lang={lang} end />
        </div>
      </section>
    </BlogShell>
  );
}
