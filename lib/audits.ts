import type { Lang } from "@/lib/copy";

/**
 * AUDITORÍAS DE FUGAS DE RESERVAS
 *
 * La web vende una «Booking Leak Audit». Esto es la entrega de esa
 * auditoría, y la decisión de diseño que lo sostiene todo es esta:
 *
 *   La auditoría no es un documento. Es un objeto de datos.
 *
 * Una sola plantilla pinta todas las auditorías. Auditar a otro artista
 * mañana es añadir un objeto a este archivo — no rehacer un diseño, no
 * escribir un PDF, no maquetar nada. Y como los doce puntos de revisión
 * son siempre los mismos, la parte de mirar el perfil se puede repartir,
 * delegar o automatizar sin que dos auditorías se contradigan.
 *
 * Reglas del contenido, y no son de estilo:
 *
 *  · Cada `note` describe algo que se puede comprobar entrando al perfil.
 *    Si no se ve desde fuera, no entra. Un artista que lee una afirmación
 *    falsa sobre su propia cuenta deja de leer el resto.
 *  · Los números del artista no se inventan nunca. Lo que no sabemos se
 *    le pregunta a él, y por eso la sección del costo la calcula él con
 *    sus cifras en vez de que se las demos hechas.
 *  · Los tres arreglos se regalan enteros, con las palabras exactas. Es
 *    lo que la propia web promete: «tres recomendaciones que puedes
 *    aplicar tú esta semana, trabajes con nosotros o no». Regalar lo
 *    fácil es lo que hace creíble cobrar por lo difícil.
 *
 * La página no se indexa ni entra en el mapa del sitio: cada auditoría
 * habla de una persona con nombre y apellido, y eso no se publica.
 */

export type Estado = "fuga" | "media" | "bien";

export type Punto = {
  /** Qué se revisó. Los doce son siempre los mismos y en el mismo orden. */
  k: string;
  s: Estado;
  /** Qué se vio, en su cuenta, con su detalle. */
  note: string;
};

export type Arreglo = {
  n: string;
  t: string;
  body: string;
  /** Texto listo para copiar y pegar. Sin esto, el consejo es una tarea. */
  copy?: string;
  copyNote?: string;
};

export type Audit = {
  slug: string;
  lang: Lang;
  handle: string;
  name: string;
  studio: string;
  city: string;
  profile: string;
  /** Fecha de la revisión, en ISO. Se muestra formateada. */
  reviewed: string;
  stats: { k: string; v: string }[];
  bio: string[];
  verdict: { line: string; body: string[] };
  puntos: Punto[];
  /** El mercado local. Solo datos comprobables, con su fuente si hace falta. */
  market: { t: string; body: string }[];
  arreglos: Arreglo[];
  /** El regalo con dientes: una respuesta suya que hoy no está dando. */
  dm: { t: string; when: string; bad: string; good: string; why: string };
  plan: { k: string; d: string }[];
  cierre: string;
};

/* ── Etiquetas de la plantilla ─────────────────────────────────────
   Solo lo que no viene del propio objeto de la auditoría. */
