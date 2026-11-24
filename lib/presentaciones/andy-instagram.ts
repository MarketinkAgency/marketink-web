/**
 * SESIÓN DE CIERRE — ANDY TATTOO ARTIST
 *
 * Una presentación de despedida, no de resultados ni de ventas: Andy
 * pausó sus campañas y se va. Lo que vimos desde adentro es que los
 * mensajes llegaban y la venta se perdía en el chat (respuestas tardías,
 * precios sin fecha, poco seguimiento, precios distintos según el canal,
 * «no tengo dinero» sin alternativas). La presentación enseña eso SIN
 * culparlo: «esto pasa en casi todas las cuentas», «lo que más vemos».
 *
 * Reglas duras de este archivo:
 *  · Nada de inversión, costo por mensaje, citas ni resultados de campaña.
 *  · Ningún precio inventado: los montos y fechas son campos [así].
 *  · Sin pitch. La única línea comercial es la última: la puerta abierta.
 *  · La página es privada: noindex, fuera del sitemap, sin enlaces.
 *
 * Las cifras de la slide 4 son un dato anónimo de otra cuenta, entregado
 * por Nick para esta sesión; el dato de la slide 11 (curado vs. fresco)
 * es de la cuenta de Andy. No se añaden otras.
 */

export type Slide = {
  n: number;
  kind: "cover" | "text" | "funnel" | "stat" | "adjust" | "table" | "cols" | "kit" | "thanks";
  /** Rótulo pequeño encima del título. */
  tag?: string;
  title: string;
  sub?: string;
  points?: string[];
  funnel?: string[];
  stat?: { lines: string[]; close: string };
  /** Antes / después, para los ajustes con ejemplo. */
  ba?: { before: string; after: string };
  table?: { cols: string[]; rows: string[][] };
  cols?: { h: string; items: string[] }[];
  /** Botón que lleva a la biblioteca o a los recursos, debajo del deck. */
  go?: { to: "mensajes" | "recursos"; label: string };
  /** Las slides de recursos van en la estética de Andy: negro, grano, sin rojo. */
  theme?: "ink" | "andy";
  /** Notas del presentador. Ocultas por defecto; tecla N. */
  notes: string;
};

export const deck = {
  slug: "andy-instagram",
  title: "Instagram que agenda: lo que te llevas",
  client: "Andy Tattoo Artist",
  handle: "@andy_tattoo_artist",
  city: "Salt Lake City, UT",
  metaTitle: "Sesión de cierre · Andy Tattoo Artist · MarketINK",
  metaDesc: "Instagram que agenda: lo que te llevas. Sesión de cierre con Andy Tattoo Artist, Salt Lake City.",
  ui: {
    of: "de",
    notes: "Notas",
    notesHint: "Tecla N para mostrar u ocultar · ← → para moverte · F pantalla completa",
    full: "Pantalla completa",
    exitFull: "Salir",
    prev: "Anterior",
    next: "Siguiente",
    field: "campo para cambiar",
    copy: "Copiar",
    copied: "Copiado",
    download: "Descargar",
    downloadAll: "Descargar todo (.zip)",
    libraryTag: "Biblioteca de mensajes",
    libraryTitle: "Los mensajes, listos para copiar.",
    librarySub: "En español y en inglés. Lo que va entre corchetes es lo que cambias cada vez: pieza, precio, fechas, depósito. Guárdalos como respuestas rápidas en Instagram.",
    resourcesTag: "Tu kit de regalo",
    resourcesTitle: "Fondos, plantillas, checklist y calendario.",
    resourcesSub: "Todo en tu estética: negro, grises, tinta y grano. Sin texto encima en los fondos, para que lo pongas en Canva con tu letra. Las plantillas vienen en español y en inglés.",
    backToDeck: "Volver a la presentación",
    private: "Esta página se preparó para Andy. No está publicada ni indexada.",
  },
};

