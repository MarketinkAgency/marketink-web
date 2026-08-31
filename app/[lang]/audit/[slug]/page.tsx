import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUDITS, AUDIT_SLUGS, auditUi, type Estado } from "@/lib/audits";
import { copy, site, isLang } from "@/lib/copy";
import { plan } from "@/lib/plan";
import AuditCost from "@/components/AuditCost";
import StickyCta from "@/components/StickyCta";
import Ink from "@/components/Ink";
import AuditExpiry from "@/components/AuditExpiry";
import AuditTicket from "@/components/AuditTicket";
import CuposAudit from "@/components/CuposAudit";

/**
 * LA ENTREGA DE LA AUDITORÍA
 *
 * Una plantilla, todas las auditorías. Lo que cambia entre un artista y
 * otro vive en `lib/audits.ts`; aquí no hay una sola frase sobre nadie.
 *
 * Cuatro decisiones que conviene no deshacer sin pensarlo:
 *
 *  · `robots: noindex, nofollow` y fuera del sitemap. La página lleva el
 *    nombre y apellido de una persona y un juicio sobre su negocio. Que
 *    sea accesible con el enlace es lo que la hace cómoda de mandar; que
 *    sea encontrable en Google la volvería impublicable.
 *
 *  · **La acción principal es empezar el sistema, no agendar.** Esta
 *    auditoría se manda después de una reunión, así que quien la lee ya
 *    nos conoce: pedirle otra llamada es retroceder un paso. El botón de
 *    la llamada se queda como red de seguridad para el que se perdió la
 *    reunión, y lo dice con esas palabras debajo.
 *
 *  · Las bandas rojas cada tres secciones. Una página de ocho mil
 *    píxeles con un solo botón al final solo convierte al que llega al
 *    final. La banda no repite el argumento: lo dice desde donde va el
 *    que lee, y le da una salida sin obligarlo a terminar.
 *
 *  · El orden es el de siempre: primero lo que le pasa, después lo que
 *    le cuesta, después lo que se lleva gratis, y solo al final lo que
 *    vendemos. Invertirlo convierte la auditoría en un folleto.
 */

