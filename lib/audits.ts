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
  /** Cuándo caduca, en ISO con hora. Lo gratuito no puede vivir para
      siempre: si los tres arreglos siguen ahí dentro de un mes, no eran
      un regalo, eran contenido. La fecha va en el dato y no calculada
      sobre `reviewed` porque a veces la auditoría se manda dos días
      después de hacerla, y el reloj tiene que empezar cuando él la
      recibe, no cuando nosotros la escribimos. */
  expira: string;
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
  /** Solo para quien viene de otro oficio: compara lo que vale su hora
      aquí y allá. Opcional — si no está, la sección no existe. */
  ticket?: { tag: string; title: string; body: string };
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
    ctaTitle: "Stop leaking bookings.",
    ctaBody: "Everything above is what your profile does today. Below is the day we change it. We only take a handful of artists a month because one of us actually answers your DMs.",
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
    expTag: "This audit expires in",
    expDone: "This audit expired",
    expUnits: { d: "d", h: "h", m: "m", s: "s" },
    lockTitle: "The free part expired.",
    lockBody:
      "The three fixes and the script were yours for a week — long enough to use them, short enough to matter. The leaks they patch are still open, and there are seven of them. We close all of them, this week.",
    lockCta: "Start the system",
    lockAlt: "Or write to us and we'll talk about it",
    spots: "spots left this month",
    spotsNote: "We cap it because someone here answers your DMs by hand. When they're gone, the next one starts next month.",
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
    ctaTitle: "Deja de perder reservas.",
    ctaBody: "Todo lo de arriba es lo que hace tu perfil hoy. Lo de abajo es el día en que eso cambia. Tomamos pocos artistas al mes porque tus mensajes los contesta alguien de verdad.",
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
    expTag: "Esta auditoría caduca en",
    expDone: "Esta auditoría caducó",
    expUnits: { d: "d", h: "h", m: "m", s: "s" },
    lockTitle: "La parte gratis caducó.",
    lockBody:
      "Los tres arreglos y el guion fueron tuyos una semana: suficiente para usarlos, poco para dejarlos ahí. Las fugas que tapan siguen abiertas, y son siete. Las cerramos todas, esta semana.",
    lockCta: "Empezar el sistema",
    lockAlt: "O escríbenos y lo hablamos",
    spots: "cupos libres este mes",
    spotsNote: "Los limitamos porque tus mensajes los contesta alguien a mano. Cuando se acaban, el siguiente entra el mes que viene.",
    footNote: "Esta auditoría se preparó a mano para un solo artista. No se publica, no se indexa y no se comparte.",
  },
} as const;

/* ── Las auditorías ───────────────────────────────────────────────── */

