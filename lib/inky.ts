import type { Lang } from "@/lib/copy";

/**
 * INKY — la landing del asistente de IA (/es/inky, /en/inky)
 *
 * INKY es un producto aparte: el backend vive en inky.marketink.app (otro
 * repo, otro proyecto de Vercel). Esta web solo lo presenta y enlaza:
 * no hay formularios, ni login, ni nada que escriba en ningún sitio.
 *
 * REGLAS
 *
 * · Solo se promete lo que INKY hace: responder al instante, calificar,
 *   cotizar con los datos del negocio, pedir el depósito con sus QR de pago,
 *   agendar en Google Calendar y dejarse pausar por conversación.
 * · Ninguna cifra de resultados. Los únicos números son los precios (dados
 *   por el dueño) y el caso de LVL Tattoo, que se lee de lib/copy.ts para no
 *   duplicar cifras verificadas.
 * · La conversación del hero es un ejemplo y lo dice. No lleva precios.
 */

export const inkyLinks = {
  connect: "https://inky.marketink.app/connect",
  talk: "https://wa.me/13854909918",
  deletion: "https://inky.marketink.app/data-deletion",
  /** Logo de la mascota. Para cambiarlo, se reemplaza este archivo (512×512). */
  logo: "/img/inky/inky.webp",
};

export type ChatMsg = {
  from: "client" | "inky";
  text: string;
  /** Burbujas especiales: el QR de pago y la cita creada. */
  kind?: "qr" | "event";
  note?: string;
};

export type Hat = { id: string; label: string; dm: string; does: string[] };
export type Plan = { id: string; region: string; currency: string; amount: string; per: string };
export type Faq = { q: string; a: string };

type InkyCopy = {
  meta: { title: string; desc: string };
  nav: { how: string; who: string; case: string; pricing: string; faq: string };
  hero: { eyebrow: string; h1: string; h1Last: string; sub: string; cta: string; talk: string; fine: string };
  chat: { label: string; studio: string; status: string; client: string; inky: string; replay: string; msgs: ChatMsg[] };
  how: { tag: string; title: string; steps: { t: string; d: string }[] };
  hats: { tag: string; title: string; sub: string; dmLabel: string; doesLabel: string; items: Hat[] };
  case: { tag: string; seeProfile: string };
  band: string;
  pricing: {
    tag: string;
    title: string;
    sub: string;
    trial: string;
    includesLabel: string;
    includes: string[];
    soon: string;
    plans: Plan[];
  };
  faq: { tag: string; title: string; items: Faq[] };
  close: { tag: string; title: string; body: string };
  footerHome: string;
};

