import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, LOCALES, site } from "@/lib/copy";
import { inky, inkyLinks } from "@/lib/inky";
import { SITE_URL } from "@/lib/site";
import { entity, legalNav } from "@/lib/legal";
import Ink from "@/components/Ink";
import Glow from "@/components/Glow";
import Nav from "@/components/Nav";
import Split from "@/components/Split";
import Banda from "@/components/Banda";
import Count from "@/components/Count";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import Consent from "@/components/Consent";
import Rich from "@/components/Rich";
import InkyChat from "@/components/InkyChat";
import InkyHats from "@/components/InkyHats";
import "./inky.css";

/**
 * INKY — la landing del asistente de IA
 *
 * Página aparte (como /webs) porque es otro producto, con otro precio y
 * otra búsqueda: «asistente de IA para Instagram» no es «agencia para
 * tatuadores». El backend vive en inky.marketink.app; aquí solo se
 * presenta y se enlaza. El contenido está en lib/inky.ts.
 *
 * Ritmo de fondos (DESIGN.md): negro (hero) · hueso (cómo funciona) ·
 * negro (sombreros, caso) · rojo (banda) · hueso (precios) · negro.
 */

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = inky[isLang(lang) ? lang : "en"];
  const url = `${SITE_URL}/${lang}/inky`;
  return {
    title: t.meta.title,
    description: t.meta.desc,
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es/inky`, en: `${SITE_URL}/en/inky`, "x-default": `${SITE_URL}/en/inky` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.desc,
      url,
      siteName: "MarketINK",
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [`${SITE_URL}/${lang}/opengraph-image`],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.desc },
    robots: { index: true, follow: true },
  };
}

function Tag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="reveal sec-tag mb-7">
      <b>{n}</b>
      <i aria-hidden />
      <span>{children}</span>
    </p>
  );
}

const H2 = "misprint flash-type text-[clamp(2.4rem,6.4vw,6.6rem)]";

function SecHead({ n, tag, title, sub, light = false }: { n: string; tag: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
      <div>
        <Tag n={n}>{tag}</Tag>
        <Split as="h2" text={title} className={H2} />
      </div>
      {sub && (
        <p className={`reveal max-w-[44ch] text-[15.5px] leading-relaxed lg:pb-3 ${light ? "text-void/75" : "text-muted"}`}>{sub}</p>
      )}
    </div>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline tracking-[-0.035em] ${className}`} aria-label="MarketINK">
      <span className="font-medium">market</span>
      <span className="font-extrabold">INK</span>
      <span aria-hidden className="ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood shadow-[0_0_18px_5px_rgba(225,6,0,0.7)]" />
    </span>
  );
}

