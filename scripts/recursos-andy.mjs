// Genera el kit de Andy: fondos, plantillas, checklist y calendario.
// Uso: node andy-kit.mjs <carpeta-fuentes> <carpeta-salida>
// Todo en escala de grises (negro, grises, tinta y grano). Sin rojo.
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const [, , FONTS, OUT] = process.argv;
mkdirSync(OUT, { recursive: true });

const b64 = (f) => readFileSync(join(FONTS, f)).toString("base64");
const FONT_CSS = `
@font-face{font-family:Anton;src:url(data:font/woff2;base64,${b64("anton-latin.woff2")}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
@font-face{font-family:Anton;src:url(data:font/woff2;base64,${b64("anton-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;}
@font-face{font-family:Montserrat;font-weight:100 900;src:url(data:font/woff2;base64,${b64("montserrat-latin.woff2")}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
@font-face{font-family:Montserrat;font-weight:100 900;src:url(data:font/woff2;base64,${b64("montserrat-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;}
`;

const GRAIN = (op = 0.22, freq = 0.85) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch' seed='7'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const grainBg = (op, freq) => `url(data:image/svg+xml;utf8,${encodeURIComponent(GRAIN(op, freq)).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29")})`;

const BASE = (w, h, body, extraCss = "") => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:#050505;color:#e9e6e1;font-family:Montserrat,sans-serif;-webkit-font-smoothing:antialiased}
.stage{position:relative;width:${w}px;height:${h}px;overflow:hidden}
.grain{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;background-image:${grainBg(0.22, 0.85)};background-size:300px 300px}
.display{font-family:Anton,sans-serif;text-transform:uppercase;letter-spacing:-0.008em;line-height:1.02}
.label{font-weight:700;text-transform:uppercase;letter-spacing:0.22em;font-size:26px;color:#a8a39b}
.foot{position:absolute;left:0;right:0;bottom:120px;text-align:center;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;font-size:24px;color:#8f8a82}
.photo{border:2px dashed rgba(233,230,225,0.35);display:flex;align-items:center;justify-content:center;color:#6f6a63;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;font-size:22px}
${extraCss}
</style></head><body><div class="stage">${body}</div></body></html>`;

/* ── Fondos ─────────────────────────────────────────────────────── */
const smokeSvg = (w, h, seed, scale) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">
  <defs>
    <filter id="s" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${0.0022 * scale} ${0.0036 * scale}" numOctaves="5" seed="${seed}" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="${340 * scale}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation="${26 * scale}" result="b"/>
      <feTurbulence type="fractalNoise" baseFrequency="${0.012 * scale}" numOctaves="3" seed="${seed + 3}" result="w"/>
      <feComposite in="b" in2="w" operator="arithmetic" k1="1.1" k2="0.25" k3="0" k4="0" result="m"/>
      <feColorMatrix in="m" type="saturate" values="0"/>
    </filter>
    <radialGradient id="g1" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d8d4cc" stop-opacity="0.75"/><stop offset="0.45" stop-color="#9a958d" stop-opacity="0.32"/><stop offset="1" stop-color="#050505" stop-opacity="0"/></radialGradient>
    <radialGradient id="v" cx="50%" cy="50%" r="72%"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.6"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#060606"/>
  <g filter="url(#s)">
    <ellipse cx="${w * 0.08}" cy="${h * 0.08}" rx="${w * 0.7}" ry="${h * 0.2}" fill="url(#g1)"/>
    <ellipse cx="${w * 0.95}" cy="${h * 0.18}" rx="${w * 0.55}" ry="${h * 0.15}" fill="url(#g1)"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.02}" rx="${w * 0.5}" ry="${h * 0.1}" fill="url(#g1)"/>
    <ellipse cx="${w * 0.85}" cy="${h * 0.92}" rx="${w * 0.7}" ry="${h * 0.18}" fill="url(#g1)"/>
    <ellipse cx="${w * 0.05}" cy="${h * 0.78}" rx="${w * 0.5}" ry="${h * 0.13}" fill="url(#g1)"/>
    <ellipse cx="${w * 0.4}" cy="${h * 1.0}" rx="${w * 0.5}" ry="${h * 0.1}" fill="url(#g1)"/>
  </g>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;

const skinSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="position:absolute;inset:0">
  <defs>
    <filter id="skin" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="4" seed="3" result="mottle"/>
      <feColorMatrix in="mottle" type="saturate" values="0" result="mg"/>
      <feComponentTransfer in="mg" result="mc"><feFuncR type="linear" slope="0.75" intercept="0.16"/><feFuncG type="linear" slope="0.75" intercept="0.16"/><feFuncB type="linear" slope="0.75" intercept="0.16"/></feComponentTransfer>
      <feTurbulence type="turbulence" baseFrequency="0.22" numOctaves="1" seed="11" result="pores"/>
      <feColorMatrix in="pores" type="saturate" values="0" result="pg"/>
      <feComposite in="mc" in2="pg" operator="arithmetic" k1="0" k2="0.8" k3="0.2" k4="0" result="base"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="21" result="lines"/>
      <feDiffuseLighting in="lines" lighting-color="#ffffff" surfaceScale="1.6" diffuseConstant="0.75" result="lit"><feDistantLight azimuth="230" elevation="55"/></feDiffuseLighting>
      <feComposite in="base" in2="lit" operator="arithmetic" k1="0.9" k2="0.1" k3="0" k4="0"/>
    </filter>
    <radialGradient id="v" cx="50%" cy="50%" r="72%"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.72"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#575551"/>
  <rect width="100%" height="100%" filter="url(#skin)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;

const paperSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="position:absolute;inset:0">
  <defs>
    <filter id="p" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.7" numOctaves="4" seed="5" result="f"/><feColorMatrix in="f" type="saturate" values="0" result="g"/><feComponentTransfer in="g"><feFuncA type="linear" slope="0.5" intercept="0"/></feComponentTransfer></filter>
    <filter id="p2"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/></filter>
    <radialGradient id="pv" cx="50%" cy="48%" r="80%"><stop offset="0.7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.14"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#d9d7d2"/>
  <rect width="100%" height="100%" filter="url(#p)"/>
  <rect width="100%" height="100%" filter="url(#p2)"/>
  <rect width="100%" height="100%" fill="url(#pv)"/>
  <!-- líneas de stencil muy tenues en los bordes -->
  <g stroke="#2a2a2a" stroke-opacity="0.16" fill="none" stroke-width="2">
    <path d="M60 ${h - 180} q120 -90 260 -10 t260 20 t260 -30 t180 10"/>
    <path d="M${w - 60} 200 q-140 -80 -280 20 t-280 -10"/>
  </g>
</svg>`;

const fondos = [
  { file: "fondo-historia-01-humo-de-tinta.png", w: 1080, h: 1920, body: (w, h) => `${smokeSvg(w, h, 2, 1)}<div class="grain" style="opacity:.5"></div>` },
  { file: "fondo-historia-02-grano.png", w: 1080, h: 1920, body: () => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%, #1a1a1a 0%, #0a0a0a 55%, #000 100%)"></div><div class="grain" style="opacity:1;background-image:${grainBg(0.26, 0.8)}"></div>` },
  { file: "fondo-historia-03-degradado.png", w: 1080, h: 1920, body: () => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#000 0%,#0d0d0d 28%,#2b2b2b 50%,#0d0d0d 72%,#000 100%)"></div><div class="grain" style="opacity:.35"></div>` },
  { file: "fondo-historia-04-stencil.png", w: 1080, h: 1920, body: (w, h) => paperSvg(w, h) },
  { file: "fondo-historia-05-marco.png", w: 1080, h: 1920, body: (w, h) => `<div style="position:absolute;inset:0;background:#070707"></div><div class="grain" style="opacity:.4"></div>
      <div style="position:absolute;inset:70px;border:2px solid #c8c4bd"></div>
      <div style="position:absolute;inset:92px;border:1px solid rgba(200,196,189,.35)"></div>
      ${[[70, 70], [w - 70, 70], [70, h - 70], [w - 70, h - 70]].map(([x, y]) => `<div style="position:absolute;left:${x - 22}px;top:${y - 22}px;width:44px;height:44px;border:2px solid #c8c4bd;background:#070707"></div>`).join("")}` },
  { file: "fondo-historia-06-piel.png", w: 1080, h: 1920, body: (w, h) => `${skinSvg(w, h)}<div class="grain" style="opacity:.3"></div>` },
  { file: "fondo-post-01-tinta.png", w: 1080, h: 1350, body: (w, h) => `${smokeSvg(w, h, 5, 1.1)}<div class="grain" style="opacity:.5"></div>` },
  { file: "fondo-post-02-grano.png", w: 1080, h: 1350, body: () => `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%, #1c1c1c 0%, #0a0a0a 60%, #000 100%)"></div><div class="grain" style="opacity:1;background-image:${grainBg(0.26, 0.8)}"></div>` },
  { file: "fondo-post-03-marco.png", w: 1080, h: 1350, body: (w, h) => `<div style="position:absolute;inset:0;background:#070707"></div><div class="grain" style="opacity:.4"></div><div style="position:absolute;inset:60px;border:2px solid #c8c4bd"></div><div style="position:absolute;inset:80px;border:1px solid rgba(200,196,189,.35)"></div>
      ${[[60, 60], [w - 60, 60], [60, h - 60], [w - 60, h - 60]].map(([x, y]) => `<div style="position:absolute;left:${x - 20}px;top:${y - 20}px;width:40px;height:40px;border:2px solid #c8c4bd;background:#070707"></div>`).join("")}` },
];

/* ── Plantillas de historia ─────────────────────────────────────── */
const HANDLE = "@andy_tattoo_artist · Salt Lake City";
const tplBase = (inner, paper = false) => `
  ${paper ? "" : `${smokeSvg(1080, 1920, 4, 0.9)}<div class="grain" style="opacity:.45"></div>`}
  <div style="position:absolute;inset:0;padding:230px 90px 0">${inner}</div>
  <div class="foot">${HANDLE}</div>`;

const photo = (h, label) => `<div class="photo" style="height:${h}px;margin-top:48px">${label}</div>`;
const lines = (n, labels) => labels.slice(0, n).map((l) => `<div style="display:flex;align-items:baseline;gap:28px;padding:30px 0;border-bottom:1px solid rgba(233,230,225,.25)"><span class="display" style="font-size:54px;color:#bdb8b0;width:150px">${l}</span><span style="flex:1;border-bottom:2px solid rgba(233,230,225,.55);height:40px"></span></div>`).join("");
const steps = (arr) => arr.map((s, i) => `<div style="display:flex;gap:30px;align-items:flex-start;padding:34px 0;border-bottom:1px solid rgba(233,230,225,.22)"><span class="display" style="font-size:88px;line-height:.9;color:#bdb8b0;width:110px">0${i + 1}</span><span style="font-size:36px;line-height:1.3;font-weight:600;padding-top:14px">${s}</span></div>`).join("");

const plantillas = [
  {
    file: "plantilla-es-01-agenda-abierta.png",
    body: tplBase(`<p class="label">[mes] · Salt Lake City</p><h1 class="display" style="font-size:168px;margin-top:20px">Agenda<br>abierta</h1>${photo(880, "tu foto aquí")}<p style="margin-top:56px;font-size:34px;font-weight:600;line-height:1.35;color:#d6d2cb">DM con tu idea, zona y tamaño.<br>El depósito aparta tu fecha.</p>`),
  },
  {
    file: "plantilla-en-01-books-open.png",
    body: tplBase(`<p class="label">[month] · Salt Lake City</p><h1 class="display" style="font-size:168px;margin-top:20px">Books<br>open</h1>${photo(880, "your photo here")}<p style="margin-top:56px;font-size:34px;font-weight:600;line-height:1.35;color:#d6d2cb">DM me your idea, placement &amp; size.<br>A deposit holds your date.</p>`),
  },
  {
    file: "plantilla-es-02-cupos.png",
    body: tplBase(`<p class="label">Esta semana</p><h1 class="display" style="font-size:150px;margin-top:20px">Cupos de<br>la semana</h1><div style="margin-top:60px">${lines(6, ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"])}</div><p style="margin-top:56px;font-size:32px;font-weight:600;color:#d6d2cb">Escríbeme para apartar el tuyo.</p>`),
  },
  {
    file: "plantilla-en-02-spots.png",
    body: tplBase(`<p class="label">This week</p><h1 class="display" style="font-size:150px;margin-top:20px">Spots<br>this week</h1><div style="margin-top:60px">${lines(6, ["MON", "TUE", "WED", "THU", "FRI", "SAT"])}</div><p style="margin-top:56px;font-size:32px;font-weight:600;color:#d6d2cb">DM me to grab yours.</p>`),
  },
  {
    file: "plantilla-es-03-como-agendar.png",
    body: tplBase(`<p class="label">Paso a paso</p><h1 class="display" style="font-size:150px;margin-top:20px">Cómo<br>agendar</h1><div style="margin-top:40px">${steps(["Escríbeme por DM con tu idea, la zona y el tamaño aproximado.", "Te paso un rango de precio el mismo día.", "El depósito de $[___] aparta tu fecha y se descuenta del total.", "Ves el diseño antes de la cita."])}</div>`),
  },
  {
    file: "plantilla-en-03-how-to-book.png",
    body: tplBase(`<p class="label">Step by step</p><h1 class="display" style="font-size:150px;margin-top:20px">How to<br>book</h1><div style="margin-top:40px">${steps(["DM me your idea, placement and approximate size.", "I send you a price range the same day.", "A $[___] deposit holds your date and comes off the total.", "You see the design before your appointment."])}</div>`),
  },
  {
    file: "plantilla-es-04-antes-despues.png",
    body: tplBase(`<h1 class="display" style="font-size:120px">Antes / después</h1><p class="label" style="margin-top:30px">Antes</p>${photo(520, "foto antes")}<p class="label" style="margin-top:44px">Después</p>${photo(520, "foto después")}`),
  },
  {
    file: "plantilla-en-04-before-after.png",
    body: tplBase(`<h1 class="display" style="font-size:120px">Before / after</h1><p class="label" style="margin-top:30px">Before</p>${photo(520, "before photo")}<p class="label" style="margin-top:44px">After</p>${photo(520, "after photo")}`),
  },
  {
    file: "plantilla-es-05-resena.png",
    body: tplBase(`<p class="label">Lo que dicen</p><h1 class="display" style="font-size:150px;margin-top:20px">Reseña de<br>cliente</h1><div class="display" style="font-size:300px;line-height:.6;color:#bdb8b0;margin-top:70px">“</div><div style="margin-top:20px">${["", "", "", ""].map(() => `<div style="border-bottom:2px solid rgba(233,230,225,.45);height:92px"></div>`).join("")}</div><p style="margin-top:50px;font-size:34px;font-weight:700;color:#d6d2cb">— [nombre], [pieza]</p>${photo(230, "captura o foto")}`),
  },
  {
    file: "plantilla-en-05-review.png",
    body: tplBase(`<p class="label">What clients say</p><h1 class="display" style="font-size:150px;margin-top:20px">Client<br>review</h1><div class="display" style="font-size:300px;line-height:.6;color:#bdb8b0;margin-top:70px">“</div><div style="margin-top:20px">${["", "", "", ""].map(() => `<div style="border-bottom:2px solid rgba(233,230,225,.45);height:92px"></div>`).join("")}</div><p style="margin-top:50px;font-size:34px;font-weight:700;color:#d6d2cb">— [name], [piece]</p>${photo(230, "screenshot or photo")}`),
  },
  {
    file: "plantilla-es-06-pregunta.png",
    body: tplBase(`<p class="label">Tú decides</p><h1 class="display" style="font-size:150px;margin-top:20px">Pregunta<br>del día</h1><div style="margin-top:70px;border:2px solid rgba(233,230,225,.5);padding:60px 50px;min-height:520px"><p class="label" style="font-size:22px">Tu pregunta</p><div style="margin-top:40px">${["", "", ""].map(() => `<div style="border-bottom:2px solid rgba(233,230,225,.4);height:96px"></div>`).join("")}</div></div><div class="photo" style="height:300px;margin-top:48px;border-style:dotted">sticker de pregunta o encuesta aquí</div>`),
  },
  {
    file: "plantilla-en-06-question.png",
    body: tplBase(`<p class="label">You decide</p><h1 class="display" style="font-size:150px;margin-top:20px">Question<br>of the day</h1><div style="margin-top:70px;border:2px solid rgba(233,230,225,.5);padding:60px 50px;min-height:520px"><p class="label" style="font-size:22px">Your question</p><div style="margin-top:40px">${["", "", ""].map(() => `<div style="border-bottom:2px solid rgba(233,230,225,.4);height:96px"></div>`).join("")}</div></div><div class="photo" style="height:300px;margin-top:48px;border-style:dotted">question or poll sticker here</div>`),
  },
];

/* ── Imprimibles (A4) ───────────────────────────────────────────── */
const A4W = 1240, A4H = 1754;
const box = (t) => `<span style="display:inline-block;width:26px;height:26px;border:2px solid #2a2a2a;vertical-align:middle;margin-right:12px"></span>${t}`;
const checklist = `
<div style="position:absolute;inset:0;background:#f3f1ec;color:#111;padding:84px 90px;font-family:Montserrat,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #111;padding-bottom:22px">
    <div><p style="font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:14px;color:#555">Andy Tattoo Artist · Salt Lake City</p><h1 class="display" style="font-size:72px;margin-top:8px;color:#111">Checklist semanal</h1></div>
    <p style="font-size:14px;color:#555">Semana del ______ al ______</p>
  </div>

  <h2 class="display" style="font-size:30px;margin-top:44px;color:#111">Los 3 números del lunes</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:16px">
    ${[["01", "Mensajes nuevos", "Personas que te escribieron esta semana"], ["02", "Cotizaciones con fecha", "Precio + 2 fechas + depósito en el mismo mensaje"], ["03", "Depósitos", "Fechas apartadas con dinero"]].map(([n, t, d]) => `<div style="border:2px solid #111;padding:20px 22px;min-height:190px"><p class="display" style="font-size:40px;color:#888">${n}</p><p style="font-weight:700;font-size:17px;margin-top:6px">${t}</p><p style="font-size:12.5px;color:#555;margin-top:4px;line-height:1.4">${d}</p><div style="border-bottom:2px solid #111;height:52px;margin-top:14px"></div></div>`).join("")}
  </div>

  <h2 class="display" style="font-size:30px;margin-top:44px;color:#111">Rutina de historias · 5 al día</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:14px;font-size:13px">
    <tr><th style="text-align:left;padding:8px 6px;border-bottom:2px solid #111"></th>${["L", "M", "X", "J", "V", "S", "D"].map((d) => `<th style="padding:8px 6px;border-bottom:2px solid #111;font-weight:700">${d}</th>`).join("")}</tr>
    ${["Hoy en el estudio", "Proceso en vivo", "Curado o resultado", "Encuesta o pregunta", "Cupos + cómo agendar"].map((r) => `<tr><td style="padding:12px 6px;border-bottom:1px solid #bbb;font-weight:600">${r}</td>${"1234567".split("").map(() => `<td style="text-align:center;padding:12px 6px;border-bottom:1px solid #bbb"><span style="display:inline-block;width:22px;height:22px;border:2px solid #2a2a2a"></span></td>`).join("")}</tr>`).join("")}
  </table>

  <h2 class="display" style="font-size:30px;margin-top:44px;color:#111">Seguimientos pendientes · día 1 · día 3 · día 7</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:14px;font-size:13px">
    <tr>${["Nombre / pieza", "Escribió el", "Día 1", "Día 3 (con foto)", "Día 7", "Resultado"].map((h) => `<th style="text-align:left;padding:8px 6px;border-bottom:2px solid #111;font-weight:700">${h}</th>`).join("")}</tr>
    ${[1, 2, 3, 4, 5, 6, 7].map(() => `<tr>${[1, 2, 3, 4, 5, 6].map((c) => `<td style="padding:16px 6px;border-bottom:1px solid #bbb">${c >= 3 && c <= 5 ? '<span style="display:inline-block;width:22px;height:22px;border:2px solid #2a2a2a"></span>' : ""}</td>`).join("")}</tr>`).join("")}
  </table>

  <div style="margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px;font-size:13px;line-height:1.6">
    <div><p style="font-weight:700;text-transform:uppercase;letter-spacing:.18em;font-size:11px;color:#555">Esta semana</p>${["Precio de entrada visible en la bio", "Destacada «Cómo agendar» la primera", "Respuestas rápidas guardadas (ES y EN)", "3 publicaciones: proceso · curado · a cámara"].map((t) => `<p style="margin-top:6px">${box(t)}</p>`).join("")}</div>
    <div><p style="font-weight:700;text-transform:uppercase;letter-spacing:.18em;font-size:11px;color:#555">Recuerda</p><p style="margin-top:6px">Nunca cerrar con «déjame saber». Cerrar con «¿te sirve el [A] o el [B]?».</p><p style="margin-top:6px">«No tengo dinero» no es un no: versión pequeña, por sesiones, o fecha de [mes] con depósito.</p><p style="margin-top:6px;font-weight:700">Una agenda llena es un sistema, no suerte.</p></div>
  </div>
  <p style="position:absolute;bottom:40px;left:90px;right:90px;display:flex;justify-content:space-between;font-size:11px;color:#777;letter-spacing:.14em;text-transform:uppercase"><span>Preparado por MarketINK</span><span>marketinkagency.com</span></p>
</div>`;

const CAL_W = 1754, CAL_H = 1240;
const weeks = [
  ["Proceso: del stencil a la pieza (reel)", "Historias", "Curado vs. fresco (reel)", "Historias", "Tú a cámara: quién eres (reel)", "Historias + cupos", "Descanso · solo 1 historia"],
  ["Antes y después (reel o carrusel)", "Historias", "Proceso en vivo (reel)", "Historias", "Testimonio de cliente (video corto)", "Historias + cupos", "Descanso · solo 1 historia"],
  ["Tu mejor pieza + cómo agendar (carrusel)", "Historias", "Curado a los [6] meses (reel)", "Historias", "Tú a cámara: cómo trabajo (reel)", "Historias + cupos", "Descanso · solo 1 historia"],
  ["Proceso: whip shading explicado (reel)", "Historias", "Antes y después (reel)", "Historias", "Preguntas frecuentes: precio, depósito, dolor (carrusel)", "Historias + cupos", "Descanso · solo 1 historia"],
];
const calendario = `
<div style="position:absolute;inset:0;background:#f3f1ec;color:#111;padding:70px 80px;font-family:Montserrat,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #111;padding-bottom:18px">
    <div><p style="font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:14px;color:#555">Andy Tattoo Artist · Salt Lake City</p><h1 class="display" style="font-size:64px;margin-top:6px;color:#111">Calendario de contenido · 4 semanas</h1></div>
    <p style="font-size:13px;color:#555;max-width:420px;text-align:right;line-height:1.5">3 publicaciones por semana + 5 historias al día. Los días de «Historias» siguen la rutina: estudio · proceso · curado · pregunta · cupos.</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-top:22px;font-size:13px;table-layout:fixed">
    <tr><th style="width:110px"></th>${["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => `<th style="padding:10px 8px;border-bottom:2px solid #111;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:11px">${d}</th>`).join("")}</tr>
    ${weeks.map((w, i) => `<tr>${`<td style="padding:16px 8px;border-bottom:1px solid #bbb;vertical-align:top"><p class="display" style="font-size:34px;color:#888">S${i + 1}</p><p style="font-size:11px;color:#555;margin-top:4px">del ____<br>al ____</p></td>`}${w.map((c) => { const post = !/^Historias|^Descanso/.test(c); return `<td style="padding:14px 10px;border-bottom:1px solid #bbb;vertical-align:top;height:190px;${post ? "background:#e6e3dc" : ""}"><p style="font-weight:${post ? 700 : 500};line-height:1.4;font-size:${post ? 13 : 12}px;color:${post ? "#111" : "#555"}">${c}</p>${post ? '<p style="margin-top:8px;font-size:10.5px;color:#555;letter-spacing:.1em;text-transform:uppercase">Publicación</p><p style="margin-top:6px;font-size:11px;color:#777">Hook: ____________</p>' : ""}</td>`; }).join("")}</tr>`).join("")}
  </table>
  <div style="margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;font-size:12px;line-height:1.5;color:#333">
    <div><b>Hooks que funcionan en black &amp; grey:</b> «Así se ve un whip shading a los 6 meses» · «Del stencil a la piel en 40 segundos»</div>
    <div>«Por qué no hago color (y por qué te conviene)» · «Fresco vs. curado: mira la diferencia»</div>
    <div>«Tres cosas antes de tu primera sesión» · «Lo que cuesta de verdad una manga (sin rodeos)»</div>
    <div>«Salt Lake City: quedan [2] cupos en [mes]» · «Esto es lo que nadie te enseña del black &amp; grey»</div>
  </div>
  <p style="position:absolute;bottom:30px;left:80px;right:80px;display:flex;justify-content:space-between;font-size:11px;color:#777;letter-spacing:.14em;text-transform:uppercase"><span>Preparado por MarketINK</span><span>marketinkagency.com</span></p>
</div>`;

/* ── render ─────────────────────────────────────────────────────── */
const browser = await chromium.launch();
async function shot(file, w, h, body, pdf = false) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.setContent(BASE(w, h, body), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: join(OUT, file), type: "png", fullPage: false });
  if (pdf) await page.pdf({ path: join(OUT, file.replace(/\.png$/, ".pdf")), width: `${w}px`, height: `${h}px`, printBackground: true, pageRanges: "1" });
  await ctx.close();
  console.log("ok", file);
}
for (const f of fondos) await shot(f.file, f.w, f.h, f.body(f.w, f.h));
for (const p of plantillas) await shot(p.file, 1080, 1920, p.body);
await shot("checklist-semanal.png", A4W, A4H, checklist, true);
await shot("calendario-4-semanas.png", CAL_W, CAL_H, calendario, true);
await browser.close();
