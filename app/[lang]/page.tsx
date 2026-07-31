import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, site } from "@/lib/copy";
import Ink from "@/components/Ink";
import DmCard from "@/components/DmCard";
import Calculator from "@/components/Calculator";
import StickyCta from "@/components/StickyCta";

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
      <StickyCta href={site.call} label={t.sticky} />

      <div className="relative z-10">
        {/* ───────── NAV ───────── */}
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <nav className="glass flex items-center gap-7 rounded-full py-2.5 pl-6 pr-2.5">
            <Link href={`/${lang}`} aria-label="MarketINK">
              <Wordmark className="text-[16px]" />
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {([["#system", t.nav.system], ["#results", t.nav.results], ["#process", t.nav.process], ["#faq", t.nav.faq]] as const).map(
                ([href, label]) => (
                  <a key={href} href={href} className="text-[13.5px] text-muted transition-colors duration-300 hover:text-bone">
                    {label}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/${other}`}
                className="rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ring-1 ring-white/12 transition hover:text-bone hover:ring-white/30"
              >
                {other}
              </Link>
              <a
                href={site.call}
                className="rounded-full bg-blood px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_24px_-8px_rgba(225,6,0,0.8)] transition duration-500 hover:-translate-y-0.5"
              >
                {t.nav.cta}
              </a>
            </div>
          </nav>
        </div>

        {/* ───────── HERO ───────── */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden>
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

              <h1 className="rise mx-auto max-w-[16ch] flash-type text-[clamp(2.2rem,4.7vw,4rem)] lg:mx-0">
                <span className="text-faint">{t.hero.h1a}</span> {t.hero.h1b}
                <Period />
              </h1>

              <p className="rise mx-auto mt-7 max-w-[52ch] text-[clamp(0.97rem,1.6vw,1.13rem)] leading-relaxed text-muted lg:mx-0">
                {t.hero.sub}
              </p>

              <p className="rise mx-auto mt-5 max-w-[48ch] border-l-2 border-signal/60 pl-4 text-left text-[14.5px] leading-relaxed text-bone lg:mx-0">
                {t.hero.support}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                <Cta href={site.call} big>{t.hero.cta1}</Cta>
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
              <DmCard lang={lang} label={t.hero.eyebrow} />
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
                  <p className="flash-type text-[clamp(1.8rem,3.4vw,2.7rem)] tabular-nums text-signal">{m.n}</p>
                  <p className="mt-2.5 text-[13px] leading-snug text-muted">{m.t}</p>
                </div>
              ))}
            </div>
            <p className="reveal mt-10 max-w-[70ch] text-[11.5px] leading-relaxed text-faint">{t.metrics.disclaimer}</p>
          </div>
        </section>

        {/* ───────── VIDEO ───────── */}
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>{t.video.eyebrow}</Eyebrow>
            <h2 className="reveal mx-auto max-w-[20ch] flash-type text-[clamp(1.8rem,4vw,3rem)]">{t.video.title}</h2>
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
              <Cta href={site.call}>{t.video.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── PROBLEMA ───────── */}
        <section id="problem" className="scroll-mt-24 px-6 py-24 sm:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{t.problem.eyebrow}</Eyebrow>
              <h2 className="reveal flash-type text-[clamp(2rem,4.4vw,3.4rem)]">
                {t.problem.title} <span className="text-faint">{t.problem.titleEm}</span>
              </h2>
              <p className="reveal mt-9 max-w-[40ch] text-[clamp(1.05rem,1.9vw,1.35rem)] font-semibold leading-snug tracking-[-0.02em]">
                {t.problem.close} <span className="text-blood">{t.problem.closeEm}</span>
              </p>
            </div>

            <ul>
              {t.problem.items.map((it) => (
                <li key={it.n} className="reveal relative border-b border-white/[0.07] py-9 first:pt-0 last:border-0 last:pb-0">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-1 right-0 select-none text-[80px] font-black leading-none tracking-tighter text-white/[0.035]"
                  >
                    {it.n}
                  </span>
                  <h3 className="relative text-[clamp(1.2rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em]">{it.t}</h3>
                  <p className="relative mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">{it.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── EL TRABAJO ───────── */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="reveal mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-5 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.work.eyebrow}</p>
                <h2 className="flash-type text-[clamp(1.8rem,4vw,3rem)]">{t.work.title}</h2>
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
        <section id="system" className="scroll-mt-24 px-6 py-24 sm:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{t.system.eyebrow}</Eyebrow>
              <h2 className="reveal flash-type text-[clamp(2rem,4.4vw,3.4rem)]">
                {t.system.title} <span className="text-blood">{t.system.titleEm}</span>
              </h2>
              <p className="reveal mt-8 max-w-[46ch] text-[clamp(0.98rem,1.6vw,1.12rem)] leading-relaxed text-muted">
                {t.system.sub}
              </p>
              <p className="reveal mt-5 max-w-[46ch] border-l-2 border-blood pl-4 text-[15px] leading-relaxed text-bone">
                {t.system.note}
              </p>
              <div className="reveal mt-9">
                <Cta href={site.call}>{t.nav.cta}</Cta>
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
        <section className="px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.includes.eyebrow}</Eyebrow>
            <h2 className="reveal max-w-[22ch] flash-type text-[clamp(1.9rem,4.2vw,3.2rem)]">{t.includes.title}</h2>

            <div className="mt-14 grid gap-px bg-white/[0.08] md:grid-cols-3">
              {t.includes.groups.map((g, i) => (
                <div key={g.k} className="reveal bg-void p-9 sm:p-10">
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
          </div>
        </section>

        {/* ───────── CASO REAL ───────── */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-36">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <Image src="/img/estudio.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
            <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
          </div>

          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.caseStudy.eyebrow}</Eyebrow>
            <h2 className="reveal max-w-[20ch] flash-type text-[clamp(2rem,4.6vw,3.6rem)]">{t.caseStudy.title}</h2>
            <p className="reveal mt-6 max-w-[52ch] text-[15.5px] text-muted">{t.caseStudy.sub}</p>

            <div className="mt-12 grid gap-px bg-white/[0.08] sm:grid-cols-3">
              {t.caseStudy.figures.map((f) => (
                <div key={f.k} className="reveal bg-void px-8 py-9">
                  <p className="flash-type text-[clamp(1.9rem,3.6vw,2.9rem)] tabular-nums text-signal">{f.v}</p>
                  <p className="mt-3 text-[13px] text-muted">{f.k}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="reveal border border-white/[0.07] p-8 sm:p-10">
                <h3 className="flash-sub mb-7 text-[11px] tracking-[0.2em] text-faint">{t.caseStudy.beforeTitle}</h3>
                <ul className="space-y-3.5">
                  {t.caseStudy.before.map((x) => (
                    <li key={x} className="flex gap-3.5 text-[15px] text-faint">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-faint" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flash-cell reveal border-l-2 border-l-signal p-8 sm:p-10">
                <h3 className="flash-sub mb-7 text-[11px] tracking-[0.2em] text-signal">{t.caseStudy.afterTitle}</h3>
                <ul className="space-y-3.5">
                  {t.caseStudy.after.map((x) => (
                    <li key={x} className="flex gap-3.5 text-[15.5px]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_10px_2px_rgba(47,227,160,0.5)]" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="reveal mt-8 max-w-[76ch] text-[11.5px] leading-relaxed text-faint">{t.caseStudy.disclaimer}</p>
          </div>
        </section>

        {/* ───────── CALCULADORA ───────── */}
        <section className="px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.calc.eyebrow}</Eyebrow>
            <h2 className="reveal max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]">{t.calc.title}</h2>
            <p className="reveal mt-6 max-w-[46ch] text-[15.5px] text-muted">{t.calc.sub}</p>

            <div className="reveal mt-14">
              <Calculator t={t.calc} lang={lang} />
            </div>

            <div className="reveal mt-12">
              <Cta href={site.call} big>{t.calc.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── PARA QUIÉN ───────── */}
        <section id="fit" className="scroll-mt-24 px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.fit.eyebrow}</Eyebrow>
            <h2 className="reveal max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]">{t.fit.title}</h2>

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
        <section id="process" className="scroll-mt-24 px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <h2 className="reveal max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]">{t.process.title}</h2>
            <p className="reveal mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.process.sub}</p>

            <div className="mt-16 grid gap-px bg-white/[0.08] md:grid-cols-4">
              {t.process.phases.map((p) => (
                <div key={p.d} className="reveal bg-void p-8">
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
              <Cta href={site.call}>{t.nav.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── TESTIMONIO ───────── */}
        <section className="px-6 py-24 sm:py-36">
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
        <section id="faq" className="scroll-mt-24 px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 className="reveal mb-12 max-w-[20ch] flash-type text-[clamp(1.9rem,4.2vw,3.2rem)]">{t.faq.title}</h2>
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
              <Cta href={site.call}>{t.nav.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── CTA FINAL ───────── */}
        <section className="relative overflow-hidden px-6 py-32 text-center sm:py-48">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <Image src="/img/textura.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.3]" />
            <div className="absolute inset-0 bg-gradient-to-b from-void via-void/72 to-void" />
          </div>
          <div className="mx-auto max-w-4xl">
            <h2 className="reveal mx-auto max-w-[18ch] flash-type text-[clamp(2.1rem,5.4vw,4.4rem)]">
              {t.final.title}
              <Period />
            </h2>
            <p className="reveal mx-auto mt-8 max-w-[52ch] text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-muted">
              {t.final.sub}
            </p>
            <div className="reveal mt-11">
              <Cta href={site.call} big>{t.final.cta}</Cta>
            </div>
            <p className="reveal mx-auto mt-8 max-w-[56ch] text-[13.5px] leading-relaxed text-faint">{t.final.support}</p>
            <p className="reveal mt-6 text-[13.5px] font-semibold text-blood">{t.final.urgency}</p>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] px-6 pb-28 pt-14 lg:pb-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-9 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Wordmark className="text-[18px]" live={false} />
              <p className="mt-3 max-w-xs text-[14px] text-muted">{t.footer.tagline}</p>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{t.footer.follow}</p>
              <div className="flex gap-5 text-[14px] text-muted">
                <a href={site.instagram} className="transition hover:text-bone">Instagram</a>
                <a href={site.whatsapp} className="transition hover:text-bone">WhatsApp</a>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-6xl text-[12px] text-faint">
            © {new Date().getFullYear()} Roca Digital LLC. {t.footer.rights}
          </p>
        </footer>
      </div>
    </>
  );
}
