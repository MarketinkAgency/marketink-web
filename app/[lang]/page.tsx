import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang, site } from "@/lib/copy";
import Ink from "@/components/Ink";
import Calculator from "@/components/Calculator";
import StickyCta from "@/components/StickyCta";
import Split from "@/components/Split";
import Count from "@/components/Count";
import BookCall from "@/components/BookCall";
import Spots from "@/components/Spots";
import { legalNav, entity } from "@/lib/legal";
import Nav from "@/components/Nav";
import Glow from "@/components/Glow";
import Consent from "@/components/Consent";
import Funnel from "@/components/Funnel";
import Banda from "@/components/Banda";
import Jsonld from "@/components/Jsonld";
import Analytics from "@/components/Analytics";

/* Portada «hoja de flash» (2026-11): la foto real manda, Anton a escala de
   cartel en las frases que importan y tres fondos que marcan el ritmo
   (negro, hueso y rojo). Sin manchas de tinta, números fantasma ni riel. */

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

function Cta({ href, children, big = false }: { href: string; children: React.ReactNode; big?: boolean }) {
  return (
    <a href={href} className={`btn ${big ? "btn-lg" : ""}`}>
      {children}
    </a>
  );
}

/* Titulares de sección: más grandes que antes, Anton tiene que sonar a cartel. */
const H2 = "misprint flash-type text-[clamp(2.2rem,5.2vw,4.4rem)]";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  const other = lang === "es" ? "en" : "es";
  /* la última palabra del titular va en rojo: CEMENTERIO / GRAVEYARD */
  const h1Words = t.hero.h1.split(" ");
  const h1Last = h1Words.pop();

  return (
    <>
      <Jsonld t={t} lang={lang} />
      <Ink quiet />
      <Glow />
      <Analytics />
      <Consent lang={lang} t={t.consent} />
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
            { href: `/${lang}/webs`, label: t.nav.webs },
            { href: "#book", label: t.book.eyebrow },
            { href: "#faq", label: t.nav.faq },
          ]}
        />

        {/* ───────── HERO — foto real a sangre, una frase de cartel ─────────
             El texto no nace invisible (.stamp y .lift solo usan transform):
             antes el LCP esperaba 2 s a que terminara la animación. */}
        <header className="hero-flash flex min-h-svh flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <Image
              src="/img/hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-flash__img object-cover object-[30%_35%] lg:object-[center_40%]"
            />
            <div className="hero-flash__shade absolute inset-0" />
          </div>

          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-32 sm:pb-16 lg:pb-20">
            <p className="lift mb-6 flex items-center gap-3 flash-sub text-[11px] tracking-[0.22em] text-bone">
              <i className="dot-live size-1.5 shrink-0 rounded-full bg-blood shadow-[0_0_10px_2px_rgba(225,6,0,0.8)]" aria-hidden />
              {t.hero.kicker}
            </p>

            <h1 className="stamp misprint hero-flash__h1 flash-type max-w-[13ch]">
              {h1Words.join(" ")} <span className="text-blood">{h1Last}</span>
              <Period />
            </h1>

            <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div>
                <p className="lift max-w-[50ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-bone/85">
                  {t.hero.sub}
                </p>
                <div className="lift mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                  <a href="#book" className="btn btn-lg justify-center">
                    {t.hero.cta1}
                  </a>
                  <a
                    href="#results"
                    className="self-center text-[14px] font-semibold text-bone underline decoration-blood decoration-2 underline-offset-[7px] transition hover:text-white sm:self-auto"
                  >
                    {t.hero.cta2} →
                  </a>
                </div>
              </div>

              {/* la prueba en la primera pantalla: caras reales, cifra real */}
              <a href="#results" className="proof-chip lift self-start lg:self-end">
                <span className="flex -space-x-2.5" aria-hidden>
                  {t.cases.items.map((c) => (
                    <Image
                      key={c.k}
                      src={c.avatar}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-full border-2 border-void object-cover"
                    />
                  ))}
                </span>
                <span>
                  <span className="block flash-type text-[1.65rem] leading-none text-bone">{t.hero.proof.n}</span>
                  <span className="mt-1.5 block text-[12px] leading-snug text-muted">{t.hero.proof.t}</span>
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* ───────── EL CEMENTERIO — los DM de siempre, en lápidas ─────────
             Las lápidas se levantan del suelo con el scroll y el sello cae
             encima. Es ilustración: el mensaje lo cargan el titular y el texto. */}
        <section aria-labelledby="grave-h" className="overflow-clip px-6 pb-16 pt-10 sm:pb-28 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="reveal mb-8 flash-sub text-[11px] tracking-[0.22em] text-muted">{t.grave.tag}</p>
            <div className="grave-field" aria-hidden>
              {t.grave.stones.map((s) => (
                <div key={s} className="grave-stone">
                  <span className="grave-text flash-type">{s}</span>
                </div>
              ))}
              <span className="grave-stamp">{t.grave.rip}</span>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
              <h2 id="grave-h" className="misprint flash-type text-[clamp(2.4rem,6.4vw,5.6rem)]">
                {t.grave.line} <span className="text-blood">{t.grave.lineEm}</span>
                <Period />
              </h2>
              <p className="reveal max-w-[46ch] text-[15.5px] leading-relaxed text-muted lg:pb-3">{t.grave.sub}</p>
            </div>
          </div>
        </section>

        {/* ───────── 01 · CASOS REALES — la prueba va primero ───────── */}
        <section id="results" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl">
            <Tag n="01">{t.cases.eyebrow}</Tag>
            <Split as="h2" text={t.cases.title} className={`max-w-[18ch] ${H2}`} />
            <p className="reveal mt-6 max-w-[56ch] text-[15.5px] leading-relaxed text-muted">{t.cases.sub}</p>
          </div>

          {/* cada caso ocupa su propio bloque, no una tarjeta */}
          <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
            {t.cases.items.map((c, i) => (
              <article key={c.k} className="mx-auto max-w-6xl">
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
                  {/* izquierda: la historia */}
                  <div>
                    <p className="reveal mb-6 flex items-center gap-3 flash-sub text-[10.5px] tracking-[0.22em] text-muted">
                      <span className="text-bone">{String(i + 1).padStart(2, "0")}</span>
                      {c.studio} · {c.city}
                    </p>

                    <Split as="h3" text={c.name} className="flash-type text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.9]" />

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
                              <p className="flash-type text-[clamp(1.5rem,2.6vw,2.1rem)] tabular-nums text-bone">
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
                      <span className="text-bone transition group-hover:translate-x-0.5">{t.trust.seeAll} →</span>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="reveal mx-auto mt-14 max-w-6xl text-[11.5px] leading-relaxed text-faint">{t.cases.note}</p>
        </section>

        {/* ───────── EL TRABAJO — la hoja de flash pegada a la pared ───────── */}
        <section aria-labelledby="work-h" className="work-strip border-y border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
            <p className="reveal mb-5 flash-sub text-[11px] tracking-[0.22em] text-muted">{t.work.eyebrow}</p>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <Split as="h2" text={t.work.title} className="flash-type text-[clamp(2.4rem,6.4vw,5.6rem)]" />
              <p className="reveal max-w-[40ch] text-[14.5px] leading-relaxed text-muted lg:pb-3">{t.work.sub}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/[0.08] md:grid-cols-4">
            {["tat1", "tat2", "tat3", "tat4"].map((k, i) => (
              <figure key={k} className="relative aspect-square overflow-clip bg-void">
                <Image
                  src={`/img/${k}.webp`}
                  alt={t.work.alts[i]}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* ───────── 02 · EL DIAGNÓSTICO ───────── */}
        <section id="problem" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Tag n="02">{t.problem.eyebrow}</Tag>
              {/* columna estrecha y fija: aquí el titular no puede crecer como los demás o se mete bajo la barra */}
              <h2 className="flash-type text-[clamp(2rem,3.6vw,3.2rem)]">
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

        {/* ───────── 03 · CALCULADORA ───────── */}
        <section id="cost" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl">
            <Tag n="03">{t.calc.eyebrow}</Tag>
            <Split as="h2" text={t.calc.title} className={`max-w-[18ch] ${H2}`} />
            <p className="reveal mt-6 max-w-[46ch] text-[15.5px] text-muted">{t.calc.sub}</p>

            <div className="reveal mt-14">
              <Calculator t={t.calc} lang={lang} />
            </div>

            <div className="reveal mt-12">
              <Cta href="#book" big>{t.calc.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── BANDA — justo después de la cifra que pierde ───────── */}
        <Banda line={t.bandas[0].line} cta={t.bandas[0].cta} href="#book" lang={lang} spotsLabels={t.book} />

        {/* ───────── BANDA CINÉTICA — el recorrido, a escala de cartel ─────────
             Se mueve con el scroll, no sola: nada se anima si nadie hace scroll. */}
        <div className="kinetic" aria-hidden>
          {[false, true].map((hollow) => (
            <div key={String(hollow)} className={`kinetic-run ${hollow ? "hollow" : ""}`}>
              {[...t.funnel.steps, ...t.funnel.steps, ...t.funnel.steps].map((s, i) => (
                <span key={i}>{s.k}</span>
              ))}
            </div>
          ))}
        </div>

        {/* ───────── 04 · EL RECORRIDO ───────── */}
        <section id="system" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl">
            <Tag n="04">{t.funnel.tag}</Tag>
            <Split as="h2" text={t.funnel.title} className={`max-w-[18ch] ${H2}`} />
            <p className="reveal mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">{t.funnel.sub}</p>

            <div className="mt-16">
              <Funnel t={t.funnel} />
            </div>

            <p className="reveal mt-12 max-w-[54ch] border-l-2 border-blood pl-5 text-[15.5px] leading-relaxed text-bone">
              {t.funnel.follow}
            </p>
          </div>
        </section>

        {/* ───────── 05 · QUÉ SE INSTALA — la hoja, en hueso ─────────
             El único cambio de papel de la página: las cinco piezas como
             diseños numerados de una hoja de flash clavada en la pared. */}
        <section id="assets" className="sheet scroll-mt-24 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Tag n="05">{t.assets.tag}</Tag>
            <Split as="h2" text={t.assets.title} className={`max-w-[18ch] ${H2}`} />
            <p className="reveal mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-void/75">{t.assets.sub}</p>

            <ol className="mt-14 grid gap-5 md:grid-cols-6">
              {t.assets.items.map((a, i) => (
                <li key={a.k} className={`sheet-cell reveal ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
                  <span className="sheet-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 flash-type text-[clamp(1.5rem,2.4vw,2rem)]">{a.k}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-void/80">{a.d}</p>
                  {/* las tareas, en pequeño: son el medio, no el producto */}
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-void/15 pt-4">
                    {a.t.map((x) => (
                      <li key={x} className="text-[12.5px] leading-snug text-void/70">
                        {x}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── RUPTURA ───────── */}
        <section className="rupture px-6 py-24 text-center sm:py-36">
          {/* la palabra de fondo, estampada una y otra vez sobre el rojo */}
          <div className="rupture-band" aria-hidden>
            <div className="rupture-run">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>{t.rupture.word}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <Split as="p" text={t.rupture.a} className="flash-type text-[clamp(1.7rem,4.6vw,3.4rem)] opacity-60" />
            <Split as="p" text={t.rupture.b} className="mt-1.5 flash-type text-[clamp(2.2rem,6.4vw,5rem)]" delay={220} />
            <Split as="p" text={t.rupture.c} className="mt-1.5 flash-type text-[clamp(1.7rem,4.6vw,3.4rem)] opacity-60" delay={460} />
            {/* blanco puro: al 75 % sobre el rojo daba ≈3,2:1, por debajo de AA */}
            <p className="reveal mx-auto mt-10 max-w-[52ch] text-[15.5px] leading-relaxed text-white">{t.rupture.d}</p>
          </div>
        </section>

        {/* ───────── 06 · 90 DÍAS ───────── */}
        <section id="process" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl">
            <Tag n="06">{t.process.eyebrow}</Tag>
            <Split as="h2" text={t.process.title} className={`max-w-[20ch] ${H2}`} />
            <p className="reveal mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{t.process.sub}</p>

            <div className="mt-16 grid gap-px bg-white/[0.08] md:grid-cols-4">
              {t.process.phases.map((p) => (
                <div key={p.d} className="spot reveal bg-void p-8">
                  <p className="flash-sub text-[10.5px] tracking-[0.18em] text-muted">{p.d}</p>
                  <h3 className="mt-4 flash-type text-[clamp(1.3rem,2.2vw,1.7rem)]">{p.t}</h3>
                  <ul className="mt-6 space-y-3">
                    {p.items.map((x) => (
                      <li key={x} className="flex gap-3 text-[13.5px] leading-snug text-muted">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-blood" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="reveal mt-12 max-w-[46ch] text-[clamp(1.1rem,2.1vw,1.5rem)] font-semibold leading-snug tracking-[-0.025em] text-muted">
              {t.process.close} <span className="text-bone">{t.process.closeEm}</span>
            </p>
            <div className="reveal mt-9">
              <Cta href="#book">{t.nav.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ───────── 07 · EQUIPO ───────── */}
        <section id="team" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <Tag n="07">{t.team.eyebrow}</Tag>
                <Split as="h2" text={t.team.title} className={`max-w-[16ch] ${H2}`} />
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
                    <p className="mt-3 flash-sub text-[10.5px] tracking-[0.18em] text-bone">{p.cred}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 08 · LO QUE SÍ GARANTIZAMOS ───────── */}
        <section id="guarantee" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <Tag n="08">{t.guarantee.tag}</Tag>
                <Split as="h2" text={t.guarantee.title} className={`max-w-[16ch] ${H2}`} />
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

        {/* ───────── PUENTE A LAS WEBS ─────────
            No es una sección numerada a propósito: es una salida lateral
            para quien todavía no tiene dónde mandar a la gente. */}
        <section className="border-y border-white/[0.08] px-6 py-14 sm:py-20">
          <div className="reveal mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 flash-sub text-[10.5px] tracking-[0.2em] text-muted">{t.websTeaser.tag}</p>
              <h2 className="max-w-[22ch] flash-type text-[clamp(1.6rem,3.6vw,2.7rem)]">{t.websTeaser.title}</h2>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-muted">{t.websTeaser.body}</p>
            </div>
            <div className="flex flex-none items-center gap-5">
              <span className="flash-sub text-[11px] tracking-[0.16em] text-muted">{t.websTeaser.price}</span>
              <Link href={`/${lang}/webs`} className="btn btn-ghost">
                {t.websTeaser.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── 09 · FAQ ───────── */}
        <section id="faq" className="sec scroll-mt-24 overflow-hidden px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-3xl">
            <Tag n="09">{t.faq.eyebrow}</Tag>
            <Split as="h2" text={t.faq.title} className={`mb-12 max-w-[18ch] ${H2}`} />
            <div className="divide-y divide-white/[0.07]">
              {t.faq.items.map((f, i) => (
                <details key={f.q} className="reveal group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[16.5px] font-semibold tracking-[-0.024em] marker:hidden">
                    {f.q}
                    <span className="shrink-0 text-xl text-blood transition-transform duration-500 group-open:rotate-45" aria-hidden>
                      +
                    </span>
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

        {/* ───────── 10 · AGENDAR — CALENDARIO INCRUSTADO ───────── */}
        <section id="book" className="scroll-mt-24 border-t border-white/[0.07] px-6 py-16 sm:py-28">
          <div className="relative mx-auto max-w-5xl">
            <Tag n="10">{t.audit.tag}</Tag>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_auto] lg:items-end">
              <div>
                {/* la oferta tiene nombre propio, no es «una llamada» */}
                <p className="reveal mb-4 inline-block border border-blood/60 px-3.5 py-2 flash-sub text-[10.5px] tracking-[0.2em] text-bone">
                  {t.audit.name}
                </p>
                <Split as="h2" text={t.audit.title} className={`max-w-[18ch] ${H2}`} />
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
                    <span className="mt-[3px] shrink-0 flash-sub text-[11px] tracking-[0.14em] text-bone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-[44ch] text-[14.5px] leading-relaxed text-muted">{g}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-9 max-w-[52ch] border-l-2 border-blood pl-4 text-[14.5px] leading-relaxed text-bone">
                {t.audit.noPitch}
              </p>

              {/* La objeción que más gente se lleva sin decirla en voz alta.
                  Callarla no la elimina: hace que el visitante se invente
                  una cifra —siempre la peor— y se vaya sin agendar. */}
              <p className="mt-5 max-w-[58ch] text-[13.5px] leading-relaxed text-faint">{t.audit.priceNote}</p>
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