export const inky: Record<Lang, InkyCopy> = {
  es: {
    meta: {
      title: "INKY: asistente de IA para los DM de Instagram · MarketINK",
      desc: "INKY responde los DM de tu negocio al instante, califica, cotiza con tus datos, pide el depósito y agenda en Google Calendar. 7 días gratis.",
    },
    nav: { how: "Cómo funciona", who: "Para quién", case: "Caso real", pricing: "Precios", faq: "Preguntas" },

    hero: {
      eyebrow: "INKY · Asistente de IA para tus DM",
      h1: "Ningún DM se queda en",
      h1Last: "visto",
      sub: "INKY vive en el Instagram de tu negocio, y muy pronto en WhatsApp. Responde los DM al instante, califica, cotiza con tus datos, pide el depósito con tus QR de pago y agenda en tu Google Calendar. Cuando quieras tomar una conversación, lo pausas y respondes tú.",
      cta: "Conectar mi Instagram",
      talk: "Hablar con nosotros",
      fine: "7 días gratis · No compartes tu contraseña",
    },

    chat: {
      label: "Conversación de ejemplo",
      studio: "Ink & Iron Studio",
      status: "INKY respondiendo",
      client: "Cliente",
      inky: "INKY",
      replay: "Ver otra vez",
      msgs: [
        { from: "client", text: "hola! cuánto sale un fine line pequeño en el antebrazo?" },
        { from: "inky", text: "¡Hola! ¿Tienes alguna referencia? ¿Y más o menos de qué tamaño lo quieres?" },
        { from: "client", text: "una golondrina, como de 8\u00a0cm" },
        {
          from: "inky",
          text: "Linda pieza. Entra en la tarifa de pieza pequeña del estudio, en una sola sesión. ¿Te sirve el jueves a las 3:00\u00a0p.\u00a0m. o el sábado a las 11:00\u00a0a.\u00a0m.?",
        },
        { from: "client", text: "el jueves!" },
        { from: "inky", kind: "qr", text: "Para apartarlo se pide un depósito. Te dejo el QR de pago:", note: "QR de pago del estudio" },
        { from: "client", text: "listo, ya pagué" },
        { from: "inky", kind: "event", text: "¡Gracias! Quedaste agendado el jueves a las 3:00\u00a0p.\u00a0m.", note: "Jueves · 3:00\u00a0p.\u00a0m. · Google Calendar" },
      ],
    },

    how: {
      tag: "Cómo funciona",
      title: "Tres pasos para que ningún DM espere",
      steps: [
        {
          t: "Conecta tu Instagram",
          d: "Te conectas con un inicio de sesión seguro (OAuth). INKY nunca ve tu contraseña.",
        },
        {
          t: "INKY aprende tu negocio",
          d: "Le das lo que sabría un buen recepcionista: servicios, precios, horarios, cómo cobras el depósito y tus QR de pago. Con eso cotiza con tus datos, no con números inventados.",
        },
        {
          t: "INKY responde y agenda",
          d: "Contesta al instante, califica, cotiza, pide el depósito y agenda en tu Google Calendar. Si una conversación te interesa, la pausas y respondes tú.",
        },
      ],
    },

    hats: {
      tag: "Para quién",
      title: "¿Qué sombrero llevas hoy?",
      sub: "INKY nació en el estudio de tatuajes, pero sirve a cualquier negocio que vive de los DM y de la agenda. Elige el tuyo.",
      dmLabel: "Te escriben",
      doesLabel: "INKY",
      items: [
        {
          id: "tattoo",
          label: "Tatuadores",
          dm: "¿Cuánto me cobras por algo en la costilla? Tengo la referencia.",
          does: [
            "Pide la referencia, el tamaño y la zona antes de hablar de precio.",
            "Cotiza con tu tarifa, no con un número al azar.",
            "Cobra el depósito con tu QR antes de apartar la fecha.",
          ],
        },
        {
          id: "barber",
          label: "Barberías",
          dm: "¿Tienes turno hoy para corte y barba?",
          does: [
            "Mira qué horarios ya están ocupados en tu Google Calendar.",
            "Ofrece los huecos libres del día.",
            "Agenda el turno sin que sueltes la máquina.",
          ],
        },
        {
          id: "beauty",
          label: "Estética",
          dm: "¿Cuánto cuesta la limpieza facial y qué días atienden?",
          does: [
            "Responde con tus servicios, precios y horarios.",
            "Pide el depósito si tu política lo exige.",
            "Deja la cita en tu calendario.",
          ],
        },
        {
          id: "photo",
          label: "Fotógrafos",
          dm: "¿Tienes libre el sábado 14 para una boda?",
          does: [
            "Revisa si esa fecha ya está ocupada en tu calendario.",
            "Cotiza con tus paquetes.",
            "Pide el anticipo para apartar la fecha.",
          ],
        },
        {
          id: "law",
          label: "Abogados",
          dm: "Me despidieron sin liquidación, ¿me pueden asesorar?",
          does: [
            "Califica el caso antes de que llegue a tu agenda.",
            "Agenda la consulta en tu calendario.",
            "No da asesoría legal: filtra y agenda.",
          ],
        },
        {
          id: "realestate",
          label: "Inmobiliarias",
          dm: "¿Sigue disponible el apartamento de la publicación?",
          does: [
            "Responde con los datos de la propiedad que le diste.",
            "Califica al interesado.",
            "Agenda la visita en tu calendario.",
          ],
        },
      ],
    },

    case: { tag: "Caso real", seeProfile: "Ver su perfil" },

    band: "Tu próximo cliente ya está escribiendo.",

    pricing: {
      tag: "Precios",
      title: "Un precio. Siete días para probarlo.",
      sub: "Pagas por mes. Los primeros 7\u00a0días son gratis.",
      trial: "7 días gratis",
      includesLabel: "Incluye",
      includes: [
        "Respuesta al instante en tus DM de Instagram",
        "Calificación y cotización con los datos de tu negocio",
        "Pedido del depósito con tus QR de pago",
        "Citas en tu Google Calendar",
        "Pausa por conversación para responder tú",
      ],
      soon: "WhatsApp llega pronto.",
      plans: [
        { id: "latam", region: "Latinoamérica", currency: "COP", amount: "299.000", per: "al mes" },
        { id: "us", region: "Estados Unidos y resto del mundo", currency: "US$", amount: "99", per: "al mes" },
      ],
    },

    faq: {
      tag: "Preguntas",
      title: "Lo que nos preguntan antes de conectarlo",
      items: [
        {
          q: "¿Tengo que darle mi contraseña de Instagram?",
          a: "No. Te conectas con un inicio de sesión seguro (OAuth) y INKY nunca ve tu contraseña.",
        },
        {
          q: "¿Puedo responder yo en alguna conversación?",
          a: "Sí. Pausas a INKY en esa conversación y respondes a mano. En las demás sigue atendiendo.",
        },
        {
          q: "¿De dónde saca los precios y los horarios?",
          a: "De los datos de tu negocio que le das al configurarlo. Si conectas Google Calendar, también ve qué horarios están ocupados y crea las citas ahí.",
        },
        {
          q: "¿Cómo cobra el depósito?",
          a: "Manda en la conversación los QR de pago de tu negocio. El cliente te paga a ti.",
        },
        {
          q: "¿Funciona en WhatsApp?",
          a: "Hoy funciona en Instagram. WhatsApp llega pronto.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "COP\u00a0299.000 al mes en Latinoamérica y US$99 al mes en Estados Unidos y el resto del mundo. Los primeros 7\u00a0días son gratis.",
        },
        {
          q: "¿Qué pasa con los datos de mis clientes?",
          a: "INKY los usa solo para responder, calificar y agendar a nombre de tu negocio. El detalle está en la [política de privacidad](/es/legal/privacidad), y la eliminación se pide en [inky.marketink.app/data-deletion](https://inky.marketink.app/data-deletion).",
        },
        {
          q: "¿Sirve para mi tipo de negocio?",
          a: "Si recibes consultas por DM y trabajas con citas, sí: tatuadores, barberías, estética, fotógrafos, abogados e inmobiliarias ya tienen su caso de uso arriba.",
        },
      ],
    },

    close: {
      tag: "Empieza",
      title: "Conéctalo hoy. Los primeros 7\u00a0días van por nuestra cuenta.",
      body: "Conecta tu Instagram y deja que INKY conteste mientras tú trabajas. Si prefieres hablarlo antes, escríbenos por WhatsApp.",
    },
    footerHome: "Inicio",
  },

  en: {
    meta: {
      title: "INKY: AI assistant for Instagram DMs · MarketINK",
      desc: "INKY answers your business's DMs instantly, qualifies, quotes with your own data, asks for the deposit and books in Google Calendar. 7 days free.",
    },
    nav: { how: "How it works", who: "Who it's for", case: "Real case", pricing: "Pricing", faq: "FAQ" },

    hero: {
      eyebrow: "INKY · AI assistant for your DMs",
      h1: "No DM gets left",
      h1Last: "on read",
      sub: "INKY lives in your business's Instagram, and soon in WhatsApp. It answers DMs instantly, qualifies, quotes with your own data, asks for the deposit with your payment QR codes and books in your Google Calendar. When you want to take over a conversation, you pause it and reply yourself.",
      cta: "Connect my Instagram",
      talk: "Talk to us",
      fine: "7 days free · You never share your password",
    },

    chat: {
      label: "Example conversation",
      studio: "Ink & Iron Studio",
      status: "INKY replying",
      client: "Client",
      inky: "INKY",
      replay: "Play again",
      msgs: [
        { from: "client", text: "hey! how much for a small fine line on the forearm?" },
        { from: "inky", text: "Hey! Do you have a reference? And roughly what size are you thinking?" },
        { from: "client", text: "a swallow, about 3\u00a0inches" },
        {
          from: "inky",
          text: "Love it. That falls under the studio's small-piece rate, one session. Does Thursday at 3:00\u00a0PM or Saturday at 11:00\u00a0AM work for you?",
        },
        { from: "client", text: "thursday!" },
        { from: "inky", kind: "qr", text: "A deposit holds the spot. Here's the payment QR:", note: "Studio payment QR" },
        { from: "client", text: "done, just paid" },
        { from: "inky", kind: "event", text: "Thank you! You're booked for Thursday at 3:00\u00a0PM.", note: "Thursday · 3:00\u00a0PM · Google Calendar" },
      ],
    },

    how: {
      tag: "How it works",
      title: "Three steps so no DM waits",
      steps: [
        {
          t: "Connect your Instagram",
          d: "You sign in with secure OAuth. INKY never sees your password.",
        },
        {
          t: "INKY learns your business",
          d: "You give it what a good front desk would know: services, prices, hours, how you take deposits and your payment QR codes. That's how it quotes with your data, not made-up numbers.",
        },
        {
          t: "INKY replies and books",
          d: "It answers instantly, qualifies, quotes, asks for the deposit and books in your Google Calendar. If a conversation needs you, pause it and reply yourself.",
        },
      ],
    },

    hats: {
      tag: "Who it's for",
      title: "Which hat are you wearing today?",
      sub: "INKY was born in the tattoo studio, but it works for any business that lives on DMs and appointments. Pick yours.",
      dmLabel: "They write",
      doesLabel: "INKY",
      items: [
        {
          id: "tattoo",
          label: "Tattoo artists",
          dm: "How much for a rib piece? I've got the reference.",
          does: [
            "Asks for the reference, size and placement before talking price.",
            "Quotes with your rate, not a random number.",
            "Takes the deposit with your QR before holding the date.",
          ],
        },
        {
          id: "barber",
          label: "Barbershops",
          dm: "Got a slot today for a cut and beard?",
          does: [
            "Checks which times are already busy in your Google Calendar.",
            "Offers the open slots for the day.",
            "Books it without you putting the clippers down.",
          ],
        },
        {
          id: "beauty",
          label: "Beauty & aesthetics",
          dm: "How much is a facial and which days are you open?",
          does: [
            "Answers with your services, prices and hours.",
            "Asks for the deposit if your policy requires it.",
            "Puts the appointment in your calendar.",
          ],
        },
        {
          id: "photo",
          label: "Photographers",
          dm: "Are you free on Saturday the 14th for a wedding?",
          does: [
            "Checks whether that date is already busy in your calendar.",
            "Quotes with your packages.",
            "Asks for the retainer to hold the date.",
          ],
        },
        {
          id: "law",
          label: "Lawyers",
          dm: "I was fired without severance, can you advise me?",
          does: [
            "Qualifies the case before it reaches your calendar.",
            "Books the consultation in your calendar.",
            "Gives no legal advice: it screens and books.",
          ],
        },
        {
          id: "realestate",
          label: "Real estate",
          dm: "Is the apartment from the post still available?",
          does: [
            "Answers with the property details you gave it.",
            "Qualifies the lead.",
            "Books the showing in your calendar.",
          ],
        },
      ],
    },

    case: { tag: "Real case", seeProfile: "See her profile" },

    band: "Your next client is already typing.",

    pricing: {
      tag: "Pricing",
      title: "One price. Seven days to try it.",
      sub: "Billed monthly. The first 7\u00a0days are free.",
      trial: "7 days free",
      includesLabel: "Includes",
      includes: [
        "Instant replies in your Instagram DMs",
        "Qualifying and quoting with your business's data",
        "Deposit requests with your payment QR codes",
        "Appointments in your Google Calendar",
        "Pause per conversation to reply yourself",
      ],
      soon: "WhatsApp is coming soon.",
      plans: [
        { id: "us", region: "United States and worldwide", currency: "US$", amount: "99", per: "per month" },
        { id: "latam", region: "Latin America", currency: "COP", amount: "299,000", per: "per month" },
      ],
    },

    faq: {
      tag: "FAQ",
      title: "What people ask before connecting it",
      items: [
        {
          q: "Do I have to give it my Instagram password?",
          a: "No. You sign in with secure OAuth and INKY never sees your password.",
        },
        {
          q: "Can I reply myself in a conversation?",
          a: "Yes. Pause INKY in that conversation and reply by hand. It keeps handling the rest.",
        },
        {
          q: "Where do the prices and hours come from?",
          a: "From the business details you give it during setup. If you connect Google Calendar, it also sees which times are busy and creates the appointments there.",
        },
        {
          q: "How does it take the deposit?",
          a: "It sends your business's payment QR codes in the conversation. The client pays you directly.",
        },
        {
          q: "Does it work on WhatsApp?",
          a: "Today it works on Instagram. WhatsApp is coming soon.",
        },
        {
          q: "How much does it cost?",
          a: "US$99 per month in the United States and worldwide, and COP\u00a0299,000 per month in Latin America. The first 7\u00a0days are free.",
        },
        {
          q: "What happens to my clients' data?",
          a: "INKY uses it only to reply, qualify and book on your business's behalf. The details are in the [privacy policy](/en/legal/privacidad), and deletion requests go to [inky.marketink.app/data-deletion](https://inky.marketink.app/data-deletion).",
        },
        {
          q: "Does it work for my kind of business?",
          a: "If you get inquiries by DM and work by appointment, yes: tattoo artists, barbershops, beauty, photographers, lawyers and real estate already have their use case above.",
        },
      ],
    },

    close: {
      tag: "Start",
      title: "Connect it today. The first 7\u00a0days are on us.",
      body: "Connect your Instagram and let INKY answer while you work. If you'd rather talk it through first, message us on WhatsApp.",
    },
    footerHome: "Home",
  },
};
