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
    d90Tag: "The first 90 days",
    d90Title: "What happens, and when.",
    d90Note: "Not a promise of numbers — a calendar of work. Each phase has one job, and the next one only starts because the previous one produced something to act on.",
    costTag: "What it costs you",
    costTitle: "We're not going to invent your numbers. Put yours in.",
    costNote: "Straight multiplication of your own three numbers. Nothing here is our estimate — check it on your phone. Move the sliders until they look like your month.",
    costA: "What an average piece brings in",
    costB: "Inquiries you get in a week",
    costC: "Of those, how many book",
    costOut: "What those are worth",
    costMonth: "a month",
    costOne: "Nobody closes all of them. Closing one more each week:",
    costZero: "With those numbers nothing is leaking — every inquiry you get ends in a chair. Move the sliders until they look like a real month.",
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
      "The three fixes and the script were yours for a week — long enough to use them, short enough to matter. The leaks they patch are still open, and there are {n} of them. We close all of them, this week.",
    lockCta: "Start the system",
    lockAlt: "Or write to us and we'll talk about it",
    spots: "spots left this month",
    spots1: "spot left this month",
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
    d90Tag: "Los primeros 90 días",
    d90Title: "Qué pasa, y cuándo.",
    d90Note: "No es una promesa de cifras: es un calendario de trabajo. Cada fase tiene un solo trabajo, y la siguiente empieza porque la anterior dejó algo sobre lo que decidir.",
    costTag: "Lo que te cuesta",
    costTitle: "No vamos a inventar tus números. Pon los tuyos.",
    costNote: "Es una multiplicación de tus propios tres números. Aquí no hay ninguna estimación nuestra — compruébala con la calculadora del teléfono. Mueve las barras hasta que se parezcan a tu mes.",
    costA: "Lo que deja una pieza promedio",
    costB: "Consultas que recibes en una semana",
    costC: "De esas, cuántas agendan",
    costOut: "Lo que valen esas",
    costMonth: "al mes",
    costOne: "Nadie cierra todas. Cerrar una más cada semana:",
    costZero: "Con esos números no se te está cayendo ninguna: todas las que te escriben terminan en la camilla. Mueve las barras hasta que se parezcan a un mes de verdad.",
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
      "Los tres arreglos y el guion fueron tuyos una semana: suficiente para usarlos, poco para dejarlos ahí. Las fugas que tapan siguen abiertas, y son {n}. Las cerramos todas, esta semana.",
    lockCta: "Empezar el sistema",
    lockAlt: "O escríbenos y lo hablamos",
    spots: "cupos libres este mes",
    spots1: "cupo libre este mes",
    spotsNote: "Los limitamos porque tus mensajes los contesta alguien a mano. Cuando se acaban, el siguiente entra el mes que viene.",
    footNote: "Esta auditoría se preparó a mano para un solo artista. No se publica, no se indexa y no se comparte.",
  },
} as const;

/* ── Las auditorías ───────────────────────────────────────────────── */

