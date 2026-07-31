export type Lang = "es" | "en";
export const LOCALES: Lang[] = ["es", "en"];
export const isLang = (v: string): v is Lang => LOCALES.includes(v as Lang);

/** Enlaces comerciales. Un solo lugar. */
export const site = {
  /** ⚠️ Reemplazar por el link real de Calendly. */
  call: "https://calendly.com/marketink/growth-call",
  instagram: "https://instagram.com/marketinkagency",
  whatsapp: "https://wa.me/13854909918",
  email: "hello@marketinkagency.com",
};

export const copy = {
  es: {
    meta: {
      title: "MarketINK · Más reservas para tatuadores",
      desc: "Construimos el sistema comercial que convierte tus mensajes de Instagram en citas agendadas. Para tatuadores y estudios, en cualquier país.",
    },
    nav: { problem: "El problema", system: "El sistema", fit: "Para quién", faq: "Preguntas", cta: "Agenda una llamada" },
    hero: {
      eyebrow: "Para tatuadores y estudios",
      h1a: "Tu trabajo es bueno.",
      h1b: "Tu agenda no debería depender de la suerte",
      sub: "Construimos el sistema que convierte tus mensajes en citas reales. Sin depender del algoritmo, sin depender de que te recomienden.",
      cta1: "Agenda una llamada",
      cta2: "Ver cómo funciona",
      note: "15 minutos. Te mostramos el sistema.",
    },
    problem: {
      eyebrow: "La parte que nadie te advierte",
      title: "Publicas. Respondes. Pasas precios.",
      titleEm: "Y la agenda sigue con huecos.",
      body: "Unos te dejan en visto. Otros dicen «lo pienso». Otros nunca agendan. Y mientras tanto la semana avanza con días vacíos que no vuelven.",
      body2: "Eso agota. Y no es por lo que te hiciste tatuador.",
      items: [
        { n: "01", t: "Los mensajes llegan mientras tatúas", d: "Contestas tres horas después, cuando el cliente ya le escribió a otro estudio." },
        { n: "02", t: "Cada conversación empieza de cero", d: "Las mismas preguntas, los mismos precios, cada día. Todo manual, todo con tu tiempo." },
        { n: "03", t: "Nadie hace seguimiento", d: "El que dijo «lo pienso» no vuelve solo. Y tú no tienes cabeza para perseguirlo." },
      ],
    },
    system: {
      eyebrow: "El cambio de enfoque",
      title: "No es tu arte.",
      titleEm: "Es tu sistema de reservas.",
      body: "Tus tatuajes no son el problema — eso ya lo resolviste. El problema es lo que pasa después de que alguien muestra interés: respuestas lentas, sin filtro, sin seguimiento, sin depósito.",
      body2: "Los likes no pagan el arriendo. Los seguidores no llenan la agenda.",
      steps: [
        { n: "01", t: "Atraemos", d: "Campañas que ponen tu trabajo frente a gente que sí busca tatuarse en tu ciudad." },
        { n: "02", t: "Conversamos", d: "Cada mensaje recibe respuesta rápida, con el tono correcto, sin que tengas que estar ahí." },
        { n: "03", t: "Calificamos", d: "Separamos al que va en serio del que está mirando. Idea, tamaño, zona, presupuesto." },
        { n: "04", t: "Agendamos", d: "La conversación termina en una cita concreta, con día y hora, no en un «te escribo»." },
        { n: "05", t: "Seguimos", d: "Al que se enfrió se le vuelve a escribir. Ahí está la mitad de las reservas que hoy pierdes." },
        { n: "06", t: "Medimos", d: "Sabes cuántos mensajes entraron, cuántos calificaron y cuántos se sentaron en la silla." },
      ],
    },
    fit: {
      eyebrow: "Un filtro honesto",
      title: "Esto funciona para algunos artistas.",
      titleEm: "No para todos.",
      sub: "Preferimos decírtelo antes que hacerte perder una llamada.",
      yesTitle: "Encajas si:",
      yes: [
        "Ya tatúas seguido, pero todavía tienes días vacíos",
        "Tu trabajo es sólido y lo sabes",
        "Estás cansado de los vistos y los «lo pienso»",
        "Quieres un flujo predecible, no perseguir clientes",
        "Puedes invertir en publicidad y tratar esto como un negocio",
        "Quieres un sistema que siga andando mientras tatúas",
      ],
      noTitle: "No encajas si:",
      no: [
        "Estás empezando y aún no tienes portafolio sólido",
        "No publicas seguido y no te interesa cambiarlo",
        "Esperas resultados inmediatos sin paciencia",
        "Buscas volverte viral en vez de llenar la agenda",
        "No puedes o no quieres invertir en publicidad",
        "No respondes mensajes o desapareces cuando te escriben",
      ],
    },
    proof: {
      eyebrow: "Palabras de una artista",
      quote:
        "Antes teníamos atención pero no consistencia. Los mensajes eran manuales, el seguimiento era un desorden y las reservas dependían demasiado del momento. Cuando el sistema quedó instalado, todo se aclaró: mejores conversaciones, clientes que llegan más preparados y reservas más predecibles.",
      name: "Vanessa",
      role: "LVL Tattoo · @lvltattoo_",
      outcome: "Menos vistos. Mejores conversaciones.",
    },
    how: {
      eyebrow: "Cómo empezamos",
      title: "Sin complicaciones.",
      steps: [
        { n: "01", t: "Agendas una llamada", d: "15 minutos. Nos cuentas cómo está tu agenda hoy." },
        { n: "02", t: "Revisamos tu situación", d: "Tu perfil, tu ciudad, tu proceso de reserva actual." },
        { n: "03", t: "Te decimos si encajas", d: "Si vemos que sí, diseñamos el sistema. Si no, te lo decimos de frente." },
      ],
    },
    faq: {
      eyebrow: "Preguntas",
      title: "Respuestas cortas. Sin promesas vagas.",
      items: [
        { q: "¿Qué hacen exactamente?", a: "Construimos y gestionamos tu estrategia de publicidad enfocada en mensajes de Instagram, e implementamos un sistema de calificación de esos mensajes: guiones, estructura de seguimiento y un flujo de reserva diseñado para mover a la gente de interesada a agendada." },
        { q: "¿Hay compromiso mínimo?", a: "Sí. Trabajamos con un mínimo de 3 meses porque el sistema necesita tiempo para recoger datos y estabilizarse. Si buscas un experimento de un mes, no somos el socio indicado." },
        { q: "Ya hice publicidad y no funcionó.", a: "La mayoría de las campañas fallan porque no hay claridad en la oferta, ni calificación de los mensajes, ni seguimiento, ni un flujo de conversión. La publicidad es solo la puerta de entrada. La diferencia real está en lo que pasa después del primer mensaje." },
        { q: "¿Y si mi Instagram es pequeño?", a: "No hay problema. Las reservas no vienen de los seguidores, vienen de un sistema. Lo que sí necesitas es un portafolio sólido y publicar tu trabajo con constancia. Si tu perfil se ve vacío o inactivo, la publicidad no va a convertir." },
        { q: "¿Ustedes crean mi contenido?", a: "No. Damos dirección creativa y te decimos qué publicar, cuándo y qué funciona, pero el contenido lo pones tú. Si no tienes contenido, constancia ni disciplina, no vamos a encajar." },
        { q: "¿Cuánto necesito invertir en publicidad?", a: "Depende de tu ciudad y de tu competencia, pero esto solo funciona si puedes invertir. Con un presupuesto muy bajo el algoritmo no consigue datos suficientes para optimizar. En la llamada te damos un rango realista según tu ubicación y tu estilo." },
        { q: "¿En cuánto tiempo veo resultados?", a: "La mayoría siente movimiento temprano, en forma de más conversaciones. La estabilidad toma más tiempo. En la mayoría de los casos la consistencia empieza alrededor del cuarto mes, cuando el sistema ya tiene datos suficientes." },
        { q: "¿Garantizan reservas?", a: "No. Nadie serio puede garantizar reservas sin controlar tu calidad de trabajo, tu tiempo de respuesta, tus precios, tu disponibilidad y tu mercado. Lo que sí garantizamos es un sistema real y repetible: campañas que abren conversaciones y un proceso diseñado para calificarlas y convertirlas." },
      ],
    },
    final: {
      title: "No necesitas más información.",
      titleEm: "Necesitas movimiento.",
      sub: "Ya sabes cuál es el problema: el esfuerzo solo no llena agendas.",
      cta: "Hablemos. Vemos si encajas.",
      note: "Sin presión. Si no encajas, te lo decimos.",
    },
    footer: { tagline: "Más reservas para tatuadores.", follow: "Síguenos", rights: "Todos los derechos reservados." },
  },

  en: {
    meta: {
      title: "MarketINK · More bookings for tattoo artists",
      desc: "We build the booking system that turns your Instagram messages into booked sessions. For tattoo artists and studios, anywhere.",
    },
    nav: { problem: "The problem", system: "The system", fit: "Who it's for", faq: "FAQ", cta: "Book a call" },
    hero: {
      eyebrow: "For tattoo artists and studios",
      h1a: "Your work is good.",
      h1b: "Your calendar shouldn't depend on luck",
      sub: "We build the system that turns your messages into booked sessions. Without depending on the algorithm, without waiting to be recommended.",
      cta1: "Book a call",
      cta2: "See how it works",
      note: "15 minutes. We'll show you the system.",
    },
    problem: {
      eyebrow: "The part nobody warns you about",
      title: "You post. You reply. You send prices.",
      titleEm: "And the calendar still has gaps.",
      body: "Some leave you on read. Some say they'll think about it. Some never book. Meanwhile the week goes by with empty days that don't come back.",
      body2: "That's exhausting. And it's not why you became a tattoo artist.",
      items: [
        { n: "01", t: "Messages land while you're tattooing", d: "You answer three hours later, when they've already messaged another studio." },
        { n: "02", t: "Every conversation starts from zero", d: "Same questions, same prices, every day. All manual, all on your time." },
        { n: "03", t: "Nobody follows up", d: "The one who said \"let me think\" doesn't come back on their own. And you don't have the bandwidth to chase them." },
      ],
    },
    system: {
      eyebrow: "The shift",
      title: "It's not your art.",
      titleEm: "It's your booking system.",
      body: "Your tattoos aren't the problem — you already solved that. The problem is what happens after someone shows interest: slow replies, no filter, no follow-up, no deposit.",
      body2: "Likes don't pay rent. Followers don't fill calendars.",
      steps: [
        { n: "01", t: "Attract", d: "Campaigns that put your work in front of people actually looking to get tattooed in your city." },
        { n: "02", t: "Engage", d: "Every message gets a fast reply in the right tone, without you having to be there." },
        { n: "03", t: "Qualify", d: "We separate the serious from the browsing. Idea, size, placement, budget." },
        { n: "04", t: "Book", d: "The conversation ends in a real appointment with a day and a time, not an \"I'll text you\"." },
        { n: "05", t: "Follow up", d: "The ones who went cold get written to again. That's half the bookings you're losing today." },
        { n: "06", t: "Measure", d: "You know how many messages came in, how many qualified, and how many sat in the chair." },
      ],
    },
    fit: {
      eyebrow: "An honest filter",
      title: "This works for some artists.",
      titleEm: "Not for everyone.",
      sub: "We'd rather tell you now than waste a call.",
      yesTitle: "You're a fit if:",
      yes: [
        "You tattoo consistently but still have empty days",
        "Your work is solid and you know it",
        "You're tired of ghosts and \"let me think about it\"",
        "You want a predictable flow, not chasing clients",
        "You can invest in ads and treat this like a business",
        "You want a system that keeps running while you tattoo",
      ],
      noTitle: "You're not a fit if:",
      no: [
        "You're starting out and don't have a solid portfolio yet",
        "You don't post consistently and don't want to change that",
        "You expect instant results without patience",
        "You want to go viral instead of filling your calendar",
        "You can't or won't invest in advertising",
        "You don't answer messages or disappear when people reply",
      ],
    },
    proof: {
      eyebrow: "From an artist",
      quote:
        "Before working together we were getting attention but not consistency. DMs were manual, follow-ups were messy, and bookings depended too much on timing. Once the system was installed everything got clearer: better conversations, clients who show up more prepared, and bookings that feel predictable.",
      name: "Vanessa",
      role: "LVL Tattoo · @lvltattoo_",
      outcome: "Fewer ghosts. Better conversations.",
    },
    how: {
      eyebrow: "How we start",
      title: "No complications.",
      steps: [
        { n: "01", t: "You book a call", d: "15 minutes. You tell us how your calendar looks today." },
        { n: "02", t: "We review your situation", d: "Your profile, your city, your current booking process." },
        { n: "03", t: "We tell you if you're a fit", d: "If you are, we design the system. If not, we say so straight." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Short answers. No vague promises.",
      items: [
        { q: "What exactly do you do?", a: "We build and manage your paid ads strategy focused on Instagram DMs, and we implement a DM qualification system: scripts, follow-up structure, and a booking flow designed to move people from interested to booked." },
        { q: "Is there a minimum commitment?", a: "Yes. We work on a minimum 3-month commitment because the system needs time to gather data and stabilize. If you want a one-month experiment, we're not the right partner." },
        { q: "I already ran ads and they didn't work.", a: "Most ads fail because there's no offer clarity, no DM qualification, weak follow-ups, and no conversion flow. Ads are only the entry point. The real difference is what happens after the DM starts." },
        { q: "What if my Instagram is small?", a: "That's fine. Bookings don't come from followers, they come from a system. What you do need is a solid portfolio and consistent posting. If your page looks empty or inactive, ads won't convert." },
        { q: "Do you create content for me?", a: "No. We guide creative direction and tell you exactly what to post, when, and what works — but you provide the content. If you have no content, no consistency, or no discipline, we won't be a fit." },
        { q: "What ad budget do I need?", a: "It depends on your city and competition, but this only works if you can invest. On a tiny budget the algorithm won't get enough data to optimize. On the call we'll recommend a realistic monthly range based on your location and style." },
        { q: "How fast will I see results?", a: "Most artists feel movement early, in the form of more conversations. Stability takes time. In most cases consistency starts around month four, once the system has enough data." },
        { q: "Do you guarantee bookings?", a: "No. Nobody serious can guarantee bookings without controlling your work quality, your responsiveness, your pricing, your availability and your market. What we do guarantee is a real, repeatable system: ads that start conversations and a process designed to qualify and convert them." },
      ],
    },
    final: {
      title: "You don't need more information.",
      titleEm: "You need momentum.",
      sub: "You already know the problem: effort alone doesn't fill calendars.",
      cta: "Let's talk. We'll see if you're a fit.",
      note: "No pressure. If it's not a fit, we'll tell you.",
    },
    footer: { tagline: "More bookings for tattoo artists.", follow: "Follow us", rights: "All rights reserved." },
  },
};

export type Copy = (typeof copy)["es"];
