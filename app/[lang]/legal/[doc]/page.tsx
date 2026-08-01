import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, LOCALES, copy } from "@/lib/copy";
import { legal, legalNav, LEGAL_SLUGS, type LegalSlug } from "@/lib/legal";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => LEGAL_SLUGS.map((doc) => ({ lang, doc })));
}

function isSlug(s: string): s is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!isLang(lang) || !isSlug(doc)) return {};
  const d = legal[lang][doc];
  return { title: `${d.title} · MarketINK`, description: d.intro.slice(0, 155), robots: { index: true, follow: true } };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  if (!isLang(lang) || !isSlug(doc)) notFound();

  const d = legal[lang][doc];
  const nav = legalNav[lang];
  const other = lang === "es" ? "en" : "es";
  const t = copy[lang];

  return (
    <div className="relative z-10 min-h-svh">
      {/* barra */}
      <div className="border-b border-white/[0.07] px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <Link href={`/${lang}`} className="inline-flex items-baseline tracking-[-0.035em]" aria-label="MarketINK">
            <span className="font-medium">market</span>
            <span className="font-extrabold">INK</span>
            <span className="ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood" aria-hidden />
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/${other}/legal/${doc}`} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:text-bone">
              {other}
            </Link>
            <Link href={`/${lang}`} className="text-[13.5px] text-muted transition hover:text-bone">
              {lang === "es" ? "Volver al sitio" : "Back to site"}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl gap-14 px-6 py-16 lg:grid lg:grid-cols-[210px_1fr] lg:py-24">
        {/* índice */}
        <nav className="mb-12 lg:mb-0" aria-label={lang === "es" ? "Documentos legales" : "Legal documents"}>
          <p className="mb-4 flash-sub text-[10.5px] tracking-[0.2em] text-faint">Legal</p>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/${lang}/legal/${n.slug}`}
                  className={`text-[14px] transition ${
                    n.slug === doc ? "font-semibold text-blood" : "text-muted hover:text-bone"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article>
          <h1 className="flash-type text-[clamp(2rem,4.4vw,3.2rem)]">{d.title}</h1>
          <p className="mt-4 text-[12.5px] text-faint">
            {lang === "es" ? "Última actualización: " : "Last updated: "}
            {d.updated}
          </p>
          <p className="mt-8 max-w-[68ch] text-[15.5px] leading-relaxed text-muted">{d.intro}</p>

          <div className="mt-12 space-y-11">
            {d.sections.map((s) => (
              <section key={s.h}>
                <h2 className="mb-4 text-[17px] font-bold tracking-[-0.02em] text-bone">{s.h}</h2>
                {s.ul ? (
                  <ul className="mb-4 space-y-2.5">
                    {s.ul.map((x) => (
                      <li key={x} className="flex max-w-[68ch] gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[10px] size-1 shrink-0 rounded-full bg-blood" />
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {s.p?.map((x) => (
                  <p key={x} className="mb-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
                    {x}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-white/[0.07] pt-8">
            <p className="text-[13.5px] text-faint">
              © {new Date().getFullYear()} Roca Digital LLC. {t.footer.rights}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
