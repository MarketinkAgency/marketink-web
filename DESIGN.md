# DESIGN.md: MarketINK

> Fuente de verdad visual de la web. Tokens extraídos de `app/globals.css` y de la guía de marca del dueño.
> Dirección: «hoja de flash» (cartel de estudio), adoptada en noviembre de 2026.
> Referencia de la biblioteca awesome-design-md: Nike. De ella se tomó *la fotografía habla, el cromo no*:
> titulares enormes en mayúscula sobre imagen a sangre y ningún degradado decorativo.

## 0. Producto

| Campo | Valor |
|---|---|
| Qué vende | Sistema de reservas para tatuadores y estudios: campañas en Instagram, calificación por DM, consulta agendada, depósito y seguimiento |
| Objetivo de la web | Que agenden la auditoría gratis de 15 min (Calendly, `site.call`) |
| Acción principal (una) | Auditoría gratis. Un solo CTA por página. |
| Público | Tatuadores consolidados y estudios. Hoy, clientes en EE. UU. (Salt Lake City). |
| Idioma | `/es` para países hispanohablantes y `/en` para el resto, por país (`proxy.ts`). Todo texto en es + en, en `lib/`. |
| Stack | Next.js 16 + Tailwind 4, estático, Vercel |
| Lo que no se toca | Cifras: nunca inventar (solo las de `lib/copy.ts`, verificadas). `/audit/*` y `/clients/*` siguen noindex. |

## 1. Diales

| Dial | Valor | Por qué |
|---|---|---|
| `DESIGN_VARIANCE` | 7 | Cartel, no plantilla: escalas extremas y ritmo de fondos cambiante, sin romper la lectura |
| `MOTION_INTENSITY` | 5 | Dos o tres momentos (titular que se estampa, recorrido del DM al depósito); el resto quieto |
| `VISUAL_DENSITY` | 4 | Aire de estudio; densidad solo en las cifras y en la hoja de las cinco piezas |
| Modo de rediseño | Renovar lo visual, preservar contenido y marca | |

## 2. Color (no se introducen colores nuevos)

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `void` | #070708 | Fondo general | — |
| `panel` | #101012 | Paneles | — |
| `bone` | #ede6dc | Texto principal; fondo de «la hoja» | 16:1 sobre void |
| `muted` | #9c968c | Texto secundario | 7:1 sobre void |
| `faint` | #8b847b | Notas, avisos legales | 5,6:1 sobre void |
| `blood` | #e10600 | CTA, ruptura, cifras grandes de pérdida, rayas | Blanco sobre rojo 4,97:1 (botones OK). Rojo sobre void 4,05:1 y rojo sobre bone 4,0:1: **solo texto grande (≥ 24 px o ≥ 18,7 px en negrita) o marcas**, nunca etiquetas pequeñas. |
| `signal` | #2fe3a0 | Solo micro-acentos (puntos, éxito en UI de ejemplo). Nunca cifras grandes ni frases. | — |

**Ritmo de fondos:**
- Negro: la mayoría de las secciones.
- Hueso: «Qué se instala», la hoja de flash.
- Rojo a sangre: la banda tras la calculadora y la ruptura.

No hay manchas de tinta, números fantasma ni degradados decorativos en la portada.

## 3. Tipografía

| Rol | Familia | Tamaño | Interlineado |
|---|---|---|---|
| H1 del hero | Anton, mayúsculas (`.flash-type` + `.hero-flash__h1`) | `clamp(3.3rem, 10.4vw, 10.5rem)` | 1.1 (con menos, las tildes chocan) |
| H2 de sección | Anton | `clamp(2.2rem, 5.2vw, 4.4rem)`; en columnas estrechas `clamp(2rem, 3.6vw, 3.2rem)` | 1.1 |
| Texto | Montserrat | 15–16 px (lead 16–18 px) | 1.6 |
| Etiquetas | Montserrat 700, mayúsculas, tracking 0.2em | 10.5–11 px, en hueso o muted (no en rojo) | — |

Carga con `next/font` (`display: swap`).

## 4. Layout

- Contenedor `max-w-6xl` (hero `max-w-7xl`) con `px-6`.
- Secciones a `py-16`, y `sm:py-28` desde ese ancho.
- Revisar 390, 768, 1024 y 1440 px.
- Móvil primero; en escritorio nada apilado como en móvil.

## 5. Formas

