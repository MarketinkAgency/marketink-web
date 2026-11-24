// Genera las portadas de destacadas de la auditoría de @kalmtattoos.
// Uso: node scripts/portadas-kalm.mjs scripts/fonts-recursos public/audit/kalm/portadas
// Una sola familia: negro, grano, una línea fina y una palabra en Anton.
// El contenido importante cabe en el círculo central (Instagram recorta).
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const [, , FONTS, OUT] = process.argv;
mkdirSync(OUT, { recursive: true });

const b64 = (f) => readFileSync(join(FONTS, f)).toString("base64");
const FONT_CSS = `
@font-face{font-family:Anton;src:url(data:font/woff2;base64,${b64("anton-latin.woff2")}) format('woff2');}
@font-face{font-family:Montserrat;font-weight:100 900;src:url(data:font/woff2;base64,${b64("montserrat-latin.woff2")}) format('woff2');}
`;
const GRAIN = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' seed='11'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const grain = `url(data:image/svg+xml;utf8,${encodeURIComponent(GRAIN).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29")})`;

export const PORTADAS = [
  { f: "01-book", w: "BOOK", s: "how to book" },
  { f: "02-prices", w: "PRICES", s: "starting at" },
  { f: "03-portraits", w: "PORTRAITS", s: "pets & people" },
  { f: "04-script", w: "SCRIPT", s: "lettering" },
  { f: "05-healed", w: "HEALED", s: "months later" },
  { f: "06-reviews", w: "REVIEWS", s: "from clients" },
  { f: "07-faq", w: "FAQ", s: "before you ask" },
];

const html = (p) => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#060606}
.st{position:relative;width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;
 background:radial-gradient(60% 34% at 50% 50%, #1b1b1d 0%, #0a0a0b 60%, #060606 100%)}
.g{position:absolute;inset:0;mix-blend-mode:screen;background-image:${grain};background-size:300px 300px}
.c{position:relative;width:760px;height:760px;border-radius:50%;border:3px solid rgba(237,230,220,.22);
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
.w{font-family:Anton,sans-serif;color:#ede6dc;letter-spacing:.01em;line-height:1;font-size:${p.w.length > 7 ? 112 : p.w.length > 5 ? 140 : 168}px}
.s{font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.28em;font-size:30px;color:#9c968c}
.d{width:18px;height:18px;border-radius:50%;background:#e10600}
.k{position:absolute;bottom:150px;font-family:Anton,sans-serif;font-size:44px;letter-spacing:.3em;color:rgba(237,230,220,.5)}
</style></head><body><div class="st"><div class="g"></div>
<div class="c"><i class="d"></i><div class="w">${p.w}</div><div class="s">${p.s}</div></div>
<div class="k">KALM</div></div></body></html>`;

const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
for (const p of PORTADAS) {
  await pg.setContent(html(p), { waitUntil: "load" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: join(OUT, `kalm-cover-${p.f}.png`) });
  console.log("ok", p.f);
}
await b.close();