export function generateStaticParams() {
  return AUDIT_SLUGS.map((slug) => ({ lang: AUDITS[slug].lang, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = AUDITS[slug];
  if (!a || a.lang !== lang) return { title: "MarketINK", robots: { index: false, follow: false } };
  const t = auditUi[a.lang];
  return {
    title: `${t.kicker} — ${a.handle}`,
    description: a.verdict.line,
    /* Que no se indexe no es un detalle de SEO: es la condición para
       poder escribir una auditoría honesta sobre una persona concreta. */
    robots: { index: false, follow: false, nocache: true },
    alternates: {},
  };
}

/** El rótulo numerado de cada sección. Vive fuera del render: declarado
    dentro, React lo trataría como un componente nuevo en cada pintado. */
function Tag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="sec-tag mb-6">
      <b>{n}</b>
      <i />
      {children}
    </p>
  );
}

/* `as const` hace que cada literal sea su propio tipo, así que el bloque
   español no encaja donde se declaró el inglés. La leyenda es lo único
   que se comparte, y con esto vale. */
const estadoLabel = (t: { legend: Record<Estado, string> }, s: Estado) => t.legend[s];

/** Fuga = punto lleno. A medias = anillo. Bien = punto hueso.
    Tres estados sin salirse de la paleta de la marca. */
function Marca({ s }: { s: Estado }) {
  if (s === "bien") return <i aria-hidden className="mt-[7px] block size-2.5 shrink-0 rounded-full bg-bone" />;
  if (s === "media")
    return <i aria-hidden className="mt-[7px] block size-2.5 shrink-0 rounded-full ring-2 ring-blood/70" />;
  return <i aria-hidden className="mt-[7px] block size-2.5 shrink-0 rounded-full bg-blood" />;
}

/** La banda roja que corta la lectura. Usa `.rupture`, que es el mismo
    recurso que rompe la portada: la auditoría no inventa un lenguaje
    visual propio, usa el de la marca. */
function Banda({ line, cta, href }: { line: string; cta: string; href: string }) {
  /* Un ancla de la misma página no puede abrirse en pestaña nueva: el
     que toca «ver los 90 días» acabaría con dos copias de la auditoría
     abiertas y sin haber llegado a la sección. Solo lo externo salta. */
  const interno = href.startsWith("#");
  return (
    <section className="rupture my-4">
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col items-start gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <p className="flash-type max-w-[20ch] text-[clamp(24px,3.6vw,44px)] text-white">{line}</p>
        <a
          href={href}
          {...(interno ? {} : { target: "_blank", rel: "noopener" })}
          className="flex-none bg-white px-9 py-5 text-[15px] font-bold uppercase tracking-[0.02em] text-void transition-transform duration-300 hover:-translate-y-0.5"
        >
          {cta} →
        </a>
      </div>
    </section>
  );
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const a = AUDITS[slug];
  if (!a || a.lang !== lang) notFound();

  const t = auditUi[a.lang];
  const es = a.lang === "es";
  const fecha = new Date(a.reviewed + "T12:00:00Z").toLocaleDateString(es ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const fugas = a.puntos.filter((p) => p.s === "fuga").length;

  /* El enlace de pago de esta auditoría, si tiene uno propio.
     Un tatuador en Bogotá y uno en Salt Lake City no pueden mandarse al
     mismo cobro: la cifra correcta en dólares es una cifra absurda en
     pesos, y un precio absurdo no se negocia, se cierra la pestaña. Por
     eso el enlace puede venir en el dato de cada auditoría.

     Si no lo tiene, cae al enlace general; y si tampoco hay, a la
     llamada. Nunca a un botón muerto. */
  const accion = a.planUrl || plan.url || site.call;

  /* Las bandas de esta auditoría. La tesis cambia de un artista a otro,
     y la banda es el único sitio donde esa tesis se dice a tamaño de
     titular: usar la genérica ahí es tirar el mejor espacio de la
     página. */
  const bandas = a.bands ?? t.bands;

  /* Cupos libres del mes, del mismo sitio que la portada. */

  return (
    <main className="relative overflow-hidden pt-[46px]">
      <Ink />

      {/* El reloj. Fijo arriba, visible en todo el scroll. */}
      <AuditExpiry
        expira={a.expira}
        lang={a.lang}
        labels={{ tag: t.expTag, done: t.expDone, cta: t.ctaPay, units: t.expUnits }}
      />

      {/* ── cabecera ───────────────────────────────────────────── */}
      <header className="relative mx-auto max-w-[1180px] px-6 pt-14 sm:px-10 sm:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href={`/${a.lang}`} className="text-[17px] font-extrabold tracking-tight text-bone">
            market<b className="font-black">INK</b>
            <i className="ml-[3px] inline-block size-[7px] rounded-full bg-blood align-baseline" aria-hidden />
          </a>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
            {t.reviewed} {fecha}
          </p>
        </div>

        <p className="mt-16 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-blood">
          <i className="dot-live size-1.5 rounded-full bg-blood" aria-hidden />
          {t.kicker}
        </p>

        <h1 className="flash-type mt-6 max-w-[19ch] text-[clamp(38px,7.2vw,86px)]">{a.verdict.line}</h1>

        <p className="mt-8 text-[14px] text-muted">
          {t.prepared}{" "}
          <a href={a.profile} target="_blank" rel="noopener" className="font-semibold text-bone underline underline-offset-4">
            {a.handle}
          </a>{" "}
          · {a.name} · {a.studio}, {a.city}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-white/[0.08] sm:grid-cols-4">
          {a.stats.map((s) => (
            <div key={s.k} className="spot bg-void px-5 py-6">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">{s.k}</dt>
              <dd className="mt-2 text-[26px] font-bold tabular-nums tracking-tight text-bone">{s.v}</dd>
            </div>
          ))}
        </dl>

        {/* El número que resume la página, antes de que empiece a leerla. */}
        <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-2 border-blood pl-6 text-[15.5px] text-muted">
          <b className="flash-type text-[clamp(30px,4vw,44px)] text-blood">{fugas}</b>
          <span className="max-w-[46ch] leading-relaxed">
            {es
              ? `de los ${a.puntos.length} puntos que revisamos están perdiendo reservas ahora mismo.`
              : `of the ${a.puntos.length} checks are leaking bookings right now.`}
          </span>
        </p>

        <div className="mt-6 rounded-[18px] px-6 py-5 ring-1 ring-white/[0.09]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-faint">{t.profileSeen}</p>
          {a.bio.map((l, i) => (
            <p key={i} className="text-[14.5px] leading-relaxed text-bone">
              {l}
            </p>
          ))}
        </div>
      </header>

      {/* ── 01 · diagnóstico ───────────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 py-24 sm:px-10">
        <span className="sec-n" aria-hidden>01</span>
        <Tag n="01">{t.verdictTag}</Tag>
        <div className="max-w-[62ch] space-y-6">
          {a.verdict.body.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-[1.75] text-muted">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* La pregunta que se hace todo el que acaba de leer su
          diagnóstico: vale, ¿y ahora qué? La sección de los 90 días
          contesta eso, pero vive al final de una página larguísima y el
          que no llega abajo no la ve nunca. Esta banda la sube al sitio
          donde nace la pregunta, sin sacarlo de la lectura: lleva a la
          sección, no al pago. */}
      {a.dias90 && a.dias90.length > 0 && (
        <Banda line={t.d90Tease} cta={t.d90TeaseCta} href="#dias90" />
      )}

      {/* ── 02 · los doce puntos ───────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <span className="sec-n" aria-hidden>02</span>
        <Tag n="02">{t.checksTag}</Tag>
        <h2 className="flash-type max-w-[16ch] text-[clamp(28px,4.4vw,52px)]">{t.checksTitle}</h2>
        <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{t.checksNote}</p>

        <p className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] uppercase tracking-[0.12em] text-faint">
          <span className="flex items-center gap-2">
            <i aria-hidden className="size-2.5 rounded-full bg-blood" />
            {t.legend.fuga} · {fugas}
          </span>
          <span className="flex items-center gap-2">
            <i aria-hidden className="size-2.5 rounded-full ring-2 ring-blood/70" />
            {t.legend.media}
          </span>
          <span className="flex items-center gap-2">
            <i aria-hidden className="size-2.5 rounded-full bg-bone" />
            {t.legend.bien}
          </span>
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08]">
          {a.puntos.map((p, i) => (
            <li key={p.k} className="spot flex gap-5 bg-void px-6 py-7 sm:gap-7 sm:px-9">
              <span className="w-6 shrink-0 pt-[3px] text-[12px] font-bold tabular-nums text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Marca s={p.s} />
              <div className="min-w-0">
                <h3 className="flash-sub text-[13px] text-bone">{p.k}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-faint">{estadoLabel(t, p.s)}</p>
                <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.7] text-muted">{p.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Banda line={bandas[0].line} cta={bandas[0].cta} href={accion} />

      {/* ── 03 · el mercado ────────────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 py-24 sm:px-10">
        <span className="sec-n" aria-hidden>03</span>
        <Tag n="03">{t.marketTag}</Tag>
        <div className="grid gap-5 md:grid-cols-3">
          {a.market.map((m) => (
            <div key={m.t} className="flash-cell rounded-[18px] px-7 py-8">
              <h3 className="flash-sub text-[13px] text-bone">{m.t}</h3>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03b · la hora de un oficio contra la del otro ───────
          Solo existe si la auditoría lo trae. Un tatuador que siempre
          ha tatuado no tiene nada que comparar. */}
      {a.ticket && (
        <section className="sec relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
          <Tag n="+">{a.ticket.tag}</Tag>
          <h2 className="flash-type max-w-[18ch] text-[clamp(28px,4.4vw,52px)]">{a.ticket.title}</h2>
          <p className="mt-6 mb-12 max-w-[58ch] text-[15px] leading-relaxed text-muted">{a.ticket.body}</p>
          <AuditTicket
            lang={a.lang}
            labels={{
              aTitle: t.ticketA, aPrice: t.ticketAPrice, aMin: t.ticketAMin,
              bTitle: t.ticketB, bPrice: t.ticketBPrice, bHours: t.ticketBHours,
              hourA: t.ticketHourA, hourB: t.ticketHourB, gap: t.ticketGap, note: t.ticketNote,
            }}
          />
        </section>
      )}

      {/* ── 04 · lo que cuesta ─────────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <span className="sec-n" aria-hidden>04</span>
        <Tag n="04">{t.costTag}</Tag>
        <h2 className="flash-type mb-12 max-w-[18ch] text-[clamp(28px,4.4vw,52px)]">{t.costTitle}</h2>
        <AuditCost
          lang={a.lang}
          moneda={a.moneda}
          labels={{ a: t.costA, b: t.costB, c: t.costC, now: t.costNow, table: t.costTable, rate: t.costRate, month: t.costMonth, gap: t.costGap, note: t.costNote, zero: t.costZero }}
        />
      </section>

      {/* ── 05 · los tres arreglos ─────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <span className="sec-n" aria-hidden>05</span>
        <Tag n="05">{t.fixTag}</Tag>
        <h2 className="flash-type max-w-[17ch] text-[clamp(28px,4.4vw,52px)]">{t.fixTitle}</h2>
        <p className="mt-6 text-[15px] text-muted">{t.fixNote}</p>

        {/* Lo único que caduca de la página: lo que se llevaba gratis. */}
        <div className="expira-oculto mt-14 space-y-5">
          {a.arreglos.map((f) => (
            <article key={f.n} className="spot rounded-[22px] px-7 py-9 ring-1 ring-white/[0.09] sm:px-10">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className="flash-type text-[34px] text-blood">{f.n}</span>
                <h3 className="flash-sub text-[15px] text-bone">{f.t}</h3>
              </div>
              <div className="mt-5 max-w-[64ch] space-y-4">
                {f.body.split("\n\n").map((p, i) => (
                  <p key={i} className="whitespace-pre-line text-[15.5px] leading-[1.75] text-muted">
                    {p}
                  </p>
                ))}
              </div>

              {f.copy && (
                <div className="mt-7 max-w-[52ch]">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-faint">{t.copyLabel}</p>
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-[14px] bg-panel px-6 py-5 font-sans text-[14.5px] leading-[1.75] text-bone ring-1 ring-white/[0.07]">
                    {f.copy}
                  </pre>
                  {f.copyNote && <p className="mt-4 text-[13.5px] leading-relaxed text-faint">{f.copyNote}</p>}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* el cuarto regalo: la respuesta que hoy no está dando */}
        <article className="expira-oculto mt-5 rounded-[22px] px-7 py-9 ring-1 ring-white/[0.09] sm:px-10">
          <p className="sec-tag mb-5">
            <b>+</b>
            <i />
            {t.dmTag}
          </p>
          <h3 className="flash-sub text-[15px] text-bone">{a.dm.t}</h3>
          <p className="mt-4 text-[14px] uppercase tracking-[0.1em] text-faint">{a.dm.when}</p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] bg-panel px-6 py-6 ring-1 ring-white/[0.06]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-faint">
                {es ? "Lo de siempre" : "The usual"}
              </p>
              <p className="text-[15px] leading-[1.7] text-muted line-through decoration-blood/60">{a.dm.bad}</p>
            </div>
            <div className="rounded-[16px] bg-panel px-6 py-6 ring-1 ring-blood/30">
              <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-blood">
                {es ? "Lo que agenda" : "The one that books"}
              </p>
              <p className="text-[15px] leading-[1.7] text-bone">{a.dm.good}</p>
            </div>
          </div>
          <p className="mt-6 max-w-[64ch] text-[14.5px] leading-[1.7] text-muted">{a.dm.why}</p>
        </article>

        {/* Aparece cuando el reloj llega a cero. Sin esto, la cuenta
            atrás sería una amenaza que no se cumple, y eso enseña que
            nuestros plazos no significan nada. */}
        <div className="expira-aviso mt-8">
          <div className="rounded-[22px] px-7 py-11 ring-1 ring-blood/40 sm:px-12">
            <h3 className="flash-type max-w-[16ch] text-[clamp(26px,3.6vw,44px)]">{t.lockTitle}</h3>
            {/* El número de fugas sale del recuento real de esta auditoría.
                Estaba escrito a mano —«y son siete»— y habría mentido en
                cuanto una cuenta tuviera menos, justo en el párrafo cuyo
                trabajo es que se fíe de nosotros. */}
            <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.75] text-muted">
              {t.lockBody.replace("{n}", String(fugas))}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href={accion} target="_blank" rel="noopener" className="btn">
                {t.lockCta}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener"
                className="text-[13.5px] text-faint underline underline-offset-4 hover:text-bone"
              >
                {t.lockAlt}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Banda line={bandas[1].line} cta={bandas[1].cta} href={accion} />

      {/* ── 06 · lo que montaríamos ────────────────────────────── */}
      <section className="sec relative mx-auto max-w-[1180px] px-6 py-24 sm:px-10">
        <span className="sec-n" aria-hidden>06</span>
        <Tag n="06">{t.planTag}</Tag>
        <h2 className="flash-type max-w-[16ch] text-[clamp(28px,4.4vw,52px)]">{t.planTitle}</h2>
        <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{t.planNote}</p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2">
          {a.plan.map((p, i) => (
            /* Con un número impar de piezas, la última dejaba media
               celda vacía y el fondo de la rejilla asomaba como si
               faltara contenido. Que ocupe las dos columnas. */
            <li key={p.k} className="spot bg-void px-7 py-8 md:last:odd:col-span-2">
              <span className="text-[12px] font-bold tabular-nums text-blood">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 flash-sub text-[13.5px] text-bone">{p.k}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 07 · los primeros 90 días ──────────────────────────
           Va aquí, pegado al cierre, porque es la sección que
           decide. Los tres arreglos gratis convencen al que tiene
           el perfil roto; al que ya lo tiene casi todo bien lo
           convence ver el calendario. Solo aparece si la auditoría
           trae las cuatro fases. */}
      {a.dias90 && a.dias90.length > 0 && (
        <section id="dias90" className="sec relative mx-auto max-w-[1180px] px-6 pb-6 pt-4 scroll-mt-[70px] sm:px-10">
          <span className="sec-n" aria-hidden>07</span>
          <Tag n="07">{t.d90Tag}</Tag>
          <h2 className="flash-type max-w-[16ch] text-[clamp(28px,4.4vw,52px)]">{t.d90Title}</h2>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">{t.d90Note}</p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
            {a.dias90.map((f) => (
              <div key={f.d} className="spot bg-void px-7 py-9">
                <p className="flash-sub text-[11px] tracking-[0.18em] text-blood">{f.d}</p>
                <h3 className="mt-4 flash-type text-[clamp(20px,2.2vw,27px)] text-bone">{f.t}</h3>
                <ul className="mt-6 space-y-3">
                  {f.items.map((x) => (
                    <li key={x} className="flex gap-3 text-[13.5px] leading-snug text-muted">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-signal" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── el cierre ──────────────────────────────────────────── */}
      <section id="empezar" className="relative mx-auto max-w-[1180px] px-6 pb-8 sm:px-10 scroll-mt-[70px]">
        <div className="rounded-[26px] px-7 py-12 ring-1 ring-white/[0.09] sm:px-14 sm:py-16">
          <h2 className="flash-type max-w-[14ch] text-[clamp(32px,5.4vw,64px)]">{t.ctaTitle}</h2>
          <p className="mt-7 max-w-[56ch] text-[16.5px] leading-[1.75] text-muted">{t.ctaBody}</p>

          <div className="mt-11 flex flex-col items-start gap-7 sm:flex-row sm:items-start sm:gap-10">
            <div>
              <a href={accion} target="_blank" rel="noopener" className="btn btn-lg">
                {t.ctaPay}
              </a>
              <p className="mt-3 max-w-[30ch] text-[13px] text-faint">{t.ctaPayNote}</p>
            </div>

            {/* La llamada deja de ser la acción principal: quien lee esto
                ya nos conoce. Se queda para el que se perdió la reunión,
                y lo dice debajo con esas palabras. */}
            <div>
              <a href={site.call} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
                {t.ctaBook}
              </a>
              <p className="mt-3 max-w-[30ch] text-[13px] text-faint">{t.ctaBookNote}</p>
            </div>
          </div>

          {/* Los cupos del mes. Mismo número que la portada, y calculado
              en el navegador para que no se congele en la fecha del
              despliegue. Ver components/CuposAudit.tsx. */}
          <CuposAudit uno={t.spots1} varios={t.spots} nota={t.spotsNote} />

          <p className="mt-12 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">{a.cierre}</p>
        </div>
      </section>

      {/* ── escríbenos por Instagram ───────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener"
          className="spot group flex flex-col gap-8 rounded-[26px] px-7 py-12 ring-1 ring-blood/30 sm:flex-row sm:items-center sm:justify-between sm:px-14"
        >
          <div>
            <p className="sec-tag mb-5">
              <b>→</b>
              <i />
              {t.igTag}
            </p>
            <h2 className="flash-type max-w-[18ch] text-[clamp(26px,3.8vw,46px)]">{t.igTitle}</h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-muted">{t.igBody}</p>
          </div>
          <span className="flash-type flex-none text-[clamp(22px,3vw,34px)] text-blood transition-transform duration-500 group-hover:-translate-y-1">
            {t.igCta}
          </span>
        </a>

        <p className="mt-12 text-[12.5px] leading-relaxed text-faint">{t.footNote}</p>
      </section>

      {/* Los cupos del mes son de la agencia, no de la auditoría: se
          leen del mismo sitio que en la portada para que un artista que
          ve las dos páginas no vea dos números distintos. */}
      <StickyCta href={accion} label={t.sticky} lang={a.lang} spotsLabels={copy[a.lang].book} />
    </main>
  );
}
