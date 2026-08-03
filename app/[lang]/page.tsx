import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, site } from "@/lib/copy";
import Ink from "@/components/Ink";
import DmCard from "@/components/DmCard";
import Calculator from "@/components/Calculator";
import StickyCta from "@/components/StickyCta";
import Split from "@/components/Split";
import Count from "@/components/Count";
import BookCall from "@/components/BookCall";
import Spots from "@/components/Spots";
import { legalNav, entity } from "@/lib/legal";
import Nav from "@/components/Nav";
import Glow from "@/components/Glow";
import RailNav from "@/components/RailNav";
import Consent from "@/components/Consent";
import Funnel from "@/components/Funnel";
import Jsonld from "@/components/Jsonld";
import Analytics from "@/components/Analytics";

/** marketINK• — el punto es la gota de tinta y el punto final de la frase. */
function Wordmark({ className = "", live = true }: { className?: string; live?: boolean }) {
  return (
    <span className={`inline-flex items-baseline tracking-[-0.035em] ${className}`} aria-label="MarketINK">
      <span className="font-medium">market</span>
      <span className="font-extrabold">INK</span>
      <span
        aria-hidden
        className={`ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood shadow-[0_0_18px_5px_rgba(225,6,0,0.7)] ${live ? "dot-live" : ""}`}
      />
    </span>
  );
}

