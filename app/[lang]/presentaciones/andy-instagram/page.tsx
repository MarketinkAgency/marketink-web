import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/copy";
import { entity } from "@/lib/legal";
import { deck, slides, messages, recursos, zipFile } from "@/lib/presentaciones/andy-instagram";
import Deck from "@/components/Deck";
import MessageLibrary from "@/components/MessageLibrary";

/**
 * SESIÓN DE CIERRE — ANDY TATTOO ARTIST
 *
 * Ruta privada: solo existe en español, no está en el menú, no está en
 * el sitemap y lleva noindex/nofollow. Es la página que Nick comparte en
 * pantalla en la reunión y que después le mandamos a Andy.
 *
 * Tres bloques, en este orden: el deck (components/Deck.tsx), la
 * biblioteca de mensajes con copiar, y el kit de recursos con sus
 * descargas. El contenido vive en lib/presentaciones/andy-instagram.ts.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: deck.metaTitle,
    description: deck.metaDesc,
    robots: { index: false, follow: false, nocache: true },
    alternates: {},
    openGraph: { title: deck.metaTitle, description: deck.metaDesc, type: "website", locale: "es_ES", siteName: "MarketINK" },
  };
}

export default async function Presentacion({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang) || lang !== "es") notFound();
  const u = deck.ui;

  return (
    <main className="relative min-h-svh">
      {/* cabecera mínima: marca, para quién, y nada más */}
      <header className="wrap flex flex-wrap items-center justify-between gap-4 pt-7 pb-6">
        <Link href="/es" className="inline-flex items-baseline tracking-[-0.035em] text-[17px]" aria-label="MarketINK">
          <span className="font-medium">market</span>
          <span className="font-extrabold">INK</span>
          <span className="ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood" aria-hidden />
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
          {deck.client} · {deck.city}
        </p>
      </header>

      {/* ── el deck ───────────────────────────────────────────── */}
      <section id="deck" className="wrap pb-16">
        <Deck slides={slides} ui={u} />
      </section>

      {/* ── biblioteca de mensajes ───────────────────────────── */}
      <section id="mensajes" className="wrap scroll-mt-6 border-t border-white/[0.06] py-20 sm:py-24">
        <p className="sec-tag mb-7">
          <b>01</b>
          <i aria-hidden />
          <span>{u.libraryTag}</span>
        </p>
        <h2 className="flash-type max-w-[18ch] text-[clamp(30px,4.6vw,56px)] leading-[1.03]">{u.libraryTitle}</h2>
        <p className="mt-5 mb-12 max-w-[62ch] text-[16px] leading-relaxed text-muted">{u.librarySub}</p>
        <MessageLibrary groups={messages} ui={{ copy: u.copy, copied: u.copied, field: u.field }} />
        <p className="mt-8">
          <a href="#deck" className="text-[13px] text-faint underline underline-offset-4 hover:text-bone">↑ {u.backToDeck}</a>
        </p>
      </section>

      {/* ── recursos, en la estética de Andy ─────────────────── */}
      <section id="recursos" className="andy-grain scroll-mt-6 py-20 sm:py-24">
        <div className="wrap">
          <p className="mb-7 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#bdb8b0]">
            <b>02</b>
            <i className="block h-px w-[34px] bg-[#bdb8b0]/60" aria-hidden />
            <span>{u.resourcesTag}</span>
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="flash-type max-w-[18ch] text-[clamp(30px,4.6vw,56px)] leading-[1.03] text-[#e9e6e1]">{u.resourcesTitle}</h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-[#a8a39b]">{u.resourcesSub}</p>
            </div>
            <a
              href={zipFile}
              download
              className="inline-flex flex-none items-center justify-center bg-[#e9e6e1] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#050505] transition hover:bg-white"
            >
              {u.downloadAll}
            </a>
          </div>

          {recursos.map((g) => (
            <div key={g.id} className="mt-16">
              <h3 className="text-[18px] font-bold text-[#e9e6e1]">{g.title}</h3>
              <p className="mt-1 max-w-[62ch] text-[14px] text-[#8f8a82]">{g.sub}</p>
              <ul className={`mt-6 grid gap-5 ${g.id === "imprimibles" ? "sm:grid-cols-2 lg:grid-cols-4" : g.id === "fondos-posts" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
                {g.items.map((r) => {
                  /* vista previa ligera (480 px, webp); la descarga es el archivo completo */
                  const png = r.file.replace(/\.pdf$/, ".png").replace("/recursos/andy/", "/recursos/andy/preview/").replace(/\.png$/, ".webp");
                  return (
                    <li key={r.file} className="group">
                      <a href={r.file} download className="block">
                        <span className={`block overflow-hidden bg-[#0d0d0d] ring-1 ring-white/[0.08] ${g.id === "imprimibles" ? "aspect-[1/1.3]" : g.id === "fondos-posts" ? "aspect-[4/5]" : "aspect-[9/16]"}`}>
                          {/* vista previa: la PNG (para los PDF, su gemela PNG) */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={png} alt={r.title} loading="lazy" className={`h-full w-full transition duration-500 group-hover:scale-[1.02] ${g.id === "imprimibles" ? "object-contain p-2" : "object-cover"}`} />
                        </span>
                        <span className="mt-3 flex items-baseline justify-between gap-2">
                          <span className="text-[13px] font-semibold text-[#e9e6e1]">{r.title}</span>
                          <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#8f8a82]">{r.size}</span>
                        </span>
                        <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#bdb8b0] underline underline-offset-4">{u.download}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <p className="mt-16">
            <a href="#deck" className="text-[13px] text-[#8f8a82] underline underline-offset-4 hover:text-[#e9e6e1]">↑ {u.backToDeck}</a>
          </p>
        </div>
      </section>

      <footer className="wrap flex flex-wrap items-center justify-between gap-4 py-10 text-[12px] text-faint">
        <span>
          {entity.legal} · {entity.email}
        </span>
        <span>{u.private}</span>
      </footer>
    </main>
  );
}
