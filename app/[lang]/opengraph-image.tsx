import { ImageResponse } from "next/og";
import { copy, isLang } from "@/lib/copy";

export const alt = "MarketINK — booking systems for tattoo artists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * La tarjeta que sale cuando compartes el enlace por WhatsApp, Instagram
 * o Slack. Se genera en el build, una por idioma. Sin esto, el enlace
 * aparece como texto plano y pierde la mitad de los clics.
 */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = copy[isLang(lang) ? lang : "en"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070708",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* resplandor de tinta */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 760,
            height: 760,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(225,6,0,0.40) 0%, rgba(225,6,0,0.10) 45%, rgba(7,7,8,0) 72%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#ede6dc", fontSize: 34, letterSpacing: -1 }}>market</span>
          <span style={{ color: "#ede6dc", fontSize: 34, fontWeight: 900, letterSpacing: -1, marginLeft: -10 }}>INK</span>
          <span style={{ width: 13, height: 13, borderRadius: 999, background: "#e10600", marginLeft: 4 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ede6dc",
              fontSize: 68,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              textTransform: "uppercase",
              maxWidth: 940,
            }}
          >
            {t.hero.h1b}
          </div>
          <div style={{ display: "flex", marginTop: 26, color: "#9c968c", fontSize: 26, maxWidth: 820 }}>
            {t.footer.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 46, height: 3, background: "#e10600" }} />
          <span style={{ color: "#8b847b", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
            marketinkagency.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