- Bordes rectos y botones en bloque (sin cápsulas).
- La hoja usa celdas con borde fino y esquinas de chincheta (`.sheet-cell`).
- Fotos sin redondeo.

## 6. Componentes

| Componente | Notas |
|---|---|
| `.btn` | Rojo con texto blanco, mayúsculas. Hover: sube 2 px con barrido de luz. Tap ≥ 44 px. |
| `.btn-ghost` | Para salidas secundarias (p. ej. Webs) |
| `.proof-chip` | Prueba en el hero: avatares reales y cifra real |
| `.sec-tag` | «01 / NOMBRE»: número en hueso, raya roja |
| `.sheet-cell` + `.sheet-num` | Hoja de flash; número rojo grande |
| `StickyCta` | Solo móvil, fondo sólido |
| `BookCall` | Calendly a 640 px máx. (más ancho, Calendly mete márgenes blancos) |

## 7. Motion

| Qué | Cómo |
|---|---|
| Hero | `.stamp` (el titular se asienta) y `.lift` (el resto sube). **Solo `transform`, nunca opacidad 0**, para no retrasar el LCP. |
| Secciones | `.reveal` / `Split` (revelado al hacer scroll) |
| Scroll | Lenis |
| Portada | `Ink quiet`: sin cursor ni manchas |

`prefers-reduced-motion`: todo quieto y visible.

### 7.1 Capa «cartel punk» (2026-11-12)

**Impresión desalineada (`.misprint`)**
- Sombra roja desplazada 0.045em, como serigrafía fuera de registro.
- Va en el H1 y en todos los H2 de la portada; la palabra roja no lleva sombra.
- En el hero, la sombra entra muy desplazada y "se ajusta al registro" (`register`).

**Hero**
- La última palabra del H1 va en rojo (CEMENTERIO / GRAVEYARD).
- La foto hace un acercamiento lento, una sola vez (`kenburns`, solo `transform`).

**El cementerio**
- Lápidas con los DM de siempre (`lib/copy.ts → grave`) que se levantan con el scroll, y un sello «R.I.P.»
  que cae encima.
- Es ilustración: lleva `aria-hidden`, y el mensaje lo cargan el H2 y el párrafo.

**Animaciones atadas al scroll**
- **Banda cinética:** los pasos del recorrido en Anton gigante, una fila maciza y otra hueca, en sentidos
  opuestos.
- **Tira de trabajo:** parallax.
- **Ruptura:** la palabra de fondo se mueve.

**Hoja hueso:** bordes de papel rasgado (`clip-path`).

**Reglas técnicas**
- Todo lo que se mueve con el scroll usa `animation-timeline: view()` dentro de `@supports`. Sin soporte o
  con reduced-motion, queda quieto y visible.
- Nada se mueve solo durante más de 5 s.
- Los contenedores que recortan algo animado con `view()` usan **`overflow: clip`, nunca `hidden`**. Con
  `hidden`, el contenedor se vuelve el scroller de la animación y esta se congela.

## 8. Imagen

- Fotos reales en B/N (`grayscale` + contraste); el color lo pone el rojo de la marca.
- Hero: `hero.webp`. Tira de trabajo: `tat1–4.webp`.
- Con permiso de uso. Si faltan fotos: libres de derechos, nunca generadas.

## 9. Voz y copy

- Directo, premium, un poco rebelde, nunca corporativo.
- Habla con las palabras del gremio (DM, depósito, consultas que se enfrían).
- Humor negro permitido si ataca al problema, nunca al arte del artista.
- Prohibido:
  - «siguiente nivel», «desbloquea»;
  - promesas o garantías de resultados;
  - cifras inventadas.

## 10. Decisiones

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-11-12 | Dirección «hoja de flash»; H1 «Tus DM son un cementerio» / «Your DMs are a graveyard» | Auditoría 2026-11-12 (web genérica, sin cultura del tatuaje) e investigación de copy |
| 2026-11-12 | Idioma por país (`x-vercel-ip-country`) | Petición del dueño |
| 2026-11-12 | Fuera de la portada: barra de resultados, franja de confianza, «Para quién» (pasa al FAQ) y la segunda banda | Duplicaban cifras y alargaban la página |
| 2026-11-12 | Capa «cartel punk» (7.1) aprobada por el dueño en localhost | Pidió un estilo «más animado, más disruptivo» |
