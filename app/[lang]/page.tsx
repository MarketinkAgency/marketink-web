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
        className={`ml-[0.1em] inline-block size-[0.24em] rounded-full bg-blood shadow-[0_0_14px_3px_rgba(225,6,0,0.65)] ${live ? "dot-live" : ""}`}
      />
    </span>
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
        {/* ───────── NAV flotante ───────── */}
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
        <header className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_auto] lg:gap-16">
          <div className="text-center lg:text-left">
          <span className="glass rise mb-9 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[12px] tracking-[0.02em] text-muted">
            <i className="dot-live size-1.5 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.8)]" />
            {t.hero.eyebrow}
          </span>

          <h1 className="rise mx-auto max-w-[15ch] lg:mx-0 text-[clamp(2.5rem,6vw,4.9rem)] font-bold leading-[0.96] tracking-[-0.045em]">
            <span className="text-faint">{t.hero.h1a}</span>
            <br />
            {t.hero.h1b}
            <span
              aria-hidden
              className="ml-[0.05em] inline-block size-[0.1em] translate-y-[-0.02em] rounded-full bg-blood align-baseline shadow-[0_0_34px_9px_rgba(225,6,0,0.6)]"
            />
          </h1>

          <p className="rise mx-auto mt-7 max-w-[46ch] lg:mx-0 text-[clamp(1rem,1.9vw,1.24rem)] leading-relaxed text-muted">
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

        {/* ───────── PROBLEMA ───────── */}
        <section id="problem" className="scroll-mt-24 px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-7 text-[12px] uppercase tracking-[0.2em] text-blood">{t.problem.eyebrow}</p>
            <h2 className="reveal max-w-[16ch] text-[clamp(2.1rem,5.4vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.042em]">
              {t.problem.title} <span className="text-faint">{t.problem.titleEm}</span>
            </h2>
            <div className="reveal mt-9 max-w-[52ch] space-y-4 text-[clamp(1rem,1.7vw,1.16rem)] leading-relaxed text-muted">
              <p>{t.problem.body}</p>
              <p className="text-bone">{t.problem.body2}</p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {t.problem.items.map((it) => (
                <div key={it.n} className="glass reveal rounded-3xl p-8">
                  <span className="text-[12px] tracking-[0.18em] text-blood">{it.n}</span>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.028em]">{it.t}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── EL SISTEMA ───────── */}
        <section id="system" className="scroll-mt-24 px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-7 text-[12px] uppercase tracking-[0.2em] text-blood">{t.system.eyebrow}</p>
            <h2 className="reveal max-w-[15ch] text-[clamp(2.1rem,5.4vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.042em]">
              {t.system.title} <span className="text-faint">{t.system.titleEm}</span>
            </h2>
            <div className="reveal mt-9 max-w-[52ch] space-y-4 text-[clamp(1rem,1.7vw,1.16rem)] leading-relaxed text-muted">
              <p>{t.system.body}</p>
              <p className="text-bone">{t.system.body2}</p>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.system.steps.map((s) => (
                <div key={s.n} className="glass reveal group rounded-3xl p-8">
                  <span className="text-[12px] tracking-[0.18em] text-blood">{s.n}</span>
                  <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.03em]">{s.t}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PARA QUIÉN ───────── */}
        <section id="fit" className="scroll-mt-24 px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-7 text-[12px] uppercase tracking-[0.2em] text-blood">{t.fit.eyebrow}</p>
            <h2 className="reveal max-w-[17ch] text-[clamp(2.1rem,5.4vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.042em]">
              {t.fit.title} <span className="text-faint">{t.fit.titleEm}</span>
            </h2>
            <p className="reveal mt-8 max-w-[46ch] text-[clamp(1rem,1.7vw,1.16rem)] text-muted">{t.fit.sub}</p>

            <div className="mt-16 grid gap-4 lg:grid-cols-2">
              <div className="glass reveal rounded-3xl border-l-2 border-l-blood p-9">
                <h3 className="mb-7 text-[20px] font-semibold tracking-[-0.025em]">{t.fit.yesTitle}</h3>
                <ul className="space-y-4">
                  {t.fit.yes.map((x) => (
                    <li key={x} className="flex gap-4 text-[15.5px] leading-relaxed text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blood" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass reveal rounded-3xl p-9 opacity-70">
                <h3 className="mb-7 text-[20px] font-semibold tracking-[-0.025em] text-muted">{t.fit.noTitle}</h3>
                <ul className="space-y-4">
                  {t.fit.no.map((x) => (
                    <li key={x} className="flex gap-4 text-[15.5px] leading-relaxed text-faint">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-faint" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── PRUEBA ───────── */}
        <section className="px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="reveal mb-9 text-[12px] uppercase tracking-[0.2em] text-blood">{t.proof.eyebrow}</p>
            <blockquote className="reveal text-[clamp(1.35rem,3.2vw,2.35rem)] font-medium leading-[1.3] tracking-[-0.032em]">
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

        {/* ───────── CÓMO EMPEZAMOS ───────── */}
        <section className="px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-7 text-[12px] uppercase tracking-[0.2em] text-blood">{t.how.eyebrow}</p>
            <h2 className="reveal text-[clamp(2.1rem,5.4vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.042em]">
              {t.how.title}
            </h2>
            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {t.how.steps.map((s) => (
                <div key={s.n} className="glass reveal rounded-3xl p-8">
                  <span className="text-[12px] tracking-[0.18em] text-blood">{s.n}</span>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.028em]">{s.t}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="scroll-mt-24 px-6 py-32 sm:py-44">
          <div className="mx-auto max-w-3xl">
            <p className="reveal mb-7 text-[12px] uppercase tracking-[0.2em] text-blood">{t.faq.eyebrow}</p>
            <h2 className="reveal mb-14 text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.04em]">
              {t.faq.title}
            </h2>
            <div className="glass reveal divide-y divide-white/[0.07] overflow-hidden rounded-3xl">
              {t.faq.items.map((f, i) => (
                <details key={f.q} className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-8 py-6 text-[16.5px] font-medium tracking-[-0.022em] marker:hidden">
                    {f.q}
                    <span className="shrink-0 text-xl text-blood transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-8 pb-7 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA FINAL ───────── */}
        <section className="px-6 py-36 text-center sm:py-52">
          <div className="mx-auto max-w-4xl">
            <h2 className="reveal mx-auto max-w-[16ch] text-[clamp(2.4rem,6.4vw,5rem)] font-bold leading-[1] tracking-[-0.045em]">
              <span className="text-faint">{t.final.title}</span> {t.final.titleEm}
              <span
                aria-hidden
                className="ml-[0.05em] inline-block size-[0.1em] rounded-full bg-blood align-baseline shadow-[0_0_34px_9px_rgba(225,6,0,0.6)]"
              />
            </h2>
            <p className="reveal mx-auto mt-8 max-w-[44ch] text-[clamp(1rem,1.8vw,1.2rem)] text-muted">{t.final.sub}</p>
            <div className="reveal mt-11">
              <a
                href={site.call}
                className="inline-block rounded-full bg-blood px-10 py-4.5 text-[16.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_16px_44px_-10px_rgba(225,6,0,0.9)] transition duration-500 hover:-translate-y-1"
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
