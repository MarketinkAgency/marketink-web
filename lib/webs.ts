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
 * Por eso la página no se escribe como «te hacemos una web bonita».
 * Ningún tatuador se despierta queriendo una página. Se despierta
 * queriendo que le escriban y que aparezcan el sábado.
 *
 * REGLA DURA
 *
 * Aquí no se promete ningún número: ni citas, ni conversión, ni
 * ingresos. Se promete lo que se entrega —un sitio que publica precios,
 * cobra el depósito y avisa— y nada más. Es la misma regla de las
 * auditorías, y es lo que nos deja mirar a la cara al que paga.
 */

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
  /** Lo que se lleva. El orden importa: primero lo que cobra. */
  items: string[];
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
      mes: "al mes",
      incluye: "Qué se lleva",
      cta: "Empezar",
      ctaAlt: "Preguntar primero",
      best: "El que más se llevan",
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
        note: "Artista adicional: $390 de entrada y $39 al mes.",
      },
    ] as Paquete[],

    /* 03 — cómo funciona */
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

    /* 04 — el mantenimiento, que es donde se pierde o se gana la renovación */
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
      mes: "a month",
      incluye: "What you get",
      cta: "Start",
      ctaAlt: "Ask first",
      best: "Most artists take this one",
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
