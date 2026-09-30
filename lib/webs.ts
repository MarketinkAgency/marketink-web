import type { Lang } from "@/lib/copy";
import { site } from "@/lib/copy";

/**
 * SITIOS PARA TATUADORES — la oferta
 *
 * Por qué esto vive aquí y no dentro de copy.ts: es un producto, no una
 * sección de la portada. Los precios cambian, los paquetes se renombran
 * y algún día habrá un cuarto. Teniéndolo aparte se toca una sola cosa
 * y no se arriesga la página que ya está vendiendo.
 *
 * LA TESIS, Y NO ES DE ESTILO
 *
 * Hemos entregado auditorías de perfiles una por una —Wilford, Christian,
 * Xime, Nathy— y siempre falta lo mismo: no hay precio, no hay depósito,
 * no hay forma de reservar. La auditoría diagnostica que falta el
 * mostrador. Este producto es el mostrador.
 *
 * DOS LISTAS POR PAQUETE, Y LA SEGUNDA ES LA QUE VENDE
 *
 * `items` es el inventario: lo que entra en la caja. Sirve para comparar
 * los tres de un vistazo y para que nadie se sienta engañado después.
 * Pero una lista de características no convence a nadie: «formulario de
 * solicitud» no le dice nada a quien no ha sufrido el problema.
 *
 * `ventajas` es la consecuencia: qué cambia en su semana. Cada una dice
 * qué se lleva y, sobre todo, qué deja de pasarle. Eso es lo que se lee
 * cuando alguien está decidiendo si gastarse mil dólares, y por eso vive
 * en su propia sección con su propio botón.
 *
 * REGLA DURA
 *
 * Aquí no se promete ningún número: ni citas, ni conversión, ni
 * ingresos. Se promete lo que se entrega y nada más. Es la misma regla
 * de las auditorías, y es lo que nos deja mirar a la cara al que paga.
 */

export type Ventaja = {
  /** Qué se lleva, en pocas palabras. */
  t: string;
  /** Qué cambia por llevárselo. Nunca una cifra. */
  d: string;
};

export type Paquete = {
  id: string;
  /** El nombre corto, en inglés: palabras que los tatuadores ya dicen. */
  name: string;
  /** Para quién es, en una línea. */
  who: string;
  /** Entrada, una sola vez. */
  price: string;
  /** Mantenimiento mensual. */
  monthly: string;
  /** El inventario, para comparar los tres. */
  items: string[];
  /** El argumento, para decidirse. */
  ventajas: Ventaja[];
  /** El paquete que queremos vender lleva marca. */
  best?: boolean;
  /** Nota al pie del paquete, cuando hace falta. */
  note?: string;
  /** El enlace de pago. Si está vacío, el botón lleva a la llamada. */
  url: string;
};

/* Los enlaces de pago salen de variables de entorno por la misma razón
   que el de lib/plan.ts: se cambian desde Vercel en cuarenta segundos y
   se pueden apagar sin tocar código. Mientras no existan, el botón lleva
   a la llamada, que es mejor que un botón roto. */
const link = (v: string | undefined) => {
  const raw = (v ?? "").trim();
  return /^https:\/\//.test(raw) ? raw : site.call;
};

const URLS = {
  showcase: link(process.env.NEXT_PUBLIC_WEB_SHOWCASE_URL),
  booked: link(process.env.NEXT_PUBLIC_WEB_BOOKED_URL),
  shop: link(process.env.NEXT_PUBLIC_WEB_SHOP_URL),
};