export const auditUi = {
  en: {
    kicker: "Booking Leak Audit",
    prepared: "Prepared for",
    reviewed: "Reviewed",
    profileSeen: "What your profile says right now",
    verdictTag: "The verdict",
    checksTag: "The twelve checks",
    checksTitle: "Everything we looked at, and what we found.",
    checksNote:
      "The same twelve points on every audit we run, so nothing gets graded on a hunch. Each one is something a stranger can see without asking you.",
    legend: { fuga: "Leak", media: "Half there", bien: "Solid" },
    marketTag: "Your market",
    fixTag: "Yours to keep",
    fixTitle: "Three fixes. Do them this week, with or without us.",
    fixNote: "No charge, no catch. These are the ones you can do alone.",
    copyLabel: "Copy this",
    dmTag: "One more, free",
    planTag: "What we'd build",
    planTitle: "The system we'd install in your case.",
    planNote: "Every piece below exists because of a leak we found above — not because it's on a menu.",
    costTag: "What it costs you",
    costTitle: "We're not going to invent your numbers. Put yours in.",
    costNote: "This is arithmetic, not a promise. Move the sliders until they look like your month.",
    costA: "What an average piece brings in",
    costB: "Inquiries you get in a week",
    costC: "Of those, how many book",
    costOut: "Booking two more of them a month is worth",
    costYear: "a year",
    ctaTitle: "Fifteen minutes.",
    ctaBody: "We go through this live, you ask whatever you want, and you leave with the plan whether you hire us or not.",
    ctaBook: "Book the 15 minutes",
    ctaPay: "Start the system",
    ctaPayNote: "Prefer to skip the call? Start here and we set it up this week.",
    sticky: "Book the 15 minutes",
    footNote: "This audit was prepared by hand for one artist. It isn't published, indexed or shared.",
  },
  es: {
    kicker: "Auditoría de fugas de reservas",
    prepared: "Preparada para",
    reviewed: "Revisado el",
    profileSeen: "Lo que dice tu perfil ahora mismo",
    verdictTag: "El diagnóstico",
    checksTag: "Los doce puntos",
    checksTitle: "Todo lo que miramos, y lo que encontramos.",
    checksNote:
      "Los mismos doce puntos en cada auditoría, para que nada se califique a ojo. Cada uno es algo que un desconocido puede ver sin preguntarte.",
    legend: { fuga: "Fuga", media: "A medias", bien: "Bien" },
    marketTag: "Tu mercado",
    fixTag: "Tuyo, sin costo",
    fixTitle: "Tres arreglos. Hazlos esta semana, con nosotros o sin nosotros.",
    fixNote: "Sin cobro y sin truco. Son los que puedes hacer solo.",
    copyLabel: "Copia esto",
    dmTag: "Uno más, gratis",
    planTag: "Lo que montaríamos",
    planTitle: "El sistema que instalaríamos en tu caso.",
    planNote: "Cada pieza está por una fuga de las de arriba, no porque venga en un menú.",
    costTag: "Lo que te cuesta",
    costTitle: "No vamos a inventar tus números. Pon los tuyos.",
    costNote: "Esto es aritmética, no una promesa. Mueve las barras hasta que se parezcan a tu mes.",
    costA: "Lo que deja una pieza promedio",
    costB: "Consultas que recibes en una semana",
    costC: "De esas, cuántas agendan",
    costOut: "Agendar dos más al mes vale",
    costYear: "al año",
    ctaTitle: "Quince minutos.",
    ctaBody: "Lo repasamos en vivo, preguntas lo que quieras, y te vas con el plan nos contrates o no.",
    ctaBook: "Agenda los 15 minutos",
    ctaPay: "Empezar el sistema",
    ctaPayNote: "¿Prefieres saltarte la llamada? Empieza aquí y lo montamos esta semana.",
    sticky: "Agenda los 15 minutos",
    footNote: "Esta auditoría se preparó a mano para un solo artista. No se publica, no se indexa y no se comparte.",
  },
} as const;

/* ── Las auditorías ───────────────────────────────────────────────── */