export const AUDITS: Record<string, Audit> = {
  "andy-lopez": {
    slug: "andy-lopez",
    lang: "es",
    handle: "@andy_tattoo_artist",
    name: "Andrés López",
    studio: "Black & grey · lettering",
    city: "Estados Unidos",
    profile: "https://www.instagram.com/andy_tattoo_artist/",
    reviewed: "2026-08-17",
    expira: "2026-08-24T23:59:00-06:00",
    stats: [
      { k: "Publicaciones", v: "142" },
      { k: "Seguidores", v: "443" },
      { k: "Vistas del mejor reel", v: "1.582" },
      { k: "Enlaces en la bio", v: "0" },
    ],
    bio: [
      "tattoo artist // work in black and gray \\\\🚩 🇨🇴🇺🇸",
      "appointment : 📩 ☎️ 3854647225",
    ],

    verdict: {
      line: "Te ven tres veces más de lo que te siguen. Y no hay dónde tocar.",
      body: [
        "Entramos a tu perfil como entra un desconocido con una idea en la cabeza y dinero para gastársela. Lo primero: tu trabajo aguanta. Black and grey, lettering, retrato — se ve de qué vas en dos segundos, tienes las cinco destacadas puestas y los tres fijados usados. Eso es más de lo que hace la mayoría.",
        "Lo segundo es el número que deberías estar mirando todos los días. Tienes 443 seguidores y tus reels van por 829, 856, 1.298 y hasta 1.582 vistas. Tres veces y media tu audiencia. Instagram ya te está enseñando a gente que no te conoce, gratis, todas las semanas.",
        "Y cuando esa gente decide, se encuentra con esto: «appointment : 📩 ☎️» y diez dígitos escritos a pelo. Sin enlace, sin precio, sin depósito, sin saber cuánto tardas en contestar. El que quiere reservarte tiene que copiar un número a mano y esperar. Ahí se cae casi todo, y no es tu trabajo el que falla: es la puerta.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "fuga",
        note: "No hay ninguno. El teléfono está escrito como diez dígitos sueltos, sin formato y sin ser un enlace: en el móvil no se puede tocar para llamar, hay que seleccionarlo y copiarlo. Es el paso más caro de tu perfil." },
      { k: "Un camino para reservar", s: "fuga",
        note: "Mensaje o llamada, y las dos caen en el mismo sitio: tú, cuando puedas. No hay formulario, ni calendario, ni nada que avance sin que tú estés libre." },
      { k: "Una señal de precio", s: "fuga",
        note: "En ninguna parte del perfil aparece un rango. El que no sabe si son 150 o 900 no pregunta: asume que no le alcanza, o pregunta a otro que sí lo dice." },
      { k: "El depósito", s: "fuga",
        note: "No se menciona. Sin depósito, una cita es una intención, y las intenciones no se presentan el sábado por la mañana." },
      { k: "Cuándo respondes", s: "fuga",
        note: "Nada le dice a nadie cuánto tardas. Para el que espera, tu silencio y un «no me interesa» se ven igual — y a las 24 horas asume el segundo." },
      { k: "Destacadas", s: "bien",
        note: "Cinco, con nombre: creative, processes, letters, practices, available. Esto está bien hecho y la mayoría no lo tiene. Lo único que les falta es que «available» diga precio y cómo reservar." },
      { k: "Fijados", s: "bien",
        note: "Los tres usados. Bien elegidos además: entra alguien nuevo y lo primero que ve es tu mejor trabajo." },
      { k: "Diseños contra piel", s: "media",
        note: "Media cuadrícula son dibujos en papel y media son tatuajes en piel. Los dibujos enseñan que sabes dibujar; la piel enseña que sabes tatuar, y es la que hace que alguien se imagine el suyo. Nada marca cuáles de esos diseños siguen disponibles." },
      { k: "Reels", s: "bien",
        note: "Once o más, y con alcance real: 1.582, 1.298, 856, 829 vistas contra 443 seguidores. Esta es tu mejor herramienta y ya está funcionando. El problema no es que no te vean." },
      { k: "Dónde estás", s: "fuga",
        note: "El perfil no dice tu ciudad en ninguna parte. Tu teléfono es del 385 —Utah— pero eso lo sabe alguien que se ponga a mirar códigos de área. El que quiere tatuarse cerca no puede saber si estás a diez minutos o a tres estados." },
      { k: "Qué le pides que haga", s: "media",
        note: "«appointment : 📩 ☎️» son dos símbolos y ninguna instrucción. «Mira lo disponible y reserva» le dice qué va a pasar cuando toque." },
      { k: "Se entiende qué tatúas", s: "bien",
        note: "Sí. Black and grey dicho en la bio y sostenido por toda la cuadrícula: lettering, retrato, religioso, chicano. Esto es lo más difícil de construir y ya lo tienes." },
    ],

    market: [
      { t: "Tu alcance ya vale más que tu audiencia",
        body: "1.582 vistas en un reel con 443 seguidores significa que Instagram te está regalando desconocidos cada semana. Esa gente llega, mira y se va sin dejar rastro, porque no hay un solo sitio donde dejar el dedo." },
      { t: "Sigues a 754 y te siguen 443",
        body: "Ese desbalance lo lee cualquiera que abra tu perfil, y dice «este busca clientes» en vez de «a este lo buscan». No es vanidad: es la primera impresión de alguien que está decidiendo si eres el artista al que le pide una cita." },
      { t: "Vienes de la silla, y eso juega a favor",
        body: "Un barbero ya sabe lo que casi ningún tatuador aprende nunca: agenda, cliente que vuelve, manejar a alguien que está sentado frente a ti una hora. Lo que cambia no es el oficio, es el ticket y la forma de llenar el calendario." },
    ],

    arreglos: [
      { n: "01",
        t: "Pon una puerta donde ahora hay diez dígitos",
        body: "Cualquier cosa sirve: un Linktree, un formulario de Google, un WhatsApp con enlace directo. Lo que importa es que después de «lo quiero» venga un toque y no una tarea. Y reescribe la bio para que el toque tenga motivo. Aquí está entera, lista para pegar:",
        copy: "Black & grey · lettering · retrato\nSalt Lake City, Utah\nFlash disponible + custom · el depósito aparta tu fecha\n↓ Mira lo disponible y reserva",
        copyNote: "Cambia la ciudad si no es esa. Fíjate en lo que se movió: apareció dónde estás, el depósito se dice antes de que nadie tenga que preguntarlo, y la última línea apunta a algo en vez de pedir un mensaje." },
      { n: "02",
        t: "Arregla «available», que ya la tienes",
        body: "De tus cinco destacadas, «available» es la única que puede cobrar, y hoy solo muestra diseños. Ponle tres cosas: el precio o el rango de cada pieza, cuánto es el depósito, y una última historia que diga «para reservar, toca el enlace de la bio».\n\nEs media hora de trabajo sobre algo que ya construiste, y convierte una galería en una tienda." },
      { n: "03",
        t: "Escribe tu ciudad, hoy",
        body: "En la bio y en los pies de tus próximos reels. Suena a nada y es lo que separa a un desconocido que está a quince minutos de ti, de un desconocido que nunca va a poder ir. Tienes 1.500 vistas por reel: una parte de esa gente vive cerca y ahora mismo no tiene forma de saberlo." },
    ],

    dm: {
      t: "Y la respuesta que convierte «¿cuánto vale?» en una cita",
      when: "Cuando alguien abre con «¿cuánto me cobras por algo así?»",
      bad: "Depende del diseño 🙏 mándame la idea y te digo",
      good: "el tamaño y la zona mueven el precio mucho más que el diseño. ¿dónde te lo vas a poner y de qué tamaño lo estás pensando? con eso te doy un número real y no un rango.",
      why: "La primera le devuelve el trabajo a él y termina la conversación con educación. La segunda pide las dos cosas que de verdad necesitas para cotizar, y le promete algo a cambio: un número real. Casi todo el mundo la contesta, y el que no la contesta no iba a reservar." },

    ticket: {
      tag: "Lo que vale tu hora",
      title: "La silla y la camilla no pagan igual.",
      body: "Vienes de cortar y quieres vivir de tatuar. Esta no es una comparación de precios —un corte y un tatuaje no se comparan— sino de lo que vale una hora de tu tiempo en cada oficio. Pon tus números: nosotros no los sabemos y tú sí.",
    },

    plan: [
      { k: "La puerta",
        d: "Enlace de reserva, un formulario que hace las tres preguntas correctas y un depósito que aparta la fecha. La fuga de arriba, cerrada bien y no tapada." },
      { k: "Alguien contestando",
        d: "Tus mensajes respondidos en minutos y no por la noche, con tu voz y tus precios. Que estar tatuando deje de costarte el siguiente tatuaje." },
      { k: "El seguimiento",
        d: "El que pregunta y se calla es la pila de dinero más grande de tu perfil, y nadie la está tocando. Esta es la parte que paga el resto." },
      { k: "Los reels, dirigidos",
        d: "Ya te funcionan sin ayuda. Con intención detrás —qué grabar, qué decir al final, a qué mandarlos— ese alcance deja de ser aplausos y empieza a ser agenda." },
      { k: "Tu ciudad, en el mapa",
        d: "Ubicación, etiquetas y pauta local para que las 1.500 vistas dejen de ser gente de cualquier parte y empiecen a ser gente que puede llegar a tu silla." },
    ],

    cierre:
      "Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la llamada. Pasa, y es mejor final para los dos que el otro.",
  },

  "josh-g-salem": {
    slug: "josh-g-salem",
    lang: "en",
    handle: "@josh.g_tattoo",
    name: "Joshua Glines",
    studio: "Vortex Tattoo Club",
    city: "Salem, Oregon",
    profile: "https://www.instagram.com/josh.g_tattoo/",
    reviewed: "2026-08-13",
    expira: "2026-08-20T23:59:00-07:00",
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
