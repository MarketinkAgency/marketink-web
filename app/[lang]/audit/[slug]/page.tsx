import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUDITS, AUDIT_SLUGS, auditUi, type Estado } from "@/lib/audits";
import { copy, site, isLang } from "@/lib/copy";
import { plan } from "@/lib/plan";
import AuditCost from "@/components/AuditCost";
import StickyCta from "@/components/StickyCta";
import Ink from "@/components/Ink";

/**
 * LA ENTREGA DE LA AUDITORÍA
 *
 * Una plantilla, todas las auditorías. Lo que cambia entre un artista y
 * otro vive en `lib/audits.ts`; aquí no hay una sola frase sobre nadie.
 *
 * Tres decisiones que conviene no deshacer sin pensarlo:
 *
 *  · `robots: noindex, nofollow` y fuera del sitemap. La página lleva el
 *    nombre y apellido de una persona y un juicio sobre su negocio. Que
 *    sea accesible con el enlace es lo que la hace cómoda de mandar; que
 *    sea encontrable en Google la volvería impublicable.
 *
 *  · Los dos botones conviven a propósito. La llamada es el camino que
 *    convierte mejor con alguien que todavía no nos conoce, pero el que
 *    ya decidió no debería tener que agendar quince minutos para poder
 *    pagarnos. El enlace de pago sale de una variable de entorno, así
 *    que se cambia desde Vercel sin tocar código.
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

  return (
    <main className="relative overflow-hidden">
      <Ink />

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
            <div key={s.k} className="bg-void px-5 py-6">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">{s.k}</dt>
              <dd className="mt-2 text-[26px] font-bold tabular-nums tracking-tight text-bone">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-[18px] px-6 py-5 ring-1 ring-white/[0.09]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-faint">{t.profileSeen}</p>
          {a.bio.map((l, i) => (
            <p key={i} className="text-[14.5px] leading-relaxed text-bone">
              {l}
            </p>
          ))}
        </div>
      </header>

      {/* ── diagnóstico ────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 py-24 sm:px-10">
        <Tag n="01">{t.verdictTag}</Tag>
        <div className="max-w-[62ch] space-y-6">
          {a.verdict.body.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-[1.75] text-muted">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── los doce puntos ────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
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
            <li key={p.k} className="flex gap-5 bg-void px-6 py-7 sm:gap-7 sm:px-9">
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

      {/* ── el mercado ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
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

      {/* ── lo que cuesta ──────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <Tag n="04">{t.costTag}</Tag>
        <h2 className="flash-type mb-12 max-w-[18ch] text-[clamp(28px,4.4vw,52px)]">{t.costTitle}</h2>
        <AuditCost
          lang={a.lang}
          labels={{ a: t.costA, b: t.costB, c: t.costC, out: t.costOut, year: t.costYear, note: t.costNote }}
        />
      </section>

      {/* ── los tres arreglos ──────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <Tag n="05">{t.fixTag}</Tag>
        <h2 className="flash-type max-w-[17ch] text-[clamp(28px,4.4vw,52px)]">{t.fixTitle}</h2>
        <p className="mt-6 text-[15px] text-muted">{t.fixNote}</p>

        <div className="mt-14 space-y-5">
          {a.arreglos.map((f) => (
            <article key={f.n} className="rounded-[22px] px-7 py-9 ring-1 ring-white/[0.09] sm:px-10">
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
        <article className="mt-5 rounded-[22px] px-7 py-9 ring-1 ring-white/[0.09] sm:px-10">
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
      </section>

      {/* ── lo que montaríamos + la venta ──────────────────────── */}
      <section className="relative mx-auto max-w-[1180px] px-6 pb-28 sm:px-10">
        <Tag n="06">{t.planTag}</Tag>
        <h2 className="flash-type max-w-[16ch] text-[clamp(28px,4.4vw,52px)]">{t.planTitle}</h2>
        <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{t.planNote}</p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2">
          {a.plan.map((p, i) => (
            /* Con un número impar de piezas, la última dejaba media
               celda vacía y el fondo de la rejilla asomaba como si
               faltara contenido. Que ocupe las dos columnas. */
            <li key={p.k} className="bg-void px-7 py-8 md:last:odd:col-span-2">
              <span className="text-[12px] font-bold tabular-nums text-blood">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 flash-sub text-[13.5px] text-bone">{p.k}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">{p.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-[26px] px-7 py-12 ring-1 ring-white/[0.09] sm:px-14 sm:py-16">
          <h2 className="flash-type text-[clamp(30px,5vw,58px)]">{t.ctaTitle}</h2>
          <p className="mt-6 max-w-[54ch] text-[16px] leading-[1.75] text-muted">{t.ctaBody}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={site.call} target="_blank" rel="noopener" className="btn btn-lg">
              {t.ctaBook}
            </a>
            {plan.url && (
              <a href={plan.url} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
                {t.ctaPay}
              </a>
            )}
          </div>

          {plan.url && <p className="mt-6 text-[13.5px] text-faint">{t.ctaPayNote}</p>}
          <p className="mt-8 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">{a.cierre}</p>
        </div>

        <p className="mt-12 text-[12.5px] leading-relaxed text-faint">{t.footNote}</p>
      </section>

      {/* Los cupos del mes son de la agencia, no de la auditoría: se
          leen del mismo sitio que en la portada para que un artista que
          ve las dos páginas no vea dos números distintos. */}
      <StickyCta href={site.call} label={t.sticky} lang={a.lang} spotsLabels={copy[a.lang].book} />
    </main>
  );
}