export const webs = {
  es: {
    meta: {
      title: "Webs para tatuadores · con agenda y depósito | MarketINK",
      desc: "Tu Instagram enseña lo que sabes hacer. Tu web cobra. Sitios para tatuadores con precios publicados, agenda y cobro de depósito. En línea en 5 días.",
    },
    nav: "Webs",

    hero: {
      eyebrow: "Sitios para tatuadores",
      title: "Tu Instagram enseña lo que sabes hacer. Tu web cobra.",
      sub: "Un sitio que dice cuánto cuestas, te aparta la fecha y te cobra el depósito antes de que la persona se enfríe. En línea en cinco días, sin que tú dejes de tatuar.",
      cta: "Ver los paquetes",
      alt: "Hablar 15 minutos",
    },

    /* 01 — el problema, dicho con lo que ya comprobamos perfil por perfil */
    problema: {
      tag: "El problema",
      title: "Auditamos perfiles uno por uno. Siempre falta lo mismo.",
      sub: "Esto no es una teoría de agencia. Es lo que encontramos entrando a las cuentas, mirando las destacadas y contando las publicaciones fijadas.",
      items: [
        { k: "No hay precio", d: "Ni una cifra, ni un rango, ni un «desde». El que no puede preguntar, no pregunta: se va al perfil del que sí lo dice." },
        { k: "No hay depósito", d: "Sin depósito, una cita es una intención. Y las intenciones no se presentan el sábado a las diez." },
        { k: "No hay por dónde entrar", d: "La bio dice una cosa, el reel fijado dice otra y el último post dice una tercera. Tres puertas para la misma casa." },
        { k: "No se sabe cuándo contestas", d: "Para el que escribió y espera, tu silencio y un «no me interesa» se ven exactamente igual." },
      ],
      cierre: "Tu perfil es la vitrina. Lo que falta es el mostrador.",
    },

    /* 02 — los paquetes */
    planes: {
      tag: "Los paquetes",
      title: "Tres formas de montarlo. Un solo pago y un mantenimiento.",
      sub: "El precio es el mismo en cualquier país. La entrada se paga una vez; el mantenimiento mantiene el sitio vivo, actualizado y midiendo.",
      unico: "una vez",
      luego: "y luego solo",
      mes: "al mes",
      incluye: "Qué se lleva",
      cta: "Empezar",
      ver: "Ver ventajas",
      best: "El que más se llevan",
    },

    /* 03 — las ventajas, que es donde se decide */
    ventajasSec: {
      tag: "Las ventajas",
      title: "Qué cambia en tu semana, paquete por paquete.",
      sub: "Arriba está lo que entra en la caja. Aquí está para qué sirve cada cosa — y qué deja de pasarte cuando la tienes.",
      desde: "Desde",
      luego: "y luego",
      cta: "Empezar con",
    },

    paquetes: [
      {
        id: "showcase",
        name: "SHOWCASE",
        who: "Para el artista que hoy solo tiene Instagram.",
        price: "$590",
        monthly: "$59",
        url: URLS.showcase,
        items: [
          "Tu rango de precios publicado",
          "Tu política de depósito, escrita y clara",
          "Formulario que califica: zona, tamaño, estilo, referencia y fechas",
          "Botón de WhatsApp con el mensaje ya redactado",
          "Portafolio ordenado por estilo",
          "Preguntas frecuentes: cuidados, retoques, cancelaciones",
          "Mapa, horarios y cómo llegar",
          "Tu dominio, hosting y certificado",
          "Base de SEO local y ficha de Google",
          "En línea en 5 días hábiles",
        ],
        ventajas: [
          { t: "Tu precio, publicado",
            d: "Un rango visible filtra al que no te va a pagar antes de gastarte una conversación, y tranquiliza al que sí puede y no se atrevía a preguntar. Hoy los dos hacen lo mismo: nada." },
          { t: "El depósito, explicado antes de que lo pidas",
            d: "Cuánto es y que se descuenta del total. Mucha gente cree que el depósito es un cargo extra encima del precio; decirlo por escrito mata esa objeción antes de que nazca." },
          { t: "Un formulario que pregunta lo que tú preguntarías",
            d: "Zona, tamaño, estilo, referencia y fechas. Dejas de escribir «mándame más info» quince veces al día: la conversación te llega empezada por el paso tres." },
          { t: "Un solo botón, con el mensaje ya escrito",
            d: "El que entra no tiene que redactar nada ni decidir por dónde escribirte. Esa fricción de diez segundos es la que separa al que te escribe del que se queda mirando." },
          { t: "Tu trabajo, ordenado por estilo",
            d: "El que quiere blackwork ve blackwork, no lo último que subiste. En la cuadrícula de Instagram eso no se puede hacer; aquí es lo primero que ve." },
          { t: "Las respuestas que das diez veces por semana, escritas una",
            d: "Cuidados, retoques, cancelaciones, si duele, cuánto tarda en curar. Cada pregunta que la web contesta es un mensaje que no tienes que contestar tú." },
          { t: "Tu dominio, a tu nombre",
            d: "tunombre.com, tuyo desde el primer día y el día que te vayas. No un perfil prestado en una plataforma que puede cambiar las reglas mañana." },
          { t: "Que te encuentren buscando, no solo desplazándose",
            d: "Ficha de Google, datos estructurados y tu ciudad donde toca. Tu Instagram no sale cuando alguien busca «tatuador en tu ciudad». Una web sí puede." },
          { t: "Cinco días, no tres meses",
            d: "Nos mandas fotos y precios el lunes y el viernes está en línea. Sin reuniones de seguimiento y sin que tú dejes la máquina." },
        ],
      },
      {
        id: "booked",
        name: "BOOKED",
        who: "Para el que quiere dejar de perseguir a la gente por mensaje.",
        price: "$1.099",
        monthly: "$99",
        best: true,
        url: URLS.booked,
        items: [
          "Todo lo de SHOWCASE",
          "Calendario con tu disponibilidad real",
          "Cobro del depósito en línea — la cita queda apartada y pagada",
          "Recordatorios automáticos antes de la sesión",
          "Aviso a tu teléfono en el momento en que entra una solicitud",
          "Una página por estilo, para que te encuentren por lo que tatúas",
          "3 cambios al mes incluidos",
        ],
        ventajas: [
          { t: "Todo lo de SHOWCASE, y encima esto",
            d: "El precio, el depósito explicado, el portafolio y el dominio siguen ahí. Lo que cambia es que a partir de aquí la web deja de informar y empieza a cobrar." },
          { t: "Tu agenda abierta sin que tú la abras",
            d: "La persona ve tus huecos reales y elige uno. Se acaba el «¿qué días tienes?» contestado treinta veces por semana, y se acaba la cita que se cae porque tardaste dos días en responder." },
          { t: "El depósito cobrado en el momento, no prometido",
            d: "La fecha no queda apartada hasta que está pagada. Esa es toda la diferencia entre una agenda llena y una agenda llena de gente que igual aparece." },
          { t: "Recordatorios que salen solos",
            d: "Casi nadie falta por decidirlo: falta porque se le olvidó. Un recordatorio automático recupera esas horas sin que tú escribas un mensaje." },
          { t: "Te avisa apenas entra alguien",
            d: "Cada solicitud te llega al teléfono en el momento. Contestar en cinco minutos deja de depender de que te acuerdes de mirar entre sesión y sesión." },
          { t: "Una página por cada estilo que tatúas",
            d: "Google no manda gente a «un tatuador»: la manda a «blackwork en tu ciudad». Una página por estilo es lo que te pone dentro de esa búsqueda en vez de fuera." },
          { t: "Tres cambios al mes, sin presupuestos",
            d: "Subes precio, cierras dos semanas, añades las piezas nuevas. Lo pides y se hace. Una web que no se puede cambiar deja de ser verdad en dos meses." },
        ],
        note: "¿Ya tienes SHOWCASE? Subes pagando la diferencia y se te enciende la agenda.",
      },
      {
        id: "shop",
        name: "THE SHOP",
        who: "Para estudios con varios artistas bajo el mismo techo.",
        price: "$1.799",
        monthly: "$179",
        url: URLS.shop,
        items: [
          "Todo lo de BOOKED, hasta 3 artistas",
          "Una página y una agenda por artista",
          "Panel del estudio con todas las solicitudes en un sitio",
          "Reparto de depósitos por artista",
          "6 cambios al mes incluidos",
        ],
        ventajas: [
          { t: "Todo lo de BOOKED, para cada artista",
            d: "Cada uno con su agenda, su depósito y sus avisos. No es un sitio del estudio con una lista de nombres: son tres mostradores funcionando a la vez." },
          { t: "Cada artista, encontrable por su nombre",
            d: "El cliente reserva con quien quiere, no con «el estudio». Y cada artista aparece por su propio estilo, que es como la gente busca de verdad." },
          { t: "Todas las solicitudes en un solo tablero",
            d: "Quién pidió qué, con quién y si pagó. Se acaba el estudio que vive repartido en cinco teléfonos y nadie sabe qué prometió el otro." },
          { t: "Los depósitos, repartidos solos",
            d: "Cada depósito queda asignado a quien va a tatuar. Deja de ser una cuenta a mano a fin de mes y una discusión incómoda cada tanto." },
          { t: "Seis cambios al mes",
            d: "Un estudio se mueve el doble: entra gente, sale gente, cambian precios y turnos. El doble de cambios incluidos porque hace falta el doble." },
          { t: "Crece sin rehacer nada",
            d: "Artista nuevo: su página y su agenda por $390 y $39 al mes. No hay que volver a montar el sitio ni renegociar el paquete." },
        ],
        note: "Artista adicional: $390 de entrada y $39 al mes.",
      },
    ] as Paquete[],

    /* 04 — cómo funciona */
    pasos: {
      tag: "Cómo funciona",
      title: "Cuatro pasos y cinco días.",
      items: [
        { k: "Hablamos 15 minutos", d: "Qué tatúas, dónde, cuánto cobras y cómo te gusta trabajar. Salimos de ahí con el plan del sitio." },
        { k: "Nos mandas lo tuyo", d: "Fotos de tus piezas, tus precios y tus reglas. Si no tienes los textos, los escribimos nosotros sobre lo que nos cuentes." },
        { k: "Lo montamos", d: "Cinco días hábiles. Te lo enseñamos entero antes de publicar nada y ajustamos lo que quieras." },
        { k: "Sale en vivo", d: "Conectamos tu dominio, dejamos la agenda andando y te enseñamos a cambiar precios y fechas tú mismo." },
      ],
    },

    /* 05 — el mantenimiento, que es donde se pierde o se gana la renovación */
    manten: {
      tag: "El mantenimiento",
      title: "No estás pagando hosting.",
      sub: "El hosting cuesta unos dólares y lo sabemos los dos. Lo que pagas es que el sitio siga vivo, siga diciendo la verdad y te diga qué está pasando.",
      items: [
        "Precios y disponibilidad actualizados cuando cambien",
        "Cambios incluidos cada mes",
        "Respaldos y monitoreo: si se cae, lo sabemos nosotros antes que tú",
        "Dominio y certificado renovados",
        "Actualizaciones de seguridad y de la plataforma",
        "Un reporte cada mes: cuántas personas pidieron cita y cuántas pagaron depósito",
      ],
      cierre: "Ese último punto es el importante. Sin él no sabes si la web trabaja; con él, lo sabes cada treinta días.",
    },

    faq: {
      tag: "Preguntas",
      title: "Lo que todo el mundo pregunta antes de decir que sí.",
      items: [
        { q: "¿El dominio es mío?", a: "Sí, y lo compras tú a tu nombre. Nosotros lo conectamos y lo administramos. No queremos tener tu dominio: el día que te vayas, te vas con todo y sin pedirle permiso a nadie. Si prefieres que lo compremos nosotros, lo hacemos y te lo transferimos al entregar." },
        { q: "¿Y si ya tengo una web?", a: "Mejor. La miramos en la llamada y te decimos con franqueza si vale la pena rehacerla o si con arreglarle el precio, el depósito y la agenda ya cumple. Si no hace falta cambiarla, te lo decimos y no te vendemos nada." },
        { q: "¿Qué pasa si dejo de pagar el mantenimiento?", a: "El sitio se apaga. Lo decimos aquí y no en la letra pequeña. Puedes pedirnos el contenido exportado, o pagar una vez por migrarlo a tu propio hosting y quedártelo." },
        { q: "¿Se puede empezar por el más pequeño y subir?", a: "Sí. Pagas la diferencia entre los dos paquetes y se te enciende la agenda con el cobro del depósito. No se cobra otra vez la entrada." },
        { q: "¿Cobran comisión por cada cita?", a: "No. Ni por cita, ni por depósito, ni por cliente que te llegue. La entrada y el mantenimiento es todo lo que nos pagas; lo que te procese el banco es aparte y va directo a ti." },
        { q: "¿Sirve si no tengo muchos seguidores?", a: "Los seguidores llenan el perfil, no la agenda. Hemos medido cuentas con menos de dos mil seguidores y más de cien mil reproducciones al mes: gente mirando hay, lo que falta es dónde poner el dedo cuando deciden." },
        { q: "¿Y si no me gusta cómo queda?", a: "Lo ves entero antes de que se publique y lo ajustamos. Solo sale en vivo cuando tú digas que sí." },
        { q: "¿Puedo pagarlo en partes?", a: "Sí, en tres cuotas, sin recargo. Pregúntalo en la llamada y te mandamos ese enlace en vez del normal." },
      ],
    },

    cierre: {
      tag: "Empezar",
      title: "Tu trabajo ya convence. Que tu web sepa cobrarlo.",
      body: "Si quieres verlo antes de decidir, hablamos quince minutos y te decimos qué paquete te sirve — o si ninguno te sirve, que también pasa.",
      cta: "Hablar 15 minutos",
    },
  },

  en: {
    meta: {
      title: "Websites for tattoo artists · booking and deposits | MarketINK",
      desc: "Your Instagram shows what you can do. Your website gets paid. Sites for tattoo artists with published prices, booking and deposit collection. Live in 5 days.",
    },
    nav: "Websites",

    hero: {
      eyebrow: "Sites for tattoo artists",
      title: "Your Instagram shows what you can do. Your website gets paid.",
      sub: "A site that says what you charge, holds the date and takes the deposit before the person cools off. Live in five days, without you putting the machine down.",
      cta: "See the packages",
      alt: "Talk for 15 minutes",
    },

    problema: {
      tag: "The problem",
      title: "We audit profiles one by one. It's always the same thing missing.",
      sub: "This isn't agency theory. It's what we find going into the accounts, opening the highlights and counting the pinned posts.",
      items: [
        { k: "No price anywhere", d: "Not a figure, not a range, not a «starting at». People who have to ask usually don't: they go to the artist who says it." },
        { k: "No deposit", d: "Without a deposit, an appointment is an intention. And intentions don't show up on Saturday at ten." },
        { k: "No way in", d: "The bio says one thing, the pinned reel says another, the last post says a third. Three doors to the same house." },
        { k: "No response time", d: "To someone who wrote and is waiting, your silence and a «not interested» look exactly the same." },
      ],
      cierre: "Your profile is the window. What's missing is the counter.",
    },

    planes: {
      tag: "The packages",
      title: "Three ways to set it up. One payment and one monthly.",
      sub: "Same price in every country. The setup is paid once; the monthly keeps the site alive, current and measured.",
      unico: "once",
      luego: "then just",
      mes: "a month",
      incluye: "What you get",
      cta: "Start",
      ver: "See the upside",
      best: "Most artists take this one",
    },

    ventajasSec: {
      tag: "The upside",
      title: "What changes in your week, package by package.",
      sub: "Above is what's in the box. Here's what each piece is for — and what stops happening to you once you have it.",
      desde: "From",
      luego: "then",
      cta: "Start with",
    },

    paquetes: [
      {
        id: "showcase",
        name: "SHOWCASE",
        who: "For the artist who today only has Instagram.",
        price: "$590",
        monthly: "$59",
        url: URLS.showcase,
        items: [
          "Your price range, published",
          "Your deposit policy, written and clear",
          "A form that qualifies: placement, size, style, reference and dates",
          "WhatsApp button with the message already written",
          "Portfolio sorted by style",
          "FAQ: aftercare, touch-ups, cancellations",
          "Map, hours and how to get there",
          "Your domain, hosting and certificate",
          "Local SEO base and Google Business listing",
          "Live in 5 business days",
        ],
        ventajas: [
          { t: "Your price, published",
            d: "A visible range filters out the people who were never going to pay you before they cost you a conversation, and reassures the ones who can but didn't dare ask. Right now both of them do the same thing: nothing." },
          { t: "The deposit, explained before you ask for it",
            d: "How much it is and that it comes off the total. Plenty of people think a deposit is an extra charge on top; saying it in writing kills that objection before it exists." },
          { t: "A form that asks what you'd ask",
            d: "Placement, size, style, reference and dates. You stop typing «send me more info» fifteen times a day: the conversation reaches you already at step three." },
          { t: "One button, with the message already written",
            d: "Whoever lands there doesn't have to compose anything or decide which channel to use. That ten seconds of friction is what separates the person who writes from the person who just looks." },
          { t: "Your work, sorted by style",
            d: "Someone who wants blackwork sees blackwork, not whatever you posted last. You can't do that in an Instagram grid; here it's the first thing they see." },
          { t: "The answers you give ten times a week, written once",
            d: "Aftercare, touch-ups, cancellations, does it hurt, how long it takes to heal. Every question the site answers is a message you don't have to answer yourself." },
          { t: "Your domain, in your name",
            d: "yourname.com, yours from day one and on the day you leave. Not a borrowed profile on a platform that can change the rules tomorrow." },
          { t: "Found by searching, not only by scrolling",
            d: "Google listing, structured data and your city where it belongs. Your Instagram doesn't come up when someone searches «tattoo artist in your city». A website can." },
          { t: "Five days, not three months",
            d: "You send photos and prices on Monday and it's live on Friday. No status meetings and no putting the machine down." },
        ],
      },
      {
        id: "booked",
        name: "BOOKED",
        who: "For anyone done chasing people through DMs.",
        price: "$1,099",
        monthly: "$99",
        best: true,
        url: URLS.booked,
        items: [
          "Everything in SHOWCASE",
          "Calendar with your real availability",
          "Deposit collected online — the date is held and paid",
          "Automatic reminders before the session",
          "Your phone buzzes the moment a request comes in",
          "A page per style, so people find you by what you tattoo",
          "3 changes a month included",
        ],
        ventajas: [
          { t: "Everything in SHOWCASE, plus this",
            d: "The price, the explained deposit, the portfolio and the domain are all still there. What changes is that from here the site stops informing and starts collecting." },
          { t: "Your calendar open without you opening it",
            d: "People see your real gaps and pick one. No more «what days do you have?» answered thirty times a week, and no more appointment lost because you took two days to reply." },
          { t: "The deposit taken then and there, not promised",
            d: "The date isn't held until it's paid. That's the whole difference between a full calendar and a calendar full of people who might show up." },
          { t: "Reminders that send themselves",
            d: "Almost nobody no-shows on purpose: they forget. An automatic reminder wins those hours back without you writing a single message." },
          { t: "It pings you the second someone asks",
            d: "Every request hits your phone as it arrives. Replying in five minutes stops depending on you remembering to check between sessions." },
          { t: "A page for every style you tattoo",
            d: "Google doesn't send people to «a tattoo artist»: it sends them to «blackwork in your city». A page per style is what puts you inside that search instead of outside it." },
          { t: "Three changes a month, no quotes",
            d: "Raise a price, close two weeks, add the new pieces. You ask and it's done. A site you can't change stops being true within two months." },
        ],
        note: "Already on SHOWCASE? Pay the difference and the booking turns on.",
      },
      {
        id: "shop",
        name: "THE SHOP",
        who: "For studios with several artists under one roof.",
        price: "$1,799",
        monthly: "$179",
        url: URLS.shop,
        items: [
          "Everything in BOOKED, up to 3 artists",
          "A page and a calendar per artist",
          "Studio dashboard with every request in one place",
          "Deposits split per artist",
          "6 changes a month included",
        ],
        ventajas: [
          { t: "Everything in BOOKED, for each artist",
            d: "Each one with their own calendar, deposit and alerts. It isn't a studio site with a list of names: it's three counters running at once." },
          { t: "Each artist findable by their own name",
            d: "Clients book with the person they want, not with «the studio». And each artist shows up for their own style, which is how people actually search." },
          { t: "Every request on one board",
            d: "Who asked for what, with whom, and whether they paid. No more studio living across five phones with nobody knowing what the others promised." },
          { t: "Deposits split on their own",
            d: "Every deposit lands assigned to whoever is doing the work. It stops being a hand-written tally at month end and an awkward conversation now and then." },
          { t: "Six changes a month",
            d: "A studio moves twice as much: people join, people leave, prices and shifts change. Twice the changes included because you need twice as many." },
          { t: "Grows without rebuilding anything",
            d: "New artist: their page and their calendar for $390 and $39 a month. No rebuilding the site and no renegotiating the package." },
        ],
        note: "Additional artist: $390 setup and $39 a month.",
      },
    ] as Paquete[],

    pasos: {
      tag: "How it works",
      title: "Four steps and five days.",
      items: [
        { k: "We talk for 15 minutes", d: "What you tattoo, where, what you charge and how you like to work. We leave that call with the plan for your site." },
        { k: "You send us your stuff", d: "Photos of your pieces, your prices and your rules. If you don't have the copy, we write it from what you tell us." },
        { k: "We build it", d: "Five business days. You see the whole thing before anything is published and we adjust whatever you want." },
        { k: "It goes live", d: "We connect your domain, leave the booking running and show you how to change prices and dates yourself." },
      ],
    },

    manten: {
      tag: "The monthly",
      title: "You're not paying for hosting.",
      sub: "Hosting costs a few dollars and we both know it. What you're paying for is that the site stays alive, keeps telling the truth, and tells you what's happening.",
      items: [
        "Prices and availability updated when they change",
        "Changes included every month",
        "Backups and monitoring: if it goes down, we know before you do",
        "Domain and certificate renewed",
        "Security and platform updates",
        "A report every month: how many people requested an appointment and how many paid a deposit",
      ],
      cierre: "That last one is the point. Without it you can't tell whether the site works; with it, you know every thirty days.",
    },

    faq: {
      tag: "Questions",
      title: "What everyone asks before saying yes.",
      items: [
        { q: "Is the domain mine?", a: "Yes, and you buy it in your own name. We connect and manage it. We don't want to hold your domain: the day you leave, you leave with everything and without asking anyone. If you'd rather we buy it, we do and transfer it to you at delivery." },
        { q: "What if I already have a website?", a: "Even better. We look at it on the call and tell you straight whether it's worth rebuilding or whether fixing the price, the deposit and the booking is enough. If it doesn't need replacing, we say so and sell you nothing." },
        { q: "What happens if I stop paying the monthly?", a: "The site goes dark. We say it here, not in the fine print. You can ask us to export the content, or pay once to migrate it to your own hosting and keep it." },
        { q: "Can I start small and move up?", a: "Yes. You pay the difference between the two packages and booking with deposits turns on. The setup isn't charged twice." },
        { q: "Do you take a cut of each appointment?", a: "No. Not per appointment, per deposit or per client. The setup and the monthly is everything you pay us; whatever your processor charges is separate and goes straight to you." },
        { q: "Does this work if I don't have many followers?", a: "Followers fill the profile, not the calendar. We've measured accounts with under two thousand followers and over a hundred thousand plays a month: the eyes are there, what's missing is where to tap when they decide." },
        { q: "What if I don't like how it turns out?", a: "You see the whole thing before it's published and we adjust it. It only goes live when you say so." },
        { q: "Can I pay in installments?", a: "Yes, three payments, no surcharge. Ask on the call and we'll send you that link instead of the normal one." },
      ],
    },

    cierre: {
      tag: "Start",
      title: "Your work already convinces. Make your site collect on it.",
      body: "If you'd rather see it before deciding, we talk for fifteen minutes and tell you which package fits — or that none of them does, which happens too.",
      cta: "Talk for 15 minutes",
    },
  },
} as const satisfies Record<Lang, unknown>;