export const slides: Slide[] = [
  {
    n: 1,
    kind: "cover",
    title: "Instagram que agenda: lo que te llevas",
    sub: "Sesión de cierre · Andy Tattoo Artist · Salt Lake City · noviembre 2026",
    tag: "Preparado por MarketINK",
    notes:
      "Abrir con calma. Esto no es una reunión de resultados ni de ventas: es una sesión educativa y un regalo. Decirlo así en la primera frase para que Andy baje la guardia: «hoy no vengo a venderte nada; vengo a dejarte lo que aprendimos con tu cuenta».",
  },
  {
    n: 2,
    kind: "text",
    tag: "Por qué esta sesión",
    title: "Cerramos esta etapa, pero no queríamos irnos sin dejarte lo que aprendimos acompañando tu cuenta.",
    sub: "Es tuyo: úsalo solo, con quien quieras o cuando lo necesites.",
    points: [
      "Cinco ajustes que vimos que mueven la aguja en cuentas como la tuya.",
      "Los mensajes exactos, en español y en inglés, listos para guardar en el celular.",
      "Un kit de fondos, plantillas, checklist y calendario en tu estética.",
    ],
    notes:
      "Tono: agradecido y práctico. Si Andy menciona que «no funcionó», no discutir ni justificar. Responder: «por eso quería hacer esta sesión: lo que más aprendimos no fue de los anuncios, fue de lo que pasa después del mensaje, y eso te sirve con o sin anuncios».",
  },
  {
    n: 3,
    kind: "funnel",
    tag: "Cómo se convierte un seguidor en cita",
    title: "Los anuncios y el contenido llenan la parte de arriba. La agenda se llena o se pierde en el chat.",
    funnel: ["Lo ve", "Visita tu perfil", "Te escribe", "Recibe precio", "Aparta con depósito", "Llega a la cita"],
    notes:
      "Recorrer el embudo con el dedo. Señalar que casi todo el mundo invierte tiempo en los dos primeros pasos (contenido, anuncios) y casi nadie en los tres del medio, que es donde está el dinero. No decir «tú»: decir «la mayoría de las cuentas».",
  },
  {
    n: 4,
    kind: "stat",
    tag: "Lo que vemos en las cuentas que acompañamos",
    title: "En 170 conversaciones que analizamos este mes:",
    stat: {
      lines: [
        "Si el tatuador responde en menos de 1 hora, 3 de cada 4 personas siguen la conversación. Si tarda más, menos de la mitad.",
        "1 de cada 2 personas que recibe un precio sin fecha deja de responder.",
      ],
      close: "La venta casi nunca se pierde por un «no». Se pierde por silencio.",
    },
    notes:
      "Dato anónimo de otra cuenta, sin nombres. Aclararlo: «esto no es tuyo, es de otra cuenta que acompañamos, y lo traigo porque es exactamente lo que pasa en casi todas». Dejar que la última frase respire antes de pasar.",
  },
  {
    n: 5,
    kind: "adjust",
    tag: "Ajuste 1",
    title: "La primera hora",
    sub: "El que escribe está comparando en ese momento. Una hora después, ya le contestó otro.",
    points: [
      "Responder en tres bloques fijos: 9 am, 1 pm y 8 pm. Quince minutos cada uno, solo para mensajes.",
      "Respuestas guardadas en el celular para contestar en diez segundos entre cliente y cliente.",
      "Un mensaje automático de bienvenida para que nadie espere de noche sin saber si lo leíste.",
    ],
    go: { to: "mensajes", label: "Ver el primer mensaje" },
    notes:
      "Aquí suele aparecer «es que estoy tatuando». Validarlo: «claro, y por eso la solución no es contestar más rápido a mano, es que el celular conteste por ti la primera vez y tú entres tres veces al día». Mostrar el primer mensaje de la biblioteca.",
  },
  {
    n: 6,
    kind: "adjust",
    tag: "Ajuste 2",
    title: "Precio + 2 fechas + depósito, en el mismo mensaje",
    sub: "Nunca cerrar con «déjame saber». Cerrar con «¿te sirve el [A] o el [B]?».",
    ba: {
      before: "Sería $500, déjame saber.",
      after: "Tu pieza sale en $500 en una sesión de 5 h. Tengo el jueves 4 o el sábado 6. ¿Cuál te sirve? Se aparta con $100 y se descuenta del total.",
    },
    go: { to: "mensajes", label: "Ver el mensaje de precio" },
    notes:
      "El antes es la frase más común del gremio y no tiene nada de malo en el tono; el problema es que deja la pelota del lado del cliente. El después hace tres cosas: precio con contexto (sesión y horas), dos fechas concretas para elegir, y el depósito explicado como «se descuenta». Los $500 y $100 son de ejemplo; Andy pone los suyos.",
  },
  {
    n: 7,
    kind: "table",
    tag: "Ajuste 3",
    title: "Un solo precio en todos lados",
    sub: "La bio, el anuncio, las historias y el chat dicen lo mismo: un depósito, una tarifa por sesión, un rango por tamaño. Nunca «depende» sin dar un rango.",
    table: {
      cols: ["Concepto", "Tu número"],
      rows: [
        ["Depósito para apartar fecha (se descuenta del total)", "$[____]"],
        ["Sesión completa (hasta [__] horas)", "$[____]"],
        ["Pieza pequeña · hasta [__] cm", "desde $[____]"],
        ["Pieza mediana · [__]–[__] cm", "desde $[____]"],
        ["Pieza grande / manga · por sesión", "$[____]"],
        ["Mínimo del estudio", "$[____]"],
      ],
    },
    notes:
      "No llenar la tabla por él. La idea es que la llene esta semana y la pegue en tres sitios: una destacada «Precios», la respuesta guardada y la bio (solo la línea de «desde»). Si pregunta por qué publicar precios: «filtra al que no puede y tranquiliza al que sí; hoy los dos hacen lo mismo: nada».",
  },
  {
    n: 8,
    kind: "adjust",
    tag: "Ajuste 4",
    title: "«No tengo dinero ahora»",
    sub: "No es un no. Es «me interesa, pero no así».",
    points: [
      "Una versión más pequeña de la misma idea, desde $[X].",
      "Hacerlo por sesiones: ya trabajas con cuotas, solo hay que ofrecerlo antes de que lo pidan.",
      "Apartar hoy una fecha de [enero] con el depósito, y pagar el resto el día de la cita.",
    ],
    go: { to: "mensajes", label: "Ver la respuesta" },
    notes:
      "Esta es la objeción que más citas pierde y la más fácil de rescatar. Las tres salidas se ofrecen juntas, en un solo mensaje, y se cierra con pregunta: «¿cuál te sirve más?». Recordarle que el de las cuotas es su punto fuerte: casi nadie lo ofrece.",
  },
  {
    n: 9,
    kind: "adjust",
    tag: "Ajuste 5",
    title: "Seguimiento: día 1, día 3, día 7",
    sub: "Tres mensajes cortos, cada uno con una fecha concreta. El día 3 va con una foto de un trabajo parecido.",
    points: [
      "Día 1 · «¿Pudiste ver lo de tu [pieza]? Te tengo el [fecha] libre.»",
      "Día 3 · Una foto de una pieza parecida y «¿le damos el [A] o el [B]?».",
      "Día 7 · «Me quedan [2] cupos en [mes]. Si quieres uno, con $[depósito] te lo aparto.»",
      "La mayoría de las citas que se cierran, se cierran en el segundo o tercer mensaje.",
    ],
    go: { to: "mensajes", label: "Ver los tres seguimientos" },
    notes:
      "Aquí suele aparecer el miedo a parecer insistente. Responder: «insistente es escribir lo mismo cinco veces; esto es escribir tres veces con algo nuevo cada vez: una fecha, una foto, un cupo». Si no contesta al tercero, se deja; no se pierde nada.",
  },
  {
    n: 10,
    kind: "cols",
    tag: "Tu perfil tiene 5 segundos",
    title: "Qué haces, dónde, y cómo agendar. En ese orden.",
    cols: [
      {
        h: "Bio (ejemplos)",
        items: [
          "ES · Black & grey y whip shading · Salt Lake City · Citas por DM: idea + zona + tamaño · Depósito aparta tu fecha",
          "EN · Black & grey · Whip shading · Salt Lake City, UT · DM to book: idea + placement + size · Deposit holds your date",
        ],
      },
      {
        h: "Destacadas, en este orden",
        items: ["Cómo agendar", "Precios", "Curados", "Proceso", "Reseñas", "Cupos"],
      },
      {
        h: "3 publicaciones fijadas",
        items: ["Tu mejor pieza grande", "Un video de proceso", "Cómo agendar (precio desde, depósito, DM)"],
      },
    ],
    notes:
      "Lo de los cinco segundos es literal: el que llega de un reel decide en ese tiempo si te escribe o se va. La bio en los dos idiomas no cabe; elegir una y poner la otra en la destacada «Cómo agendar». La destacada «Cupos» se actualiza cada semana con lo que queda del mes.",
  },
  {
    n: 11,
    kind: "cols",
    tag: "Contenido que trae clientes",
    title: "Tu video de curado vs. fresco retuvo más gente en los primeros 3 segundos que cualquier otro. Ahí está la pista.",
    sub: "Ritmo: 3 publicaciones por semana + historias todos los días.",
    cols: [
      {
        h: "Formatos que funcionan en black & grey",
        items: [
          "Curado vs. fresco (el tuyo ya lo demostró)",
          "Proceso: del stencil a la pieza",
          "Tú a cámara: quién eres, cómo trabajas",
          "Antes y después (cover-ups, retoques)",
          "Testimonio de un cliente, en video corto",
        ],
      },
      {
        h: "8 hooks para los primeros 3 segundos",
        items: [
          "«Así se ve un whip shading a los 6 meses»",
          "«Esto es lo que nadie te enseña del black & grey»",
          "«Del stencil a la piel en 40 segundos»",
          "«Por qué no hago color (y por qué eso te conviene)»",
          "«Tres cosas antes de tu primera sesión»",
          "«Fresco vs. curado: mira la diferencia»",
          "«Salt Lake City: quedan [2] cupos en [mes]»",
          "«Lo que cuesta de verdad una manga (sin rodeos)»",
        ],
      },
    ],
    notes:
      "Empezar por lo positivo: el dato del curado vs. fresco es suyo y es real. De ahí sale la regla: los videos que funcionan muestran algo que el espectador no sabía (cómo cura, cómo se hace, cuánto cuesta), no solo una pieza bonita. Los hooks se dicen o se escriben en pantalla en el primer segundo.",
  },
  {
    n: 12,
    kind: "funnel",
    tag: "Rutina de historias · 5 al día",
    title: "Diez minutos al día que mantienen la agenda caliente.",
    funnel: ["Hoy en el estudio", "Proceso en vivo", "Curado o resultado", "Encuesta o pregunta", "Cupos + cómo agendar"],
    sub: "La última historia del día siempre cierra con cupos y con la puerta: «DM con tu idea, zona y tamaño».",
    notes:
      "Cinco historias no son cinco producciones: son cinco momentos del día grabados con el celular. La encuesta o pregunta es la que sube el alcance de las demás. El cierre con cupos es el que trae mensajes. Las plantillas del kit están hechas para estas cinco.",
  },
  {
    n: 13,
    kind: "cols",
    tag: "Los 3 números de cada lunes",
    title: "Una agenda llena es un sistema, no suerte.",
    cols: [
      { h: "01 · Mensajes nuevos", items: ["Cuántas personas te escribieron esta semana."] },
      { h: "02 · Cotizaciones con fecha", items: ["Cuántas recibieron precio + dos fechas + depósito en el mismo mensaje."] },
      { h: "03 · Depósitos", items: ["Cuántas apartaron. Es el único número que paga el alquiler."] },
    ],
    go: { to: "recursos", label: "Descargar el checklist semanal" },
    notes:
      "Tres números en una nota del celular, cada lunes, cinco minutos. Con eso sabe dónde está el hueco: muchos mensajes y pocas cotizaciones con fecha es el ajuste 2; cotizaciones y pocos depósitos es el ajuste 4 o el 5; pocos mensajes es contenido. El checklist descargable lleva los tres números y la rutina.",
  },
  {
    n: 14,
    kind: "kit",
    theme: "andy",
    tag: "Tu kit de regalo",
    title: "Fondos, plantillas, checklist y calendario. En tu estética.",
    points: [
      "6 fondos para historias (1080×1920): humo de tinta, grano, degradado, papel de stencil, marco fino y piel en gris. Sin texto, con zona libre para Canva.",
      "3 fondos para publicaciones y carruseles de texto (1080×1350).",
      "6 plantillas de historia en español y en inglés: Agenda abierta · Cupos de la semana · Cómo agendar · Antes / después · Reseña · Pregunta del día.",
      "Checklist semanal imprimible y calendario de contenido de 4 semanas.",
    ],
    go: { to: "recursos", label: "Ver y descargar el kit" },
    notes:
      "Enseñar dos o tres vistas previas, no todas. Decirle que el zip tiene todo y que la página se la mandamos después de la reunión para que lo descargue con calma. Las plantillas están pensadas para las cinco historias del día.",
  },
  {
    n: 15,
    kind: "thanks",
    title: "Fue un gusto acompañarte.",
    sub: "Si en algún momento quieres retomar, aquí estamos.",
    points: ["hello@marketinkagency.com", "@marketinkagency", "marketinkagency.com"],
    notes:
      "Cerrar sin pitch. Una sola frase: «la puerta queda abierta». Agradecer, preguntar si quiere que le mandemos el enlace de esta página por DM o por correo, y terminar. No alargar.",
  },
];