function Period() {
  return (
    <span
      aria-hidden
      className="ml-[0.05em] inline-block size-[0.16em] rounded-full bg-blood align-baseline shadow-[0_0_44px_12px_rgba(225,6,0,0.6)]"
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{children}</p>;
}

/** 01 / EL DIAGNÓSTICO — la etiqueta que marca el ritmo editorial. */
function Tag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="reveal sec-tag mb-7">
      <b>{n}</b>
      <i aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** El número gigante que sangra por detrás del contenido. */
function Ghost({ n }: { n: string }) {
  return (
    <span className="sec-n" aria-hidden>
      {n}
    </span>
  );
}

function Cta({ href, children, big = false }: { href: string; children: React.ReactNode; big?: boolean }) {
  return (
    <a
      href={href}
      className={`btn ${big ? "btn-lg" : ""}`}
    >
      {children}
    </a>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  const other = lang === "es" ? "en" : "es";
  const video = site.video[lang];

  return (
    <>
      <Jsonld t={t} lang={lang} />
      <Ink />
      <Glow />
      <Analytics />
      <Consent lang={lang} t={t.consent} />
      <RailNav
        items={[
          { id: "problem", label: t.problem.eyebrow },
          { id: "cost", label: t.calc.eyebrow },
          { id: "system", label: t.funnel.tag },
          { id: "assets", label: t.assets.tag },
          { id: "cases", label: t.cases.eyebrow },
          { id: "fit", label: t.fit.eyebrow },
          { id: "process", label: t.process.eyebrow },
          { id: "team", label: t.team.eyebrow },
          { id: "guarantee", label: t.guarantee.tag },
          { id: "faq", label: t.faq.eyebrow },
          { id: "book", label: t.audit.tag },
        ]}
      />
      <StickyCta href="#book" label={t.sticky} lang={lang} spotsLabels={t.book} />

      <div className="relative z-10">
        {/* ───────── NAV ───────── */}
        <Nav
          lang={lang}
          other={other}
          cta={t.nav.cta}
          ctaHref="#book"
          items={[
            { href: "#system", label: t.nav.system },
            { href: "#results", label: t.nav.results },
            { href: "#process", label: t.nav.process },
            { href: "#book", label: t.book.eyebrow },
            { href: "#faq", label: t.nav.faq },
          ]}
        />

        {/* ───────── HERO ───────── */}
        <header className="relative overflow-hidden">
          <div className="bleed-b absolute inset-0 -z-10" aria-hidden>
            <Image src="/img/hero.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.4]" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/72 to-void/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />
          </div>

          <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_auto] lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="rise mb-8 inline-flex max-w-[36ch] items-center gap-2.5 border border-white/15 px-4 py-2 text-left text-[11px] uppercase leading-snug tracking-[0.14em] text-muted">
                <i className="dot-live size-1.5 shrink-0 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.8)]" />
                {t.hero.eyebrow}
              </span>

              <h1 className="mx-auto max-w-[19ch] flash-type text-[clamp(2.05rem,3.9vw,3.25rem)] lg:mx-0">
                <Split as="span" text={t.hero.h1a} className="text-faint" stagger={34} />
                <Split as="span" text={t.hero.h1b} delay={300} stagger={34} tail={<Period />} />
              </h1>

              <p className="rise mx-auto mt-7 max-w-[52ch] text-[clamp(0.97rem,1.6vw,1.13rem)] leading-relaxed text-muted lg:mx-0">
                {t.hero.sub}
              </p>

              <p className="rise mx-auto mt-5 max-w-[48ch] border-l-2 border-signal/60 pl-4 text-left text-[14.5px] leading-relaxed text-bone lg:mx-0">
                {t.hero.support}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                <span data-cursor="BOOK"><Cta href="#book" big>{t.hero.cta1}</Cta></span>
                <a href="#system" className="btn btn-ghost btn-lg">
                  {t.hero.cta2}
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-[46ch] text-[12.5px] leading-relaxed text-faint lg:mx-0">{t.hero.note}</p>
            </div>

            <div className="rise flex justify-center lg:justify-end" style={{ animationDelay: "0.25s" }}>
              <DmCard lang={lang} label={t.hero.dmStatus} />
            </div>
          </div>
        </header>

        {/* ───────── BARRA DE RESULTADOS ───────── */}
        <section id="results" className="scroll-mt-24 border-y border-white/[0.08] px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-9 flash-sub text-[10.5px] tracking-[0.22em] text-faint">{t.metrics.label}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {t.metrics.items.map((m) => (
                <div key={m.t} className="reveal">
                  <p className="flash-type text-[clamp(1.8rem,3.4vw,2.7rem)] tabular-nums text-signal"><Count value={m.n} /></p>
                  <p className="mt-2.5 text-[13px] leading-snug text-muted">{m.t}</p>
                </div>
              ))}
            </div>
            <p className="reveal mt-10 max-w-[70ch] text-[11.5px] leading-relaxed text-faint">{t.metrics.disclaimer}</p>
          </div>
        </section>

        {/* ───────── FRANJA DE CREDIBILIDAD ───────── */}
        <section className="border-b border-white/[0.08] px-6 py-9">
          <div className="mx-auto flex max-w-6xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <p className="flash-sub shrink-0 text-[10px] tracking-[0.22em] text-faint">{t.trust.label}</p>
              <div className="flex items-center gap-3">
                {t.cases.items.map((c) => (
                  <a
                    key={c.k}
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center gap-2.5 border border-white/12 py-1 pl-1 pr-3.5 transition hover:border-blood/60"
                    aria-label={`${c.studio} — ${c.handle}`}
                  >
                    <Image
                      src={c.avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="size-[30px] rounded-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                    <span className="text-[12.5px] text-muted transition group-hover:text-bone">{c.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
              {t.trust.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[12.5px] text-muted">
                  <span className="size-1 shrink-0 rounded-full bg-blood" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── VIDEO ─────────
             Oculto a propósito hasta que exista el archivo. La sección
             completa está intacta en el historial de git: cuando el
             vídeo esté grabado, se descomenta y va justo aquí, después
             de la franja de credibilidad. No se borró para no tener
             que reconstruirla. */}

        {/* ───────── PROBLEMA ───────── */}
        <section id="problem" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-36">
          <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Ghost n="01" />
              <Tag n="01">{t.problem.eyebrow}</Tag>
              <h2 className="flash-type text-[clamp(2rem,4.4vw,3.4rem)]">
                <Split as="span" text={t.problem.title} />
                <Split as="span" text={t.problem.titleEm} delay={220} className="text-faint" />
              </h2>
              <p className="reveal mt-9 max-w-[40ch] text-[clamp(1.05rem,1.9vw,1.35rem)] font-semibold leading-snug tracking-[-0.02em]">
                {t.problem.close} <span className="text-blood">{t.problem.closeEm}</span>
              </p>
            </div>

            <ul className="rail">
              {t.problem.items.map((it) => (
                <li
                  key={it.n}
                  className="spot reveal relative rounded-[18px] border border-white/[0.09] p-7 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:p-0 lg:py-9 lg:first:pt-0 lg:last:border-0 lg:last:pb-0"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 right-3 select-none text-[80px] font-black leading-none tracking-tighter text-white/[0.05] lg:-top-1 lg:right-0"
                  >
                    {it.n}
                  </span>
                  <h3 className="relative text-[clamp(1.2rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em]">{it.t}</h3>
                  <p className="relative mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">{it.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] text-faint lg:hidden">{t.problem.swipe}</p>
          </div>
        </section>

        {/* ───────── CALCULADORA ───────── */}
        <section id="cost" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-36">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="02" />
            <Tag n="02">{t.calc.eyebrow}</Tag>
            <Split as="h2" text={t.calc.title} className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
            <p className="reveal mt-6 max-w-[46ch] text-[15.5px] text-muted">{t.calc.sub}</p>

            <div className="reveal mt-14">
              <Calculator t={t.calc} lang={lang} />
            </div>

            <div className="reveal mt-12">
              <Cta href="#book" big>{t.calc.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── EL RECORRIDO ───────── */}
        <section id="system" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="03" />
            <Tag n="03">{t.funnel.tag}</Tag>
            <Split as="h2" text={t.funnel.title} className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
            <p className="reveal mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">{t.funnel.sub}</p>

            <div className="mt-16">
              <Funnel t={t.funnel} />
            </div>

            <p className="reveal mt-12 max-w-[54ch] border-l-2 border-blood pl-5 text-[15.5px] leading-relaxed text-bone">
              {t.funnel.follow}
            </p>
          </div>
        </section>

        {/* ───────── QUÉ SE INSTALA — 5 ACTIVOS ───────── */}
        <section id="assets" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="04" />
            <Tag n="04">{t.assets.tag}</Tag>
            <Split as="h2" text={t.assets.title} className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
            <p className="reveal mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{t.assets.sub}</p>

            <div className="mt-14 border-t border-white/[0.1]">
              {t.assets.items.map((a, i) => (
                <div
                  key={a.k}
                  className="spot reveal grid gap-5 border-b border-white/[0.1] py-9 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.85fr)] lg:items-baseline lg:gap-10"
                >
                  <span className="flash-sub text-[11px] tracking-[0.2em] text-blood lg:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="flash-type text-[clamp(1.5rem,3vw,2.3rem)]">{a.k}</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted">{a.d}</p>
                  </div>

                  {/* las tareas, en pequeño: son el medio, no el producto */}
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 lg:justify-end">
                    {a.t.map((x) => (
                      <li key={x} className="text-[12px] leading-snug text-faint">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── RUPTURA ───────── */}
        <section className="rupture px-6 py-24 text-center sm:py-36">
          {/* la palabra de fondo, en marquesina lenta: tinta estampada
              una y otra vez sobre el rojo */}
          <div className="rupture-band" aria-hidden>
            <div className="rupture-run">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>{t.rupture.word}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <Split as="p" text={t.rupture.a} className="flash-type text-[clamp(1.7rem,4.6vw,3.4rem)] opacity-55" />
            <Split as="p" text={t.rupture.b} className="mt-1.5 flash-type text-[clamp(2rem,5.6vw,4.2rem)]" delay={220} />
            <Split as="p" text={t.rupture.c} className="mt-1.5 flash-type text-[clamp(1.7rem,4.6vw,3.4rem)] opacity-55" delay={460} />
            <p className="reveal mx-auto mt-10 max-w-[52ch] text-[15px] leading-relaxed text-white/75">{t.rupture.d}</p>
          </div>
        </section>

        {/* ───────── CASOS REALES ───────── */}
        <section id="cases" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="05" />
            <Tag n="05">{t.cases.eyebrow}</Tag>
            <Split as="h2" text={t.cases.title} className="max-w-[20ch] flash-type text-[clamp(2rem,4.6vw,3.6rem)]" />
            <p className="reveal mt-6 max-w-[56ch] text-[15.5px] leading-relaxed text-muted">{t.cases.sub}</p>
          </div>

          {/* cada caso ocupa su propio bloque, no una tarjeta */}
          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            {t.cases.items.map((c, i) => (
              <article key={c.k} className="mx-auto max-w-6xl">
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
                  {/* izquierda: la historia */}
                  <div>
                    <p className="reveal mb-6 flex items-center gap-3 flash-sub text-[10.5px] tracking-[0.22em] text-faint">
                      <span className="text-blood">{String(i + 1).padStart(2, "0")}</span>
                      {c.studio} · {c.city}
                    </p>

                    <Split
                      as="h3"
                      text={c.name}
                      className="flash-type text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.86]"
                    />

                    {/* la cifra manda */}
                    <div className="reveal mt-9 border-y border-white/[0.09] py-8">
                      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="flash-type text-[clamp(2.8rem,7vw,5rem)] text-blood">{c.big}</span>
                        <span className="flash-type text-[clamp(1.1rem,2.4vw,1.8rem)] text-bone">{c.unit}</span>
                      </p>
                      <p className="mt-2.5 max-w-[34ch] text-[15px] leading-snug text-muted">{c.tail}</p>
                      <p className="mt-5 flash-sub text-[10.5px] tracking-[0.2em] text-faint">
                        {t.cases.inLabel} {c.span}
                      </p>
                    </div>

                    {/* antes / después */}
                    <div className="reveal mt-8 grid gap-5 sm:grid-cols-2">
                      <p className="border-l-2 border-white/15 pl-4 text-[14.5px] leading-relaxed text-faint">{c.before}</p>
                      <p className="border-l-2 border-blood pl-4 text-[15px] leading-relaxed text-bone">{c.after}</p>
                    </div>

                    {/* qué se instaló */}
                    <div className="reveal mt-9">
                      <p className="mb-4 flash-sub text-[10px] tracking-[0.2em] text-faint">{t.cases.movesLabel}</p>
                      <ul className="flex flex-wrap gap-2.5">
                        {c.moves.map((m) => (
                          <li key={m} className="border border-white/[0.12] px-3.5 py-2 text-[12.5px] text-muted">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* cifras de campaña, solo si las hay */}
                    {c.figures.length > 0 && (
                      <>
                        <div data-cursor="RESULTS" className="mt-10 grid gap-px bg-white/[0.08] sm:grid-cols-4">
                          {c.figures.map((f) => (
                            <div key={f.k} className="spot reveal bg-void px-5 py-6">
                              <p className="flash-type text-[clamp(1.5rem,2.6vw,2.1rem)] tabular-nums text-signal">
                                <Count value={f.v} />
                              </p>
                              <p className="mt-2 text-[12px] leading-snug text-muted">{f.k}</p>
                            </div>
                          ))}
                        </div>
                        <p className="reveal mt-4 text-[11.5px] text-faint">{c.figNote}</p>
                      </>
                    )}
                  </div>

                  {/* derecha: la prueba que se puede comprobar */}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    data-cursor="VIEW"
                    className="reveal group relative block overflow-hidden border border-white/[0.1] transition hover:border-blood/50"
                  >
                    <Image
                      src={c.img}
                      alt={`${t.trust.seeAll} ${c.handle}`}
                      width={566}
                      height={1210}
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="w-full transition duration-700 group-hover:scale-[1.02]"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-void via-void/90 to-transparent px-5 pb-4 pt-12 text-[13px]">
                      <span className="font-semibold text-bone">{c.handle}</span>
                      <span className="text-blood transition group-hover:translate-x-0.5">{t.trust.seeAll} →</span>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="reveal mx-auto mt-14 max-w-6xl text-[11.5px] leading-relaxed text-faint">{t.cases.note}</p>
        </section>

        {/* ───────── PARA QUIÉN ───────── */}
        <section id="fit" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-36">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="06" />
            <Tag n="06">{t.fit.eyebrow}</Tag>
            <Split as="h2" text={t.fit.title} className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />

            <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flash-cell reveal border-l-2 border-l-blood p-9 sm:p-11">
                <h3 className="flash-sub mb-8 text-[11px] tracking-[0.2em] text-blood">{t.fit.yesTitle}</h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {t.fit.yes.map((x) => (
                    <li key={x} className="flex gap-3.5 text-[15.5px] leading-snug">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.6)]" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal border border-white/[0.06] p-9 sm:p-10">
                <h3 className="flash-sub mb-8 text-[11px] tracking-[0.2em] text-faint">{t.fit.noTitle}</h3>
                <ul className="space-y-4">
                  {t.fit.no.map((x) => (
                    <li key={x} className="flex gap-3.5 text-[14.5px] leading-snug text-faint">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-faint" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 90 DÍAS ───────── */}
        <section id="process" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-36">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="07" />
            <Tag n="07">{t.process.eyebrow}</Tag>
            <Split as="h2" text={t.process.title} className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
            <p className="reveal mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.process.sub}</p>

            <div className="mt-16 grid gap-px bg-white/[0.08] md:grid-cols-4">
              {t.process.phases.map((p) => (
                <div key={p.d} className="spot reveal bg-void p-8">
                  <p className="flash-sub text-[10.5px] tracking-[0.18em] text-blood">{p.d}</p>
                  <h3 className="mt-4 flash-type text-[clamp(1.3rem,2.2vw,1.7rem)]">{p.t}</h3>
                  <ul className="mt-6 space-y-3">
                    {p.items.map((x) => (
                      <li key={x} className="flex gap-3 text-[13.5px] leading-snug text-muted">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-signal" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="reveal mt-12 max-w-[46ch] text-[clamp(1.1rem,2.1vw,1.5rem)] font-semibold leading-snug tracking-[-0.025em]">
              {t.process.close} <span className="text-signal">{t.process.closeEm}</span>
            </p>
            <div className="reveal mt-9">
              <Cta href="#book">{t.nav.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── EQUIPO ───────── */}
        <section id="team" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <Ghost n="08" />
                <Tag n="08">{t.team.eyebrow}</Tag>
                <Split as="h2" text={t.team.title} className="max-w-[16ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
              </div>
              <p className="reveal max-w-[52ch] self-end text-[15.5px] leading-relaxed text-muted">{t.team.sub}</p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
              {t.team.people.map((p) => (
                <figure key={p.k} className="reveal group relative overflow-hidden border border-white/[0.1]">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={1000}
                    height={1250}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="w-full object-cover transition duration-[900ms] group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/92 to-transparent px-6 pb-6 pt-20">
                    <p className="flash-type text-[clamp(1.8rem,3.4vw,2.6rem)]">{p.name}</p>
                    <p className="mt-1.5 text-[14px] text-muted">{p.role}</p>
                    <p className="mt-3 flash-sub text-[10.5px] tracking-[0.18em] text-blood">{p.cred}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── LO QUE SÍ GARANTIZAMOS ───────── */}
        <section id="guarantee" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="09" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <Tag n="09">{t.guarantee.tag}</Tag>
                <Split as="h2" text={t.guarantee.title} className="max-w-[16ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
                <p className="reveal mt-6 max-w-[46ch] text-[15.5px] leading-relaxed text-muted">{t.guarantee.sub}</p>
              </div>

              <ul className="reveal divide-y divide-white/[0.09] border-y border-white/[0.09]">
                {t.guarantee.items.map((g) => (
                  <li key={g} className="flex gap-4 py-5">
                    <span className="mt-[7px] block h-px w-5 shrink-0 bg-blood" aria-hidden />
                    <span className="text-[15px] leading-relaxed text-bone">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-36">
          <div className="relative mx-auto max-w-3xl">
            <Ghost n="10" />
            <Tag n="10">{t.faq.eyebrow}</Tag>
            <Split as="h2" text={t.faq.title} className="mb-12 max-w-[20ch] flash-type text-[clamp(1.9rem,4.2vw,3.2rem)]" />
            <div className="divide-y divide-white/[0.07]">
              {t.faq.items.map((f, i) => (
                <details key={f.q} className="reveal group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[16.5px] font-semibold tracking-[-0.024em] marker:hidden">
                    {f.q}
                    <span className="shrink-0 text-xl text-blood transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[64ch] pb-7 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="reveal mt-12">
              <Cta href="#book">{t.nav.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── AGENDAR — CALENDARIO INCRUSTADO ───────── */}
        <section id="book" className="scroll-mt-24 border-t border-white/[0.07] px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-5xl">
            <Ghost n="11" />
            <Tag n="11">{t.audit.tag}</Tag>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_auto] lg:items-end">
              <div>
                {/* la oferta tiene nombre propio, no es «una llamada» */}
                <p className="reveal mb-4 inline-block border border-blood/60 px-3.5 py-2 flash-sub text-[10.5px] tracking-[0.2em] text-blood">
                  {t.audit.name}
                </p>
                <Split as="h2" text={t.audit.title} className="max-w-[18ch] flash-type text-[clamp(1.9rem,4.6vw,3.6rem)]" />
                <p className="reveal mt-6 max-w-[52ch] text-[16px] leading-relaxed text-bone">{t.audit.promise}</p>

                <p className="reveal mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                    {t.audit.free}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                    {t.audit.dur}
                  </span>
                </p>
              </div>

              <div className="reveal lg:pb-1">
                <Spots lang={lang} labels={t.book} />
              </div>
            </div>

            {/* qué te llevas: la lista es la oferta */}
            <div className="reveal mt-14 border-t border-white/[0.1] pt-9">
              <p className="mb-7 flash-sub text-[10.5px] tracking-[0.2em] text-faint">{t.audit.getTitle}</p>
              <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {t.audit.get.map((g, i) => (
                  <li key={g} className="flex gap-4">
                    <span className="mt-[3px] shrink-0 flash-sub text-[11px] tracking-[0.14em] text-blood">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-[44ch] text-[14.5px] leading-relaxed text-muted">{g}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-9 max-w-[52ch] border-l-2 border-signal/60 pl-4 text-[14.5px] leading-relaxed text-bone">
                {t.audit.noPitch}
              </p>
            </div>

            <div className="mt-14">

              <BookCall url={site.call} lang={lang} labels={{ loading: t.book.loading, fallback: t.book.fallback }} />
            </div>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] px-6 pb-28 pt-14 lg:pb-14">
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Wordmark className="text-[18px]" live={false} />
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">{t.footer.tagline}</p>
            </div>

            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{t.footer.write}</p>
              <a href={`mailto:${entity.email}`} className="block text-[14px] text-muted transition hover:text-bone">
                {entity.email}
              </a>
              <a href={site.whatsapp} className="mt-2 block text-[14px] text-muted transition hover:text-bone">
                WhatsApp
              </a>
            </div>

            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{t.footer.where}</p>
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
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{t.footer.follow}</p>
              <a href={site.instagram} className="block text-[14px] text-muted transition hover:text-bone">
                Instagram
              </a>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-6xl border-t border-white/[0.06] pt-8">
            <p className="mb-4 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{t.footer.legal}</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {legalNav[lang].map((n) => (
                <li key={n.slug}>
                  <Link href={`/${lang}/legal/${n.slug}`} className="text-[13.5px] text-muted transition hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] leading-relaxed text-faint">
              © {new Date().getFullYear()} {t.footer.built} · {t.footer.rights}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
