import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, site } from "@/lib/copy";
import Ink from "@/components/Ink";
import DmCard from "@/components/DmCard";

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

/** El punto rojo que cierra los titulares. El logo saltando al copy. */
function Period() {
  return (
    <span
      aria-hidden
      className="ml-[0.05em] inline-block size-[0.16em] rounded-full bg-blood align-baseline shadow-[0_0_44px_12px_rgba(225,6,0,0.6)]"
    />
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  const other = lang === "es" ? "en" : "es";

  return (
    <>
      <Ink />

      <div className="relative z-10">
        {/* ───────── NAV ───────── */}
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <nav className="glass flex items-center gap-8 rounded-full py-2.5 pl-6 pr-2.5">
            <Link href={`/${lang}`} aria-label="MarketINK">
              <Wordmark className="text-[16px]" />
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {([["#problem", t.nav.problem], ["#system", t.nav.system], ["#fit", t.nav.fit], ["#faq", t.nav.faq]] as const).map(
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
        <header className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_auto] lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="glass rise mb-9 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[12px] tracking-[0.02em] text-muted">
              <i className="dot-live size-1.5 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.8)]" />
              {t.hero.eyebrow}
            </span>

            <h1 className="rise mx-auto max-w-[13ch] flash-type text-[clamp(2.3rem,5vw,4.3rem)] lg:mx-0">
              <span className="text-faint">{t.hero.h1a}</span>
              <br />
              {t.hero.h1b}
              <Period />
            </h1>

            <p className="rise mx-auto mt-7 max-w-[46ch] text-[clamp(1rem,1.9vw,1.24rem)] leading-relaxed text-muted lg:mx-0">
              {t.hero.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <a
                href={site.call}
                className="rounded-full bg-blood px-9 py-4 text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_14px_38px_-10px_rgba(225,6,0,0.85)] transition duration-500 hover:-translate-y-0.5"
              >
                {t.hero.cta1}
              </a>
              <a
                href="#system"
                className="glass rounded-full px-9 py-4 text-[16px] font-semibold text-bone transition duration-500 hover:-translate-y-0.5"
              >
                {t.hero.cta2}
              </a>
            </div>
            <p className="mt-6 text-[12.5px] tracking-[0.02em] text-faint">{t.hero.note}</p>
          </div>

          <div className="rise flex justify-center lg:justify-end" style={{ animationDelay: "0.25s" }}>
            <DmCard lang={lang} label={t.hero.eyebrow} />
          </div>
        </header>

        {/* ───────── PROBLEMA · título fijo + lista con números fantasma ───────── */}
        <section id="problem" className="scroll-mt-24 px-6 py-28 sm:py-40">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.problem.eyebrow}</p>
              <h2 className="reveal flash-type text-[clamp(2.1rem,4.8vw,3.8rem)]">
                {t.problem.title} <span className="text-faint">{t.problem.titleEm}</span>
              </h2>
              <div className="reveal mt-8 space-y-4 text-[clamp(0.98rem,1.6vw,1.12rem)] leading-relaxed text-muted">
                <p>{t.problem.body}</p>
                <p className="text-bone">{t.problem.body2}</p>
              </div>
            </div>

            <ul className="lg:pt-4">
              {t.problem.items.map((it) => (
                <li
                  key={it.n}
                  className="reveal relative border-b border-white/[0.07] py-10 first:pt-0 last:border-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 right-0 select-none text-[86px] font-extrabold leading-none tracking-tighter text-white/[0.035]"
                  >
                    {it.n}
                  </span>
                  <h3 className="relative text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-[-0.03em]">
                    {it.t}
                  </h3>
                  <p className="relative mt-3 max-w-[44ch] text-[15.5px] leading-relaxed text-muted">{it.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── EL SISTEMA · línea de tinta que atraviesa los pasos ───────── */}
        <section id="system" className="scroll-mt-24 px-6 py-28 sm:py-40">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.system.eyebrow}</p>
              <h2 className="reveal flash-type text-[clamp(2.1rem,4.8vw,3.8rem)]">
                {t.system.title} <span className="text-faint">{t.system.titleEm}</span>
              </h2>
              <div className="reveal mt-8 space-y-4 text-[clamp(0.98rem,1.6vw,1.12rem)] leading-relaxed text-muted">
                <p>{t.system.body}</p>
                <p className="text-bone">{t.system.body2}</p>
              </div>
              <a
                href={site.call}
                className="reveal mt-9 inline-block rounded-full bg-blood px-7 py-3.5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_12px_32px_-10px_rgba(225,6,0,0.85)] transition duration-500 hover:-translate-y-0.5"
              >
                {t.nav.cta}
              </a>
            </div>

            {/* el trazo de la aguja: una sola línea roja que une los seis pasos */}
            <ol className="relative pl-12">
              <span
                aria-hidden
                className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-blood via-blood/45 to-transparent"
              />
              {t.system.steps.map((s) => (
                <li key={s.n} className="reveal relative pb-11 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-12 top-1.5 flex size-[31px] items-center justify-center rounded-full bg-void text-[11px] font-semibold tracking-[0.08em] text-blood ring-1 ring-blood/45"
                  >
                    {s.n}
                  </span>
                  <h3 className="text-[clamp(1.3rem,2.5vw,1.75rem)] font-semibold tracking-[-0.032em]">{s.t}</h3>
                  <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-relaxed text-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── PARA QUIÉN ───────── */}
        <section id="fit" className="scroll-mt-24 px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.fit.eyebrow}</p>
            <h2 className="reveal max-w-[17ch] flash-type text-[clamp(2.1rem,4.8vw,3.8rem)]">
              {t.fit.title} <span className="text-faint">{t.fit.titleEm}</span>
            </h2>
            <p className="reveal mt-7 max-w-[46ch] text-[clamp(0.98rem,1.6vw,1.12rem)] text-muted">{t.fit.sub}</p>

            <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flash-cell reveal border-l-2 border-l-blood p-9 sm:p-11">
                <h3 className="mb-8 text-[clamp(1.15rem,2vw,1.4rem)] font-semibold tracking-[-0.025em]">
                  {t.fit.yesTitle}
                </h3>
                <ul className="space-y-5">
                  {t.fit.yes.map((x) => (
                    <li key={x} className="flex gap-4 text-[16px] leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.6)]" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flash-cell reveal p-9 sm:p-10 opacity-80">
                <h3 className="mb-8 text-[clamp(1.05rem,1.8vw,1.25rem)] font-medium tracking-[-0.02em] text-faint">
                  {t.fit.noTitle}
                </h3>
                <ul className="space-y-5">
                  {t.fit.no.map((x) => (
                    <li key={x} className="flex gap-4 text-[14.5px] leading-relaxed text-faint">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-faint" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── PRUEBA ───────── */}
        <section className="px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <p className="reveal mb-9 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.proof.eyebrow}</p>
            <blockquote className="reveal text-[clamp(1.3rem,3.1vw,2.25rem)] font-medium leading-[1.32] tracking-[-0.032em]">
              <span className="text-blood">«</span>
              {t.proof.quote}
              <span className="text-blood">»</span>
            </blockquote>
            <div className="reveal mt-10">
              <p className="text-[17px] font-semibold tracking-[-0.02em]">{t.proof.name}</p>
              <p className="mt-1 text-[14px] text-muted">{t.proof.role}</p>
              <p className="mt-6 inline-block rounded-full px-4 py-2 text-[12.5px] tracking-[0.02em] text-blood ring-1 ring-blood/30">
                {t.proof.outcome}
              </p>
            </div>
          </div>
        </section>

        {/* ───────── CÓMO EMPEZAMOS · flujo horizontal, no tarjetas ───────── */}
        <section className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.how.eyebrow}</p>
              <h2 className="reveal flash-type text-[clamp(2rem,4.4vw,3.4rem)]">{t.how.title}</h2>
            </div>

            <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
              <span
                aria-hidden
                className="absolute left-[8%] right-[8%] top-[15px] hidden h-px bg-gradient-to-r from-blood/10 via-blood/45 to-blood/10 md:block"
              />
              {t.how.steps.map((s) => (
                <div key={s.n} className="reveal relative text-center">
                  <span className="relative mx-auto mb-7 flex size-8 items-center justify-center rounded-full bg-void text-[11px] font-semibold text-blood ring-1 ring-blood/50">
                    {s.n}
                  </span>
                  <h3 className="text-[18.5px] font-semibold tracking-[-0.028em]">{s.t}</h3>
                  <p className="mx-auto mt-2.5 max-w-[30ch] text-[14.5px] leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="scroll-mt-24 px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-3xl">
            <p className="reveal mb-6 flash-sub text-[11.5px] tracking-[0.22em] text-blood">{t.faq.eyebrow}</p>
            <h2 className="reveal mb-12 flash-type text-[clamp(2rem,4.4vw,3.4rem)]">
              {t.faq.title}
            </h2>
            <div className="divide-y divide-white/[0.07]">
              {t.faq.items.map((f, i) => (
                <details key={f.q} className="reveal group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium tracking-[-0.024em] marker:hidden">
                    {f.q}
                    <span className="shrink-0 text-xl text-blood transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[62ch] pb-7 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA FINAL ───────── */}
        <section className="px-6 py-32 text-center sm:py-48">
          <div className="mx-auto max-w-4xl">
            <h2 className="reveal mx-auto max-w-[16ch] flash-type text-[clamp(2.4rem,6.6vw,5.4rem)]">
              <span className="text-faint">{t.final.title}</span> {t.final.titleEm}
              <Period />
            </h2>
            <p className="reveal mx-auto mt-8 max-w-[44ch] text-[clamp(1rem,1.8vw,1.2rem)] text-muted">{t.final.sub}</p>
            <div className="reveal mt-11">
              <a
                href={site.call}
                className="inline-block rounded-full bg-blood px-10 py-4 text-[16.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_16px_44px_-10px_rgba(225,6,0,0.9)] transition duration-500 hover:-translate-y-1"
              >
                {t.final.cta}
              </a>
              <p className="mt-6 text-[13px] text-faint">{t.final.note}</p>
            </div>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] px-6 py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-9 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Wordmark className="text-[18px]" live={false} />
              <p className="mt-3 max-w-xs text-[14px] text-muted">{t.footer.tagline}</p>
            </div>
            <div>
              <p className="mb-3 text-[10.5px] uppercase tracking-[0.16em] text-faint">{t.footer.follow}</p>
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
