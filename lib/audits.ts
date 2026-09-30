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
    d90Tease: "And if we started Monday? This is what your first 90 days look like.",
    d90TeaseCta: "See the 90 days",
    d90Note: "Not a promise of numbers — a calendar of work. Each phase has one job, and the next one only starts because the previous one produced something to act on.",
    costTag: "What it costs you",
    costTitle: "We're not going to invent your numbers. Put yours in.",
    costNote: "Straight multiplication of your own three numbers. Nothing here is our estimate — check it on your phone. Move the sliders until they look like your month.",
    costA: "What an average piece brings in",
    costB: "Inquiries you get a month",
    costC: "Of those, how many you book",
    costNow: "What it brings you today",
    costTable: "What's on the table",
    costRate: "of everyone who writes you",
    costMonth: "a month",
    costGap: "conversations a month already reach you and never book. Nobody closes all of them — but every single one you do close is",
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
    d90Tease: "¿Y si empezáramos el lunes? Esto es lo que pasa en tus primeros 90 días.",
    d90TeaseCta: "Ver los 90 días",
    d90Note: "No es una promesa de cifras: es un calendario de trabajo. Cada fase tiene un solo trabajo, y la siguiente empieza porque la anterior dejó algo sobre lo que decidir.",
    costTag: "Lo que te cuesta",
    costTitle: "No vamos a inventar tus números. Pon los tuyos.",
    costNote: "Es una multiplicación de tus propios tres números. Aquí no hay ninguna estimación nuestra — compruébala con la calculadora del teléfono. Mueve las barras hasta que se parezcan a tu mes.",
    costA: "Lo que deja una pieza promedio",
    costB: "Consultas que recibes al mes",
    costC: "De esas, cuántas agendas",
    costNow: "Lo que te deja hoy",
    costTable: "Lo que hay sobre la mesa",
    costRate: "de las que te escriben",
    costMonth: "al mes",
    costGap: "conversaciones al mes ya te llegan y no terminan en cita. Nadie cierra todas — pero cada una que cierres son",
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
  "wilford-smith": {
    slug: "wilford-smith",
    lang: "es",
    handle: "@wild_inktattoo",
    name: "Wilford Smith",
    studio: "Black work · puntillismo · fine line · Wild Studio Ink",
    city: "Salt Lake City, Utah",
    profile: "https://www.instagram.com/wild_inktattoo/",
    reviewed: "2026-09-30",
    expira: "2026-10-07T23:59:00-06:00",

    /* Su tesis no es la de Christian. A él le faltaba mostrador teniendo
       poco público; a Wilford le sobra público y le falta puerta. Las
       bandas tienen que decir eso y no lo genérico. */
    bands: [
      { line: "71.600 personas vieron un tatuaje tuyo. Ninguna encontró el precio.", cta: "Empezar el sistema" },
      { line: "Ya te llevaste las fáciles. Lo que no se arregla en una tarde es contestar en cinco minutos a las 13.200 de la próxima vez.", cta: "Empezar el sistema" },
    ],

    stats: [
      { k: "Seguidores", v: "1.707" },
      { k: "Reproducciones, últimos 18 reels", v: "149.227" },
      { k: "Tu mejor reel", v: "71.600" },
      { k: "Destacadas llamadas «Destacada»", v: "5 de 8" },
    ],
    bio: [
      "Estudio de tatuajes y piercings",
      "Speciality: Black Work & Drag Pointillism",
      "📍 UT 🇺🇸",
      "@13wilford",
      "Cotizaciones y citas Texto +1 385 418 5222",
      "WhatsApp ⬇️  ·  wa.me/13854185222",
      "Web Side  ·  www.wildstudioink.com",
    ],

    verdict: {
      line: "Publicaste «agenda abierta». Lo vieron 13.200 personas. Tu perfil no les dijo cuánto cuesta.",
      body: [
        "Entramos a tu perfil como entra un desconocido de Salt Lake City con una idea en la cabeza y con qué pagarla. Y lo primero hay que decirlo sin adornos: el problema no es tu trabajo, y tampoco es tu alcance.",
        "Medimos tus dieciocho reels visibles: 149.227 reproducciones entre todos. Tienes 1.707 seguidores. Uno solo de esos videos llegó a 71.600 personas, cuarenta y dos veces tu número de seguidores; otros tres pasaron de doce mil. Cuatro de dieciocho concentran el 84% de todo lo que te han visto. Eso no le pasa a un perfil que no interesa: te está pasando porque el trabajo se defiende solo cuando lo ven.",
        "Y no lo decimos nosotros. El 27 de mayo de 2025 una clienta subió un reel contigo etiquetado, por su cuenta y sin que se lo pidieras: «such fine lines, so detailed and STUNNING». Ese es el tipo de prueba que no se compra.",
        "Ahora la parte incómoda. El 20 de septiembre subiste un reel que decía, con todas las letras, «Agenda abierta en Salt Lake City. Reserva tu cita por mensaje directo». Lo reprodujeron 13.200 veces. Dejó 43 me gusta y un comentario, y ese comentario es de una cuenta que solo escribió «Send me this post».",
        "Trece mil doscientas personas se enteraron de que tienes hueco. Vamos a mirar qué encontraron cuando fueron a averiguar cómo entrar.",
        "Encontraron tres puertas distintas. La bio dice «Cotizaciones y citas Texto +1 385 418 5222» y debajo pone WhatsApp. El reel fijado de 71.600 vistas dice «Citas por DM». El del 20 de septiembre dice «por mensaje directo». Tu perfil nunca pide dos veces lo mismo, y el que no sabe por dónde entrar no entra por ninguna.",
        "No encontraron ningún precio. Ni una cifra, ni un rango, ni un «desde», en ningún sitio: ni en la bio, ni en los fijados, ni en el nombre de una sola destacada. Tampoco encontraron depósito, ni una palabra sobre cuánto tardas en contestar.",
        "Y los que probaron el único enlace que no es WhatsApp —el que dice «Web Side», escrito así— llegaron a wildstudioink.com y vieron una pantalla en blanco. Lo cargamos dos veces, con recarga forzada: la página se queda colgada en el cargador y nunca pinta nada. Cero texto, cero imágenes, cero enlaces. El dominio existe, el sitio no llega a aparecer.",
        "Tus ocho destacadas terminan de contarlo. Cinco se llaman literalmente «Destacada» — el nombre que Instagram pone solo cuando nadie escribe uno. Las otras tres son «Ink salt lake», «Tattoo» y «Caligrafia»: estilo, estilo y estilo. Ninguna dice precio, ninguna dice cómo se reserva, ninguna dice cuándo tienes agenda. Las abrimos una por una: hay 17 historias en total y solo 3 son de 2026. «Caligrafia» es del 27 de abril de 2022. Lleva cuatro años y cinco meses ahí arriba.",
        "Y aquí está el dato que nos hizo entender que esto no es falta de conocimiento: en tu cuenta personal, @13wilford, tienes catorce destacadas y trece tienen nombre propio — SLC, Hiking, Idaho, Snowboard, Bear lake, Trading, NBA. Sabes hacerlo perfectamente. Simplemente no lo hiciste en la cuenta que te da de comer.",
        "Ese es el diagnóstico completo: no te falta talento, no te falta alcance y no te falta prueba social. Te falta que las 13.200 personas que ya te vieron sepan cuánto cuesta y por dónde se entra. Tienes el escaparate lleno y la puerta sin letrero.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "media",
        note: "Tienes dos. El de WhatsApp funciona y eso ya te pone por delante de la mayoría. El segundo dice «Web Side» —escrito así, con d— y lleva a wildstudioink.com, que carga una pantalla en blanco: lo probamos dos veces con recarga forzada y el cuerpo de la página queda vacío, sin texto, sin imágenes y sin enlaces. Un enlace roto en la bio no es neutro: el que lo toca no vuelve a tocar el otro." },
      { k: "Un camino para reservar", s: "fuga",
        note: "Hay tres caminos distintos y nunca coinciden. La bio manda a un SMS al +1 385 418 5222 y además ofrece WhatsApp. Tu reel fijado más visto dice «Citas por DM». El último reel dice «Reserva tu cita por mensaje directo». Son tres puertas para la misma casa, y el que duda entre tres no elige ninguna." },
      { k: "Una señal de precio", s: "fuga",
        note: "No hay ni una cifra en todo tu perfil. Revisamos la bio, los tres fijados y los nombres de las ocho destacadas: ni un número, ni un rango, ni un «desde». Con black work y mangas completas la gente asume que es caro, y la que asume no pregunta: se va al perfil del que sí lo dice." },
      { k: "El depósito", s: "fuga",
        note: "No aparece en ningún sitio. Sin depósito una cita es una intención, y las intenciones no se presentan el sábado a las diez. Cada hueco que se cae es una sesión que no vuelve, y en tu caso duele más porque son piezas grandes: no se rellenan con un walk-in de media hora." },
      { k: "Cuándo respondes", s: "fuga",
        note: "Nada dice cuánto tardas. Para el que escribió y espera, tu silencio y un «no me interesa» se ven exactamente igual. En Salt Lake City hay más estudios, y basta con que uno conteste en cinco minutos." },
      { k: "Destacadas", s: "fuga",
        note: "Ocho, y cinco se llaman «Destacada»: el nombre por defecto de Instagram, el que aparece cuando nadie escribe uno. Las abrimos todas. Hay 17 historias y solo 3 son de 2026; las demás son de 2025, 2024, 2023 y una de abril de 2022. Ninguna de las ocho habla de precio, depósito, agenda ni proceso. Lo llamativo es que en @13wilford tienes catorce destacadas y trece con nombre propio: el problema no es que no sepas, es dónde pusiste el cuidado." },
      { k: "Fijados", s: "media",
        note: "Usas los tres huecos, y eso está bien hecho. El problema es qué hay dentro. El primero es tu reel de 71.600 vistas, del 15 de julio, y ese sí trabaja. El segundo es del 23 de enero de 2025 —hace veinte meses—, está en inglés, anuncia «amazing discounts you don't want to miss» que ya no existen y no tiene ni un comentario. El tercero es el testimonio de tu clienta, buenísimo, pero vive en la cuenta de ella, es de mayo de 2025 y no lleva a ninguna parte." },
      { k: "Diseños contra piel", s: "bien",
        note: "Casi toda la cuadrícula es tinta en piel real: mangas, antebrazos, piernas, cicatrices cubiertas. Nada de dibujos en papel haciendo bulto. En black work eso importa el doble, porque la diferencia entre un buen diseño y un buen tatuaje es exactamente la que se ve aquí." },
      { k: "Constancia", s: "bien",
        note: "Abrimos publicaciones del 15 de julio, del 12 de agosto y del 21 de septiembre, y entre medias hay varias más. Publicas cada semana o cada diez días sin fallar, y eso es lo más difícil de sostener de toda esta lista. Instagram te está premiando por ello: por eso tienes reels de 71.600 y 28.100 reproducciones con 1.707 seguidores." },
      { k: "Dónde estás", s: "media",
        note: "Tu bio dice «📍UT🇺🇸». Utah entero mide 340 kilómetros de ancho. Tus publicaciones sí etiquetan «Downtown Salt Lake City» y tus textos lo dicen, pero la bio es lo único que lee el que llega de un reel y no baja. Poner la ciudad y el barrio en la bio cuesta ocho caracteres." },
      { k: "Qué le pides que haga", s: "media",
        note: "«Cotizaciones y citas» sí explica para qué sirve el teléfono, y eso está bien pensado. Lo que no dice es qué pasa después: cuánto tardas, qué necesitas saber para cotizar, si sale de ahí con un número o con una fecha. Y compite con el «Citas por DM» de tus fijados, que pide otra cosa distinta." },
      { k: "Se entiende qué tatúas", s: "bien",
        note: "«Black Work» está dicho en la bio y demostrado en cada cuadro de la cuadrícula. Nadie llega a tu perfil sin entender qué haces, y eso es lo más caro de construir. Un matiz: «Drag Pointillism» no es un término que nadie escriba en un buscador. Tu estilo está clarísimo en las fotos; el nombre que le pusiste no te está trayendo a nadie." },
    ],

    market: [
      { t: "Tu alcance ya está resuelto, y eso es raro",
        body: "149.227 reproducciones en dieciocho videos con 1.707 seguidores no es normal: lo normal es lo contrario, mucho seguidor y poco alcance. Tú tienes el problema bueno. Cuando el cuello de botella está en el alcance hay que trabajar meses para moverlo; cuando está en el mostrador, se arregla en semanas. Tú estás en el segundo caso." },
      { t: "Una web en blanco cuesta más que no tener web",
        body: "El que no ve enlace escribe por WhatsApp. El que ve un enlace que promete un estudio, lo toca y encuentra una pantalla vacía, concluye otra cosa: que el negocio está a medias. Y esa conclusión se la lleva también al WhatsApp que ya no va a abrir. Mientras el sitio no cargue, quitar el enlace te suma." },
      { t: "Los reels que revientan no son los bonitos: son los que dicen algo",
        body: "Tu reel de 71.600 vistas se llama «8 razones para elegir mi trabajo» y tiene una promesa en la primera línea. El del 12 de agosto dice «Cover up» y cinco etiquetas, y se quedó en 2.129. La diferencia no es el tatuaje: es que uno le da al que mira una razón para quedarse y el otro no. Eso se puede repetir a propósito." },
    ],

    arreglos: [
      { n: "01",
        t: "Una sola puerta, y con el letrero puesto",
        body: "Hoy tu perfil ofrece tres formas de escribirte y ninguna gana. Elige una —WhatsApp, que es la que ya tienes enlazada— y que todo apunte ahí.\n\nY quita el enlace «Web Side» hasta que la página cargue. Ahora mismo abre en blanco, y un enlace muerto en la bio le cuesta credibilidad a todo lo demás.\n\nEsta es la bio completa, lista para pegar:",
        copy: "WILD.ink · Black work & fine line\n📍 Downtown Salt Lake City, UT\n💬 Cotizaciones y citas por WhatsApp\n⏱️ Te contesto el mismo día\n⬇️ Escríbeme y te paso precio hoy",
        copyNote: "Fíjate en lo que cambia: dice la ciudad y no solo el estado, promete un plazo y promete un resultado concreto —precio hoy— en vez de pedir un mensaje a cambio de nada. Y deja un solo enlace, el de WhatsApp." },
      { n: "02",
        t: "Ponles nombre a las cinco, y crea la que cobra",
        body: "Cinco de tus ocho destacadas se llaman «Destacada». En tu cuenta personal tienes trece con nombre propio, así que esto te va a tomar cuatro minutos: entra en cada una, «Editar destacada», y escribe qué hay dentro.\n\nPero lo importante es la que falta. Ninguna de las ocho explica cómo se te contrata. Graba cuatro historias, guárdalas en una destacada nueva llamada «Cómo agendar» y ponla la primera de la fila.\n\nEste es el guion, una frase por pantalla:",
        copy: "1 · Escríbeme por WhatsApp con tu idea, la zona y el tamaño en pulgadas\n2 · Te paso un rango de precio el mismo día\n3 · El depósito de $___ aparta tu fecha y se descuenta del total\n4 · Te mando el diseño antes de la cita",
        copyNote: "Pon tu depósito donde va el espacio. Lo de «se descuenta del total» no sobra: mucha gente cree que el depósito es un cargo extra encima del precio. Y ponla la primera — la destacada número ocho no la ve nadie." },
      { n: "03",
        t: "Cambia el fijado de enero de 2025",
        body: "Tu segundo fijado tiene veinte meses, está en inglés, ofrece descuentos que ya no existen y no tiene un solo comentario. Está ocupando uno de los tres cuadros más valiosos de tu perfil.\n\nQuítalo y fija en su lugar una pieza tuya reciente con este texto. Es lo único que tienes que escribir para que el que llega de un reel sepa, en dos líneas, cuánto cuesta y qué hacer:",
        copy: "Black work en Salt Lake City.\nManga completa desde $___ · Piezas medianas desde $___\nDepósito de $___ aparta tu fecha.\nEscríbeme por WhatsApp y te paso precio hoy mismo.",
        copyNote: "Un rango publicado hace dos cosas a la vez: filtra al que no puede pagarte antes de gastarte una conversación, y tranquiliza al que sí puede y no se atrevía a preguntar. Hoy los dos hacen exactamente lo mismo: nada." },
    ],

    dm: {
      t: "Y la respuesta que convierte «¿cuánto vale?» en una cita",
      when: "Cuando alguien abre con «¿cuánto me cobras por algo así?» — que con mangas y black work es como empieza casi todo",
      bad: "Depende del diseño 🙏 mándame la idea y te digo",
      good: "el tamaño y la zona mueven el precio mucho más que el diseño. ¿en qué parte te lo pondrías y qué tan grande lo estás pensando, en pulgadas más o menos? con eso te paso un número real hoy, no un «depende». y si tienes una referencia mándamela, que con black work la referencia me ahorra media conversación.",
      why: "La primera le devuelve el trabajo a él y cierra la conversación con educación. La segunda pide las dos cosas que de verdad necesitas para cotizar, promete algo concreto a cambio —un número real, hoy— y termina sonando a ti y no a un formulario. Casi todo el mundo la contesta, y el que no la contesta no iba a reservar.\n\nTen la misma en inglés y pegada en las respuestas rápidas de WhatsApp. En Salt Lake City te van a escribir en los dos idiomas, y la versión que tardas diez minutos en traducir es la que pierdes." },

    plan: [
      { k: "El mostrador que falta",
        d: "Rango de precio publicado, depósito con enlace de pago, destacada de «cómo agendar» y una sola puerta de entrada. Todo lo que tus 149.227 reproducciones ya demostraron que quieren ver, por fin visible." },
      { k: "Alguien contestando por ti, en dos idiomas",
        d: "Tus mensajes respondidos en minutos, con tu voz y tus precios, en español y en inglés, mientras tú estás con la máquina en la mano. Que tatuar deje de costarte el siguiente tatuaje." },
      { k: "La web, o fuera o funcionando",
        d: "Una página que carga, dice el precio, muestra el trabajo y tiene un botón de reserva con depósito. Si no va a existir, el enlace se quita hoy: en blanco te está restando." },
      { k: "Repetir los reels que sí funcionan",
        d: "Cuatro de tus dieciocho videos concentran el 84% del alcance, y tienen algo en común que se puede copiar a propósito. Eso deja de ser suerte y pasa a ser calendario." },
      { k: "El seguimiento",
        d: "El que pregunta y se calla es la pila de dinero más grande de cualquier perfil, y nadie la está tocando. Con tu alcance, en tu caso es la más grande que hemos visto este mes." },
    ],

    dias90: [
      { d: "Días 1–15", t: "Fundación",
        items: [
          "Bio reescrita con ciudad, plazo y una sola puerta",
          "Rango de precio y depósito definidos contigo y publicados",
          "Destacadas renombradas y «Cómo agendar» grabada y puesta primera",
          "Fijados renovados: fuera el de enero de 2025",
          "Guiones de respuesta en español y en inglés, aprobados por ti",
          "Medición instalada: cuántos tocan, escriben y agendan",
        ] },
      { d: "Días 15–30", t: "Lanzamiento",
        items: [
          "Setter respondiendo tus mensajes en minutos, los dos idiomas",
          "Campañas activas en Salt Lake City y el condado",
          "El testimonio de tu clienta convertido en argumento de venta",
          "Primeras conversaciones calificadas con precio y zona",
          "Primeros datos de qué pieza y qué zona convierten",
        ] },
      { d: "Días 30–60", t: "Optimización",
        items: [
          "Bajar el costo por cotización",
          "Subir la calidad del que escribe",
          "Replicar a propósito la estructura de tus reels que revientan",
          "Reforzar el seguimiento del que preguntó y no cerró",
          "Empujar los estilos que ganan",
        ] },
      { d: "Días 60–90", t: "Predictibilidad",
        items: [
          "Escalar lo que ya demostró funcionar",
          "Agenda visible con semanas de anticipación",
          "Mejor conversión de cotización a depósito",
          "Menos días vacíos entre sesiones grandes",
          "Un tablero donde ves el mes antes de que pase",
        ] },
    ],

    cierre:
      "Nada de lo que dice esta página es opinión nuestra: entra a tu perfil, cuenta cuántas destacadas se llaman «Destacada» y toca el enlace de tu web. Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la misma llamada. Pasa, y es mejor para los dos que descubrirlo dentro de tres meses.",
  },
  "christian-tibabuzo": {
    slug: "christian-tibabuzo",
    lang: "es",
    handle: "@tiba.ink",
    name: "Christian Tibabuzo",
    studio: "Blackwork · geek · microrealismo · @ct.tattoostudio",
    city: "Bogotá",
    profile: "https://www.instagram.com/tiba.ink/",
    reviewed: "2026-09-02",
    expira: "2026-09-09T23:59:00-05:00",
    moneda: "COP",
    planUrl: "https://buy.stripe.com/14AdR1fMe8fyg6od1b53O02",

    /* Su tesis: el trabajo está probado y el mostrador no existe. Nada
       que ver con la de Xime, y por eso las bandas no pueden ser las
       mismas. */
    bands: [
      { line: "Catorce destacadas enseñan lo que sabes hacer. Ninguna dice cuánto cuesta.", cta: "Empezar el sistema" },
      { line: "Los arreglos de arriba te ponen el mostrador. Llenar la agenda todos los meses es otro trabajo, y ese no se hace en una tarde.", cta: "Empezar el sistema" },
    ],

    stats: [
      { k: "Seguidores", v: "2.076" },
      { k: "Destacadas", v: "14" },
      { k: "De ellas, sobre precio o agenda", v: "0" },
      { k: "Publicaciones fijadas", v: "0" },
    ],
    bio: [
      "🖋️ Tattoo Artist",
      "⚫️ BlackWork / Geek / Microrealismo / Fine Line",
      "🏠 @ct.tattoostudio | Chico Norte",
      "📍 Bogotá, Col 🇨🇴",
      "⬇️ Citas y Cotizaciones  ·  wa.me/message/F362MQFTL35KO1",
    ],

    verdict: {
      line: "El 31 de agosto ganaste un premio. Tu perfil todavía no sabe cobrarlo.",
      body: [
        "Entramos a tu perfil como entra un desconocido con una idea en la cabeza y con qué pagarla. Y lo primero que hay que decir es que tu perfil está trabajado de verdad. Cuatro estilos dichos en la bio y sostenidos por catorce destacadas: Scar Cover-Up, Geek, Color, Perfos, Brazaletes, Siluetas, Fine Line, Lettering, Process, Diseños Disponibles, Minimalistas, Covers/Retoques, Competencias e Ilustrativo. No es un montón de historias viejas: «Process» llega hasta el 3 de agosto y «Fine Line» hasta el 22. Están vivas y se nota que las mantienes.",
        "Publicas seguido —31, 24 y 15 de agosto— y el 31 subiste el segundo puesto de la categoría Nuevo Talento del Tattoo Fest Z4. Eso es autoridad real, fechada y comprobable, y la mayoría de los tatuadores que revisamos no tiene nada parecido.",
        "Ahora la parte incómoda, y es una sola cosa dicha de cuatro formas: todo tu perfil demuestra que sabes tatuar, y nada explica cómo contratarte.",
        "De las catorce destacadas, catorce son de estilo o de proceso. Ninguna dice cuánto cuesta, ninguna dice cómo se reserva, ninguna dice cuándo tienes agenda. La única vez que tu perfil menciona el dinero es dentro de «Diseños Disponibles», y dice literalmente: «está disponible a muy buen precio». Sin cifra. Eso obliga a preguntar, y el que tiene que preguntar el precio muchas veces prefiere no preguntar.",
        "Tampoco hay depósito en ninguna parte, ni una palabra sobre cuánto tardas en contestar. Y no tienes ni una publicación fijada: con 83 posts y un premio de hace dos días, el que entra por primera vez ve lo último que subiste, no lo mejor que haces. Ese premio debería ser lo primero que ve todo el mundo y hoy está enterrado entre otras ochenta y dos.",
        "Tus reels lo confirman desde el otro lado. Medimos dieciocho: 14.791 vistas entre todos, el mejor en 2.010 y el normal alrededor de 730, contra 2.076 seguidores. Tienes gente mirando cada semana. Lo que no tienes es dónde se pone el dedo cuando esa gente decide.",
        "Ese es el diagnóstico: no te falta trabajo, ni constancia, ni pruebas. Te falta el mostrador. Tienes catorce vitrinas montadas y ninguna caja registradora.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "bien",
        note: "Uno solo, a WhatsApp, y con la línea de arriba diciendo para qué es: «⬇️ Citas y Cotizaciones». Eso es mejor de lo que hace la mayoría, que pone tres flechas y ya. Quien toca sabe a dónde va y para qué." },
      { k: "Un camino para reservar", s: "media",
        note: "El enlace existe y está bien etiquetado, pero todo lo que pasa después vive solo en tu cabeza: no hay ni una instrucción pública de qué ocurre cuando alguien escribe. Ni qué le vas a preguntar, ni cuántos pasos son, ni si sale de ahí con un precio o con una fecha." },
      { k: "Una señal de precio", s: "fuga",
        note: "La única mención de dinero en todo tu perfil está dentro de «Diseños Disponibles» y dice «está disponible a muy buen precio». Sin cifra, sin rango, sin desde. Con blackwork y microrealismo la gente asume que es caro, y la que asume no pregunta: se va al perfil del que sí lo dice." },
      { k: "El depósito", s: "fuga",
        note: "No aparece en ningún sitio: ni bio, ni enlace, ni ninguna de las catorce destacadas. Sin depósito, una cita es una intención, y las intenciones no se presentan el sábado por la mañana. Cada hueco que se cae es una sesión que ya no vuelve." },
      { k: "Cuándo respondes", s: "fuga",
        note: "Nada dice cuánto tardas. Para el que espera, tu silencio y un «no me interesa» se ven exactamente igual, y a las 24 horas ya está mirando a otro. En Bogotá hay muchos, y algunos contestan en cinco minutos." },
      { k: "Destacadas", s: "media",
        note: "Catorce, ordenadas por estilo y —esto es lo importante— vivas: «Process» llega al 3 de agosto de 2026 y «Fine Line» al 22. Casi todos los perfiles que revisamos las tienen abandonadas desde hace años; tú no. El problema no es el mantenimiento, es que las catorce enseñan trabajo y ninguna explica cómo comprarlo. Te falta la número quince." },
      { k: "Fijados", s: "fuga",
        note: "Cero. Los tres huecos están vacíos. Tienes 83 publicaciones y un segundo puesto de hace dos días, y quien entra por primera vez ve lo último que subiste en vez de lo mejor que has hecho. Es el espacio más valioso del perfil y está sin usar." },
      { k: "Diseños contra piel", s: "bien",
        note: "Casi toda la cuadrícula es tinta en piel real. Y con tu trabajo eso importa el doble: en geek y microrealismo la diferencia entre un buen dibujo y un buen tatuaje es enorme, y tú estás enseñando la segunda." },
      { k: "Constancia", s: "bien",
        note: "31, 24 y 15 de agosto. Publicas cada semana o cada dos, y eso le da a Instagram razones para seguir enseñándote. Es una de las cosas más difíciles de sostener y la tienes resuelta sin ayuda de nadie." },
      { k: "Dónde estás", s: "bien",
        note: "«Bogotá» y además «@ct.tattoostudio | Chico Norte». No solo la ciudad: el barrio y el estudio etiquetado. Cualquiera sabe en dos segundos si le queda cerca, y de paso hereda la confianza de un estudio con nombre." },
      { k: "Qué le pides que haga", s: "media",
        note: "«⬇️ Citas y Cotizaciones» dice para qué sirve el enlace, y eso ya te pone por delante. Lo que no dice es qué va a pasar al otro lado: cuánto tardas, qué necesitas saber, si sale con número o con fecha. Decirlo sube la cantidad de gente que se atreve a tocar." },
      { k: "Se entiende qué tatúas", s: "bien",
        note: "«BlackWork / Geek / Microrealismo / Fine Line» en la bio, y catorce destacadas que lo demuestran una por una. Nadie llega a tu perfil sin entender qué haces. Esto es lo más difícil de construir y ya lo tienes." },
    ],

    market: [
      { t: "Un premio dura dos semanas si nadie lo sostiene",
        body: "El segundo puesto del Tattoo Fest Z4 es la mejor prueba que tienes y ahora mismo es una publicación más que va a bajar por la cuadrícula. Sin un fijado que lo sostenga, sin una destacada que lo guarde y sin una oferta detrás, en un mes no queda nada de él. La autoridad no se acumula sola: se coloca donde la gente decide." },
      { t: "Geek y anime es un nicho que busca por nombre",
        body: "Quien quiere un tatuaje de Dragon Ball no busca «tatuador en Bogotá»: busca a alguien que ya haya hecho ese personaje. Tú tienes esas piezas y tienes las destacadas que las agrupan. Es de los pocos nichos donde el trabajo se vende solo si lo encuentran, y por eso el buscador y la pauta local rinden tanto." },
      { t: "«Muy buen precio» es la frase que más caro te sale",
        body: "No es un problema de redacción. Un rango publicado filtra a quien no puede pagar antes de gastarte una conversación, y tranquiliza a quien sí puede y no se atreve a preguntar. Sin cifra, las dos personas hacen lo mismo: nada." },
    ],

    arreglos: [
      { n: "01",
        t: "Fija el premio. Hoy, y tarda un minuto.",
        body: "Tienes los tres huecos de fijados vacíos y un segundo puesto del 31 de agosto enterrado en la cuadrícula. Abre la publicación, toca los tres puntos y dale a «Fijar en tu perfil».\n\nY mientras estás ahí: tu destacada «Competencias» tiene dos historias y la última es del 27 de mayo. El premio de esta semana todavía no está dentro. Súbelo también.",
        copy: "Fijados: 1) el premio del Tattoo Fest Z4 · 2) tu mejor pieza geek · 3) un cover o cicatriz antes/después",
        copyNote: "Esos tres cubren las tres razones por las que alguien te contrata: eres bueno, haces lo que busco, y arreglas lo que otro hizo mal. El que entra por primera vez decide en esos tres cuadros." },
      { n: "02",
        t: "Pon la destacada número quince",
        body: "Tienes catorce destacadas de estilo y ninguna de proceso comercial. Falta la que cobra. Graba cuatro historias, guárdalas en una destacada nueva llamada «Cómo agendar» y ponla la primera de la fila.\n\nEste es el guion, una frase por pantalla:",
        copy: "1 · Escríbeme por WhatsApp con tu idea, la zona y el tamaño en cm\n2 · Te paso un rango de precio el mismo día\n3 · El depósito de $___ aparta tu fecha y se descuenta del total\n4 · Te mando el diseño antes de la cita",
        copyNote: "Pon tu depósito donde va el espacio. Lo de «se descuenta del total» no sobra: mucha gente cree que el depósito es un cargo extra. Y ponla primera en la fila de destacadas — la que está en el puesto catorce no la ve nadie." },
      { n: "03",
        t: "Cámbiale «muy buen precio» un número",
        body: "Tu destacada «Diseños Disponibles» tiene un solo diseño y dice «está disponible a muy buen precio». Ese diseño es lo más fácil de vender que tienes: ya está dibujado, no hay que consultar nada y quien lo quiere lo quiere ya.\n\nSúbelo otra vez con el precio puesto, y aprovecha para meter tres o cuatro diseños más:",
        copy: "DISPONIBLE · $___\nTamaño aprox: ___ cm · Zona sugerida: ___\nUna sola vez. Escríbeme y es tuyo.",
        copyNote: "«Una sola vez» es lo que convierte un dibujo en una pieza única, y es verdad: un flash tatuado dos veces deja de serlo. Con cuatro o cinco diseños con precio tienes una tienda dentro del perfil, sin web y sin nada que montar." },
    ],

    dm: {
      t: "Y la respuesta que convierte «¿cuánto vale?» en una cita",
      when: "Cuando alguien abre con «¿cuánto me cobras por algo así?» — que con tus estilos es como empieza casi todo",
      bad: "Depende del diseño 🙏 mándame la idea y te digo",
      good: "el tamaño y la zona mueven el precio mucho más que el diseño. ¿en qué parte te lo pondrías y de qué tamaño lo estás pensando? con eso te paso un número real hoy mismo, no un rango. y si es algo geek mándame la referencia, que ahí me emociono.",
      why: "La primera le devuelve el trabajo a él y termina la conversación con educación. La segunda pide las dos cosas que de verdad necesitas para cotizar, promete algo concreto a cambio —un número real, hoy— y en la última línea suena a ti y no a un formulario. Casi todo el mundo la contesta, y el que no la contesta no iba a reservar.\n\nCámbiale las palabras hasta que suene a como hablas tú. Un guion que no suena tuyo se nota más que no tener guion." },

    plan: [
      { k: "El mostrador que falta",
        d: "Destacada de «cómo agendar», rango de precio publicado, depósito con enlace de pago y flash con cifra. Todo lo que tu perfil demuestra que sabes hacer, por fin con una forma de comprarlo." },
      { k: "Alguien contestando por ti",
        d: "Tus mensajes respondidos en minutos, con tu voz y tus precios, mientras tú estás con la máquina en la mano. Que tatuar deje de costarte el siguiente tatuaje." },
      { k: "El premio, convertido en clientes",
        d: "Fijado, guardado en destacadas, empujado con pauta local y usado como argumento en las conversaciones. Un segundo puesto es una prueba: sirve para cerrar, no solo para celebrar." },
      { k: "El nicho geek, buscado a propósito",
        d: "Tu estilo lo busca gente por nombre de personaje. Etiquetas, contenido y pauta dirigidos a esa búsqueda, para que las 2.076 personas que ya te siguen no sean el techo de quién te encuentra." },
      { k: "El seguimiento",
        d: "El que pregunta y se calla es la pila de dinero más grande de cualquier perfil, y nadie la está tocando. Es la parte que se paga sola." },
    ],

    dias90: [
      { d: "Días 1–15", t: "Fundación",
        items: [
          "Fijados puestos y destacada de «cómo agendar» grabada",
          "Rango de precio y depósito definidos contigo y publicados",
          "Flash disponible con precio, listo para vender",
          "Guiones de respuesta escritos con tu voz, aprobados por ti",
          "Medición instalada: cuántos tocan el enlace, escriben y agendan",
        ] },
      { d: "Días 15–30", t: "Lanzamiento",
        items: [
          "Campañas activas en Bogotá, apuntando a tu nicho",
          "Setter respondiendo tus mensajes en minutos",
          "El premio empujado como prueba, no como celebración",
          "Primeras conversaciones calificadas",
          "Primeros datos de qué estilo y qué zona convierten",
        ] },
      { d: "Días 30–60", t: "Optimización",
        items: [
          "Bajar el costo por cotización",
          "Subir la calidad del que escribe",
          "Afinar las preguntas de calificación",
          "Reforzar el seguimiento del que no cerró",
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
      "Nada de lo que dice esta página es opinión nuestra: entra a tu perfil, cuenta tus destacadas y busca en cuál dice el precio. Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la misma llamada. Pasa, y es mejor para los dos que descubrirlo dentro de tres meses.",
  },
  "xime-lizarazu": {
    slug: "xime-lizarazu",
    lang: "es",
    handle: "@xime.lizarazutattoo",
    name: "Xime Lizarazú",
    studio: "Línea fina · microrealismo · @sagrada.tattooestudio",
    city: "Bogotá",
    profile: "https://www.instagram.com/xime.lizarazutattoo/",
    reviewed: "2026-08-31",
    expira: "2026-09-07T23:59:00-05:00",
    moneda: "COP",
    planUrl: "https://buy.stripe.com/14AdR1fMe8fyg6od1b53O02",

    /* Su tesis, no la genérica: veinticuatro mil personas y una agenda
       que no se llena sola. Las bandas son el único sitio donde eso se
       dice a tamaño de titular. */
    bands: [
      { line: "24.009 personas te siguen y tu agenda no se llena sola. Eso no es un problema de talento.", cta: "Empezar el sistema" },
      { line: "Con lo de arriba vuelven las conversaciones. Llenar la agenda todos los meses es otro trabajo, y ese no se hace en una tarde.", cta: "Empezar el sistema" },
    ],
    stats: [
      { k: "Seguidores", v: "24.009" },
      { k: "Tu depósito, desde 2023", v: "$50.000" },
      { k: "Publicaciones en 6 meses", v: "6" },
      { k: "Tus 3 destacadas de venta", v: "may 2023" },
    ],
    bio: [
      "@sagrada.tattooestudio",
      "6 años tatuando",
      "Bogotá 🇨🇴",
      "Agenda Abierta",
      "Cotizaciones Link 👇🏻  ·  wa.me/573007125601",
    ],

    verdict: {
      line: "«Junio — últimos cupos». Eso dice tu agenda hoy, y es de 2023.",
      body: [
        "Empecemos por lo que no vamos a discutir: tu trabajo. Microrealismo de mascotas con la mirada resuelta, línea fina limpia, seis años, cuenta verificada y 24.009 personas que dijeron que sí. Eso no se compra, y no es lo que vinimos a arreglar.",
        "Y por eso la pregunta de esta auditoría es una sola: si 24.009 personas te siguen y tu trabajo es el que es, ¿por qué hay que llenar la agenda cada mes en vez de tener lista de espera? Lo que sigue es lo que encontramos al buscar esa respuesta.",
        "Miramos lo que decide si una desconocida te escribe o se va. Y ahí tienes algo que casi nadie tiene: cinco destacadas, y tres de ellas son exactamente las correctas — ¿CÓMO AGENDAR?, COTIZACIONES y AGENDA. Alguien se sentó a pensar tu proceso comercial y lo montó bien. Abrimos las tres.",
        "Las tres tienen una sola historia. Las tres son del mismo día: 29 de mayo de 2023. Hace tres años y tres meses.",
        "«Agenda» dice, literalmente: «JUNIO — Últimos cupos. JULIO — Apertura 20 de junio». Una clienta que entra hoy a ver si tienes espacio lee que se acaban los cupos de un junio de hace tres años, mientras tu bio le dice «Agenda Abierta». Las dos cosas no pueden ser ciertas, y ella no sabe cuál creer.",
        "«¿Cómo agendar?» pide un abono de $50.000 por consignación o transferencia, y que le mandes el comprobante para agendar. Ese depósito lleva tres años sin moverse. En microrealismo, $50.000 no aparta nada: es tan poco que a la clienta le sale barato no aparecer, y cada hueco que se cae es una hora de camilla que no vuelve. Y el proceso —consignar, hacer captura, mandarla, esperar— tiene cuatro pasos manuales donde hoy debería haber un enlace.",
        "«Cotizaciones» es la mejor de las tres, y por eso duele: pide las tres cosas exactas que necesitas para cotizar —idea con referencias, zona con foto, tamaño en centímetros—. Están bien elegidas. El problema es que se las pides en una historia que la clienta tiene que abrir, leer y luego escribir a mano en un WhatsApp que se abre en blanco. Tú ya decidiste cuáles son las preguntas correctas; lo que falta es que las haga el enlace y no ella.",
        "Y hay una cosa más, de la misma familia. Tus últimas publicaciones son del 24 de agosto, 12 de julio, 11 de junio, 10 de mayo, 20 de marzo y 16 de marzo: seis en seis meses. Con 24.009 seguidores, publicar cada tres o cuatro semanas no le da a Instagram razones para seguir enseñándote, y por eso tus reels se mueven casi siempre entre 900 y 4.000 vistas. Eso no lo explica tu trabajo. Lo explica el ritmo.",
        "Ese es el diagnóstico, y es mejor noticia de lo que parece: no tienes que inventar un sistema comercial. Ya lo tienes, lo pensaste bien, y está parado en mayo de 2023.",
      ],
    },

    puntos: [
      { k: "Un enlace en la bio", s: "bien",
        note: "Uno solo y directo a WhatsApp: wa.me/573007125601. Lo tienes mejor resuelto que la mayoría de perfiles que revisamos, donde el enlace lleva a un Linktree que cobra un toque de peaje y encima promociona a otros creadores. Aquí quien toca, llega." },
      { k: "Un camino para reservar", s: "fuga",
        note: "Existe y está escrito: abono de $50.000 por consignación o transferencia, mandar el comprobante, y esperar a que confirmes según disponibilidad. Son cuatro pasos manuales —salir de Instagram, entrar al banco, hacer captura, volver— y cada uno pierde gente. Además vive dentro de una historia de mayo de 2023, así que la clienta ni siquiera sabe si sigue siendo así." },
      { k: "Una señal de precio", s: "fuga",
        note: "No hay ninguna, en ninguna parte. Revisamos bio, enlace y las cinco destacadas: «Cotizaciones» no contiene precios, contiene las preguntas que hay que enviarte. Con microrealismo —que todo el mundo asume que es caro— el silencio no crea misterio: crea la sospecha de que no alcanza. Y la que lo sospecha no pregunta, se va con otra que sí lo dice." },
      { k: "El depósito", s: "fuga",
        note: "$50.000, y lleva desde mayo de 2023 sin cambiar. Es el número más caro de tu perfil: un depósito que no duele no aparta nada, así que no filtra a la que iba a fallar ni compromete a la que sí. En tres años tus precios y tu nivel subieron; esta cifra no. Y para verla hay que abrir una destacada." },
      { k: "Cuándo respondes", s: "fuga",
        note: "No lo dice nada: ni la bio, ni el enlace, ni ninguna de las cinco destacadas. Con 24.009 seguidores te escriben a cualquier hora, y para la que espera tu silencio y un «no me interesa» se ven exactamente igual. A las 24 horas ya está mirando otro perfil de Bogotá, y hay muchos." },
      { k: "Destacadas", s: "fuga",
        note: "Los nombres son de los mejores que hemos visto — y por eso hay que abrirlas para juzgarlas. ¿CÓMO AGENDAR?, COTIZACIONES y AGENDA tienen una sola historia cada una, las tres del 29 de mayo de 2023. «Diseños» tiene tres, de junio y julio de 2023. Solo «Cicatrizados» está construida de verdad —21 historias— y su última es de abril de 2024. Ninguna de las cinco tiene un enlace dentro." },
      { k: "Fijados", s: "bien",
        note: "Los tres usados y bien elegidos: retrato de mascota, microrealismo y línea fina. Quien entra por primera vez ve en dos segundos exactamente lo que sabes hacer, y no lo último que subiste." },
      { k: "Diseños contra piel", s: "bien",
        note: "Casi toda la cuadrícula es tinta en piel real, no bocetos en papel. Es lo que hace que una desconocida se imagine el suyo. Tu trabajo no necesita ayuda de nadie: es lo mejor que tienes y se nota a la primera pasada." },
      { k: "Constancia", s: "fuga",
        note: "Tus últimas publicaciones: 24 de agosto, 12 de julio, 11 de junio, 10 de mayo, 20 de marzo y 16 de marzo. Seis en seis meses. Instagram reparte alcance según las señales que le das, y una publicación cada tres o cuatro semanas no sostiene una audiencia de 24.009. Tus reels se mueven casi siempre entre 900 y 4.000 vistas: esa distancia no la explica tu trabajo, la explica el ritmo." },
      { k: "Dónde estás", s: "bien",
        note: "«Bogotá» en la bio y el estudio etiquetado, @sagrada.tattooestudio. Cualquiera sabe en dos segundos si puede llegar a tu camilla, y además hereda la confianza de un estudio con nombre propio." },
      { k: "Qué le pides que haga", s: "media",
        note: "«Cotizaciones Link 👇🏻» dice a dónde ir, y eso ya es más que las tres flechas sueltas que vemos siempre. Lo que no dice es qué pasa después: cuánto tardas, qué le vas a preguntar, si sale de ahí con un número o con una fecha. Decirlo sube la cantidad de gente que se atreve a tocar." },
      { k: "Se entiende qué tatúas", s: "bien",
        note: "«Xime Lizarazú – Línea Fina y Microrealismo», en el nombre y no escondido en la bio, así que aparece hasta en el buscador de Instagram. Y la cuadrícula lo sostiene. Esto es lo más difícil de construir y ya lo tienes." },
    ],

    market: [
      { t: "No hay que inventar tu sistema. Hay que ponerlo en hora",
        body: "La mayoría de los perfiles que auditamos no tienen proceso: ni depósito, ni preguntas de cotización, ni instrucciones. Tú tienes las tres cosas, escritas y bien pensadas, desde mayo de 2023. Eso cambia por completo el trabajo: no empezamos de cero, arrancamos de algo que ya funcionó y lleva tres años sin mantenimiento." },
      { t: "$50.000 en 2023 no son $50.000 hoy",
        body: "Un depósito cumple dos funciones: filtrar a la que no iba a aparecer y comprometer a la que sí. Con una cifra que no duele, no hace ninguna de las dos. Subirlo es la decisión de una tarde y es de las pocas cosas que se notan en la agenda del mes siguiente." },
      { t: "Sagrada tiene 1.084 seguidores. Tú tienes 24.009",
        body: "El estudio comparte tu mismo WhatsApp y en tus pies de foto mandas la agenda allí, pero su cuenta tiene una vigésima parte de tu audiencia. Estás construyendo una marca de estudio detrás de una marca personal que ya ganó, y hoy la mayoría de tu gente no sabe que Sagrada existe." },
    ],

    arreglos: [
      { n: "01",
        t: "Cambia hoy la destacada de AGENDA. Cinco minutos.",
        body: "Es lo primero porque es lo que más te está costando: ahora mismo tu agenda le ofrece a una clienta de 2026 los últimos cupos de junio de 2023. Graba una historia nueva, guárdala en la destacada AGENDA que ya existe y borra la vieja.\n\nY escríbela sin meses, para que no vuelva a caducar:",
        copy: "AGENDA\nEscríbeme y te digo la primera fecha libre.\nSuelo tener espacio en 2–3 semanas.",
        copyNote: "Sin nombres de mes no hay nada que actualizar. Ajusta el plazo al tuyo de verdad — decir «2 a 3 semanas» y cumplirlo vale más que decir «cupos disponibles» y que la clienta no sepa si eso es hoy o hace tres años." },
      { n: "02",
        t: "Mete tus propias preguntas dentro del enlace",
        body: "Tu destacada de COTIZACIONES pide tres cosas: idea con referencias, zona con foto, y tamaño en centímetros. Están perfectamente elegidas — no vamos a cambiarlas. Lo que no tiene sentido es que la clienta tenga que abrir una historia, leerlas y escribirlas a mano en un chat vacío.\n\nCambia el enlace de tu bio por este y llegan solas, en el primer mensaje:",
        copy: "https://wa.me/573007125601?text=Hola%20Xime!%20Quiero%20cotizar%20un%20tatuaje.%0A1)%20Idea%3A%20___%0A2)%20Zona%3A%20___%0A3)%20Tama%C3%B1o%20aprox%3A%20___%20cm",
        copyNote: "Se abre con tus tres preguntas ya numeradas y ella solo rellena. Es tu propio proceso, hecho automático: dejas de pedirle que lo lea en un sitio y lo escriba en otro." },
      { n: "03",
        t: "Sube el depósito y di cuánto tardas",
        body: "Dos frases que van juntas porque resuelven lo mismo: que la clienta sepa a qué atenerse. El depósito de $50.000 lleva tres años igual y hoy no aparta nada; súbelo a lo que de verdad te compense un hueco perdido. Y el tiempo de respuesta no aparece por ningún lado — ni en la bio ni en las cinco destacadas.\n\nLas dos van en la bio, donde se leen sin tocar nada:",
        copy: "Depósito de $___ aparta tu fecha · se descuenta del total\nRespondo cotizaciones de lunes a sábado, antes de las 8pm",
        copyNote: "Pon tu cifra nueva. Lo de «se descuenta del total» importa: la mitad de la gente cree que el depósito es un cargo extra. Y el horario ajústalo al tuyo — el silencio sin plazo se lee como desinterés; con plazo, se lee como agenda llena." },
    ],

    dm: {
      t: "Y la respuesta que revive a las que preguntaron y nunca volvieron",
      when: "Para las conversaciones de hace uno o dos meses que se quedaron en «déjame lo pienso» o directamente sin respuesta. Con tu volumen, esa lista es la pila de dinero más grande que tienes hoy, y no la está tocando nadie",
      bad: "Holaa! Sigues interesada en tu tatuaje? 😊",
      good: "hola ___, te escribo por lo que hablamos hace un tiempo del ___ en ___. no vengo a insistirte: estoy organizando la agenda de las próximas semanas y me quedaron dos espacios. si todavía lo tienes en la cabeza, te aparto uno y te paso el diseño; si ya no va, dime y cierro tu caso sin problema — así dejo de aparecer en tu chat.",
      why: "La primera es la pregunta que manda todo el mundo y que no contesta nadie, porque pide un favor sin dar nada a cambio. La segunda hace tres cosas a la vez: recuerda el detalle concreto de lo que ella quería —eso solo ya sube la respuesta—, le da una razón para que le escribas hoy y no ayer, y le ofrece una salida limpia. La salida limpia es la clave: le quitas la culpa de decir que no, así que la que iba a ignorarte te contesta igual. Las que dicen «ya no» te devuelven tu tiempo; las que dicen «sí» son citas que ya dabas por perdidas.\n\nCambia los espacios en blanco por su nombre y por el diseño que ella pidió. Un mensaje de estos sin el detalle personal es exactamente el mensaje malo." },

    plan: [
      { k: "Tu proceso de 2023, puesto en hora y mantenido",
        d: "Las tres destacadas regrabadas sin fechas que caduquen, el depósito actualizado y visible, tus preguntas dentro del enlace y el pago con link en vez de consignación y comprobante. Lo pensaste bien; lo que falta es quién lo mantiene vivo." },
      { k: "Alguien contestando por ti",
        d: "Tus mensajes respondidos en minutos, con tu voz y tus precios, mientras tú estás con la aguja en la mano. Es lo único que hace que «Agenda Abierta» sea verdad todos los días y no solo una línea de la bio." },
      { k: "Un ritmo que Instagram entienda",
        d: "De seis publicaciones en seis meses a un calendario que puedas cumplir tatuando. No más horas de grabación: un plan de qué se graba en la silla, qué se dice al final y a dónde se manda a la gente." },
      { k: "El seguimiento y el histórico",
        d: "Las que preguntaron y se callaron, recuperadas una por una con el guion de arriba. En una cuenta de tu tamaño, esta es la parte que se paga sola en el primer mes." },
      { k: "Medición de verdad",
        d: "Hoy no sabes cuántas tocan tu enlace, cuántas escriben, cuántas cotizan ni cuántas aparecen. Sin eso, cada decisión es una corazonada. Con eso, sabes qué repetir y qué dejar de hacer." },
    ],

    dias90: [
      { d: "Días 1–15", t: "Fundación",
        items: [
          "Las tres destacadas de 2023, regrabadas y sin fechas que caduquen",
          "Depósito actualizado y puesto donde se ve sin tocar nada",
          "Tus tres preguntas metidas dentro del enlace de WhatsApp",
          "Medición instalada: cuántas tocan, escriben y agendan",
          "Calendario de contenido que puedas cumplir tatuando",
        ] },
      { d: "Días 15–30", t: "Lanzamiento",
        items: [
          "Campañas activas en Bogotá",
          "Setter respondiendo tus mensajes en minutos",
          "Reactivación del histórico: las que preguntaron y no volvieron",
          "Primeras conversaciones calificadas",
          "Primeros datos de qué diseño y qué zona convierten",
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
      "Nada de lo que dice esta página es opinión nuestra: abre tus destacadas, mira las fechas y lee lo que dicen. Si nos sentamos y no vemos una oportunidad clara en tu caso, te lo decimos en la misma llamada. Pasa, y es mejor para las dos que descubrirlo dentro de tres meses.",
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
