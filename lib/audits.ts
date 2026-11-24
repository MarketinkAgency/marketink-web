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
  /** Lo que tiene hoy, tal cual, para ponerlo al lado de lo nuevo. Con
      esto el arreglo deja de ser un consejo y pasa a ser un antes y un
      después: el que lo ve lado a lado entiende el cambio sin leer. */
  before?: string;
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
  /** Cuándo caduca, en ISO con hora. Lo gratuito no puede vivir para
      siempre: si los tres arreglos siguen ahí dentro de un mes, no eran
      un regalo, eran contenido. La fecha va en el dato y no calculada
      sobre `reviewed` porque a veces la auditoría se manda dos días
      después de hacerla, y el reloj tiene que empezar cuando él la
      recibe, no cuando nosotros la escribimos. */
  expira: string;
  stats: { k: string; v: string }[];
  bio: string[];
  /** `lead` va encima del titular y dice lo que ya tiene a favor. El
      titular nombra la fuga. Ese orden no es cortesía: el que lee
      primero un reconocimiento verdadero se queda a leer el problema;
      el que lee primero el problema se pone a defenderse. */
  verdict: { lead?: string; line: string; body: string[] };
  puntos: Punto[];
  /** El mercado local. Solo datos comprobables, con su fuente si hace falta. */
  market: { t: string; body: string }[];
  arreglos: Arreglo[];
  /** El regalo con dientes: una respuesta suya que hoy no está dando. */
  dm: { t: string; when: string; bad: string; good: string; why: string };
  plan: { k: string; d: string }[];
  /** Las dos bandas rojas que cortan la lectura, cuando las genéricas
      no sirven. Y muchas veces no sirven: la banda es donde se repite la
      tesis de la auditoría, así que decirle lo mismo a alguien con 443
      seguidores y a alguien con 24.009 es desperdiciar el único sitio
      donde el argumento se dice en grande. Opcional — sin esto se usan
      las de auditUi. */
  bands?: { line: string; cta: string }[];
  /** Los primeros 90 días, en las cuatro fases de la web.
      Va después del plan y antes del cierre, porque es donde se decide:
      el plan dice qué se instala y esto dice cuándo pasa cada cosa. Un
      artista que ya lo tiene casi todo bien —y los hay— no compra por
      los tres arreglos gratis; compra porque ve el calendario.

      Regla dura: aquí no se prometen cifras. Cada fase dice qué se hace
      y qué se persigue, nunca cuánto se consigue. Una cifra inventada en
      la sección que sostiene la decisión es la forma más cara de mentir.
      Opcional — si no está, la sección no existe. */
  dias90?: { d: string; t: string; items: string[] }[];
  /** En qué moneda piensa este artista. La calculadora del costo usa
      sus cifras, así que tiene que usar también su moneda: enseñarle a
      alguien de Bogotá una pieza de «$700» no es un detalle de formato,
      es decirle que esta página no está escrita para él. Cambia además
      los topes y el paso del deslizador, porque moverse de 25 en 25
      tiene sentido en dólares y ninguno en pesos.
      Opcional — por defecto, dólares. */
  moneda?: "COP" | "USD";
  /** El enlace de pago de este artista, cuando el general no sirve.
      El precio de un estudio en Bogotá y el de uno en Utah no son el
      mismo número, y tampoco la misma moneda: mandar a un colombiano a
      un cobro en dólares no es un detalle de formato, es pedirle otra
      cifra. Opcional — sin esto se usa el enlace general de lib/plan.ts. */
  planUrl?: string;
  /** Solo para quien viene de otro oficio: compara lo que vale su hora
      aquí y allá. Opcional — si no está, la sección no existe. */
  ticket?: { tag: string; title: string; body: string };
  /** Dos versiones de su perfil dentro de 90 días: si no hace nada y si
      lo arreglamos. Es la sección que más vende de toda la página y por
      eso tiene la regla más dura: nada de cifras. Describe qué se ve y
      qué pasa, nunca cuánto se gana. Opcional — sin esto no existe. */
  futuro?: { nada: string[]; sistema: string[] };
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
    checksTitle: "What's already working for you — and what's costing you bookings.",
    checksNote:
      "The same twelve points on every audit we run, so nothing gets graded on a hunch. Every one that fails has a fix, and the three most expensive ones are done for you further down.",
    legend: { fuga: "Costing you bookings", media: "Half there", bien: "Already yours" },
    groupBien: "What's already working for you",
    groupMedia: "Almost there — one detail short",
    groupFuga: "What's costing you bookings",
    sumFuga: "are costing you bookings today",
    sumMedia: "half there",
    sumBien: "already working for you",
    chipHand: "Prepared by hand for you",
    chipValid: "Valid until",
    chipSpots: "spots left this month",
    chipSpots1: "spot left this month",
    marketTag: "Your market",
    fixTag: "Yours to keep",
    fixTitle: "Three fixes. Do them this week, with or without us.",
    fixNote: "No charge, no catch. These are the ones you can do alone.",
    copyLabel: "Copy this",
    before: "What you have today",
    after: "What goes in its place",
    dmTag: "One more, free",
    planTag: "What we'd build",
    planTitle: "The system we'd install in your case.",
    planNote: "Every piece below exists because of a leak we found above — not because it's on a menu.",
    d90Tag: "The first 90 days",
    d90Title: "What happens, and when.",
    d90Tease: "And if we started Monday? This is what your first 90 days look like.",
    d90TeaseCta: "See the 90 days",
    d90Note: "Not a promise of numbers — a calendar of work. Each phase has one job, and the next one only starts because the previous one produced something to act on.",
    costTag: "What it costs you",
    costTitle: "What this is costing you every month. Your numbers, not ours.",
    costNote: "Straight multiplication of your own three numbers. Nothing here is our estimate — check it on your phone. Move the sliders until they look like your month.",
    costQuarter: "In 90 days, if nothing changes",
    midTitle: "This gets fixed in a week. With us, starting Monday.",
    midBody: "You keep tattooing. We build the door, publish the price and put someone answering your DMs in minutes.",
    midAlt: "Or DM us on Instagram first",
    futuroTag: "90 days from now",
    futuroTitle: "In 90 days there are two versions of your profile. You pick which one.",
    futuroNada: "If nothing changes",
    futuroSistema: "If we fix it now",
    costA: "What an average piece brings in",
    costB: "Inquiries you get a month",
    costC: "Of those, how many you book",
    costNow: "What it brings you today",
    costTable: "What's on the table",
    costRate: "of everyone who writes you",
    costMonth: "a month",
    costGap: "conversations a month already reach you and never book. Nobody closes all of them — but every single one you do close is",
    costZero: "With those numbers nothing is leaking — every inquiry you get ends in a chair. Move the sliders until they look like a real month.",
    ctaTitle: "Your full calendar shouldn't depend on luck.",
    ctaBody: "Everything above is what your profile does today. Below is the day it starts working for you. We only take a handful of artists a month because one of us actually answers your DMs — and this month's open spots are the ones you see here.",
    ctaPay: "Start the system",
    ctaPayNote: "We set it up this week. You keep tattooing.",
    ctaBook: "Book the 15 minutes",
    ctaBookNote: "in case you missed our meeting",
    /* Las bandas rojas que cortan la lectura cada tres o cuatro
       secciones. La misma acción, dicha desde donde va el que lee: la
       primera después de ver sus fugas, la segunda después de que ya
       se llevó lo gratis. Repetir la frase idéntica tres veces suena a
       anuncio; decir lo mismo desde otro sitio suena a conversación. */
    bands: [
      { line: "Three of these you can fix tonight. The rest need someone answering every day.", cta: "Start the system" },
      { line: "You've got the easy ones now. The hard part isn't knowing what to say — it's saying it within five minutes, every time, while you're tattooing.", cta: "Start the system" },
    ],
    igTag: "One last thing",
    igTitle: "Message us the moment you've done it.",
    igBody: "Booked the call or started the system? Send us a DM so we know it's you and we start pulling your account apart today instead of tomorrow.",
    igCta: "@marketinkagency",
    sticky: "Start the system",
    ticketHourA: "Per hour, in the barber chair",
    ticketHourB: "Per hour, on the table",
    ticketA: "One haircut",
    ticketAPrice: "What you charge for a cut",
    ticketAMin: "How long it takes you",
    ticketB: "One tattoo",
    ticketBPrice: "What an average piece brings in",
    ticketBHours: "How long you sit with it",
    ticketGap: "That's what one hour of tattooing is worth against one hour of cutting.",
    ticketNote: "Your numbers, your arithmetic. Nobody is telling you to close the barbershop — this is what each hour you move is worth.",
    expTag: "Your free fixes expire in",
    expDone: "The free fixes expired",
    expUnits: { d: "d", h: "h", m: "m", s: "s" },
    lockTitle: "The free part expired.",
    lockBody:
      "The three fixes and the script were yours for a week — long enough to use them, short enough to matter. The leaks they patch are still open, and there are {n} of them. We close all of them, this week.",
    lockCta: "Start the system",
    lockAlt: "Or write to us and we'll talk about it",
    spots: "spots left",
    spots1: "spot left",
    spotsNote: "We cap it because someone here answers your DMs by hand. When they're gone, intake closes until we free up the next ones.",
    footNote: "This audit was prepared by hand for one artist. It isn't published, indexed or shared.",
  },
  es: {
    kicker: "Auditoría de fugas de reservas",
    prepared: "Preparada para",
    reviewed: "Revisado el",
    profileSeen: "Lo que dice tu perfil ahora mismo",
    verdictTag: "El diagnóstico",
    checksTag: "Los doce puntos",
    checksTitle: "Lo que ya tienes a favor, y lo que te está costando citas.",
    checksNote:
      "Los mismos doce puntos en cada auditoría, para que nada se califique a ojo. Cada uno que falla tiene arreglo, y los tres más caros te los dejamos hechos más abajo.",
    legend: { fuga: "Te está costando citas", media: "A medias", bien: "Ya lo tienes" },
    groupBien: "Lo que ya tienes a favor",
    groupMedia: "Casi — les falta un detalle",
    groupFuga: "Lo que te está costando citas",
    sumFuga: "te están costando citas hoy",
    sumMedia: "a medias",
    sumBien: "ya juegan a tu favor",
    chipHand: "Preparada a mano para ti",
    chipValid: "Válida hasta el",
    chipSpots: "cupos libres este mes",
    chipSpots1: "cupo libre este mes",
    marketTag: "Tu mercado",
    fixTag: "Tuyo, sin costo",
    fixTitle: "Tres arreglos. Hazlos esta semana, con nosotros o sin nosotros.",
    fixNote: "Sin cobro y sin truco. Son los que puedes hacer solo.",
    copyLabel: "Copia esto",
    before: "Lo que tienes hoy",
    after: "Lo que va en su lugar",
    dmTag: "Uno más, gratis",
    planTag: "Lo que montaríamos",
    planTitle: "El sistema que instalaríamos en tu caso.",
    planNote: "Cada pieza está por una fuga de las de arriba, no porque venga en un menú.",
    d90Tag: "Los primeros 90 días",
    d90Title: "Qué pasa, y cuándo.",
    d90Tease: "¿Y si empezáramos el lunes? Esto es lo que pasa en tus primeros 90 días.",
    d90TeaseCta: "Ver los 90 días",
    d90Note: "No es una promesa de cifras: es un calendario de trabajo. Cada fase tiene un solo trabajo, y la siguiente empieza porque la anterior dejó algo sobre lo que decidir.",
    costTag: "Lo que te cuesta",
    costTitle: "Cuánto te está costando esto cada mes. Con tus números, no con los nuestros.",
    costNote: "Es una multiplicación de tus propios tres números. Aquí no hay ninguna estimación nuestra — compruébala con la calculadora del teléfono. Mueve las barras hasta que se parezcan a tu mes.",
    costQuarter: "En 90 días, si nada cambia",
    midTitle: "Esto se arregla en una semana. Con nosotros, desde el lunes.",
    midBody: "Tú sigues tatuando. Nosotros montamos la puerta, publicamos el precio y ponemos a alguien contestando tus mensajes en minutos.",
    midAlt: "O escríbenos primero por Instagram",
    futuroTag: "Dentro de 90 días",
    futuroTitle: "En 90 días hay dos versiones de tu perfil. Tú eliges cuál.",
    futuroNada: "Si todo sigue igual",
    futuroSistema: "Si lo arreglamos ahora",
    costA: "Lo que deja una pieza promedio",
    costB: "Consultas que recibes al mes",
    costC: "De esas, cuántas agendas",
    costNow: "Lo que te deja hoy",
    costTable: "Lo que hay sobre la mesa",
    costRate: "de las que te escriben",
    costMonth: "al mes",
    costGap: "conversaciones al mes ya te llegan y no terminan en cita. Nadie cierra todas — pero cada una que cierres son",
    costZero: "Con esos números no se te está cayendo ninguna: todas las que te escriben terminan en la camilla. Mueve las barras hasta que se parezcan a un mes de verdad.",
    ctaTitle: "Tu agenda llena no debería depender de la suerte.",
    ctaBody: "Todo lo de arriba es lo que hace tu perfil hoy. Lo de abajo es el día en que empieza a trabajar para ti. Tomamos pocos artistas al mes porque tus mensajes los contesta alguien de verdad — y los cupos de este mes son los que ves aquí.",
    ctaPay: "Empezar el sistema",
    ctaPayNote: "Lo montamos esta semana. Tú sigues tatuando.",
    ctaBook: "Agenda los 15 minutos",
    ctaBookNote: "por si te perdiste nuestra reunión",
    bands: [
      { line: "Tres de estas las arreglas esta noche. Las demás necesitan a alguien contestando todos los días.", cta: "Empezar el sistema" },
      { line: "Ya te llevaste las fáciles. Lo difícil no es saber qué decir: es decirlo en cinco minutos, siempre, mientras estás tatuando.", cta: "Empezar el sistema" },
    ],
    igTag: "Una última cosa",
    igTitle: "Escríbenos apenas lo hagas.",
    igBody: "¿Agendaste o ya empezaste el sistema? Mándanos un mensaje para saber que eres tú y empezamos a desarmar tu cuenta hoy y no mañana.",
    igCta: "@marketinkagency",
    sticky: "Empezar el sistema",
    ticketHourA: "La hora, en la silla",
    ticketHourB: "La hora, en la camilla",
    ticketA: "Un corte",
    ticketAPrice: "Lo que cobras por un corte",
    ticketAMin: "Lo que te toma hacerlo",
    ticketB: "Un tatuaje",
    ticketBPrice: "Lo que deja un tatuaje promedio",
    ticketBHours: "Las horas que te sientas con él",
    ticketGap: "Eso es lo que vale una hora tatuando frente a una hora cortando.",
    ticketNote: "Tus números y tu cuenta. Nadie te está diciendo que cierres la barbería: esto es lo que vale cada hora que muevas.",
    expTag: "Tus arreglos gratis caducan en",
    expDone: "Los arreglos gratis caducaron",
    expUnits: { d: "d", h: "h", m: "m", s: "s" },
    lockTitle: "La parte gratis caducó.",
    lockBody:
      "Los tres arreglos y el guion fueron tuyos una semana: suficiente para usarlos, poco para dejarlos ahí. Las fugas que tapan siguen abiertas, y son {n}. Las cerramos todas, esta semana.",
    lockCta: "Empezar el sistema",
    lockAlt: "O escríbenos y lo hablamos",
    spots: "cupos libres",
    spots1: "cupo libre",
    spotsNote: "Los limitamos porque tus mensajes los contesta alguien a mano. Cuando se acaban, la entrada se cierra hasta que liberemos los siguientes.",
    footNote: "Esta auditoría se preparó a mano para un solo artista. No se publica, no se indexa y no se comparte.",
  },
} as const;

/* ── Las auditorías ───────────────────────────────────────────────── */

/**
 * Auditorías activas en formato v2. Vacío desde el 24-11-2026: las siete
 * antiguas (Wilford, Tibabuzo, Xime, Nathy, Andy, Josh, Juan Melo) estaban
 * caducadas y se borraron. Su contenido queda en el historial de git.
 * Las auditorías nuevas usan el formato v3 (ver app/[lang]/audit/kalm-tattoos).
 */
export const AUDITS: Record<string, Audit> = {};

export const AUDIT_SLUGS = Object.keys(AUDITS);
