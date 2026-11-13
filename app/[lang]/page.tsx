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
   (negro, hueso y rojo), alternándose de sección en sección. Todo va a lo
   ancho de la pantalla (.wrap): nada encerrado en una columna estrecha. */

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

/* Titulares de sección a escala de cartel: con todo el ancho disponible,
   Anton tiene que llenar la pantalla como el titular del hero. */
const H2 = "misprint flash-type text-[clamp(2.4rem,6.4vw,6.6rem)]";

/** Cabecera de sección: titular grande a la izquierda y la bajada abajo a la derecha. */
function SecHead({
  n,
  tag,
  title,
  sub,
  light = false,
}: {
  n: string;
  tag: string;
  title: string;
  sub?: string;
  /** sobre la hoja hueso, el texto secundario va en negro al 75 % */
  light?: boolean;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
      <div>
        <Tag n={n}>{tag}</Tag>
        <Split as="h2" text={title} className={H2} />
      </div>
      {sub && (
        <p
          className={`reveal max-w-[44ch] text-[15.5px] leading-relaxed lg:pb-3 ${light ? "text-void/75" : "text-muted"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  const other = lang === "es" ? "en" : "es";
  /* la última palabra del titular va en rojo: CEMENTERIO / GRAVEYARD */
  const h1Words = t.hero.h1.split(" ");
  const h1Last = h1Words.pop();
  /* en el diagnóstico, la palabra que importa va en rojo: CONVERSIÓN */
  const [diagPre, diagPost] = t.problem.titleEm.split(t.problem.mark);

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

          <div className="wrap pb-12 pt-32 sm:pb-16 lg:pb-20">
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
        <section aria-labelledby="grave-h" className="overflow-clip pb-16 pt-10 sm:pb-28 sm:pt-16">
          <div className="wrap">
            <p className="reveal mb-8 flash-sub text-[11px] tracking-[0.22em] text-muted">{t.grave.tag}</p>
            <div className="grave-field" aria-hidden>
              {t.grave.stones.map((s) => (
                <div key={s} className="grave-stone">
                  <span className="grave-text flash-type">{s}</span>
                </div>
              ))}
              <span className="grave-stamp">{t.grave.rip}</span>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
              <h2 id="grave-h" className="misprint flash-type text-[clamp(2.4rem,6.4vw,6.6rem)]">
                {t.grave.line} <span className="text-blood">{t.grave.lineEm}</span>
                <Period />
              </h2>
              <p className="reveal max-w-[44ch] text-[15.5px] leading-relaxed text-muted lg:pb-3">{t.grave.sub}</p>
            </div>
          </div>
        </section>

        {/* ───────── 01 · CASOS REALES — la prueba va primero ───────── */}
        <section id="results" className="sec scroll-mt-24 overflow-clip py-16 sm:py-28">
          <div className="wrap">
            <SecHead n="01" tag={t.cases.eyebrow} title={t.cases.title} sub={t.cases.sub} />
          </div>

          {/* cada caso ocupa su propio bloque, no una tarjeta */}
          <div className="mt-14 space-y-20 sm:mt-24 sm:space-y-32">
            {t.cases.items.map((c, i) => (
              <article key={c.k} className="wrap">
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
                  {/* izquierda: la historia */}
                  <div>
                    <p className="reveal mb-6 flex items-center gap-3 flash-sub text-[10.5px] tracking-[0.22em] text-muted">
                      <span className="text-bone">{String(i + 1).padStart(2, "0")}</span>
                      {c.studio} · {c.city}
                    </p>

                    <Split as="h3" text={c.name} className="flash-type text-[clamp(3.6rem,11vw,10rem)] leading-[0.9]" />

                    {/* la cifra manda */}
                    <div className="reveal mt-9 border-y border-white/[0.09] py-8">
                      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="flash-type text-[clamp(2.8rem,7vw,5.6rem)] text-blood">{c.big}</span>
                        <span className="flash-type text-[clamp(1.1rem,2.4vw,1.9rem)] text-bone">{c.unit}</span>
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
                              <p className="flash-type text-[clamp(1.5rem,2.6vw,2.3rem)] tabular-nums text-bone">
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
                      sizes="(max-width: 1024px) 100vw, 400px"
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

          <div className="wrap">
            <p className="reveal mt-14 max-w-[90ch] text-[11.5px] leading-relaxed text-faint">{t.cases.note}</p>
          </div>
        </section>

        {/* ───────── EL TRABAJO — la hoja de flash pegada a la pared ───────── */}
        <section aria-labelledby="work-h" className="work-strip border-y border-white/[0.08]">
          <div className="wrap py-14 sm:py-20">
            <p className="reveal mb-5 flash-sub text-[11px] tracking-[0.22em] text-muted">{t.work.eyebrow}</p>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <Split as="h2" text={t.work.title} className="flash-type text-[clamp(2.4rem,6.4vw,6.6rem)]" />
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

        {/* ───────── 02 · EL DIAGNÓSTICO — en hueso ─────────
             Las cuatro fugas como renglones de una hoja: número rojo gigante,
             nombre y explicación. Con el ratón encima, el renglón se invierte
             a negro, como una lámina que se arranca de la pared. */}
        <section id="problem" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap">
            <Tag n="02">{t.problem.eyebrow}</Tag>
            <h2 className="flash-type">
              <span className="reveal diag-hollow block text-[clamp(1.9rem,4.6vw,4.8rem)]">{t.problem.title}</span>
              <span className="reveal misprint mt-1 block text-[clamp(2.5rem,7.2vw,7.6rem)]">
                {diagPre}
                <span className="text-blood">{t.problem.mark}</span>
                {diagPost}
              </span>
            </h2>

            <ol className="diag mt-14 sm:mt-24">
              {t.problem.items.map((it) => (
                <li key={it.n} className="diag-row reveal">
                  <span className="diag-n" aria-hidden>
                    {it.n}
                  </span>
                  <h3 className="diag-t flash-type">{it.t}</h3>
                  <p className="diag-d">{it.d}</p>
                </li>
              ))}
            </ol>

            <p className="diag-close reveal flash-type">
              {t.problem.close} <span className="text-blood">{t.problem.closeEm}</span>
            </p>
          </div>
        </section>

        {/* ───────── 03 · CALCULADORA — la cifra a escala de cartel ───────── */}
        <section id="cost" className="sec scroll-mt-24 overflow-clip py-20 sm:py-32">
          <div className="wrap">
            <SecHead n="03" tag={t.calc.eyebrow} title={t.calc.title} sub={t.calc.sub} />

            <div className="reveal mt-14 sm:mt-20">
              <Calculator t={t.calc} lang={lang} />
            </div>

            <div className="reveal mt-12">
              <Cta href="#book" big>
                {t.calc.cta}
              </Cta>
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

        {/* ───────── 04 · EL RECORRIDO — la cadena de izquierda a derecha ───────── */}
        <section id="system" className="sec scroll-mt-24 overflow-clip py-20 sm:py-32">
          <div className="wrap">
            <SecHead n="04" tag={t.funnel.tag} title={t.funnel.title} sub={t.funnel.sub} />
            <div className="mt-16 sm:mt-24">
              <Funnel t={t.funnel} />
            </div>
          </div>
        </section>

        {/* ───────── 05 · QUÉ SE INSTALA — la hoja, en hueso ─────────
             Las cinco piezas como diseños numerados de una hoja de flash
             clavada en la pared. */}
        <section id="assets" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap">
            <SecHead n="05" tag={t.assets.tag} title={t.assets.title} sub={t.assets.sub} light />

            <ol className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-6">
              {t.assets.items.map((a, i) => (
                <li key={a.k} className={`sheet-cell reveal ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
                  <span className="sheet-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 flash-type text-[clamp(1.5rem,2.4vw,2.3rem)]">{a.k}</h3>
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

          <div className="relative mx-auto max-w-5xl">
            <Split as="p" text={t.rupture.a} className="flash-type text-[clamp(1.7rem,4.6vw,3.6rem)] opacity-60" />
            <Split as="p" text={t.rupture.b} className="mt-1.5 flash-type text-[clamp(2.2rem,6.6vw,5.6rem)]" delay={220} />
            <Split as="p" text={t.rupture.c} className="mt-1.5 flash-type text-[clamp(1.7rem,4.6vw,3.6rem)] opacity-60" delay={460} />
            {/* blanco puro: al 75 % sobre el rojo daba ≈3,2:1, por debajo de AA */}
            <p className="reveal mx-auto mt-10 max-w-[52ch] text-[15.5px] leading-relaxed text-white">{t.rupture.d}</p>
          </div>
        </section>

        {/* ───────── 06 · 90 DÍAS — en hueso, una regla de 90 días a escala ─────────
             En escritorio cada fase ocupa el ancho de los días que dura
             (15, 15, 30 y 30) y la regla de arriba se llena de rojo con el scroll. */}
        <section id="process" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap">
            <SecHead n="06" tag={t.process.eyebrow} title={t.process.title} sub={t.process.sub} light />

            <div className="days mt-16 sm:mt-24">
              <div className="days-ruler" aria-hidden />
              <ol className="days-grid">
                {t.process.phases.map((p) => (
                  <li key={p.d} className="days-col reveal">
                    <p className="days-d flash-type">{p.d}</p>
                    <h3 className="mt-2 flash-type text-[clamp(1.5rem,2.2vw,2.2rem)]">{p.t}</h3>
                    <ul className="mt-6 space-y-2.5">
                      {p.items.map((x) => (
                        <li key={x} className="flex gap-3 text-[14px] leading-snug text-void/75">
                          <span className="mt-[6px] size-1.5 shrink-0 bg-blood" aria-hidden />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16 flex flex-col gap-8 sm:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <p className="reveal max-w-[46ch] text-[clamp(1.1rem,2.1vw,1.5rem)] font-semibold leading-snug tracking-[-0.025em] text-void/70">
                {t.process.close} <span className="text-void">{t.process.closeEm}</span>
              </p>
              <div className="reveal flex-none">
                <Cta href="#book">{t.nav.cta}</Cta>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 07 · EQUIPO ───────── */}
        <section id="team" className="sec scroll-mt-24 overflow-clip py-20 sm:py-32">
          <div className="wrap">
            <SecHead n="07" tag={t.team.eyebrow} title={t.team.title} sub={t.team.sub} />

            <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-6">
              {t.team.people.map((p) => (
                <figure key={p.k} className="reveal group relative overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={1000}
                    height={1250}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="aspect-[4/4.4] w-full object-cover object-top transition duration-[900ms] group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/92 to-transparent px-6 pb-7 pt-24 sm:px-8">
                    <p className="flash-type text-[clamp(2.2rem,4.4vw,4.2rem)] leading-none">{p.name}</p>
                    <p className="mt-2.5 text-[14.5px] text-muted">{p.role}</p>
                    <p className="mt-3 flash-sub text-[10.5px] tracking-[0.18em] text-bone">{p.cred}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 08 · LO QUE SÍ GARANTIZAMOS — en hueso, con sello ───────── */}
        <section id="guarantee" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <Tag n="08">{t.guarantee.tag}</Tag>
              <Split as="h2" text={t.guarantee.title} className={H2} />
              <p className="reveal mt-7 max-w-[46ch] text-[15.5px] leading-relaxed text-void/75">{t.guarantee.sub}</p>
              {/* el sello repite lo que dice el texto: es decoración */}
              <p className="seal mt-10" aria-hidden>
                {t.guarantee.stamp}
              </p>
            </div>

            <ol className="self-end border-y-2 border-void">
              {t.guarantee.items.map((g, i) => (
                <li key={g} className="reveal flex gap-6 border-b border-void/20 py-6 last:border-b-0">
                  <span className="w-[2ch] flex-none flash-type text-[1.9rem] leading-none text-blood" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15.5px] leading-relaxed text-void">{g}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── PUENTE A LAS WEBS ─────────
            No es una sección numerada a propósito: es una salida lateral
            para quien todavía no tiene dónde mandar a la gente. */}
        <section className="py-14 sm:py-20">
          <div className="reveal wrap flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 flash-sub text-[10.5px] tracking-[0.2em] text-muted">{t.websTeaser.tag}</p>
              <h2 className="max-w-[24ch] flash-type text-[clamp(1.8rem,4vw,3.4rem)]">{t.websTeaser.title}</h2>
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

        {/* ───────── 09 · FAQ — en hueso, título fijo a la izquierda ───────── */}
        <section id="faq" className="sheet scroll-mt-24 py-24 sm:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Tag n="09">{t.faq.eyebrow}</Tag>
              <Split as="h2" text={t.faq.title} className={H2} />
              <div className="reveal mt-10 hidden lg:block">
                <Cta href="#book">{t.nav.cta}</Cta>
              </div>
            </div>

            <div>
              <div className="border-y-2 border-void">
                {t.faq.items.map((f, i) => (
                  <details key={f.q} className="reveal group border-b border-void/15 last:border-b-0" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-semibold tracking-[-0.024em] text-void marker:hidden">
                      {f.q}
                      <span
                        className="shrink-0 text-[30px] font-semibold leading-none text-blood transition-transform duration-500 group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[64ch] pb-7 text-[15px] leading-relaxed text-void/75">{f.a}</p>
                  </details>
                ))}
              </div>
              <div className="reveal mt-10 lg:hidden">
                <Cta href="#book">{t.nav.cta}</Cta>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 10 · AGENDAR — la oferta a la izquierda, el calendario a la derecha ───────── */}
        <section id="book" className="scroll-mt-24 py-20 sm:py-32">
          <div className="wrap grid gap-14 xl:grid-cols-[minmax(0,1fr)_640px] xl:gap-16">
            <div>
              <Tag n="10">{t.audit.tag}</Tag>

              {/* la oferta tiene nombre propio, no es «una llamada» */}
              <p className="reveal mb-4 inline-block border border-blood/60 px-3.5 py-2 flash-sub text-[10.5px] tracking-[0.2em] text-bone">
                {t.audit.name}
              </p>
              <Split as="h2" text={t.audit.title} className={H2} />
              <p className="reveal mt-6 max-w-[52ch] text-[16px] leading-relaxed text-bone">{t.audit.promise}</p>

              <div className="reveal mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
                <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                    {t.audit.free}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                    {t.audit.dur}
                  </span>
                </p>
                <Spots lang={lang} labels={t.book} />
              </div>

              {/* qué te llevas: la lista es la oferta */}
              <div className="reveal mt-12 border-t border-white/[0.1] pt-9">
                <p className="mb-7 flash-sub text-[10.5px] tracking-[0.2em] text-faint">{t.audit.getTitle}</p>
                <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-1">
                  {t.audit.get.map((g, i) => (
                    <li key={g} className="flex gap-4">
                      <span className="mt-[3px] shrink-0 flash-sub text-[11px] tracking-[0.14em] text-bone">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{g}</span>
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
            </div>

            <div className="xl:pt-2">
              <BookCall url={site.call} lang={lang} labels={{ loading: t.book.loading, fallback: t.book.fallback }} />
            </div>
          </div>
        </section>

        {/* ───────── FOOTER ───────── */}
        <footer className="border-t border-white/[0.06] pb-28 pt-14 lg:pb-14">
          <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="wrap mt-12">
            <div className="border-t border-white/[0.06] pt-8">
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
          </div>
        </footer>
      </div>
    </>
  );
}