/* ── Biblioteca de mensajes ────────────────────────────────────────
   Lo que va entre [corchetes] se resalta como campo a cambiar. */

export type Msg = { label: string; es: string; en: string };
export type MsgGroup = { id: string; title: string; hint?: string; items: Msg[] };

export const messages: MsgGroup[] = [
  {
    id: "primero",
    title: "Primer mensaje",
    hint: "Guárdalo como respuesta automática de bienvenida y como respuesta rápida.",
    items: [
      {
        label: "Bienvenida",
        es: "¡Hola! Gracias por escribir 🙌 Para pasarte precio y fechas mándame: 1) foto o idea, 2) zona del cuerpo, 3) tamaño aproximado. 📍 Salt Lake City, con cita.",
        en: "Hey! Thanks for reaching out 🙌 To send you price + dates, send me: 1) a pic or idea, 2) placement, 3) approx size. 📍 Salt Lake City, by appointment.",
      },
    ],
  },
  {
    id: "precio",
    title: "Precio con cierre",
    hint: "Precio, dos fechas y depósito en el mismo mensaje. Nunca «déjame saber».",
    items: [
      {
        label: "Precio + 2 fechas + depósito",
        es: "Tu [pieza] sale en $[precio] en [1] sesión de [5] h. Tengo el [día A] o el [día B]. ¿Cuál te sirve? Se aparta con $[depósito] y se descuenta del total.",
        en: "Your [piece] comes to $[price] in [1] session of about [5] hours. I have [day A] or [day B] open. Which one works for you? A $[deposit] deposit holds it and comes off the total.",
      },
    ],
  },
  {
    id: "dinero",
    title: "«No tengo dinero ahora»",
    hint: "Tres salidas en un solo mensaje, y cierre con pregunta.",
    items: [
      {
        label: "Tres opciones",
        es: "Te entiendo 🙏 Tenemos 3 opciones: una versión más pequeña desde $[X], hacerlo por sesiones o apartar hoy tu fecha de [enero] con $[depósito]. ¿Cuál te sirve más?",
        en: "Totally get it 🙏 We've got 3 options: a smaller version from $[X], splitting it into sessions, or locking in your [January] date today with a $[deposit] deposit. Which one works best for you?",
      },
    ],
  },
  {
    id: "seguimiento",
    title: "Seguimiento",
    hint: "Día 1, día 3 (con foto de una pieza parecida) y día 7. Si no contesta al tercero, se deja.",
    items: [
      {
        label: "Día 1",
        es: "¿Pudiste ver lo de tu [pieza]? Te tengo el [fecha] libre.",
        en: "Did you get a chance to look at your [piece]? I've still got [date] open for you.",
      },
      {
        label: "Día 3 · con foto",
        es: "Te dejo una pieza parecida que hice 👇 ¿Le damos el [A] o el [B]?",
        en: "Here's a similar piece I did 👇 Should we go with [A] or [B]?",
      },
      {
        label: "Día 7",
        es: "Me quedan [2] cupos en [mes]. Si quieres uno, con $[depósito] te lo aparto.",
        en: "I've got [2] spots left in [month]. If you want one, a $[deposit] deposit holds it for you.",
      },
    ],
  },
  {
    id: "confirmacion",
    title: "Confirmación de cita y recordatorios",
    hint: "La confirmación se manda al recibir el depósito. Los recordatorios, a las 48 h y a las 2 h.",
    items: [
      {
        label: "Confirmación",
        es: "¡Listo, quedó apartado! 🖤\n📅 [día], [fecha] a las [hora]\n📍 [dirección], Salt Lake City\nAntes de la sesión: duerme bien, come algo, hidrátate y evita alcohol 24 h antes. Trae ropa cómoda que deje libre la zona.\nSi necesitas mover la cita, avísame con 48 h y paso el depósito a la nueva fecha.",
        en: "You're all set! 🖤\n📅 [day], [date] at [time]\n📍 [address], Salt Lake City\nBefore the session: sleep well, eat something, stay hydrated and skip alcohol for 24 hours. Wear comfy clothes that leave the area free.\nIf you need to reschedule, give me 48 hours and I'll move the deposit to the new date.",
      },
      {
        label: "Recordatorio · 48 h",
        es: "Hola [nombre], te recuerdo tu cita el [día] a las [hora] en [dirección]. Si necesitas mover la fecha, hoy es el último día para hacerlo sin perder el depósito. ¡Nos vemos! 🖤",
        en: "Hi [name], just a reminder: your appointment is [day] at [time] at [address]. If you need to reschedule, today is the last day to do it without losing the deposit. See you soon! 🖤",
      },
      {
        label: "Recordatorio · 2 h",
        es: "Nos vemos en 2 horas 🙌 [dirección]. Come algo antes y trae ropa cómoda. Cualquier cosa, escríbeme.",
        en: "See you in 2 hours 🙌 [address]. Eat something before and wear comfy clothes. Text me if anything comes up.",
      },
    ],
  },
];

