import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLIENTS, CLIENT_SLUGS } from "@/lib/clients";
import { site } from "@/lib/copy";
import { entity } from "@/lib/legal";
import Ink from "@/components/Ink";
import Glow from "@/components/Glow";
import Split from "@/components/Split";
import ClientRoi from "@/components/ClientRoi";

/**
 * REPORTE MENSUAL DE CLIENTE
 *
 * Una plantilla, un cliente por objeto en lib/clients.ts, y los meses
 * apilados del más nuevo al más viejo. Añadir octubre en noviembre es
 * añadir un elemento al array `months`: no se toca esta página.
 *
 * Solo existe en inglés —la clienta no habla español— y por eso
 * `generateStaticParams` solo emite `en`. Con `dynamicParams = false`,
 * /es/clients/kat devuelve 404 en vez de generar una versión a medias.
 *
 * No se indexa y no entra en el sitemap. Son los números privados de un
 * negocio con nombre y apellido.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return CLIENT_SLUGS.map((slug) => ({ lang: "en", slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CLIENTS[slug];
  if (!c) return { robots: { index: false, follow: false } };
  return {
    title: `${c.name} · Performance Report | MarketINK`,
    description: `Monthly performance report for ${c.handle}. Private.`,
    robots: { index: false, follow: false, nocache: true },
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

export default async function ClientReport({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const c = CLIENTS[slug];
  if (!c) notFound();

  /* El mes más reciente manda: es el que se abre en la reunión. */
  const months = [...c.months].sort((a, b) => b.id.localeCompare(a.id));
  const m = months[0];
  const spend = Number(m.stats[0].v.replace(/[^0-9.]/g, ""));
  const maxConv = Math.max(...(m.weeks?.items.map((w) => w.conv) ?? [1]));

  return (
    <>
      <Ink />
      <Glow />

      <div className="relative z-10">
        {/* ───────── CABECERA ───────── */}
        <header className="relative overflow-hidden px-6 pb-14 pt-20 sm:pb-20 sm:pt-28">
          <div className="relative mx-auto max-w-6xl">
            <div className="reveal flex flex-wrap items-center justify-between gap-6 border-b border-white/[0.1] pb-7">
              <Wordmark className="text-[17px]" />
              <p className="flash-sub text-[10.5px] tracking-[0.2em] text-faint">Private report · not public</p>
            </div>

            <p className="reveal mt-12 flash-sub text-[11.5px] tracking-[0.22em] text-blood">
              {c.name} · {c.handle} · {c.city}
            </p>
            <h1 className="reveal mt-5 flash-type text-[clamp(1.6rem,3.6vw,2.6rem)] text-muted">{m.label}</h1>
            <Split
              as="p"
              text={m.headline}
              className="mt-5 max-w-[20ch] flash-type text-[clamp(2.1rem,5.6vw,4.3rem)]"
            />
            <p className="reveal mt-7 text-[12.5px] tracking-wide text-faint">{m.window}</p>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
              {m.stats.map((s) => (
                <div key={s.k} className="reveal bg-void px-7 py-8">
                  <p className="flash-sub text-[10.5px] tracking-[0.18em] text-faint">{s.k}</p>
                  <p className="flash-type mt-2.5 text-[clamp(1.9rem,4vw,2.6rem)] text-bone">{s.v}</p>
                  {s.note && <p className="mt-1.5 text-[12.5px] text-muted">{s.note}</p>}
                </div>
              ))}
            </div>

            <div className="reveal mt-12 space-y-5">
              {m.intro.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[68ch] text-[15.5px] leading-[1.75] text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </header>

        {/* ───────── 01 · MES CONTRA MES ───────── */}
        {m.deltas && (
          <section className="sec overflow-hidden px-6 py-16 sm:py-32">
            <div className="relative mx-auto max-w-6xl">
              <Ghost n="01" />
              <Tag n="01">{m.deltas.tag}</Tag>
              <Split
                as="h2"
                text={m.deltas.title}
                className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
              />
              <p className="reveal mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">{m.deltas.sub}</p>

              <div className="mt-14 border-t border-white/[0.1]">
                {m.deltas.items.map((d) => (
                  <div
                    key={d.k}
                    className="spot reveal grid gap-5 border-b border-white/[0.1] py-9 lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1.1fr)] lg:items-center lg:gap-10"
                  >
                    <h3 className="text-[17px] font-bold leading-snug text-bone">{d.k}</h3>

                    <div className="flex items-center gap-4">
                      <span className="text-[19px] font-bold tabular-nums text-faint line-through decoration-white/25">
                        {d.from}
                      </span>
                      <span aria-hidden className="text-[15px] text-faint">
                        →
                      </span>
                      <span className="text-[26px] font-bold tabular-nums text-bone">{d.to}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[12px] font-bold tabular-nums ${
                          d.good ? "bg-blood/15 text-blood" : "bg-white/[0.08] text-muted"
                        }`}
                      >
                        {d.delta}
                      </span>
                    </div>

                    <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{d.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───────── 02 · SEMANA A SEMANA ───────── */}
        {m.weeks && (
          <section className="sec overflow-hidden px-6 py-16 sm:py-32">
            <div className="relative mx-auto max-w-6xl">
              <Ghost n="02" />
              <Tag n="02">{m.weeks.tag}</Tag>
              <Split
                as="h2"
                text={m.weeks.title}
                className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
              />
              <p className="reveal mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{m.weeks.sub}</p>

              {/* Barras en CSS puro: no hace falta una librería de gráficas
                  para cinco valores, y el peso de la página importa. */}
              <div className="mt-14 space-y-4">
                {m.weeks.items.map((w) => (
                  <div
                    key={w.label}
                    className="reveal grid items-center gap-x-5 gap-y-2 sm:grid-cols-[110px_minmax(0,1fr)_auto]"
                  >
                    <span className="text-[13px] tabular-nums text-muted">{w.label}</span>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 rounded-r-[4px] bg-blood/85"
                        style={{ width: `${Math.max(4, (w.conv / maxConv) * 100)}%` }}
                        aria-hidden
                      />
                      <b className="text-[17px] tabular-nums text-bone">{w.conv}</b>
                    </div>
                    <span className="text-[12.5px] tabular-nums text-faint">
                      {w.spend} · {w.cpc} each
                    </span>
                  </div>
                ))}
              </div>

              <p className="reveal mt-12 max-w-[68ch] border-l-2 border-blood/60 pl-5 text-[15px] leading-[1.75] text-bone">
                {m.weeks.read}
              </p>
            </div>
          </section>
        )}

        {/* ───────── 03 · LOS CREATIVOS ───────── */}
        {m.creatives && (
          <section className="sec overflow-hidden px-6 py-16 sm:py-32">
            <div className="relative mx-auto max-w-6xl">
              <Ghost n="03" />
              <Tag n="03">{m.creatives.tag}</Tag>
              <Split
                as="h2"
                text={m.creatives.title}
                className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
              />
              <p className="reveal mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{m.creatives.sub}</p>

              <div className="mt-14 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/[0.14]">
                      {["Creative", "Spend", "Reach", "Conversations", "Cost each"].map((h, i) => (
                        <th
                          key={h}
                          className={`pb-4 flash-sub text-[10.5px] tracking-[0.16em] text-faint ${i ? "text-right" : ""}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {m.creatives.items.map((x) => (
                      <tr key={x.name} className="border-b border-white/[0.08] align-top">
                        <td className="py-5 pr-6">
                          <span
                            className={`text-[15px] font-bold leading-snug ${x.hero ? "text-blood" : "text-bone"}`}
                          >
                            {x.name}
                          </span>
                          {x.note && (
                            <span className="mt-1.5 block max-w-[46ch] text-[13px] leading-relaxed text-muted">
                              {x.note}
                            </span>
                          )}
                        </td>
                        <td className="py-5 text-right text-[14px] tabular-nums text-muted">{x.spend}</td>
                        <td className="py-5 text-right text-[14px] tabular-nums text-muted">{x.reach}</td>
                        <td
                          className={`py-5 text-right text-[16px] font-bold tabular-nums ${x.hero ? "text-blood" : "text-bone"}`}
                        >
                          {x.conv}
                        </td>
                        <td className="py-5 text-right text-[14px] tabular-nums text-muted">{x.cpc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="reveal mt-12 max-w-[68ch] border-l-2 border-blood/60 pl-5 text-[15px] leading-[1.75] text-bone">
                {m.creatives.read}
              </p>
            </div>
          </section>
        )}

        {/* ───────── 04 · LO QUE VALE ───────── */}
        <section className="sec overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="04" />
            <Tag n="04">{c.roi.tag}</Tag>
            <Split
              as="h2"
              text={c.roi.title}
              className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />
            <p className="reveal mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">{c.roi.sub}</p>

            <div className="reveal mt-14">
              <ClientRoi
                spend={spend}
                ticket={c.economics.ticket}
                labels={{
                  bookings: c.roi.bookingsLabel,
                  ticket: c.roi.ticketLabel,
                  revenue: c.roi.revenue,
                  invested: c.roi.invested,
                  net: c.roi.net,
                  perBooking: c.roi.perBooking,
                  note: c.roi.note,
                }}
              />
            </div>

            <p className="reveal mt-12 max-w-[60ch] text-[15.5px] leading-[1.75] text-bone">{c.roi.breakeven}</p>
          </div>
        </section>

        {/* ───────── 05 · LO QUE NO FUNCIONÓ ───────── */}
        {m.honest && (
          <section className="sec overflow-hidden px-6 py-16 sm:py-32">
            <div className="relative mx-auto max-w-6xl">
              <Ghost n="05" />
              <Tag n="05">{m.honest.tag}</Tag>
              <Split
                as="h2"
                text={m.honest.title}
                className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
              />

              <div className="mt-14 grid gap-x-14 gap-y-10 lg:grid-cols-2">
                {m.honest.items.map((x, i) => (
                  <div key={x.k} className="reveal">
                    <p className="flash-sub text-[11px] tracking-[0.2em] text-blood">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 max-w-[36ch] text-[17px] font-bold leading-snug text-bone">{x.k}</h3>
                    <p className="mt-2.5 max-w-[50ch] text-[14.5px] leading-relaxed text-muted">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───────── 06 · DE DÓNDE VENIMOS ───────── */}
        <section className="sec overflow-hidden px-6 py-16 sm:py-32">
          <div className="relative mx-auto max-w-6xl">
            <Ghost n="06" />
            <Tag n="06">{c.baseline.tag}</Tag>
            <Split
              as="h2"
              text={c.baseline.title}
              className="max-w-[22ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
            />
            <p className="reveal mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">{c.baseline.sub}</p>

            <div className="mt-14 border-t border-white/[0.1]">
              {c.baseline.items.map((x) => (
                <div
                  key={x.k}
                  className="spot reveal grid gap-4 border-b border-white/[0.1] py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-baseline lg:gap-10"
                >
                  <h3 className="flash-type text-[clamp(1.2rem,2.3vw,1.7rem)]">{x.k}</h3>
                  <p className="max-w-[56ch] text-[14.5px] leading-relaxed text-muted">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 07 · EL MES QUE VIENE ───────── */}
        {m.next && (
          <section className="sec overflow-hidden px-6 py-16 sm:py-32">
            <div className="relative mx-auto max-w-6xl">
              <Ghost n="07" />
              <Tag n="07">{m.next.tag}</Tag>
              <Split
                as="h2"
                text={m.next.title}
                className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.4rem)]"
              />
              <p className="reveal mt-6 max-w-[58ch] text-[15px] leading-relaxed text-muted">{m.next.sub}</p>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {m.next.items.map((x, i) => (
                  <div key={x.k} className="reveal rounded-[18px] p-7 ring-1 ring-white/[0.09]">
                    <span className="flash-sub text-[11px] tracking-[0.2em] text-blood">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[16.5px] font-bold leading-snug text-bone">{x.k}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───────── 08 · LO QUE NECESITAMOS ───────── */}
        {m.asks && (
          <section className="border-t border-white/[0.07] px-6 py-16 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Tag n="08">{m.asks.tag}</Tag>
              <Split
                as="h2"
                text={m.asks.title}
                className="max-w-[20ch] flash-type text-[clamp(1.9rem,4.4vw,3.2rem)]"
              />
              <ol className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2">
                {m.asks.items.map((x, i) => (
                  <li key={x} className="reveal flex gap-4">
                    <span className="mt-[3px] shrink-0 flash-sub text-[11px] tracking-[0.14em] text-blood">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-[46ch] text-[15px] leading-relaxed text-muted">{x}</span>
                  </li>
                ))}
              </ol>

              <div className="reveal mt-14 flex flex-wrap items-center gap-5">
                <a href={site.call} target="_blank" rel="noopener" className="btn">
                  Book our next call
                </a>
                <a
                  href={`mailto:${entity.email}`}
                  className="text-[14px] text-muted underline decoration-white/25 underline-offset-[6px] transition hover:text-bone"
                >
                  {entity.email}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ───────── MESES ANTERIORES ───────── */}
        {months.length > 1 && (
          <section className="border-t border-white/[0.07] px-6 py-14">
            <div className="mx-auto max-w-6xl">
              <p className="mb-6 flash-sub text-[10.5px] tracking-[0.2em] text-faint">Previous months</p>
              <ul className="flex flex-wrap gap-3">
                {months.slice(1).map((p) => (
                  <li
                    key={p.id}
                    className="rounded-full px-5 py-2.5 text-[13.5px] text-muted ring-1 ring-white/[0.12]"
                  >
                    {p.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="border-t border-white/[0.06] px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <Wordmark className="text-[16px]" />
            <p className="mt-4 max-w-[62ch] text-[12.5px] leading-relaxed text-faint">
              Prepared for {c.name} ({c.handle}). Every figure is pulled from the Meta Ads API for the dates
              shown, or quoted from what you told us in our meetings. This page is private: it is not indexed,
              not linked from anywhere and not shared with anyone else. Working together since {c.since}.
            </p>
            <p className="mt-6 text-[12px] text-faint">
              © {new Date().getFullYear()} {entity.legal}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