export const AUDITS: Record<string, Audit> = {
  "xime-lizarazu": {
    slug: "xime-lizarazu",
    lang: "es",
    handle: "@xime.lizarazutattoo",
    name: "Xime Lizarazú",
    studio: "Línea fina · microrealismo · @sagrada.tattooestudio",
    city: "Bogotá",
    profile: "https://www.instagram.com/xime.lizarazutattoo/",
    reviewed: "2026-08-30",
    expira: "2026-09-06T23:59:00-05:00",
    moneda: "COP",
    planUrl: "https://buy.stripe.com/14AdR1fMe8fyg6od1b53O02",
    stats: [
      { k: "Seguidores", v: "24.009" },
      { k: "Publicaciones", v: "541" },
      { k: "Mejor reel", v: "6.112" },
      { k: "Reel típico", v: "2.102" },
    ],
    bio: [
      "@sagrada.tattooestudio",
      "6 años tatuando",
      "Bogotá 🇨🇴",
      "Agenda Abierta",
      "Cotizaciones Link 👇🏻  ·  wa.me/573007125601",
    ],

    verdict: {
      line: "24.009 personas te dijeron que sí. Hoy te ven 2.100.",
      body: [
        "Esta auditoría va a ser distinta a las que solemos escribir, y conviene decirlo de entrada: tu perfil está bien hecho. De los doce puntos que revisamos, seis están resueltos y solo dos son fuga. Eso no nos había pasado. Cuenta verificada, seis años tatuando, 541 publicaciones, el estilo dicho en tu propio nombre, el estudio etiquetado, la ciudad visible, los tres fijados usados y cinco destacadas que se llaman CICATRIZADOS, DISEÑOS, ¿CÓMO AGENDAR?, COTIZACIONES y AGENDA. Esas dos últimas casi nadie las tiene. Y el enlace de tu bio va directo a WhatsApp, sin pasar por un Linktree que te cobre un toque de peaje.",
        "Por eso el problema no está donde suele estar. Medimos tus últimos 15 reels: 42.963 vistas entre todos. El mejor llegó a 6.112 y el de en medio a 2.102. Tienes 24.009 seguidores. Es decir: tu mejor pieza reciente la vio uno de cada cuatro de los que ya te siguen, y la normal la ve menos de uno de cada diez.",
        "Ese número al revés es el hallazgo. En los perfiles que auditamos el alcance suele ir por encima de la audiencia —Instagram les trae desconocidos gratis y ellos no tienen dónde recibirlos—. En el tuyo pasa lo contrario: tienes 24.009 personas que en algún momento levantaron la mano y hoy la mayoría ni se entera de que publicaste. No te falta gente. Te falta que la gente que ya es tuya vuelva a verte, y que la que aparece tenga a dónde caer.",
        "Y cuando cae, cae en un chat vacío. Tu enlace abre WhatsApp sin una sola palabra escrita: la clienta que venía decidida se encuentra un cursor parpadeando y tiene que inventarse cómo empezar. Con 24.009 seguidores y la agenda abierta, esa pantalla en blanco no te cuesta una consulta al mes. Te cuesta todos los días.",
        "Ese es el resumen honesto. Lo que se arregla con consejos de perfil ya lo tienes. Lo que te falta no se arregla en una tarde: se instala y se mide. Por eso, en tu caso, lo que hay que mirar no son los tres arreglos de abajo. Son los 90 días.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "bien",
        note: "Uno solo y va directo a WhatsApp: wa.me/573007125601. Esto está mejor resuelto que en la mayoría de perfiles que revisamos, donde el enlace lleva a un Linktree que cobra un toque de más y encima promociona a otros creadores. Aquí quien toca, llega." },
      { k: "Un camino para reservar", s: "media",
        note: "Existe, y hasta tienes una destacada que se llama ¿CÓMO AGENDAR? Lo que falla es el último metro: el enlace abre el chat en blanco, sin mensaje precargado. La que venía decidida tiene que redactar desde cero, y ese es el momento exacto donde se cae la que dudaba." },
      { k: "Una señal de precio", s: "media",
        note: "Tienes una destacada COTIZACIONES, que es más de lo que hace casi nadie. Pero desde fuera —bio y enlace, que es todo lo que ve alguien en los primeros diez segundos— no aparece ningún rango. Para saber si le alcanza hay que tocar una historia, y la que asume que no le alcanza no toca nada." },
      { k: "El depósito", s: "media",
        note: "No se menciona en la bio ni en el enlace. Puede que esté dentro de AGENDA y no lo veamos desde fuera; si es así, sácalo afuera. Un depósito nombrado antes de preguntar filtra a la que no iba a aparecer y tranquiliza a la que sí." },
      { k: "Cuándo respondes", s: "fuga",
        note: "Nada dice cuánto tardas. Con 24.009 seguidores te llegan mensajes a cualquier hora, y para la que espera tu silencio y un «no me interesa» se ven igual. A las 24 horas ya está mirando otro perfil de Bogotá, y hay muchos." },
      { k: "Destacadas", s: "bien",
        note: "Cinco y las correctas: CICATRIZADOS, DISEÑOS, ¿CÓMO AGENDAR?, COTIZACIONES, AGENDA. «Cicatrizados» enseña el trabajo curado, que es lo que de verdad separa a quien sabe de quien tiene buena cámara. Este bloque está mejor pensado que el de la mayoría de estudios." },
      { k: "Fijados", s: "bien",
        note: "Los tres usados, y bien elegidos: retrato de mascota, línea fina y microrealismo. Alguien que entra por primera vez ve en dos segundos exactamente lo que sabes hacer." },
      { k: "Diseños contra piel", s: "bien",
        note: "Casi toda la cuadrícula es tinta en piel real, no bocetos en papel. Es lo que hace que una desconocida se imagine el suyo. Y tienes la destacada DISEÑOS aparte para lo que está libre." },
      { k: "Reels", s: "fuga",
        note: "15 reels medidos, 42.963 vistas entre todos: el mejor en 6.112, el de en medio en 2.102, el más bajo en 928. Contra 24.009 seguidores, eso significa que tu propia audiencia dejó de verte. Aquí no falta talento ni constancia: falta intención detrás de qué se graba, qué se dice al final y a dónde se manda a la gente." },
      { k: "Dónde estás", s: "bien",
        note: "«Bogotá» en la bio y el estudio etiquetado, @sagrada.tattooestudio. Cualquiera sabe en dos segundos si puede llegar a tu camilla, y además hereda la confianza que da un estudio con nombre." },
      { k: "Qué le pides que haga", s: "media",
        note: "«Cotizaciones Link 👇🏻» dice a dónde ir, y eso ya es más que las tres flechas sueltas que vemos siempre. Lo que no dice es qué va a pasar después: cuánto tarda, qué le van a preguntar, si sale con fecha o con un número. Decirlo sube la cantidad de gente que toca." },
      { k: "Se entiende qué tatúas", s: "bien",
        note: "«Xime Lizarazú – Línea Fina y Microrealismo». Está en el nombre, no escondido en la bio, así que aparece hasta en los resultados de búsqueda. Y la cuadrícula lo sostiene. Esto es lo más difícil de construir y ya lo tienes." },
    ],

    market: [
      { t: "Tu problema es de los caros de tener y de los baratos de arreglar",
        body: "Construir 24.009 seguidores con trabajo real y cuenta verificada cuesta años. Volver a poner esa audiencia delante de tu trabajo cuesta un sistema de contenido y pauta con intención, y eso se monta en semanas. Estás en el lado bueno del problema: lo que ya está hecho es lo que no se puede comprar." },
      { t: "Agenda abierta es una promesa que hay que poder sostener",
        body: "Tu bio dice «Agenda Abierta». Eso es una invitación, y también una prueba: la que escribe espera respuesta rápida y fecha concreta. Si el mensaje se queda cuatro horas en visto porque estabas tatuando, la promesa juega en tu contra. No es un problema de actitud; es que nadie puede tatuar y responder a la vez." },
      { t: "Bogotá tiene demanda y tiene competencia",
        body: "Que haya muchos artistas en tu ciudad significa que hay gente buscando. La diferencia entre el que llena y el que no rara vez es el trabajo: es quién contesta primero, quién pregunta bien y quién hace seguimiento. Tú ya ganaste la parte del trabajo." },
    ],

    arreglos: [
      { n: "01",
        t: "Que tu WhatsApp se abra escrito, no en blanco",
        body: "Es el arreglo con mejor relación entre lo que cuesta —dos minutos— y lo que mueve. Hoy tu enlace abre un chat vacío. WhatsApp permite precargar el mensaje: cambias el enlace de la bio por este y la conversación empieza con las palabras ya puestas.",
        copy: "https://wa.me/573007125601?text=Hola%20Xime!%20Quiero%20cotizar%20un%20tatuaje.%20Idea%3A%20___%20%C2%B7%20Zona%3A%20___%20%C2%B7%20Tama%C3%B1o%20aprox%3A%20___%20cm%20%C2%B7%20Ciudad%3A%20___",
        copyNote: "Se abre así: «Hola Xime! Quiero cotizar un tatuaje. Idea: ___ · Zona: ___ · Tamaño aprox: ___ cm · Ciudad: ___». Le quitas la página en blanco y te llegan en el primer mensaje las cuatro cosas que necesitas para cotizar, sin tener que pedirlas una por una." },
      { n: "02",
        t: "Saca el rango y el depósito de las destacadas a la bio",
        body: "Tienes COTIZACIONES y AGENDA hechas, pero viven detrás de un toque. La que está decidiendo si le alcanza no toca: asume y se va. Poner el número afuera no te quita clientas, te quita conversaciones que no iban a ningún lado. Aquí está la bio reescrita, lista para pegar:",
        copy: "Línea fina y microrealismo · 6 años\n@sagrada.tattooestudio · Bogotá 🇨🇴\nDesde $___ · el depósito aparta tu fecha\nRespondo cotizaciones en el día ↓",
        copyNote: "Pon tu cifra mínima real donde va el espacio. Fíjate en lo que se movió: aparece desde cuánto, aparece el depósito antes de que nadie pregunte, y la última línea promete algo concreto en vez de señalar un enlace." },
      { n: "03",
        t: "Di cuánto tardas, y cúmplelo",
        body: "«Agenda Abierta» promete disponibilidad; nada promete respuesta. Escribe tu ventana real —la que puedes cumplir tatuando— en la bio y en el primer mensaje automático de WhatsApp. No hace falta que sea rápida: hace falta que exista. El silencio sin plazo se lee como desinterés; el silencio con plazo se lee como agenda llena, y eso juega a tu favor.",
        copy: "Respondo cotizaciones de lunes a sábado, antes de las 8pm.",
        copyNote: "Ajusta el horario al tuyo. Lo que convierte no es la velocidad: es que la clienta sepa cuándo dejar de mirar el teléfono." },
    ],

    dm: {
      t: "Y la respuesta que revive a las que preguntaron y nunca volvieron",
      when: "Para las conversaciones de hace uno o dos meses que se quedaron en «déjame lo pienso» o directamente sin respuesta. Con tu volumen, esa lista es la pila de dinero más grande que tienes hoy, y no la está tocando nadie",
      bad: "Holaa! Sigues interesada en tu tatuaje? 😊",
      good: "hola ___, te escribo por lo que hablamos hace un tiempo del ___ en ___. no vengo a insistirte: estoy organizando la agenda de las próximas semanas y me quedaron dos espacios. si todavía lo tienes en la cabeza, te aparto uno y te paso el diseño; si ya no va, dime y cierro tu caso sin problema — así dejo de aparecer en tu chat.",
      why: "La primera es la pregunta que todo el mundo manda y que nadie contesta, porque pide un favor sin dar nada. La segunda hace tres cosas a la vez: recuerda el detalle concreto de lo que ella quería —eso sola ya sube la respuesta—, le da una razón para que le escribas hoy y no ayer, y le ofrece una salida limpia. Y la salida limpia es la clave: le quitas la culpa de decir que no, así que la que iba a ignorarte te responde igual. Las que dicen «ya no» te devuelven tu tiempo; las que dicen «sí» son citas que ya estaban perdidas.\n\nCambia los espacios en blanco por su nombre y por el diseño que ella pidió. Un mensaje de estos sin el detalle personal es exactamente el mensaje malo." },

    plan: [
      { k: "El último metro de la puerta",
        d: "WhatsApp que abre escrito, las preguntas correctas en el primer mensaje, rango y depósito visibles antes de preguntar. Lo de arriba, cerrado bien y no tapado." },
      { k: "Alguien contestando por ti",
        d: "Tus mensajes respondidos en minutos, con tu voz y tus precios, mientras tú estás con la aguja en la mano. Es lo único que hace que «Agenda Abierta» sea verdad todos los días." },
      { k: "Tus 24.009, reactivados",
        d: "Contenido con intención para que la audiencia que ya te dijo que sí vuelva a verte, y pauta local para que Bogotá te descubra. No más seguidores: los mismos, mirando." },
      { k: "El seguimiento y el histórico",
        d: "Las que preguntaron y se callaron, recuperadas una por una con el guion de arriba. En una cuenta de tu tamaño, esta es la parte que paga todo lo demás en el primer mes." },
      { k: "Medición de verdad",
        d: "Hoy no sabes cuánta gente toca tu enlace, cuántas escriben, cuántas cotizan ni cuántas aparecen. Sin eso, cada decisión es una corazonada. Con eso, sabes qué repetir." },
    ],

    dias90: [
      { d: "Días 1–15", t: "Fundación",
        items: [
          "Revisión de tus 541 publicaciones para saber qué estilo trae cotización y cuál solo trae likes",
          "Rango de precio y depósito definidos contigo",
          "Guiones de respuesta escritos con tu voz, aprobados por ti",
          "Medición instalada: cuántas tocan el enlace, cuántas escriben, cuántas agendan",
          "Preparación de campañas para Bogotá",
        ] },
      { d: "Días 15–30", t: "Lanzamiento",
        items: [
          "Campañas activas",
          "Setter respondiendo tus mensajes en minutos",
          "Reactivación del histórico: las que preguntaron y no volvieron",
          "Primeras conversaciones calificadas",
          "Primeros datos reales de qué diseño y qué zona convierten",
        ] },
      { d: "Días 30–60", t: "Optimización",
        items: [
          "Bajar el costo por cotización",
          "Subir la calidad de la que escribe",
          "Afinar las preguntas de calificación",
          "Reforzar el seguimiento de la que no cerró",
          "Identificar los estilos que ganan y empujarlos",
        ] },
      { d: "Días 60–90", t: "Predictibilidad",
        items: [
          "Escalar lo que ya demostró funcionar",
          "Agenda visible con semanas de anticipación",
          "Mejor conversión de cotización a depósito",
          "Menos días vacíos entre sesiones",
          "Un tablero donde ves el mes antes de que pase",
        ] },
    ],

    cierre:
      "Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la misma llamada. Pasa, y es mejor para las dos que descubrirlo dentro de tres meses.",
  },
  "nathy-kolyn": {
    slug: "nathy-kolyn",
    lang: "es",
    handle: "@bykolyn",
    name: "Nathy Kolyn",
    studio: "Línea fina · microrealismo",
    city: "Bogotá",
    profile: "https://www.instagram.com/bykolyn/",
    reviewed: "2026-08-24",
    expira: "2026-08-31T23:59:00-05:00",
    /* Cobro para Colombia. El enlace general está en dólares y a un
       precio pensado para Estados Unidos. */
    moneda: "COP",
    planUrl: "https://buy.stripe.com/14AdR1fMe8fyg6od1b53O02",
    stats: [
      { k: "Publicaciones", v: "384" },
      { k: "Seguidores", v: "12.871" },
      { k: "Vistas en 26 reels", v: "66.681" },
      { k: "Enlaces en la bio", v: "1" },
    ],
    bio: [
      "📍Bogotá",
      "🧑🏼‍⚕️Psicóloga que Tatúa con amor.",
      "Agenda Agosto Bogotá",
      "⚜️Te ayudo a hacer realidad ese tatuaje que siempre has querido.",
      "⬇️⬇️⬇️  linktr.ee/ByKolynTattooArtist",
    ],

    verdict: {
      line: "66.681 vistas en 26 reels. Y una sola puerta, tapada por un bono de junio.",
      body: [
        "Entramos a tu perfil como entra una desconocida con una idea en la cabeza y dinero para pagarla. Y lo primero hay que decirlo claro, porque el resto de esta página va a sonar duro: tú no tienes un problema de trabajo ni de audiencia. Línea fina y microrealismo de verdad, 384 publicaciones, ocho destacadas con nombre, los tres fijados usados y la ciudad escrita en la bio. Tienes hasta lo que casi ningún tatuador tiene: dominio propio, bykolyn.com, con tu nombre y bien hecho.",
        "El alcance tampoco es el problema. Medimos tus últimos 26 reels: 66.681 vistas entre todos, con uno en 12.200 y otro en 8.859. A ese de 12.200 lo vio casi tanta gente como seguidores tienes. Instagram te está poniendo delante de desconocidos todas las semanas, gratis, y eso no lo puede comprar nadie.",
        "El problema es lo que pasa después. Toda esa gente termina en el mismo sitio: las tres flechas del final de tu bio. Llevan a un Linktree con exactamente dos botones. El de arriba —el primero que ve todo el mundo— dice «Compra tu bono de regalo para el día del Padre». En Colombia el Día del Padre fue el 21 de junio: hace nueve semanas. El de abajo es un WhatsApp que se abre en blanco, sin una sola palabra escrita, y ahí la desconocida que venía decidida tiene que ponerse a redactar.",
        "Y tu web, la buena, no está enlazada desde ninguna parte. Para llegar a bykolyn.com hay que entrar por el botón del bono caducado. Cuando alguien llega, encuentra una galería que baja y baja, preciosa, y ni un formulario, ni un correo, ni un teléfono, ni un botón de agenda. Un solo enlace en toda la página: otra vez el bono.",
        "Ese es el resumen. Tienes montada la parte que cuesta años —el trabajo, la audiencia, el alcance, el dominio— y la parte que decide si cobras o no está sin montar. La vitrina es de las mejores que hemos visto. Lo que no hay es puerta.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "media",
        note: "Hay uno, y eso ya te pone por delante de la mayoría. Pero va a un Linktree en vez de a tu web, así que todo el que quiere algo tuyo gasta un toque de más antes de llegar a ninguna parte. Y el Linktree gratuito remata con «Únete a ByKolynTattooArtist en Linktree» y enlaces a otros creadores: tu página de bio le hace publicidad a Linktree y a gente que no eres tú." },
      { k: "Un camino para reservar", s: "fuga",
        note: "El único es «Agenda tu cita por WhatsApp», y está en segundo lugar, debajo del bono. Abre un chat vacío: sin mensaje preescrito, sin preguntas, sin nada que le diga qué pasa ahora. Lo que tiene que hacer para reservarte es redactar. Ahí se cae la que dudaba." },
      { k: "Una señal de precio", s: "fuga",
        note: "En ninguna parte —ni bio, ni destacadas, ni web— aparece un rango. Con microrealismo —que todo el mundo sabe que es caro— el silencio no da misterio: da miedo. La que no sabe si son 300 mil o dos millones de pesos no pregunta: asume lo peor y se va con otra que sí lo dice." },
      { k: "El depósito", s: "fuga",
        note: "No se menciona en ningún sitio. Sin depósito la cita es una intención, y las intenciones no aparecen el sábado a las diez. Con tu volumen, cada hueco que se cae es una hora de camilla que ya no vuelve." },
      { k: "Cuándo respondes", s: "fuga",
        note: "Nada dice cuánto tardas. Para la que está esperando, tu silencio y un «no me interesa» se ven exactamente igual, y a las 24 horas ya está mirando otro perfil." },
      { k: "Destacadas", s: "bien",
        note: "Ocho, con nombre y con criterio: Cicatrizados, Tinys, Diseños disponibles, Cuidados, Cejas, Perfos, Spain, Italy. «Cicatrizados» es de las mejores decisiones del perfil — enseña el trabajo a los seis meses, que es lo que de verdad separa a quien sabe. Esto está muy por encima del promedio." },
      { k: "Fijados", s: "bien",
        note: "Los tres usados. Entra alguien nuevo y lo primero que ve es lo que tú elegiste, no lo último que subiste." },
      { k: "Diseños contra piel", s: "bien",
        note: "Casi toda la cuadrícula es tinta en piel, no dibujos en papel. La piel es la que hace que alguien se imagine el suyo, y además tienes la destacada «Diseños disponibles» para lo que está libre. Bien resuelto." },
      { k: "Reels", s: "bien",
        note: "26 medidos, 66.681 vistas entre todos. El mejor en 12.200, el segundo en 8.859, y la mayoría entre 1.000 y 3.500. Publicaste la semana pasada. Tu motor de atención funciona solo: el problema está detrás de él, no delante." },
      { k: "Dónde estás", s: "bien",
        note: "«📍Bogotá» en la primera línea, y «Agenda Agosto Bogotá» debajo. Cualquiera sabe en dos segundos si puede llegar a ti. La mitad de los perfiles que revisamos no lo dicen." },
      { k: "Qué le pides que haga", s: "fuga",
        note: "«⬇️⬇️⬇️». Tres flechas y ninguna palabra. Apuntan a un enlace cuyo primer botón vende una fecha que pasó en junio, así que lo primero que tu perfil le enseña a un cliente nuevo es que aquí las cosas llevan un rato sin tocarse. Esa es la impresión más cara que se lleva." },
      { k: "Se entiende qué tatúas", s: "media",
        note: "En tu web sí: «tatuajes de línea fina y microrealismo», dicho en el título. En la bio no aparece por ninguna parte. «Psicóloga que Tatúa con amor» es un diferenciador buenísimo y no lo tiene nadie más, pero dice quién eres y no qué haces con la aguja. Las dos cosas caben." },
    ],

    market: [
      { t: "Ya tienes lo que se compra con dinero",
        body: "Audiencia de 12.871, alcance de 66.681 vistas en 26 reels y un dominio propio con la web hecha. Eso es exactamente lo que un tatuador que empieza tarda años en construir y lo que una agencia cobra por conseguir. Tú no necesitas que te traigan gente: la tienes, pasa por delante todas las semanas y se va sin dejar rastro." },
      { t: "«Psicóloga que tatúa» no lo tiene nadie",
        body: "En un mercado donde todos enseñan el mismo trabajo con las mismas fotos, tú tienes una razón para elegirte que no se puede copiar. Hoy vive en una línea de la bio y en un segundo perfil. Es lo que debería estar sosteniendo tu precio, tu proceso y la conversación entera — y en cambio lo sostiene el emoji." },
      { t: "El bono no está mal. Está mal puesto",
        body: "Vender bonos de regalo es de las cosas más inteligentes que puede hacer un tatuador: cobras hoy por una hora que darás en tres meses. El error no es tenerlo. Es que sea lo primero y lo único, atado a una fecha que ya pasó, ocupando el sitio donde debería estar la reserva." },
    ],

    arreglos: [
      { n: "01",
        t: "Cambia el orden del Linktree. Dos minutos.",
        body: "«Agenda tu cita» arriba, el bono debajo y sin la fecha del Día del Padre. Ahora mismo lo primero que ve una clienta nueva es una promoción vencida. No la pierdes por el bono en sí: la pierdes porque ese bono le dice, sin que tú quieras, que aquí hace rato que nadie toca nada.\n\nDe paso, cámbiale el nombre al botón del bono por uno que no dependa del calendario:",
        copy: "Regala un tatuaje · Bono de regalo",
        copyNote: "Sirve para cumpleaños, Navidad, aniversarios y el Día del Padre del año que viene. Un botón que no caduca es un botón que no tienes que acordarte de apagar." },
      { n: "02",
        t: "Que tu WhatsApp se abra escrito, no en blanco",
        body: "Hoy tu enlace abre un chat vacío y la clienta tiene que redactar desde cero. Ese momento —la pantalla en blanco— es donde se cae la que estaba dudando. WhatsApp deja precargar el mensaje: cambias el enlace del Linktree por este y el chat se abre con las palabras ya puestas.",
        copy: "https://wa.me/573168326514?text=Hola%20Nathy!%20Quiero%20agendar%20un%20tatuaje.%20La%20idea%20es%3A%20___%20%C2%B7%20Zona%3A%20___%20%C2%B7%20Tama%C3%B1o%20aprox%3A%20___%20cm",
        copyNote: "Se abre así: «Hola Nathy! Quiero agendar un tatuaje. La idea es: ___ · Zona: ___ · Tamaño aprox: ___ cm». Le quitas la página en blanco y te llegan las tres cosas que necesitas para cotizar, en el primer mensaje, sin tener que pedirlas. Verifica que el número sea el correcto antes de pegarlo." },
      { n: "03",
        t: "La bio, entera y lista para pegar",
        body: "Le falta lo que haces —línea fina y microrealismo no aparece— y le sobra una fecha que hay que actualizar cada mes. Aquí está reescrita: mantiene lo tuyo, dice el estilo, dice el depósito antes de que nadie lo pregunte y la última línea apunta a algo en vez de dibujar flechas.",
        copy: "Línea fina y microrealismo · Bogotá 📍\n🧑🏼‍⚕️Psicóloga que tatúa. Tu historia primero, la aguja después.\nDiseños disponibles + custom · el depósito aparta tu fecha\n↓ Agenda tu cita",
        copyNote: "Fíjate en lo que se movió: aparece qué tatúas, tu diferenciador pasa de adorno a promesa, el depósito se dice solo, y «Agenda Agosto Bogotá» desaparece porque en septiembre vuelve a estar mal." },
    ],

    dm: {
      t: "Y la respuesta que convierte «déjame lo pienso» en una fecha",
      when: "Cuando ya hablaron del diseño, del tamaño y del precio, y ella escribe «listo, déjame lo pienso y te escribo»",
      bad: "Claro! Aquí estaré 💕 cualquier cosa me avisas",
      good: "tranquila, tómate el tiempo — esto se lleva puesto toda la vida y hay que estar segura. te cuento cómo va mi agenda: esta semana me quedan el jueves 4pm y el sábado 11am. te los aparto 48 horas sin compromiso. si dentro de ese rato dices que sí, el depósito de $XX aparta la tuya y ya no me la quita nadie. si no, los suelto y seguimos hablando cuando quieras.",
      why: "La primera es amable y termina la conversación: le deja todo el trabajo a ella y tú no vuelves a saber nada. La segunda le da la razón —de verdad hay que pensárselo— y al mismo tiempo pone dos cosas que antes no existían: fechas concretas y un plazo. No la presiona, la ayuda a decidir. Y la que no contesta a esto no iba a reservar nunca; lo único que cambia es que lo sabes hoy en vez de dentro de tres semanas.\n\nCambia las dos fechas y el monto del depósito por los tuyos antes de usarlo." },

    plan: [
      { k: "La puerta, en tu web y no en Linktree",
        d: "bykolyn.com ya está hecha y es tuya. Le ponemos lo único que le falta: formulario con las tres preguntas correctas, agenda y depósito que aparta la fecha. Y la bio pasa a apuntar ahí. Dejas de pagarle un toque de peaje a Linktree y dejas de mandar tu tráfico a una página que promociona a otros." },
      { k: "Alguien contestando",
        d: "Tus mensajes respondidos en minutos, con tu voz y tus precios, mientras tú estás con la aguja en la mano. Que tatuar deje de costarte el siguiente tatuaje." },
      { k: "El seguimiento",
        d: "La que preguntó y se calló es la pila de dinero más grande de tu perfil y nadie la está tocando. Con 12.871 seguidores y el alcance que ya tienes, esta es la parte que paga todo lo demás." },
      { k: "El bono, funcionando todo el año",
        d: "Sin fecha atada, con página propia, y empujado en las tres semanas del año en que la gente compra regalos. Cobrar hoy por horas que das en tres meses es la mejor forma que tiene un tatuador de estabilizar un mes flojo." },
      { k: "La psicóloga, al frente",
        d: "Tu diferenciador está enterrado en una línea de la bio. Lo convertimos en el proceso que vendes: la conversación antes del diseño, el porqué antes del dónde. Es lo que justifica tu precio sin discutirlo, y no te lo puede copiar nadie." },
    ],

    cierre:
      "Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la misma llamada. Pasa, y es mejor para las dos que descubrirlo dentro de tres meses.",
  },
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
    moneda: "USD",
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
