import Link from "next/link";
import Image from "next/image";
import { copy, site, type Lang } from "@/lib/copy";
import { entity, legalNav } from "@/lib/legal";
import { blogUi } from "@/lib/blog";
import { AUTHORS, type AuthorKey } from "@/lib/authors";
import Ink from "@/components/Ink";
import Glow from "@/components/Glow";
import Nav from "@/components/Nav";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import Consent from "@/components/Consent";

/**
 * El armazón que comparten el índice del blog y cada artículo: la
 * misma barra de navegación de la portada (con «Blog» añadido), el mismo
 * pie, y la misma salida —la auditoría gratis— arriba en la barra, en la
 * barra fija de móvil y al final.
 *
 * La navegación apunta a la portada con anclas (/es#system) porque el
 * blog no tiene secciones propias que merezcan estar en el menú; lo que
 * tiene es un camino de vuelta al sitio que vende.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline tracking-[-0.035em] ${className}`} aria-label="MarketINK">
      <span className="font-medium">market</span>
      <span className="font-extrabold">INK</span>
      <span aria-hidden className="ml-[0.1em] inline-block size-[0.32em] rounded-full bg-blood shadow-[0_0_18px_5px_rgba(225,6,0,0.7)]" />
    </span>
  );
}

export default function BlogShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const c = copy[lang];
  const other: Lang = lang === "es" ? "en" : "es";
  const home = `/${lang}`;

  return (
    <>
      <Ink quiet />
      <Glow />
      <Analytics />
      <Consent lang={lang} t={c.consent} />
      <StickyCta href={site.call} label={c.nav.cta} lang={lang} spotsLabels={c.book} />

      <div className="relative z-10">
        <Nav
          lang={lang}
          other={other}
          cta={c.nav.cta}
          ctaHref={site.call}
          items={[
            { href: `${home}#system`, label: c.nav.system },
            { href: `${home}#results`, label: c.nav.results },
            { href: `/${lang}/webs`, label: c.nav.webs },
            { href: `/${lang}/blog`, label: blogUi[lang].title },
            { href: `${home}#faq`, label: c.nav.faq },
          ]}
        />

        {children}

        <footer className="border-t border-white/[0.06] pb-28 pt-14 lg:pb-14">
          <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Wordmark className="text-[18px]" />
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">{c.footer.tagline}</p>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.write}</p>
              <a href={`mailto:${entity.email}`} className="block text-[14px] text-muted transition hover:text-bone">
                {entity.email}
              </a>
              <a href={site.whatsapp} className="mt-2 block text-[14px] text-muted transition hover:text-bone">
                WhatsApp
              </a>
            </div>
            <div>
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.where}</p>
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
              <p className="mb-3 flash-sub text-[10.5px] tracking-[0.16em] text-faint">{c.footer.follow}</p>
              <a href={site.instagram} className="block text-[14px] text-muted transition hover:text-bone">
                Instagram
              </a>
            </div>
          </div>
          <div className="wrap mt-12 border-t border-white/[0.06] pt-8">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              <li>
                <Link href={home} className="text-[13.5px] text-muted transition hover:text-bone">
                  {lang === "es" ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="text-[13.5px] text-muted transition hover:text-bone">
                  {blogUi[lang].title}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/webs`} className="text-[13.5px] text-muted transition hover:text-bone">
                  {c.nav.webs}
                </Link>
              </li>
              {legalNav[lang].map((n) => (
                <li key={n.slug}>
                  <Link href={`/${lang}/legal/${n.slug}`} className="text-[13.5px] text-muted transition hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] leading-relaxed text-faint">
              © {new Date().getFullYear()} {c.footer.built} · {c.footer.rights}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

/** La única petición del artículo: la auditoría. Se usa a mitad y al final. */
export function AuditCta({ lang, end = false }: { lang: Lang; end?: boolean }) {
  const u = blogUi[lang];
  return (
    <aside className="border border-blood/40 bg-panel/60 px-7 py-9 sm:px-10 sm:py-11">
      <p className="sec-tag mb-5">
        <b>→</b>
        <i aria-hidden />
        <span>{end ? u.endTag : u.ctaTag}</span>
      </p>
      <h2 className="flash-type max-w-[20ch] text-[clamp(24px,3.4vw,40px)] leading-[1.05] text-bone">{end ? u.endTitle : u.ctaTitle}</h2>
      <p className="mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{end ? u.endBody : u.ctaBody}</p>
      <a href={site.call} target="_blank" rel="noopener" className="btn mt-7">
        {u.ctaBtn}
      </a>
    </aside>
  );
}

export function AuthorCard({ lang, author }: { lang: Lang; author: AuthorKey }) {
  const a = AUTHORS[author];
  return (
    <div className="flex gap-5 border-t border-white/[0.08] pt-8">
      <Image src={a.img} alt={a.name} width={72} height={72} className="size-[72px] shrink-0 object-cover grayscale" />
      <div>
        <p className="flash-sub text-[10.5px] tracking-[0.16em] text-faint">{blogUi[lang].authorTag}</p>
        <p className="mt-1 text-[16px] font-bold text-bone">
          {a.name} <span className="font-normal text-muted">· {a.role[lang]} · {a.cred}</span>
        </p>
        <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">{a.bio[lang]}</p>
      </div>
    </div>
  );
}
