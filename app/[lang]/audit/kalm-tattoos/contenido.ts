/**
 * AUDITORÍA DE @kalmtattoos — CONTENIDO
 *
 * Primera auditoría con el formato nuevo (2026-11-24): en vez de doce
 * puntos en lista, una historia en siete pantallas que el artista puede
 * comprobar con su propio teléfono.
 *
 * Reglas que no cambian respecto al formato anterior:
 *  · Todo lo que se afirma se ve desde fuera (o lo vio Nick con su cuenta
 *    el 24-11-2026: 67 publicaciones, fechas de destacadas y de posts).
 *  · Cero cifras de resultados prometidos. Los únicos números son suyos.
 *  · Las etiquetas de estilo son nuestras y se dicen como nuestras.
 *  · noindex, fuera del sitemap.
 *
 * Las miniaturas son recortes de su propio grid (capturas de Nick del
 * 24-11), en public/audit/kalm/t/<id>.webp. «a» = primeras 4 filas del
 * grid, «b» = las 4 siguientes (sin la columna cortada).
 */

export const kalm = {
  handle: "@kalmtattoos",
  profile: "https://www.instagram.com/kalmtattoos/",
  city: "Chicago, IL",
  reviewed: "2026-11-24",
  /** Medianoche de Chicago del 1 de diciembre. */
  expira: "2026-12-01T23:59:00-06:00",
  stats: [
    { v: "67", k: "posts" },
    { v: "1,144", k: "followers" },
    { v: "1,312", k: "following" },
    { v: "1 yr", k: "since your highlights changed" },
  ],
};

/** Familias de estilo. El orden es el de la vista ordenada. */
export const familias = [
  { id: "bw", name: "Blackwork, neo-tribal & ornamental" },
  { id: "real", name: "Black & grey realism", core: true },
  { id: "script", name: "Script lettering", core: true },
  { id: "cartoon", name: "Cartoon" },
  { id: "fine", name: "Fine line" },
  { id: "trad", name: "American traditional" },
  { id: "anime", name: "Anime" },
  { id: "otro", name: "Everything else: photos, logo, graphics, micro, flash" },
] as const;

export type Familia = (typeof familias)[number]["id"];

/** Las 44 publicaciones visibles, en el orden del grid. */
export const tiles: { id: string; f: Familia; alt: string }[] = [
  { id: "a00", f: "otro", alt: "Black and white photo shoot" },
  { id: "a01", f: "bw", alt: "Fluid blackwork on the forearm" },
  { id: "a02", f: "cartoon", alt: "Cartoon flip phone" },
  { id: "a03", f: "bw", alt: "Mandala sleeve" },
  { id: "a04", f: "real", alt: "Black and grey eagle" },
  { id: "a05", f: "real", alt: "Pit bull portrait" },
  { id: "a10", f: "real", alt: "Husky portrait" },
  { id: "a11", f: "trad", alt: "Traditional pin-up" },
  { id: "a12", f: "real", alt: "Pit bull and cat portrait" },
  { id: "a13", f: "bw", alt: "Lace bow" },
  { id: "a14", f: "trad", alt: "Traditional handshake" },
  { id: "a15", f: "script", alt: "Xochitl in script" },
  { id: "a20", f: "cartoon", alt: "Cartoon alien with flower" },
  { id: "a21", f: "bw", alt: "Neo-tribal cross" },
  { id: "a22", f: "trad", alt: "Dagger, snake and swallow" },
  { id: "a23", f: "otro", alt: "Micro soccer ball" },
  { id: "a24", f: "cartoon", alt: "Bender in color" },
  { id: "a25", f: "cartoon", alt: "Locket heart in color" },
  { id: "a30", f: "anime", alt: "Anime portrait" },
  { id: "a31", f: "bw", alt: "Blackwork shoulder" },
  { id: "a32", f: "bw", alt: "Red neo-tribal" },
  { id: "a33", f: "fine", alt: "Fine line snake" },
  { id: "a34", f: "fine", alt: "Fine line moth" },
  { id: "a35", f: "fine", alt: "Line work sleeve" },
  { id: "b01", f: "anime", alt: "Anime girl" },
  { id: "b02", f: "fine", alt: "Fine line flower behind the ear" },
  { id: "b03", f: "otro", alt: "Error screen graphic" },
  { id: "b04", f: "fine", alt: "Fine line leaves" },
  { id: "b05", f: "real", alt: "Black and grey tree" },
  { id: "b11", f: "script", alt: "Name script on the neck" },
  { id: "b12", f: "otro", alt: "Logo animation" },
  { id: "b13", f: "script", alt: "Serenity Prayer with wings" },
  { id: "b14", f: "real", alt: "Cupid" },
  { id: "b15", f: "bw", alt: "Red ornamental back piece" },
  { id: "b21", f: "otro", alt: "Arm of small flash pieces" },
  { id: "b22", f: "anime", alt: "Anime on the hand" },
  { id: "b23", f: "cartoon", alt: "Bender on the leg" },
  { id: "b24", f: "otro", alt: "Face tattoo" },
  { id: "b25", f: "script", alt: "México in script" },
  { id: "b31", f: "script", alt: "Cross and Rafael in script" },
  { id: "b32", f: "bw", alt: "Fluid ornamental sleeve" },
  { id: "b33", f: "bw", alt: "Lotus and fluid blackwork" },
  { id: "b34", f: "trad", alt: "Bull skull" },
  { id: "b35", f: "script", alt: "Chest script with figure" },
];

/** Lo que va en el teléfono «ordenado»: solo realismo y script, suyos. */
export const gridOrdenado = ["a05", "a15", "a10", "b13", "a12", "b25", "b14", "b31", "a04"];
/** Y el de «hoy»: sus 9 primeras tal cual. */
export const gridHoy = ["a00", "a01", "a02", "a03", "a04", "a05", "a10", "a11", "a12"];

export const portadas = [
  { f: "01-book", w: "Book" },
  { f: "02-prices", w: "Prices" },
  { f: "03-portraits", w: "Portraits" },
  { f: "04-script", w: "Script" },
  { f: "05-healed", w: "Healed" },
  { f: "06-reviews", w: "Reviews" },
  { f: "07-faq", w: "FAQ" },
];

export const regalos = {
  bio: `KALM · black & grey + script
Pet & memorial portraits · Chicago
📍 [one studio, one address]
↓ Prices, deposit & dates · book in 2 min`,
  bioNote:
    "Four lines: what you do, who it's for, where you are, what to tap. Fill the studio line with wherever you tattoo today, and use the same name on Venue.",
  fijado: `HOW TO BOOK WITH ME ✦

1. Tap the link in my bio
2. Send your idea, placement, size and a reference
3. I reply with a quote and dates within [24 h]
4. A $[deposit] deposit locks your date (it comes off the final price)

Portraits (pets & people) start at $[minimum].
Script starts at $[minimum].

Booking [month] now · [X] spots left`,
  fijadoNote:
    "Your pinned post #1. Everything in brackets is yours to fill: we never guess your prices. Once it's posted, the bio and Venue stop having to explain anything.",
  dm: `Hey! Thanks for reaching out 🙏

For a piece like this I'd need 3 things:
• where on the body
• rough size (in inches or a photo of the area)
• your reference

Portraits start at $[minimum], script at $[minimum]. A $[deposit] deposit locks the date and comes off the final price.

I've got openings in [month]. Want me to hold one for you?`,
  dmNote:
    "For the 'how much?' DM. It gives a price range, asks for what you need, and ends with a question so the conversation doesn't die.",
};
