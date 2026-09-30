import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, site } from "@/lib/copy";
import { webs } from "@/lib/webs";
import { SITE_URL } from "@/lib/site";
import { entity, legalNav } from "@/lib/legal";
import Ink from "@/components/Ink";
import Glow from "@/components/Glow";
import Nav from "@/components/Nav";
import Split from "@/components/Split";
import Banda from "@/components/Banda";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import Consent from "@/components/Consent";

/**
 * SITIOS PARA TATUADORES — la página que vende el producto
 *
 * Es una página aparte y no una sección de la portada por dos razones.
 * La primera es comercial: la portada vende el sistema de reservas
 * completo a $720 al mes, y meter ahí un producto de $590 canibaliza la
 * conversación. La segunda es de buscador: «web para tatuadores con
 * agenda y depósito» es una búsqueda con intención de compra que hoy no
 * pelea nadie, y para competir por ella hace falta una URL propia con su
 * título, su descripción y su contenido — no un bloque perdido a mitad
 * de la portada.
 *
 * El argumento está heredado de las auditorías a propósito. Cada perfil
 * que revisamos tenía el mismo hueco, así que esta página no abre
 * pidiendo atención: abre con lo que ya comprobamos.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = webs[isLang(lang) ? lang : "en"];
  const url = `${SITE_URL}/${lang}/webs`;
  return {
    title: t.meta.title,
    description: t.meta.desc,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/webs`,
        en: `${SITE_URL}/en/webs`,
        "x-default": `${SITE_URL}/en/webs`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.desc,
      url,
      siteName: "MarketINK",
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
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

function Ghost({ n }: { n: string }) {
  return (
    <span className="sec-n" aria-hidden>
      {n}
    </span>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline tracking-[-0.035em] ${className}`} aria-label="MarketINK">
      <span className="font-medium">market</span>
      <span className="font-extrabold">INK</span>
      <span
        aria-hidden
        className="ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood shadow-[0_0_18px_5px_rgba(225,6,0,0.7)]"
      />
    </span>
  );
}

export default async function Webs({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = webs[lang];
  const c = copy[lang];
  const other = lang === "es" ? "en" : "es";

  /* Datos estructurados de los tres paquetes. Es lo que le permite a
     Google enseñar el precio en el resultado, y en una búsqueda de
     compra el precio visible es la mitad del clic. */
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: lang === "es" ? "Webs para tatuadores" : "Websites for tattoo artists",
    serviceType: lang === "es" ? "Diseño y mantenimiento de sitios web" : "Website design and maintenance",
    provider: { "@type": "Organization", name: "MarketINK", url: SITE_URL },
    areaServed: "Worldwide",
    description: t.meta.desc,
    offers: t.paquetes.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.who,
      price: p.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Ink />
      <Glow />
      <Analytics />
      <Consent lang={lang} t={c.consent} />
      <StickyCta href="#planes" label={t.hero.cta} lang={lang} spotsLabels={c.book} />

      <div className="relative z-10">
        <Nav
          lang={lang}
          other={other}
          cta={t.hero.cta}
          ctaHref="#planes"
          items={[
            { href: "#problema", label: t.problema.tag },
            { href: "#planes", label: t.planes.tag },
            { href: "#pasos", label: t.pasos.tag },
            { href: "#faq", label: t.faq.tag },
          ]}
        />

        {/* ───────── HERO ───────── */}
        <header className="relative overflow-hidden px-6 pb-16 pt-32 sm:pb-24 sm:pt-44">
          <div className="relative mx-auto max-w-5xl">
            <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.hero.eyebrow}</p>
            <Split
              as="h1"
              text={t.hero.title}
              className="max-w-[17ch] flash-type text-[clamp(2.3rem,6.2vw,4.8rem)]"
            />
            <p className="reveal mt-8 max-w-[56ch] text-[16px] leading-relaxed text-muted">{t.hero.sub}</p>
            <div className="reveal mt-11 flex flex-wrap items-center gap-4">
              <a href="#planes" className="btn btn-lg">
                {t.hero.cta}
              </a>
              <a
                href={site.call}
                target="_blank"
                rel="noopener"
                className="text-[14px] text-muted underline decoration-white/25 underline-offset-[6px] transition hover:text-bone"
              >
                {t.hero.alt}
              </a>
            </div>
          </div>
        </header>

        {/* ───────── 01 · EL PROBLEMA ───────── */}
        <section id="problema" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="01" />
            <Tag n="01">{t.problema.tag}</Tag>
            <Split
              as="h2"
              text={t.problema.title}
              className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />
            <p className="reveal mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{t.problema.sub}</p>

            <div className="mt-14 border-t border-white/[0.1]">
              {t.problema.items.map((p, i) => (
                <div
                  key={p.k}
                  className="spot reveal grid gap-4 border-b border-white/[0.1] py-8 lg:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-baseline lg:gap-10"
                >
                  <span className="flash-sub text-[11px] tracking-[0.2em] text-blood lg:pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flash-type text-[clamp(1.25rem,2.4vw,1.8rem)]">{p.k}</h3>
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted">{p.d}</p>
                </div>
              ))}
            </div>

            <p className="reveal mt-12 max-w-[34ch] flash-type text-[clamp(1.5rem,3.4vw,2.5rem)] text-bone">
              {t.problema.cierre}
            </p>
          </div>
        </section>

        {/* ───────── 02 · LOS PAQUETES ───────── */}
        <section id="planes" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="02" />
            <Tag n="02">{t.planes.tag}</Tag>
            <Split
              as="h2"
              text={t.planes.title}
              className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />
            <p className="reveal mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{t.planes.sub}</p>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {t.paquetes.map((p) => (
                <div
                  key={p.id}
                  className={`reveal flex flex-col rounded-[22px] p-8 ring-1 sm:p-9 ${
                    p.best ? "bg-white/[0.035] ring-blood/70" : "ring-white/[0.09]"
                  }`}
                >
                  {/* la marca del que queremos vender, con sitio reservado
                      para que las tres tarjetas empiecen a la misma altura */}
                  <p className="mb-5 min-h-[16px] flash-sub text-[10.5px] tracking-[0.18em] text-blood">
                    {p.best ? t.planes.best : ""}
                  </p>

                  <h3 className="flash-type text-[clamp(1.7rem,3.2vw,2.3rem)]">{p.name}</h3>
                  <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-muted">{p.who}</p>

                  <div className="mt-8 border-y border-white/[0.09] py-7">
                    <p className="flash-type text-[clamp(2.2rem,5vw,3rem)] text-bone">
                      {p.price}
                      <span className="ml-2 align-middle text-[12.5px] font-normal tracking-normal text-faint">
                        {t.planes.unico}
                      </span>
                    </p>
                    <p className="mt-2 text-[14px] text-muted">
                      <b className="tabular-nums text-bone">{p.monthly}</b> {t.planes.mes}
                    </p>
                  </div>

                  <p className="mt-7 mb-4 flash-sub text-[10.5px] tracking-[0.18em] text-faint">{t.planes.incluye}</p>
                  <ul className="space-y-2.5">
                    {p.items.map((x) => (
                      <li key={x} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <i aria-hidden className="mt-[8px] size-1 shrink-0 rounded-full bg-blood" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  {p.note && <p className="mt-6 text-[12.5px] leading-relaxed text-faint">{p.note}</p>}

                  <div className="mt-9 pt-1 [margin-top:auto]">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener"
                      className={`btn w-full justify-center ${p.best ? "" : "!bg-transparent !text-bone ring-1 ring-white/20"}`}
                    >
                      {t.planes.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banda line={t.problema.cierre} cta={t.hero.alt} href={site.call} lang={lang} />

        {/* ───────── 03 · CÓMO FUNCIONA ───────── */}
        <section id="pasos" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="03" />
            <Tag n="03">{t.pasos.tag}</Tag>
            <Split
              as="h2"
              text={t.pasos.title}
              className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />

            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.pasos.items.map((s, i) => (
                <li key={s.k} className="reveal rounded-[18px] p-7 ring-1 ring-white/[0.09]">
                  <span className="flash-sub text-[11px] tracking-[0.2em] text-blood">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold leading-snug text-bone">{s.k}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── 04 · EL MANTENIMIENTO ───────── */}
        <section className="sec overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="04" />
            <Tag n="04">{t.manten.tag}</Tag>
            <Split
              as="h2"
              text={t.manten.title}
              className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />
            <p className="reveal mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{t.manten.sub}</p>

            <ul className="mt-12 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {t.manten.items.map((x) => (
                <li key={x} className="reveal flex gap-3.5 text-[15px] leading-relaxed text-muted">
                  <i aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-blood" />
                  <span className="max-w-[42ch]">{x}</span>
                </li>
              ))}
            </ul>

            <p className="reveal mt-11 max-w-[56ch] border-l-2 border-blood/60 pl-4 text-[15px] leading-relaxed text-bone">
              {t.manten.cierre}
            </p>
          </div>
        </section>

        {/* ───────── 05 · PREGUNTAS ───────── */}
        <section id="faq" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="05" />
            <Tag n="05">{t.faq.tag}</Tag>
            <Split
              as="h2"
              text={t.faq.title}
              className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />

            <div className="mt-14 border-t border-white/[0.1]">
              {t.faq.items.map((f) => (
                <details key={f.q} className="reveal group border-b border-white/[0.1] py-7">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                    <span className="max-w-[46ch] text-[16.5px] font-bold leading-snug text-bone">{f.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-[18px] leading-none text-blood transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CIERRE ───────── */}
        <section className="scroll-mt-24 border-t border-white/[0.07] px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <Tag n="06">{t.cierre.tag}</Tag>
            <Split
              as="h2"
              text={t.cierre.title}
              className="max-w-[20ch] flash-type text-[clamp(2rem,4.8vw,3.6rem)]"
            />
            <p className="reveal mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.cierre.body}</p>
            <div className="reveal mt-11 flex flex-wrap items-center gap-4">
              <a href="#planes" className="btn btn-lg">
                {t.hero.cta}
              </a>
              <a
                href={site.call}
                target="_blank"
                rel="noopener"
                className="text-[14px] text-muted underline decoration-white/25 underline-offset-[6px] transition hover:text-bone"
              >
                {t.cierre.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] px-6 pb-28 pt-14 lg:pb-14">
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mx-auto mt-12 max-w-6xl border-t border-white/[0.06] pt-8">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              <li>
                <Link href={`/${lang}`} className="text-[13.5px] text-muted transition hover:text-bone">
                  {lang === "es" ? "Inicio" : "Home"}
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
        </footer>
      </div>
    </>
  );
}
