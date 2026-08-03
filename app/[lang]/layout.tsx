import type { Metadata } from "next";
import { Montserrat, Anton } from "next/font/google";
import { notFound } from "next/navigation";
import { copy, isLang, LOCALES } from "@/lib/copy";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

/** Montserrat en todas sus disposiciones. La fuente de la marca. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

/* Anton para titulares: condensada, un solo grosor, tipografía de
   cartel. Se eligió sobre Archivo Black porque el español ocupa más
   y con una fuente ancha el titular empuja los botones fuera de la
   primera pantalla. */
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--f-anton", display: "swap" });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = copy[isLang(lang) ? lang : "en"];
  const url = `${SITE_URL}/${lang}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.desc,
    /* canonical + hreflang: le dicen a Google que /es y /en son la
       misma página en dos idiomas, no dos páginas compitiendo. */
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en`, "x-default": `${SITE_URL}/en` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.desc,
      url,
      siteName: "MarketINK",
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.desc },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${montserrat.variable} ${anton.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
