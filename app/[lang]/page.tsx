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

function Cta({ href, children, big = false }: { href: string; children: React.ReactNode; big?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full bg-blood font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_14px_38px_-10px_rgba(225,6,0,0.85)] transition duration-500 hover:-translate-y-0.5 ${
        big ? "px-10 py-4 text-[16.5px]" : "px-8 py-3.5 text-[15px]"
      }`}
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
      <Ink />
      <Glow />
      <StickyCta href="#book" label={t.sticky} />

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
              <span className="glass rise mb-8 inline-flex max-w-[36ch] items-center gap-2.5 rounded-full px-4 py-2 text-left text-[11.5px] leading-snug tracking-[0.01em] text-muted">
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
                <Cta href="#book" big>{t.hero.cta1}</Cta>
                <a
                  href="#system"
                  className="glass rounded-full px-8 py-4 text-[16px] font-semibold text-bone transition duration-500 hover:-translate-y-0.5"
                >
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
                    className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3.5 ring-1 ring-white/12 transition hover:ring-blood/60"
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

        {/* ───────── VIDEO ───────── */}
        <section className="px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>{t.video.eyebrow}</Eyebrow>
            <Split as="h2" text={t.video.title} className="mx-auto max-w-[20ch] flash-type text-[clamp(1.8rem,4vw,3rem)]" />
            <p className="reveal mx-auto mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.video.sub}</p>

            <div className="reveal mt-11 overflow-hidden border border-white/[0.1]">
              {video ? (
                <video controls preload="none" poster={site.poster[lang]} playsInline className="aspect-video w-full bg-void">
                  <source src={video} type="video/mp4" />
                </video>
              ) : (
                <div className="relative flex aspect-video w-full items-center justify-center bg-void">
                  <Image src={site.poster[lang]} alt="" fill sizes="100vw" className="object-cover opacity-30" />
                  <span className="relative flash-sub rounded-full px-5 py-2.5 text-[11px] tracking-[0.2em] text-muted ring-1 ring-white/15">
                    {t.video.soon}
                  </span>
                </div>
              )}
            </div>

            <div className="reveal mt-9">
              <Cta href="#book">{t.video.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── PROBLEMA ───────── */}
        <section id="problem" className="scroll-mt-24 px-6 py-16 sm:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{t.problem.eyebrow}</Eyebrow>
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

        {/* ───────── EL TRABAJO ───────── */}
        <section className="px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="reveal mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-5 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.work.eyebrow}</p>
                <Split as="h2" text={t.work.title} className="flash-type text-[clamp(1.8rem,4vw,3rem)]" />
              </div>
              <p className="max-w-[34ch] text-[13.5px] leading-relaxed text-faint">{t.work.sub}</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/[0.08] lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <figure key={n} className="reveal group relative aspect-square overflow-hidden bg-void">
                  <Image
                    src={`/img/tat${n}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-[0.78] grayscale transition-all duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:opacity-100"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── EL SISTEMA ───────── */}
        <section id="system" className="scroll-mt-24 px-6 py-16 sm:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{t.system.eyebrow}</Eyebrow>
              <h2 className="flash-type text-[clamp(2rem,4.4vw,3.4rem)]">
                <Split as="span" text={t.system.title} />
                <Split as="span" text={t.system.titleEm} delay={220} className="text-blood" />
              </h2>
              <p className="reveal mt-8 max-w-[46ch] text-[clamp(0.98rem,1.6vw,1.12rem)] leading-relaxed text-muted">
                {t.system.sub}
              </p>
              <p className="reveal mt-5 max-w-[46ch] border-l-2 border-blood pl-4 text-[15px] leading-relaxed text-bone">
                {t.system.note}
              </p>
              <div className="reveal mt-9">
                <Cta href="#book">{t.nav.cta}</Cta>
              </div>
            </div>

            <ol className="relative pl-12">
              <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-blood via-blood/45 to-transparent" />
              {t.system.steps.map((s) => (
                <li key={s.n} className="reveal relative pb-11 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-12 top-1.5 flex size-[31px] items-center justify-center rounded-full bg-void text-[11px] font-bold tracking-[0.06em] text-blood ring-1 ring-blood/45"
                  >
                    {s.n}
                  </span>
                  <h3 className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-bold tracking-[-0.032em]">{s.t}</h3>
                  <p className="mt-2.5 max-w-[48ch] text-[15px] leading-relaxed text-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── QUÉ INCLUYE ───────── */}
        <section className="px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.includes.eyebrow}</Eyebrow>
            <Split as="h2" text={t.includes.title} className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.2vw,3.2rem)]" />

            <div className="rail mt-14 md:grid md:gap-px md:bg-white/[0.08] lg:grid-cols-3">
              {t.includes.groups.map((g, i) => (
                <div
                  key={g.k}
                  className="spot reveal rounded-[18px] border border-white/[0.09] bg-void p-8 sm:p-10 md:rounded-none md:border-0"
                >
                  <div className="mb-8 flex items-baseline gap-3">
                    <span className="flash-sub text-[10.5px] tracking-[0.2em] text-blood">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flash-type text-[clamp(1.5rem,2.6vw,2rem)]">{g.k}</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {g.items.map((x) => (
                      <li key={x} className="flex gap-3 text-[14.5px] leading-snug text-muted">
                        <span className="mt-[9px] size-1 shrink-0 rounded-full bg-blood" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-faint lg:hidden">{t.problem.swipe}</p>
          </div>
        </section>

        {/* ───────── CASOS REALES ───────── */}
        <section id="cases" className="scroll-mt-24 px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.cases.eyebrow}</Eyebrow>
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
                        <div className="mt-10 grid gap-px bg-white/[0.08] sm:grid-cols-4">
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

        {/* ───────── CALCULADORA ───────── */}
        <section className="px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.calc.eyebrow}</Eyebrow>
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

        {/* ───────── PARA QUIÉN ───────── */}
        <section id="fit" className="scroll-mt-24 px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.fit.eyebrow}</Eyebrow>
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
        <section id="process" className="scroll-mt-24 px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
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

        {/* ───────── TESTIMONIO ───────── */}
        <section className="px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>{t.proof.eyebrow}</Eyebrow>
            <blockquote className="reveal text-[clamp(1.25rem,2.9vw,2.1rem)] font-medium leading-[1.34] tracking-[-0.03em]">
              <span className="text-blood">«</span>
              {t.proof.quote}
              <span className="text-blood">»</span>
            </blockquote>
            <div className="reveal mt-9">
              <p className="text-[16.5px] font-semibold tracking-[-0.02em]">{t.proof.name}</p>
              <p className="mt-1 text-[13.5px] text-muted">{t.proof.role}</p>
              <p className="mt-6 inline-block rounded-full px-4 py-2 text-[12.5px] text-signal ring-1 ring-signal/30">
                {t.proof.outcome}
              </p>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="scroll-mt-24 px-6 py-16 sm:py-36">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
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

        {/* ───────── CTA FINAL ───────── */}
        <section className="relative overflow-hidden px-6 py-20 text-center sm:py-48">
          <div className="bleed absolute inset-0 -z-10" aria-hidden>
            <Image src="/img/textura.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.3]" />
            <div className="absolute inset-0 bg-gradient-to-b from-void via-void/72 to-void" />
          </div>
          <div className="mx-auto max-w-4xl">
            <h2 className="mx-auto max-w-[18ch] flash-type text-[clamp(2.1rem,5.4vw,4.4rem)]">
              <Split as="span" text={t.final.title} />
              <Period />
            </h2>
            <p className="reveal mx-auto mt-8 max-w-[52ch] text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-muted">
              {t.final.sub}
            </p>
            <div className="reveal mt-11">
              <Cta href="#book" big>{t.final.cta}</Cta>
            </div>
            <div className="reveal mt-10 flex justify-center">
              <Spots lang={lang} labels={t.book} />
            </div>
            <p className="reveal mx-auto mt-9 max-w-[56ch] text-[13.5px] leading-relaxed text-faint">{t.final.support}</p>
          </div>
        </section>


        {/* ───────── EQUIPO ───────── */}
        <section id="team" className="scroll-mt-24 px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <Eyebrow>{t.team.eyebrow}</Eyebrow>
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

        {/* ───────── AGENDAR — CALENDARIO INCRUSTADO ───────── */}
        <section id="book" className="scroll-mt-24 border-t border-white/[0.07] px-6 py-16 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_auto] lg:items-end">
              <div>
                <Eyebrow>{t.book.eyebrow}</Eyebrow>
                <Split as="h2" text={t.book.title} className="max-w-[18ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]" />
                <p className="reveal mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.book.sub}</p>
              </div>
              <div className="reveal lg:pb-2">
                <Spots lang={lang} labels={t.book} />
              </div>
            </div>

            <BookCall url={site.call} lang={lang} labels={{ loading: t.book.loading, fallback: t.book.fallback }} />
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
