import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { copy, isLang, LOCALES } from "@/lib/copy";
import "../globals.css";

/** Montserrat en todas sus disposiciones. La fuente de la marca. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

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
  return {
    title: t.meta.title,
    description: t.meta.desc,
    openGraph: { title: t.meta.title, description: t.meta.desc, type: "website" },
    alternates: { languages: { es: "/es", en: "/en" } },
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
    <html lang={lang} className={montserrat.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
