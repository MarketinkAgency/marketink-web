/**
 * Texto con enlaces: `[etiqueta](https://…)` se convierte en <a>.
 * El resto, tal cual. Sirve para los textos de lib/ (legales, FAQ), que
 * son strings y no JSX: así el contenido sigue viviendo en un solo sitio.
 * Los enlaces internos (`/es/legal/...`) se abren en la misma pestaña.
 */
export default function Rich({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(((?:https:\/\/|\/)[^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    const external = m[2].startsWith("https://");
    parts.push(
      <a
        key={i}
        href={m[2]}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="break-words text-bone underline decoration-blood/60 underline-offset-4 transition hover:decoration-blood"
      >
        {m[1]}
      </a>
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
