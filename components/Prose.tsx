import type { ReactNode } from "react";

/**
 * MARKDOWN REDUCIDO → HTML DE LA MARCA
 *
 * Los artículos del blog se escriben en Markdown dentro de lib/blog/.
 * No usamos una librería porque solo hacen falta ocho cosas, y cada una
 * tiene que salir con las clases del sistema visual (Anton en los
 * títulos, bloques «copia esto» como en las auditorías) y no con el
 * HTML genérico de un conversor.
 *
 * Soportado, y nada más:
 *   ## Título         → h2 (con id para anclas)
 *   ### Subtítulo     → h3
 *   párrafos          → p
 *   - punto           → ul
 *   1. punto          → ol
 *   > cita            → blockquote
 *   ~~~               → bloque «copia esto» (guiones, textos listos)
 *   ---               → separador
 *   **negrita**, *cursiva*, [texto](url) dentro de cualquier línea.
 *
 * `cta` es un bloque que la página inyecta después del tercer h2: el
 * artículo entero es el argumento y ese es el único sitio donde pedimos
 * algo a cambio antes del final.
 */

type Block =
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "code"; text: string; label?: string }
  | { t: "hr" };

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    /* La valla es ~~~ y no ``` porque los artículos viven dentro de
       plantillas de texto de TypeScript, donde la comilla invertida
       cierra la cadena. */
    if (line.startsWith("~~~")) {
      const label = line.slice(3).trim() || undefined;
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("~~~")) { buf.push(lines[i]); i++; }
      i++;
      out.push({ t: "code", text: buf.join("\n"), label });
      continue;
    }
    if (/^---+\s*$/.test(line)) { out.push({ t: "hr" }); i++; continue; }
    if (line.startsWith("## ")) { const text = line.slice(3).trim(); out.push({ t: "h2", text, id: slugify(text) }); i++; continue; }
    if (line.startsWith("### ")) { out.push({ t: "h3", text: line.slice(4).trim() }); i++; continue; }
    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) { buf.push(lines[i].slice(2)); i++; }
      out.push({ t: "quote", text: buf.join(" ") });
      continue;
    }
    if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2)); i++; }
      out.push({ t: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      out.push({ t: "ol", items });
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(## |### |> |- |\d+\. |~~~|---)/.test(lines[i])) { buf.push(lines[i].trim()); i++; }
    out.push({ t: "p", text: buf.join(" ") });
  }
  return out;
}

/** Negrita, cursiva y enlaces dentro de una línea. Sin HTML crudo. */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) nodes.push(<strong key={k++} className="font-semibold text-bone">{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("*")) nodes.push(<em key={k++}>{tok.slice(1, -1)}</em>);
    else {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)!;
      const href = mm[2];
      const ext = /^https?:\/\//.test(href) && !href.includes("marketinkagency.com");
      nodes.push(
        <a key={k++} href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} className="text-bone underline decoration-blood/60 underline-offset-4 transition hover:decoration-blood">
          {mm[1]}
        </a>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function headings(md: string) {
  return parse(md).filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");
}

export default function Prose({ md, cta, copyLabel }: { md: string; cta?: ReactNode; copyLabel: string }) {
  const blocks = parse(md);
  /* El CTA entra antes del cuarto h2: ya leyó lo suficiente para saber
     si esto le sirve, y todavía no se fue. Se calcula antes de pintar. */
  const ctaAt = cta ? blocks.map((b, i) => (b.t === "h2" ? i : -1)).filter((i) => i >= 0)[3] : undefined;

  return (
    <div className="prose-ink">
      {blocks.map((b, i) => {
        const el = render(b, i, copyLabel);
        if (i === ctaAt) {
          return (
            <div key={i}>
              <div className="not-prose my-14">{cta}</div>
              {el}
            </div>
          );
        }
        return el;
      })}
    </div>
  );
}

function render(b: Block, i: number, copyLabel: string) {
  switch (b.t) {
    case "h2":
      return (
        <h2 key={i} id={b.id} className="flash-type mt-16 mb-6 max-w-[22ch] scroll-mt-24 text-[clamp(26px,3.6vw,42px)] leading-[1.05] text-bone first:mt-0">
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-10 mb-4 text-[18px] font-bold leading-snug text-bone">
          {b.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mb-6 max-w-[66ch] text-[16.5px] leading-[1.75] text-muted">
          {inline(b.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-7 max-w-[66ch] space-y-3">
          {b.items.map((x, j) => (
            <li key={j} className="flex gap-4 text-[16px] leading-[1.7] text-muted">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-blood" aria-hidden />
              <span>{inline(x)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mb-7 max-w-[66ch] space-y-3">
          {b.items.map((x, j) => (
            <li key={j} className="flex gap-4 text-[16px] leading-[1.7] text-muted">
              <span className="flash-type mt-[2px] w-7 shrink-0 text-[20px] leading-none text-blood">{String(j + 1).padStart(2, "0")}</span>
              <span>{inline(x)}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-9 max-w-[60ch] border-l-2 border-blood pl-6 text-[19px] font-semibold leading-snug text-bone">
          {inline(b.text)}
        </blockquote>
      );
    case "code":
      return (
        <div key={i} className="my-8 max-w-[60ch]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-faint">{b.label ?? copyLabel}</p>
          <pre className="overflow-x-auto whitespace-pre-wrap bg-panel px-6 py-5 font-sans text-[15px] leading-[1.75] text-bone ring-1 ring-white/[0.08]">
            {b.text}
          </pre>
        </div>
      );
    case "hr":
      return <hr key={i} className="my-14 max-w-[66ch] border-white/[0.08]" />;
  }
}