export default async function InkyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = inky[lang];
  const c = copy[lang];
  const other = lang === "es" ? "en" : "es";
  const lvl = c.cases.items.find((x) => x.k === "lvl");

  /* Datos estructurados: un programa con dos precios. Es lo que permite a
     Google mostrar el precio en el resultado de búsqueda. */
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "INKY",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: t.meta.desc,
    url: `${SITE_URL}/${lang}/inky`,
    publisher: { "@type": "Organization", name: "MarketINK", url: SITE_URL },
    offers: [
      { "@type": "Offer", price: "99", priceCurrency: "USD", description: lang === "es" ? "Mensual" : "Monthly" },
      { "@type": "Offer", price: "299000", priceCurrency: "COP", description: lang === "es" ? "Mensual, Latinoamérica" : "Monthly, Latin America" },
    ],
  };

  const h1 = (
    <>
      {t.hero.h1} <span className="text-blood">{t.hero.h1Last}</span>
    </>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Ink quiet />
      <Glow />
      <Analytics />
      <Consent lang={lang} t={c.consent} />
      <StickyCta href={inkyLinks.connect} label={t.hero.cta} lang={lang} />

      <div className="relative z-10">
        <Nav
          lang={lang}
          other={other}
          cta={t.hero.cta}
          ctaHref={inkyLinks.connect}
          items={[
            { href: "#como", label: t.nav.how },
            { href: "#para-quien", label: t.nav.who },
            { href: "#caso", label: t.nav.case },
            { href: "#precios", label: t.nav.pricing },
            { href: "#faq", label: t.nav.faq },
          ]}
        />

        {/* ───────── HERO: la frase de cartel y el chat funcionando ───────── */}
        <header className="relative overflow-clip pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="wrap grid items-start gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="lg:pt-10">
              <p className="lift mb-6 flex items-center gap-3 flash-sub text-[11px] tracking-[0.22em] text-bone">
                <Image src={inkyLinks.logo} alt="" width={40} height={40} priority className="inky-mascot size-10" />
                {t.hero.eyebrow}
              </p>

              <h1 className="stamp misprint inky-h1 flash-type max-w-[12ch]">{h1}</h1>

              <p className="lift mt-8 max-w-[54ch] text-[clamp(1rem,1.4vw,1.12rem)] leading-relaxed text-bone/85">{t.hero.sub}</p>

              <div className="lift mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a href={inkyLinks.connect} className="btn btn-lg justify-center whitespace-nowrap">
                  {t.hero.cta}
                </a>
                <a href={inkyLinks.talk} target="_blank" rel="noopener" className="btn btn-ghost btn-lg justify-center whitespace-nowrap">
                  {t.hero.talk}
                </a>
              </div>
              <p className="lift mt-5 text-[13px] text-muted">{t.hero.fine}</p>
            </div>

            <div className="lift flex justify-center lg:justify-end">
              <InkyChat t={t.chat} logo={inkyLinks.logo} />
            </div>
          </div>
        </header>

        {/* ───────── 01 · CÓMO FUNCIONA (hoja hueso) ───────── */}
        <section id="como" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap">
            <SecHead n="01" tag={t.how.tag} title={t.how.title} light />
            <ol className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3">
              {t.how.steps.map((s, i) => (
                <li key={s.t} className="sheet-cell reveal">
                  <span className="sheet-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 flash-type text-[clamp(1.5rem,2.4vw,2.3rem)]">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-void/80">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── 02 · PARA QUIÉN: los sombreros ───────── */}
        <section id="para-quien" className="sec scroll-mt-24 py-20 sm:py-28">
          <div className="wrap">
            <SecHead n="02" tag={t.hats.tag} title={t.hats.title} sub={t.hats.sub} />
            <InkyHats items={t.hats.items} label={t.hats.tag} dmLabel={t.hats.dmLabel} doesLabel={t.hats.doesLabel} />
          </div>
        </section>

        {/* ───────── 03 · CASO REAL: LVL Tattoo (datos de lib/copy.ts) ───────── */}
        {lvl && (
          <section id="caso" className="sec scroll-mt-24 overflow-clip border-t border-white/[0.07] py-20 sm:py-28">
            <div className="wrap">
              <Tag n="03">{t.case.tag}</Tag>
              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
                <div>
                  <p className="reveal mb-6 flash-sub text-[10.5px] tracking-[0.22em] text-muted">
                    {lvl.studio} · {lvl.city}
                  </p>
                  <Split as="h2" text={lvl.name} className="flash-type text-[clamp(3.6rem,11vw,10rem)] leading-[0.9]" />

                  <div className="reveal mt-9 border-y border-white/[0.09] py-8">
                    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="flash-type text-[clamp(2.8rem,7vw,5.6rem)] text-blood">{lvl.big}</span>
                      <span className="flash-type text-[clamp(1.1rem,2.4vw,1.9rem)] text-bone">{lvl.unit}</span>
                    </p>
                    <p className="mt-2.5 max-w-[34ch] text-[15px] leading-snug text-muted">{lvl.tail}</p>
                    <p className="mt-5 flash-sub text-[10.5px] tracking-[0.2em] text-faint">
                      {c.cases.inLabel} {lvl.span}
                    </p>
                  </div>

                  <div className="reveal mt-8 grid gap-5 sm:grid-cols-2">
                    <p className="border-l-2 border-white/15 pl-4 text-[14.5px] leading-relaxed text-faint">{lvl.before}</p>
                    <p className="border-l-2 border-blood pl-4 text-[15px] leading-relaxed text-bone">{lvl.after}</p>
                  </div>

                  <div className="reveal mt-9">
                    <p className="mb-4 flash-sub text-[10px] tracking-[0.2em] text-faint">{c.cases.movesLabel}</p>
                    <ul className="flex flex-wrap gap-2.5">
                      {lvl.moves.map((m) => (
                        <li key={m} className="border border-white/[0.12] px-3.5 py-2 text-[12.5px] text-muted">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {lvl.figures.length > 0 && (
                    <>
                      <div className="mt-10 grid gap-px bg-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
                        {lvl.figures.map((f) => (
                          <div key={f.k} className="spot reveal bg-void px-5 py-6">
                            <p className="flash-type text-[clamp(1.5rem,2.6vw,2.3rem)] tabular-nums text-bone">
                              <Count value={f.v} />
                            </p>
                            <p className="mt-2 text-[12px] leading-snug text-muted">{f.k}</p>
                          </div>
                        ))}
                      </div>
                      <p className="reveal mt-4 text-[11.5px] text-faint">{lvl.figNote}</p>
                    </>
                  )}
                </div>

                <a
                  href={lvl.url}
                  target="_blank"
                  rel="noopener"
                  className="reveal group relative block overflow-hidden border border-white/[0.1] transition hover:border-blood/50"
                >
                  <Image
                    src={lvl.img}
                    alt={`${t.case.seeProfile} ${lvl.handle}`}
                    width={566}
                    height={1210}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full transition duration-700 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-void via-void/90 to-transparent px-5 pb-4 pt-12 text-[13px]">
                    <span className="font-semibold text-bone">{lvl.handle}</span>
                    <span className="text-bone transition group-hover:translate-x-0.5">{t.case.seeProfile} →</span>
                  </span>
                </a>
              </div>
              <p className="reveal mt-14 max-w-[90ch] text-[11.5px] leading-relaxed text-faint">{c.cases.note}</p>
            </div>
          </section>
        )}

        <Banda line={t.band} cta={t.hero.cta} href={inkyLinks.connect} lang={lang} />

        {/* ───────── 04 · PRECIOS (hoja hueso) ───────── */}
        <section id="precios" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap">
            <SecHead n="04" tag={t.pricing.tag} title={t.pricing.title} sub={t.pricing.sub} light />

            <div className="mt-14 grid gap-5 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.05fr)]">
              {t.pricing.plans.map((p) => (
                <div key={p.id} className="sheet-cell reveal flex flex-col">
                  <p className="flash-sub text-[11px] tracking-[0.18em] text-void/75">{p.region}</p>
                  <p className="mt-6">
                    <span className="inky-price block whitespace-nowrap">
                      <span className="mr-[0.12em] align-top text-[0.36em]">{p.currency}</span>
                      {p.amount}
                    </span>
                    <span className="mt-2 block text-[14px] font-semibold text-void/75">{p.per}</span>
                  </p>
                  <p className="mt-5 inline-flex self-start bg-void px-3 py-1.5 flash-sub text-[11px] tracking-[0.16em] text-bone">
                    {t.pricing.trial}
                  </p>
                  <div className="mt-auto pt-9">
                    <a href={inkyLinks.connect} className="btn w-full justify-center">
                      {t.hero.cta}
                    </a>
                  </div>
                </div>
              ))}

              <div className="reveal border-t-2 border-void pt-6 lg:border-l-2 lg:border-t-0 lg:pl-9 lg:pt-1">
                <p className="mb-5 flash-sub text-[11px] tracking-[0.18em] text-void/75">{t.pricing.includesLabel}</p>
                <ul className="space-y-3.5">
                  {t.pricing.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-void">
                      <i aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-blood" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-[14px] font-semibold text-void/75">{t.pricing.soon}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 05 · PREGUNTAS ───────── */}
        <section id="faq" className="sec scroll-mt-24 py-20 sm:py-28">
          <div className="wrap">
            <SecHead n="05" tag={t.faq.tag} title={t.faq.title} />
            <div className="mt-14 border-t border-white/[0.1]">
              {t.faq.items.map((f) => (
                <details key={f.q} className="reveal group border-b border-white/[0.1] py-7">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                    <span className="max-w-[52ch] text-[16.5px] font-bold leading-snug text-bone">{f.q}</span>
                    <span aria-hidden className="mt-1 shrink-0 text-[18px] leading-none text-blood transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
                    <Rich text={f.a} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CIERRE ───────── */}
        <section className="border-t border-white/[0.07] py-20 sm:py-28">
          <div className="wrap">
            <Tag n="06">{t.close.tag}</Tag>
            <Split as="h2" text={t.close.title} className={`${H2} max-w-[18ch]`} />
            <p className="reveal mt-7 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.close.body}</p>
            <div className="reveal mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href={inkyLinks.connect} className="btn btn-lg justify-center whitespace-nowrap">
                {t.hero.cta}
              </a>
              <a href={inkyLinks.talk} target="_blank" rel="noopener" className="btn btn-ghost btn-lg justify-center whitespace-nowrap">
                {t.hero.talk}
              </a>
            </div>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] pb-28 pt-14 lg:pb-14">
          <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Wordmark className="text-[18px]" />
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">{c.footer.tagline}</p>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.write}</p>
              <a href={`mailto:${entity.email}`} className="block text-[14px] text-muted transition hover:text-bone">
                {entity.email}
              </a>
              <a href={site.whatsapp} className="mt-2 block text-[14px] text-muted transition hover:text-bone">
                WhatsApp
              </a>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.where}</p>
              <address className="not-italic text-[14px] leading-relaxed text-muted">
                {entity.legal}
                <br />
                1021 E Lincolnway, Suite #9463
                <br />
                Cheyenne, Wyoming 82001
                <br />
                {lang === "es" ? "Estados Unidos" : "United States"}
              </address>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.follow}</p>
              <a href={site.instagram} className="block text-[14px] text-muted transition hover:text-bone">
                Instagram
              </a>
            </div>
          </div>
          <div className="wrap mt-12">
            <div className="border-t border-white/[0.06] pt-8">
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                <li>
                  <Link href={`/${lang}`} className="text-[13.5px] text-muted transition hover:text-bone">
                    {t.footerHome}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/webs`} className="text-[13.5px] text-muted transition hover:text-bone">
                    {c.nav.webs}
                  </Link>
                </li>
                {legalNav[lang].map((n) => (
                  <li key={n.slug}>
                    <Link href={`/${lang}/legal/${n.slug}`} className="text-[13.5px] text-muted transition hover:text-bone">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] leading-relaxed text-faint">
                © {new Date().getFullYear()} {c.footer.built} · {c.footer.rights}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
