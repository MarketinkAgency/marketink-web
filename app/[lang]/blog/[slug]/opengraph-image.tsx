import { ImageResponse } from "next/og";
import { isLang } from "@/lib/copy";
import { findPost } from "@/lib/blog";
import { AUTHORS } from "@/lib/authors";

export const alt = "MarketINK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** La tarjeta de cada artículo al compartirlo: título, autor y marca. */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const l = isLang(lang) ? lang : "en";
  const post = findPost(l, slug);
  const title = post ? post[l].title : "MarketINK";
  const author = post ? AUTHORS[post.author] : null;

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
          <span style={{ color: "#8b847b", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", marginLeft: 18 }}>Blog</span>
        </div>

        <div
          style={{
            display: "flex",
            color: "#ede6dc",
            fontSize: title.length > 70 ? 52 : 62,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: -2,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 46, height: 3, background: "#e10600" }} />
          <span style={{ color: "#8b847b", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
            {author ? `${author.name} · ` : ""}marketinkagency.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