/* ── Recursos descargables ─────────────────────────────────────────
   Los archivos viven en /public/recursos/andy/ y los genera
   scripts/recursos-andy.mjs. Esta lista es lo que la página enseña. */

export type Recurso = { file: string; title: string; size: string; note?: string };
export type RecursoGroup = { id: string; title: string; sub: string; items: Recurso[] };

const R = "/recursos/andy";

export const recursos: RecursoGroup[] = [
  {
    id: "fondos-historias",
    title: "Fondos para historias · 1080×1920",
    sub: "Sin texto. La zona central queda libre para escribir en Canva.",
    items: [
      { file: `${R}/fondo-historia-01-humo-de-tinta.png`, title: "Humo de tinta", size: "1080×1920" },
      { file: `${R}/fondo-historia-02-grano.png`, title: "Grano de película", size: "1080×1920" },
      { file: `${R}/fondo-historia-03-degradado.png`, title: "Degradado negro", size: "1080×1920" },
      { file: `${R}/fondo-historia-04-stencil.png`, title: "Papel de stencil", size: "1080×1920" },
      { file: `${R}/fondo-historia-05-marco.png`, title: "Marco de línea fina", size: "1080×1920" },
      { file: `${R}/fondo-historia-06-piel.png`, title: "Piel en gris", size: "1080×1920" },
    ],
  },
  {
    id: "fondos-posts",
    title: "Fondos para publicaciones y carruseles · 1080×1350",
    sub: "Para carruseles de texto: precios, cómo agendar, preguntas frecuentes.",
    items: [
      { file: `${R}/fondo-post-01-tinta.png`, title: "Tinta", size: "1080×1350" },
      { file: `${R}/fondo-post-02-grano.png`, title: "Grano", size: "1080×1350" },
      { file: `${R}/fondo-post-03-marco.png`, title: "Marco", size: "1080×1350" },
    ],
  },
  {
    id: "plantillas",
    title: "Plantillas de historia · 1080×1920 · ES y EN",
    sub: "Con el título puesto y el espacio vacío para tu foto o tu texto. Una por cada historia de la rutina.",
    items: [
      { file: `${R}/plantilla-es-01-agenda-abierta.png`, title: "Agenda abierta", size: "ES" },
      { file: `${R}/plantilla-en-01-books-open.png`, title: "Books open", size: "EN" },
      { file: `${R}/plantilla-es-02-cupos.png`, title: "Cupos de la semana", size: "ES" },
      { file: `${R}/plantilla-en-02-spots.png`, title: "Spots this week", size: "EN" },
      { file: `${R}/plantilla-es-03-como-agendar.png`, title: "Cómo agendar", size: "ES" },
      { file: `${R}/plantilla-en-03-how-to-book.png`, title: "How to book", size: "EN" },
      { file: `${R}/plantilla-es-04-antes-despues.png`, title: "Antes / después", size: "ES" },
      { file: `${R}/plantilla-en-04-before-after.png`, title: "Before / after", size: "EN" },
      { file: `${R}/plantilla-es-05-resena.png`, title: "Reseña de cliente", size: "ES" },
      { file: `${R}/plantilla-en-05-review.png`, title: "Client review", size: "EN" },
      { file: `${R}/plantilla-es-06-pregunta.png`, title: "Pregunta del día", size: "ES" },
      { file: `${R}/plantilla-en-06-question.png`, title: "Question of the day", size: "EN" },
    ],
  },
  {
    id: "imprimibles",
    title: "Imprimibles",
    sub: "El checklist de cada lunes y el calendario de las próximas cuatro semanas.",
    items: [
      { file: `${R}/checklist-semanal.pdf`, title: "Checklist semanal (PDF)", size: "A4", note: "También en PNG" },
      { file: `${R}/checklist-semanal.png`, title: "Checklist semanal (PNG)", size: "A4" },
      { file: `${R}/calendario-4-semanas.pdf`, title: "Calendario de contenido · 4 semanas (PDF)", size: "A4 apaisado", note: "También en PNG" },
      { file: `${R}/calendario-4-semanas.png`, title: "Calendario de contenido · 4 semanas (PNG)", size: "A4 apaisado" },
    ],
  },
];

export const zipFile = `${R}/andy-kit-marketink.zip`;