export const AUDITS: Record<string, Audit> = {
  "josh-g-salem": {
    slug: "josh-g-salem",
    lang: "en",
    handle: "@josh.g_tattoo",
    name: "Joshua Glines",
    studio: "Vortex Tattoo Club",
    city: "Salem, Oregon",
    profile: "https://www.instagram.com/josh.g_tattoo/",
    reviewed: "2026-08-12",
    stats: [
      { k: "Posts", v: "77" },
      { k: "Followers", v: "279" },
      { k: "Following", v: "113" },
      { k: "Links in bio", v: "0" },
    ],
    bio: [
      "Tattoo artist located in Salem. Traditional/blackwork @vortex.tattoo.club",
      "BOOKING OPEN! Dm for details",
    ],

    verdict: {
      line: "Your bio says BOOKING OPEN. There is nowhere to book.",
      body: [
        "We went through your profile the way a stranger with an idea and four hundred dollars would. The work holds up — traditional and blackwork, consistent, and anyone landing on you knows in two seconds what you do. Most artists fail that part. You don't.",
        "Then they decide they want one, and the profile stops. No link. No price where they'll find it. No deposit, no hours, no idea when you answer. The only way forward is to type you a message and wait, and that's the exact point where a stranger becomes a maybe and a maybe becomes nothing.",
        "You don't have a demand problem yet. You have a doorway problem — and that's the cheaper one to fix, because the work is already done.",
      ],
    },

    puntos: [
      {
        k: "A link in the bio",
        s: "fuga",
        note: "There isn't one. Your bio announces BOOKING OPEN and then gives no way to open anything. This is the single most expensive line on your profile.",
      },
      {
        k: "A path to book",
        s: "fuga",
        note: "DM only. Every inquiry lands in a queue that nobody but you can clear, and you clear it between clients — which means the fastest you can possibly be is still slower than a link.",
      },
      {
        k: "A price signal",
        s: "media",
        note: "You did price your flash sheet — $100 to $400, right on the drawing. But it's one post deep in a grid of 77. Nobody scrolling finds it twice, and nobody arriving finds it at all.",
      },
      {
        k: "A deposit",
        s: "fuga",
        note: "Nothing on the profile says a deposit exists, what it costs, or whether it comes off the total. A deposit is the line between an appointment and an intention, and right now you're booking intentions.",
      },
      {
        k: "When you reply",
        s: "fuga",
        note: "Nothing tells anyone how long you take. To the person waiting, silence and rejection look identical — so after about a day they assume the second one and go ask somebody else.",
      },
      {
        k: "Story highlights",
        s: "fuga",
        note: "Zero. This is the biggest unused surface you own: the only place a stranger can get their questions answered without making you answer them.",
      },
      {
        k: "Pinned posts",
        s: "media",
        note: "One of three used. Two free slots sitting at the very top of your grid — the most valuable real estate on the profile, and it's empty.",
      },
      {
        k: "Available vs taken flash",
        s: "fuga",
        note: "Roughly half your grid is flash and drawings. Nothing marks which pieces are still up for grabs, so anyone who wants one has to message you to find out — and most people won't send that message.",
      },
      {
        k: "Reels",
        s: "fuga",
        note: "Around four in seventy-seven posts. Reels is the only surface on Instagram that puts you in front of people who don't already follow you. At 279 followers, that isn't a content preference — it's the whole growth question.",
      },
      {
        k: "Where you are",
        s: "media",
        note: "Your bio says «Salem». Search «Salem tattoo» and you get Salem, Massachusetts for pages — the witch city eats the search. If you're not writing «Salem, Oregon», you're invisible to somebody ten minutes away from your chair.",
      },
      {
        k: "What you ask them to do",
        s: "media",
        note: "«Dm for details» asks them to do the work: open a chat, compose a message, describe an idea to a stranger, wait. «See available flash» asks them to tap.",
      },
      {
        k: "Is it clear what you tattoo",
        s: "bien",
        note: "Yes. Traditional and blackwork, said in the bio and backed by the grid. This is where most artists lose people and you don't lose anyone. Everything else in this audit is built on top of that.",
      },
    ],

    market: [
      {
        t: "Salem is about 183,000 people",
        body: "Big enough to fill a calendar, small enough that being the obvious traditional-and-blackwork artist in town is a position somebody is going to take. It costs almost nothing to hold that position on Instagram and it gets expensive to take back once someone else has it.",
      },
      {
        t: "Portland is 50 minutes north",
        body: "That cuts both ways. It's a bigger pool of people who'll drive for the right artist, and it's a bigger pool of artists your local clients can drive to. Being findable locally is what keeps the drive going in your direction.",
      },
      {
        t: "The name of your city is working against you",
        body: "Salem, Massachusetts is a tattoo destination and it owns the search results. Two words — «Salem, Oregon» — in your bio and on your posts put you back on the map you actually live on.",
      },
    ],

    arreglos: [
      {
        n: "01",
        t: "Put a door where «Dm for details» is",
        body:
          "It doesn't have to be sophisticated. A Linktree, a Google Form, the studio's booking page — anything that turns «I want this» into one tap instead of one paragraph. Then rewrite the bio so the tap has a reason. Here's the whole thing, ready to paste:",
        copy:
          "Traditional & blackwork · Vortex Tattoo Club\nSalem, Oregon\nFlash + custom · a deposit holds your date\n↓ Available flash & booking",
        copyNote:
          "Notice what changed: the city is findable, the deposit is stated before anyone has to ask, and the last line points at something instead of asking for a message.",
      },
      {
        n: "02",
        t: "Three highlights, named exactly this",
        body:
          "AVAILABLE — the flash that's still up for grabs, and you pull a piece out the day it's taken. BOOKING — how it works: what you need from them, what the deposit is, how long you take to answer. HEALED — the same pieces two weeks later.\n\nThose three answer the three questions in almost every DM you get. Answer them once, in public, and you stop typing them one at a time forever. The healed one matters more than it sounds: fresh tattoos sell the drawing, healed tattoos sell you.",
      },
      {
        n: "03",
        t: "Pin the price sheet",
        body:
          "You already made the hardest asset there is — a flash sheet with real prices on it — and then buried it. Pin it. You have two empty slots. A price on the profile doesn't scare off buyers; it filters out the people who were never going to book and it gives the serious ones permission to start the conversation already knowing the answer.",
      },
    ],

    dm: {
      t: "And the reply that turns «how much» into a booking",
      when: "When someone opens with «how much for something like this»",
      bad: "Depends on the piece! DM me some references and we'll figure it out 🤘",
      good:
        "size and placement move the price way more than the design does. where were you thinking of putting it, and how big are we talking? give me those two and i'll give you a real number instead of a range.",
      why:
        "The first one hands the work back to them and ends the conversation politely. The second one asks for the two things you actually need to quote, and it promises something in return — a real number. Almost everyone answers it, and the ones who don't were never booking.",
    },

    plan: [
      {
        k: "The doorway",
        d: "Booking link, a form that asks the right three questions, and a deposit that holds the date. The leak at the top of this audit, closed properly instead of patched.",
      },
      {
        k: "Someone answering",
        d: "Your DMs answered in minutes instead of evenings, in your voice, with your prices — so being busy tattooing stops costing you the next tattoo.",
      },
      {
        k: "The follow-up",
        d: "The people who ask and go quiet are the biggest pile of money on your profile, and nobody is touching it. This is the part that pays for the rest.",
      },
      {
        k: "Flash sold as flash",
        d: "Available and taken kept current, so a piece someone wants is never a question they have to ask you.",
      },
      {
        k: "Reach past 279",
        d: "Reels and local paid campaigns, so the system has people to work on instead of recycling the followers you already have.",
      },
    ],

    cierre:
      "If we get on the call and we don't see a clear opportunity in your case, we'll tell you on the call. That happens, and it's a better outcome for both of us than the alternative.",
  },
};

export const AUDIT_SLUGS = Object.keys(AUDITS);
