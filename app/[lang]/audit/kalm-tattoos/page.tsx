import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, site } from "@/lib/copy";
import { entity } from "@/lib/legal";
import AuditExpiry from "@/components/AuditExpiry";
import CuposChip from "@/components/CuposChip";
import GridSorter from "@/components/GridSorter";
import CopyText from "@/components/CopyText";
import { kalm, familias, tiles, gridHoy, gridOrdenado, portadas, regalos } from "./contenido";
import "./kalm.css";

/**
 * AUDITORÍA DE @kalmtattoos — FORMATO NUEVO (2026-11-24)
 *
 * Ruta estática que gana a /audit/[slug]. Solo inglés (Chicago).
 * noindex/nofollow, fuera del sitemap, como todas las auditorías.
 *
 * La historia, en orden:
 *   00  cabecera: «44 posts. 8 different artists.»
 *   01  el grid ordenado (GridSorter): el momento que vende
 *   02  el reloj: lo viejo que se ve el perfil
 *   03  tres puertas, dos direcciones, ningún precio
 *   04  lo que lee un desconocido (detalles con recibo)
 *   05  el antes / después en dos teléfonos
 *   06  la pieza firma: retrato + script, y la temporada
 *   07  regalos (caducan): bio, fijado, DM, portadas
 *   08  30 días con nosotros + llamada
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

const T = (id: string) => `/audit/kalm/t/${id}.webp`;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  return {
    title: "Kalm — your profile, sorted · MarketINK",
    description: "A private audit prepared by hand for @kalmtattoos.",
    robots: { index: false, follow: false, nocache: true },
    alternates: {},
  };
}

function Tag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="sec-tag mb-7">
      <b>{n}</b>
      <i aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export default async function KalmAudit({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang) || lang !== "en") notFound();

  const core = tiles.filter((t) => t.f === "real" || t.f === "script").length;
  const biggest = Math.max(...familias.map((f) => tiles.filter((t) => t.f === f.id).length));
  const fechaExp = new Date(kalm.expira).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "America/Chicago" });

  return (
    <main className="relative overflow-hidden pt-[46px]">
      <AuditExpiry
        expira={kalm.expira}
        lang="en"
        labels={{ tag: "Your free fixes expire in", done: "The free fixes expired", cta: "Book the call", units: { d: "d", h: "h", m: "m", s: "s" } }}
      />

      {/* ── 00 · cabecera ─────────────────────────────────────── */}
      <header className="wrap pt-14 sm:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/en" className="text-[17px] font-extrabold tracking-tight text-bone">
            market<b className="font-black">INK</b>
            <i className="ml-[3px] inline-block size-[7px] rounded-full bg-blood align-baseline" aria-hidden />
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">Reviewed November 24, 2026</p>
        </div>

        <p className="mt-16 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-blood">
          <i className="dot-live size-1.5 rounded-full bg-blood" aria-hidden />
          Profile audit · @kalmtattoos
        </p>
        <p className="mt-7 max-w-[40ch] text-[clamp(17px,2.1vw,23px)] font-semibold leading-snug text-bone/85">
          Kalm, you tattoo a lot. Your profile just doesn&apos;t say what.
        </p>
        <h1 className="flash-type mt-4 max-w-[16ch] text-[clamp(44px,8vw,96px)]">
          {tiles.length} posts. {familias.length} different artists.
        </h1>
        <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-muted">
          We sorted every post on your grid by style. Someone who lands on your profile meets eight tattooers at once, can&apos;t
          tell what to book you for, and leaves without asking. Below is what we found, what it costs you, and the version of
          your profile we&apos;d build.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em]">
          <li className="rounded-full px-4 py-2 text-bone ring-1 ring-white/[0.14]">Prepared by hand for you</li>
          <li className="rounded-full px-4 py-2 text-blood ring-1 ring-blood/50">Valid until {fechaExp}</li>
          <CuposChip label="spots left this month" label1="spot left this month" />
        </ul>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-white/[0.08] sm:grid-cols-4">
          {kalm.stats.map((s) => (
            <div key={s.k} className="bg-void px-5 py-6">
              <dt className="sr-only">{s.k}</dt>
              <dd className="flash-type text-[clamp(30px,4vw,44px)] leading-none text-bone">{s.v}</dd>
              <dd className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">{s.k}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── 01 · el grid ordenado ─────────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="01">The sort</Tag>
        <h2 className="flash-type max-w-[18ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Your grid, the way a stranger sees it.</h2>
        <p className="mt-5 mb-10 max-w-[60ch] text-[16px] leading-relaxed text-muted">
          These are the {tiles.length} posts we could see on your profile, in your order. Now press the button: same photos, sorted
          by style.
        </p>
        <GridSorter
          tiles={tiles}
          familias={familias}
          base="/audit/kalm/t/"
          ui={{
            sort: "Sort it by style",
            unsort: "Show it as it is",
            of: "of",
            posts: "posts",
            coreNote: `Your biggest pile is ${biggest} of ${tiles.length}. No style gets more than about one post in five. But put the two red piles together, black & grey realism and script, and you get ${core} posts: the dogs, the cat, the Serenity Prayer, Xochitl, México. That's the artist this profile should be about.`,
          }}
        />
        <p className="mt-6 text-[12px] text-faint">
          {tiles.length} of your 67 posts, as they showed on November 24. The style labels are ours.
        </p>
      </section>

      {/* ── 02 · el reloj ──────────────────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="02">The clock</Tag>
        <h2 className="flash-type max-w-[17ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Your profile still says it&apos;s last December.</h2>

        <div className="mt-12">
          <div className="kalm-line" aria-hidden>
            <span className="kalm-mark is-old" style={{ left: "0%" }} />
            <span className="kalm-mark is-old" style={{ left: "3.6%" }} />
            <span className="kalm-gap" style={{ left: "76.4%", width: "21.8%" }} />
            <span className="kalm-mark" style={{ left: "76.4%" }} />
            <span className="kalm-mark" style={{ left: "98.2%" }} />
            <span className="kalm-mark is-now" style={{ left: "100%" }} />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
            <span>55 weeks ago</span>
            <span className="text-blood">12 weeks · nothing</span>
            <span className="text-bone">Today</span>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] lg:grid-cols-3">
          <article className="bg-void p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">55 weeks ago</p>
            <h3 className="mt-3 text-[19px] font-bold leading-snug text-bone">&ldquo;Currently booking November &amp; December.&rdquo;</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/audit/kalm/recibo-booking-diciembre.webp" alt="Caption: Currently booking November & December, 55 weeks ago" className="mt-5 w-full rounded-[10px] ring-1 ring-white/[0.08]" loading="lazy" />
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              It&apos;s still on your grid. Someone scrolling today can&apos;t tell which December you meant.
            </p>
          </article>
          <article className="bg-void p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">53 to 55 weeks ago</p>
            <h3 className="mt-3 text-[19px] font-bold leading-snug text-bone">The last time your highlights changed.</h3>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Healed, Timelapses, Lettering: the stories inside them are about a year old. Highlights are the first thing people tap,
              and right now they show last year&apos;s work.
            </p>
          </article>
          <article className="bg-void p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">13 weeks ago → last week</p>
            <h3 className="mt-3 text-[19px] font-bold leading-snug text-bone">Twelve weeks without a single post.</h3>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Your newest post went up last week. The one before it is 13 weeks old. You were tattooing the whole time. Nobody saw it.
            </p>
          </article>
        </div>
        <p className="mt-10 max-w-[52ch] text-[clamp(20px,2.4vw,26px)] font-semibold leading-snug text-bone">
          To someone deciding who to trust with something permanent, a quiet profile reads like a closed shop.
        </p>
      </section>

      {/* ── 03 · tres puertas ─────────────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="03">The path to book</Tag>
        <h2 className="flash-type max-w-[16ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Three doors. Two addresses. No price.</h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { k: "Door 1 · your bio", v: "Royal Flesh Tattoo", d: "“Chicago / @royalfleshtattoo”" },
            { k: "Door 2 · your booking link", v: "Dream City Tattoos", d: "The Venue form is titled “KalmTattoos | Dream City Tattoos”." },
            { k: "Door 3 · your last tagged post", v: "Dream City Tattoos", d: "The flip phone, 14 weeks ago, is tagged there." },
          ].map((x, i) => (
            <div key={x.k} className={`rounded-[18px] p-7 ring-1 ${i === 0 ? "ring-white/[0.1]" : "ring-blood/40"}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">{x.k}</p>
              <p className="flash-type mt-4 text-[clamp(26px,3vw,34px)] leading-none text-bone">{x.v}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="text-[22px] font-bold leading-snug text-bone">Your bio promises &ldquo;booking info &amp; availability.&rdquo; The link doesn&apos;t have either.</h3>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              It opens one button. Tap it, and the first screen asks for first name, last name, phone and email, before it tells
              them anything. No starting price, no deposit, no dates, no idea how long you take to answer.
            </p>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              The people who still fill it in are the ones who were going to book anyway. Everyone who was <em>almost</em> sure
              closes the tab, and you never find out they existed.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/audit/kalm/recibo-dream-city.webp" alt="Post tagged at Dream City Tattoos, 14 weeks ago" className="mt-8 w-full max-w-[440px] rounded-[10px] ring-1 ring-white/[0.08]" loading="lazy" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/audit/kalm/venue-inicio.webp" alt="Venue page: one Book a tattoo button" className="w-full rounded-[12px] ring-1 ring-white/[0.1]" loading="lazy" />
              <figcaption className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">1 · one button</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/audit/kalm/venue-formulario.webp" alt="Venue form asking for name, phone and email first" className="w-full rounded-[12px] ring-1 ring-white/[0.1]" loading="lazy" />
              <figcaption className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">2 · your phone number, please</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 04 · lo que lee un desconocido ────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="04">The small print</Tag>
        <h2 className="flash-type max-w-[18ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">What a stranger reads in ten seconds.</h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2">
          <article className="bg-void p-7 sm:p-8 md:col-span-2">
            <h3 className="text-[19px] font-bold text-bone">Your name, in three different logos.</h3>
            <p className="mt-3 max-w-[64ch] text-[14.5px] leading-relaxed text-muted">
              KALM in graffiti, Kalm in gothic gold, KA◉M with the eye in red. Plus a dog photo, a screenshot and a timelapse frame.
              Seven covers, no family. And the one with your best work, the paws, has no name. Another one says &ldquo;TATTTOS&rdquo;.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/audit/kalm/destacadas-hoy.webp" alt="Your current highlight covers" className="mt-6 w-full max-w-[768px] rounded-[10px]" loading="lazy" />
          </article>
          <article className="bg-void p-7 sm:p-8">
            <h3 className="text-[19px] font-bold text-bone">You follow more people than follow you.</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              1,312 following, 1,144 followers. On a tattoo profile that reads as &ldquo;starting out&rdquo;, and your work is past that.
            </p>
          </article>
          <article className="bg-void p-7 sm:p-8">
            <h3 className="text-[19px] font-bold text-bone">Four backgrounds, one artist.</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              Pink neon, a white wall, a black curtain, whatever was behind the client. Your best realism, the pit bull with the
              cat, sits in pink-lit shadow where the shading disappears.
            </p>
          </article>
          <article className="bg-void p-7 sm:p-8 md:col-span-2">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_1fr]">
              <div>
                <h3 className="text-[19px] font-bold text-bone">#fuckhashtags #fuckinstagram</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  Fair, and it&apos;s your voice. But the person about to book a memorial for their dog reads that caption too.
                  Instagram is the front desk of your shop, and right now the front desk is telling customers it hates its job.
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/audit/kalm/recibo-hashtags.webp" alt="Caption with #fuckhashtags #fuckinstagram" className="w-full max-w-[400px] rounded-[10px] ring-1 ring-white/[0.08]" loading="lazy" />
            </div>
          </article>
        </div>
      </section>

      {/* ── 05 · el antes / después ───────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="05">The reveal</Tag>
        <h2 className="flash-type max-w-[16ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Kalm, sorted.</h2>
        <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-muted">
          Same artist. Same tattoos, every one of them yours. We only took out the noise.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* hoy */}
          <div>
            <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-faint">Today</p>
            <div className="kalm-phone">
              <div className="kalm-phone-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/audit/kalm/perfil-hoy.webp" alt="Your profile today" className="w-full" loading="lazy" />
                <div className="kalm-phone-grid">
                  {gridHoy.map((id) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={id} src={T(id)} alt="" className="kalm-tile" loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* ordenado */}
          <div>
            <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-blood">After 30 days</p>
            <div className="kalm-phone is-new">
              <div className="kalm-phone-in">
                <div className="px-4 pt-5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-[68px] flex-none items-center justify-center rounded-full bg-[#0a0a0b] ring-2 ring-blood">
                      <span className="flash-type text-[20px] tracking-[0.06em] text-bone">KALM</span>
                    </div>
                    <div className="grid flex-1 grid-cols-3 text-center">
                      {[["67", "posts"], ["1,144", "followers"], ["—", "following"]].map(([v, k]) => (
                        <div key={k}>
                          <p className="text-[14px] font-bold text-bone">{v}</p>
                          <p className="text-[10.5px] text-muted">{k}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-[12.5px] font-bold text-bone">Kalm · Black &amp; grey + script</p>
                  <p className="mt-0.5 whitespace-pre-line text-[12px] leading-[1.45] text-bone/85">
                    {"Pet & memorial portraits · Chicago\n📍 One studio, one address\n↓ Prices, deposit & dates · book in 2 min"}
                  </p>
                  <p className="mt-0.5 text-[12px] font-semibold text-[#8ab4ff]">venue.ink/@kalmtattoos</p>
                  <div className="mt-4 flex gap-3 overflow-hidden">
                    {portadas.slice(0, 5).map((p) => (
                      <div key={p.f} className="flex flex-none flex-col items-center gap-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/audit/kalm/portadas/kalm-cover-${p.f}-thumb.webp`} alt="" className="kalm-hl" loading="lazy" />
                        <span className="text-[9.5px] text-bone/80">{p.w}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="kalm-phone-grid">
                  {gridOrdenado.map((id) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={id} src={T(id)} alt="" className="kalm-tile" loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[12px] text-faint">
          The &ldquo;after&rdquo; is a mock-up built from your own posts. &ldquo;Following&rdquo; is left blank on purpose: that one&apos;s your call.
        </p>
      </section>

      {/* ── 06 · la pieza firma ───────────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="06">Your signature piece</Tag>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="flash-type max-w-[16ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Portrait + script. You already do both.</h2>
            <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-muted">
              Your strongest realism (the pit bull, the husky, the cat) and your strongest lettering (Xochitl, México, the Serenity
              Prayer) live in opposite corners of your grid. Put them in one piece, a portrait with a name in script, and you have
              something people can ask for by name: a memorial for a dog, a grandmother, a kid. That&apos;s not a style. It&apos;s an
              offer.
            </p>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">
              And it&apos;s the end of November. A portrait of someone&apos;s dog is a Christmas present. A gift certificate gets paid in
              December and tattooed in January.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={T("a05")} alt="Your pit bull portrait" className="w-[40%] max-w-[200px] rounded-[12px] ring-1 ring-white/[0.1]" loading="lazy" />
            <span className="flash-type text-[52px] text-blood">+</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={T("a15")} alt="Your Xochitl script" className="w-[40%] max-w-[200px] rounded-[12px] ring-1 ring-white/[0.1]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── 07 · regalos ──────────────────────────────────────── */}
      <section className="wrap border-t border-white/[0.06] mt-20 pt-20 sm:pt-24">
        <Tag n="07">Yours to keep</Tag>
        <h2 className="flash-type max-w-[18ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">Four fixes you can do tonight. Free.</h2>
        <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-muted">No charge, no catch. They expire on {fechaExp}.</p>

        <p className="expira-aviso mt-8 hidden rounded-[14px] bg-panel p-6 text-[15px] text-muted ring-1 ring-blood/40">
          These expired on {fechaExp}. Book a call and we&apos;ll walk you through them live.
        </p>

        <div className="expira-oculto mt-12 space-y-14">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">Fix 1</p>
              <h3 className="mt-2 text-[22px] font-bold text-bone">A bio that says what you do.</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{regalos.bioNote}</p>
            </div>
            <CopyText text={regalos.bio} label="Copy" done="Copied" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">Fix 2</p>
              <h3 className="mt-2 text-[22px] font-bold text-bone">One pinned post that answers everything.</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{regalos.fijadoNote}</p>
            </div>
            <CopyText text={regalos.fijado} label="Copy" done="Copied" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">Fix 3</p>
              <h3 className="mt-2 text-[22px] font-bold text-bone">The answer to &ldquo;how much?&rdquo;</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{regalos.dmNote}</p>
            </div>
            <CopyText text={regalos.dm} label="Copy" done="Copied" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">Fix 4</p>
            <h3 className="mt-2 text-[22px] font-bold text-bone">Seven highlight covers. One family.</h3>
            <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
              1080 × 1920, ready to upload. Tap one to download it. Instagram crops to the circle, and everything important sits
              inside it.
            </p>
            <ul className="mt-7 flex flex-wrap gap-5">
              {portadas.map((p) => (
                <li key={p.f}>
                  <a href={`/audit/kalm/portadas/kalm-cover-${p.f}.jpg`} download className="group flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/audit/kalm/portadas/kalm-cover-${p.f}-thumb.webp`} alt={`${p.w} cover`} className="size-[84px] rounded-full ring-1 ring-white/[0.18] transition group-hover:ring-blood" loading="lazy" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted group-hover:text-bone">{p.w} ↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 08 · 30 días + llamada ────────────────────────────── */}
      <section id="empezar" className="wrap scroll-mt-20 border-t border-white/[0.06] mt-20 pt-20 pb-24 sm:pt-24">
        <Tag n="08">The next 30 days</Tag>
        <h2 className="flash-type max-w-[17ch] text-[clamp(32px,5vw,60px)] leading-[1.02]">The fixes are the easy part. Doing it every week isn&apos;t.</h2>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
          {[
            { w: "Week 1", t: "One identity", d: "One logo, one bio, seven covers. Your grid re-sorted so the first nine posts are portraits and script." },
            { w: "Week 2", t: "One door", d: "One studio everywhere. Booking page with starting price, deposit and what to send. Every DM answered the same day." },
            { w: "Week 3", t: "One look", d: "One wall, one light, one angle for every photo. Three posts a week from what you already tattoo." },
            { w: "Week 4", t: "Demand", d: "The portrait + script gift certificate, in front of dog owners in Chicago." },
          ].map((x) => (
            <li key={x.w} className="bg-void p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">{x.w}</p>
              <p className="mt-3 text-[19px] font-bold text-bone">{x.t}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{x.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08] md:grid-cols-2">
          <div className="bg-void p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">If nothing changes</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
              <li>December goes by with &ldquo;Currently booking November &amp; December&rdquo; from last year still on the grid.</li>
              <li>People who want a portrait of their dog find someone whose profile says &ldquo;pet portraits&rdquo; first.</li>
              <li>January depends on whoever happens to DM you.</li>
            </ul>
          </div>
          <div className="bg-void p-8 ring-1 ring-inset ring-blood/40">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blood">If we fix it now</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-bone">
              <li>Anyone who lands on your profile knows in five seconds what to book you for.</li>
              <li>The link gives them a price, a deposit and a date instead of a phone-number form.</li>
              <li>Gift certificates sold in December are January appointments already paid for.</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="flash-type mx-auto max-w-[18ch] text-[clamp(34px,5.4vw,66px)] leading-[1.02]">
            Your book shouldn&apos;t depend on who happens to DM you.
          </p>
          <p className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-relaxed text-muted">
            30 minutes. We go through this page with you, you tell us where you tattoo now, and you leave with a plan, whether you
            work with us or not.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={site.call} target="_blank" rel="noopener" className="inline-flex items-center justify-center bg-blood px-9 py-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-white hover:bg-[#ff1f17]">
              Book the 30-min call
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted underline underline-offset-4 hover:text-bone">
              Or DM us on Instagram
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em]">
            <li className="rounded-full px-4 py-2 text-blood ring-1 ring-blood/50">Valid until {fechaExp}</li>
            <CuposChip label="spots left this month" label1="spot left this month" />
          </ul>
        </div>
      </section>

      <footer className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] py-10 text-[12px] text-faint">
        <span>
          {entity.legal} · {entity.email}
        </span>
        <span>Private audit for {kalm.handle}. Not indexed.</span>
      </footer>
    </main>
  );
}
