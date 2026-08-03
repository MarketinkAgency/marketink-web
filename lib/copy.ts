export type Lang = "es" | "en";
export const LOCALES: Lang[] = ["es", "en"];
export const isLang = (v: string): v is Lang => LOCALES.includes(v as Lang);

/** Enlaces comerciales y vídeos. Un solo lugar. */
export const site = {
  call: "https://calendly.com/rocadigital/30min",
  instagram: "https://instagram.com/marketinkagency",
  whatsapp: "https://wa.me/13854909918",
  email: "hello@marketinkagency.com",
  /** Vacío = el bloque muestra «en producción» en vez de romperse. */
  video: { es: "", en: "" } as Record<Lang, string>,
  poster: { es: "/img/estudio.webp", en: "/img/estudio.webp" } as Record<Lang, string>,
};

export const copy = {
  es: {
    meta: {
      title: "MarketINK · Sistema de reservas para tatuadores",
      desc: "Convertimos consultas de Instagram en consultas agendadas y depósitos. Adquisición, calificación y seguimiento creados exclusivamente para tatuadores y estudios.",
    },
    nav: { system: "El sistema", results: "Resultados", process: "90 días", faq: "Preguntas", cta: "Auditoría gratis" },

    hero: {
      eyebrow: "Reservas para tatuadores y estudios",
      dmStatus: "Respondido en 2 minutos",
      h1a: "Tu trabajo ya genera interés.",
      h1b: "Nosotros lo convertimos en consultas agendadas y depósitos",
      sub: "MarketINK combina campañas pagadas, calificación de consultas por Instagram, seguimientos rápidos y flujos de reserva para ayudar a tatuadores serios a construir una agenda más predecible.",
      support: "Nuestros artistas pasan de recibir consultas inconsistentes a tener su agenda reservada hasta con 90 días de anticipación.",
      cta1: "Solicita tu auditoría de 15 minutos",
      cta2: "Conoce el sistema",
      note: "Para tatuadores y estudios consolidados que quieren convertir más conversaciones en reservas reales.",
    },

    metrics: {
      label: "Campaña de 60 días · cifras reales redondeadas",
      items: [
        { n: "130+", t: "consultas generadas" },
        { n: "65+", t: "proyectos calificados" },
        { n: "30+", t: "consultas agendadas" },
        { n: "18", t: "depósitos confirmados" },
        { n: "~$14.400", t: "valor estimado reservado" },
        { n: "≈8×", t: "sobre la inversión publicitaria" },
      ],
      disclaimer: "Resultados de un artista real, redondeados. Varían según ciudad, estilo, precios, portafolio y disponibilidad.",
    },

    video: {
      eyebrow: "En 90 segundos",
      title: "Mira cómo las consultas se convierten en sesiones reservadas.",
      sub: "Descubre cómo MarketINK convierte la atención pagada en proyectos calificados, consultas agendadas y depósitos.",
      cta: "Quiero construir mi sistema de reservas",
      soon: "Video en producción",
    },

    problem: {
      eyebrow: "El diagnóstico",
      title: "Puede que no tengas un problema de consultas.",
      titleEm: "Puede que tengas un problema de conversión.",
      items: [
        { n: "01", t: "Respuestas lentas", d: "Las consultas llegan mientras estás tatuando, diseñando o durmiendo. Cuando respondes, el cliente posiblemente ya está hablando con otros tres artistas. La primera respuesta bien calificada normalmente gana la consulta." },
        { n: "02", t: "Conversaciones que solo hablan de precio", d: "«¿Cuánto cuesta?» no te dice casi nada. Sin conocer el estilo, la zona, el tamaño, las referencias, la ciudad, el presupuesto y la fecha, no estás teniendo una conversación de reserva. Solamente estás respondiendo precios." },
        { n: "03", t: "Cero seguimiento", d: "Hasta la mitad de las reservas que pierdes hoy podrían estar dentro de conversaciones que simplemente se enfriaron. Preguntaron. Respondiste. Nadie hizo seguimiento. Otro tatuador recibió el depósito." },
        { n: "04", t: "Demanda inconsistente", d: "Las recomendaciones y el alcance orgánico pueden traer buenos clientes. Pero no te dan control. No puedes construir una agenda predecible dependiendo de la suerte." },
      ],
      swipe: "Desliza →",
      close: "Tu arte no es el problema.",
      closeEm: "El problema es la infraestructura que falta entre el interés y el depósito.",
    },

    work: { eyebrow: "El trabajo", title: "Esto no es lo que falla.", sub: "Trabajo real de artistas con los que trabajamos. Publicado con su permiso." },

    system: {
      eyebrow: "El método",
      title: "El Sistema de Reservas",
      titleEm: "para Tatuadores",
      sub: "Construido alrededor de la manera real en que los clientes descubren, comparan, consultan y reservan tatuajes.",
      note: "Esto no es marketing genérico adaptado a tatuadores. Es un sistema de reservas construido alrededor de cómo se decide un tatuaje.",
      steps: [
        { n: "01", t: "Atraemos demanda real", d: "Mostramos tus mejores tatuajes a personas interesadas en tu estilo, tu ciudad y tu tipo de proyecto." },
        { n: "02", t: "Abrimos conversaciones calificadas", d: "La campaña está diseñada para iniciar conversaciones, no para acumular likes o clics vacíos." },
        { n: "03", t: "Calificamos el proyecto", d: "Identificamos la idea, el estilo, la zona, el tamaño, las referencias, la ubicación, el presupuesto y la fecha." },
        { n: "04", t: "Agendamos la consulta", d: "Los proyectos calificados avanzan al siguiente paso: consulta, confirmación de disponibilidad o depósito." },
        { n: "05", t: "Seguimos hasta la decisión", d: "Porque un «ahora no» no siempre significa «no». Algunas de tus reservas de mayor valor llegan por seguimiento estructurado." },
      ],
    },

    includes: {
      eyebrow: "Qué incluye",
      title: "Todo lo necesario para convertir interés en reservas.",
      groups: [
        { k: "Atraer", items: ["Análisis del mercado local", "Revisión de competencia", "Auditoría de portafolio", "Posicionamiento de la oferta", "Estrategia de campañas", "Montaje de campañas", "Dirección creativa", "Pruebas de público", "Optimización publicitaria"] },
        { k: "Convertir", items: ["Flujos de consulta por Instagram", "Calificación del proyecto", "Guiones de respuesta", "Secuencias de seguimiento", "Flujo de agendamiento", "Conversación de depósito", "Manejo de objeciones", "Reactivación de consultas frías"] },
        { k: "Escalar", items: ["Pipeline de reservas", "Panel de rendimiento", "Costo por consulta", "Proyectos calificados", "Consultas agendadas", "Depósitos", "Optimización mensual", "Acompañamiento estratégico"] },
      ],
    },

    trust: {
      label: "Trabajamos con",
      points: ["Tatuadores reales, no marcas genéricas", "Campañas gestionadas en varios países", "Reservas que empiezan en Instagram", "Reportes claros, sin métricas escondidas"],
      seeAll: "Ver su perfil",
    },
    cases: {
      eyebrow: "Casos reales",
      title: "Dos artistas. Dos puntos de partida distintos.",
      sub: "Publicados con su autorización. Puedes entrar a sus perfiles y comprobarlo tú mismo.",
      note: "Resultados de clientes reales, redondeados. No son típicos ni garantizados: dependen de tu ciudad, estilo, precios, portafolio y disponibilidad.",
      inLabel: "En",
      movesLabel: "Qué se instaló",
      items: [
        {
          k: "lvl", name: "Vanessa", studio: "LVL Tattoo", city: "Salt Lake City", handle: "@lvltattoo_",
          url: "https://www.instagram.com/lvltattoo_/",
          img: "/img/casos/lvl-feed.webp", avatar: "/img/casos/lvl-avatar.webp",
          span: "1 año trabajando juntos",
          big: "2–3", unit: "meses", tail: "de agenda reservada por adelantado",
          before: "Una agenda que dependía del mes, del algoritmo y de las recomendaciones.",
          after: "Hoy reserva con dos y tres meses de anticipación.",
          moves: ["Contenido y feed reconstruidos", "Campañas pagadas activas", "Calificación de consultas por DM", "Seguimiento hasta el depósito"],
          figures: [
            { k: "Consultas generadas", v: "130+" },
            { k: "Consultas agendadas", v: "30+" },
            { k: "Depósitos confirmados", v: "18" },
            { k: "Valor estimado reservado", v: "~$14.400" },
          ],
          figNote: "Cifras de una campaña de 60 días dentro de ese año.",
        },
        {
          k: "mth", name: "KAM", studio: "Made to Heal", city: "Salt Lake City", handle: "@madetohealtattoos",
          url: "https://www.instagram.com/madetohealtattoos/",
          img: "/img/casos/mth-feed.webp", avatar: "/img/casos/mth-avatar.webp",
          span: "60 días",
          big: "5 → 25+", unit: "reservas/mes", tail: "de forma constante",
          before: "Cinco reservas al mes. Buen trabajo, sin sistema detrás.",
          after: "Más de veinticinco al mes de forma constante, y walk-ins en otras ciudades.",
          moves: ["Perfil consistente", "Cambio de formato de video", "Un video viral", "Flujo de reserva ordenado"],
          figures: [],
          figNote: "",
        },
      ],
    },
    team: {
      eyebrow: "Quién está detrás",
      title: "No es una agencia genérica que también hace tatuadores.",
      sub: "Somos dos personas que vendieron y comercializaron dentro de empresas grandes, y montaron esto porque vieron un sector con muchísimo talento y casi ningún sistema comercial.",
      people: [
        { k: "nick", name: "Nick", role: "Ventas y sistema comercial", cred: "Ex LinkedIn · Ex Meta", img: "/img/equipo/nick.webp" },
        { k: "caro", name: "Caro", role: "Marketing y estrategia", cred: "Ex Sephora · Ex Meta", img: "/img/equipo/caro.webp" },
      ],
    },
    caseStudy: {
      eyebrow: "Caso real",
      title: "De mensajes inconsistentes a una agenda reservada con 90 días de anticipación.",
      sub: "Campaña de 60 días con un artista consolidado. Cifras reales redondeadas.",
      figures: [
        { k: "Inversión publicitaria", v: "~$1.800" },
        { k: "Valor estimado reservado", v: "~$14.400" },
        { k: "Retorno en valor reservado", v: "≈8×" },
      ],
      beforeTitle: "Antes",
      before: ["Respuestas lentas", "Sin seguimiento", "Días vacíos entre semana", "Gente preguntando solo el precio", "Sin medición", "Dependencia de recomendaciones"],
      afterTitle: "Después",
      after: ["Consultas calificadas", "Respuestas más rápidas", "Seguimiento estructurado", "Más consultas agendadas", "Más depósitos", "Visibilidad del pipeline", "Agenda reservada con semanas de anticipación"],
      disclaimer: "Resultados de un artista real, redondeados. No son típicos ni garantizados: dependen de tu ciudad, estilo, precios, portafolio y disponibilidad.",
    },

    calc: {
      eyebrow: "Haz la cuenta",
      title: "¿Cuánto te está costando una consulta sin responder?",
      sub: "Mueve tus propios números.",
      valueLabel: "Valor promedio de un tatuaje",
      missedLabel: "Consultas calificadas que pierdes al mes",
      monthLabel: "Podrías estar dejando escapar al mes",
      yearLabel: "Al año",
      kicker: "No necesitas perder 100 consultas para perder mucho dinero.",
      kickerEm: "Solo necesitas perder algunas de las correctas.",
      note: "Escenario ilustrativo con tus propios números. No es una proyección de resultados.",
      cta: "Solicita tu auditoría",
    },

    fit: {
      eyebrow: "Para quién",
      title: "Creado para tatuadores listos para crecer.",
      yesTitle: "Ideal para",
      yes: ["Tatuadores consolidados", "Estudios de tatuajes", "Artistas con portafolio sólido", "Artistas que quieren mejores proyectos", "Artistas con capacidad para más reservas", "Artistas dispuestos a invertir en publicidad", "Estudios con varios artistas", "Guest artists que llegan a nuevas ciudades"],
      noTitle: "No es para",
      no: ["Artistas sin portafolio vigente", "Artistas sin disponibilidad en agenda", "Quien busca exposición gratis", "Quien espera resultados garantizados de un día para otro", "Quien no quiere seguir un proceso"],
    },

    process: {
      eyebrow: "Tus primeros 90 días",
      title: "Las grandes agendas no se construyen de la noche a la mañana.",
      sub: "La meta no es tener un buen mes por suerte. Es un sistema que genere conversaciones calificadas mes tras mes.",
      phases: [
        { d: "Días 1–15", t: "Fundación", items: ["Revisión del portafolio", "Análisis de mercado", "Posicionamiento de la oferta", "Montaje de medición", "Preparación de campañas"] },
        { d: "Días 15–30", t: "Lanzamiento", items: ["Activación de campañas", "Pruebas de público", "Pruebas de mensaje", "Primeras consultas", "Primeros datos de calificación"] },
        { d: "Días 30–60", t: "Optimización", items: ["Bajar el costo por consulta", "Subir la calidad del lead", "Afinar la calificación", "Reforzar el seguimiento", "Identificar estilos ganadores"] },
        { d: "Días 60–90", t: "Predictibilidad", items: ["Escalar lo que funciona", "Más consultas agendadas", "Mejor conversión a depósito", "Pipeline más claro", "Menos días vacíos"] },
      ],
      close: "El sistema se fortalece con cada consulta seria.",
      closeEm: "Entre más pronto empiece a aprender, más pronto puede empezar a llenarse tu agenda.",
    },

    proof: {
      eyebrow: "Palabras de una artista",
      quote: "Antes teníamos atención pero no consistencia. Los mensajes eran manuales, el seguimiento era un desorden y las reservas dependían demasiado del momento. Cuando el sistema quedó instalado, todo se aclaró: mejores conversaciones, clientes que llegan más preparados y reservas más predecibles.",
      name: "Vanessa",
      role: "LVL Tattoo · @lvltattoo_",
      outcome: "Menos vistos. Mejores conversaciones.",
    },

    faq: {
      eyebrow: "Preguntas",
      title: "Lo que todo tatuador pregunta antes de empezar.",
      items: [
        { q: "¿Qué hace exactamente MarketINK para un tatuador?", a: "Construimos y gestionamos tus campañas pagadas enfocadas en generar consultas por Instagram, e instalamos el sistema que convierte esas consultas en citas: guiones de respuesta, calificación del proyecto, secuencias de seguimiento, flujo de agendamiento y conversación de depósito. La publicidad es la puerta. El sistema es lo que llena la agenda." },
        { q: "¿Qué tan rápido puedo empezar a recibir consultas?", a: "Las primeras suelen aparecer en las primeras semanas después del lanzamiento. Lo que toma tiempo no es generar mensajes: es aprender cuáles de esos mensajes se convierten en depósitos en tu ciudad y con tu estilo." },
        { q: "¿Por qué el sistema requiere aproximadamente 90 días?", a: "Porque un sistema de reservas se construye con datos. Los primeros 30 días lanzamos y probamos qué estilos, públicos y mensajes generan consultas serias. Entre el 30 y el 60 optimizamos calificación, seguimiento y rendimiento. Entre el 60 y el 90 el sistema ya tiene suficiente información para volverse predecible y escalable. No son 90 días de espera: son 90 días de construcción." },
        { q: "¿Pueden ayudarme a reservar con meses de anticipación?", a: "Ese es el objetivo. Una agenda llena con anticipación no sale de conseguir más mensajes, sino de calificar mejor, responder más rápido y hacer seguimiento hasta la decisión. Algunos artistas lo han logrado; depende de tu capacidad, tus precios y tu mercado." },
        { q: "¿Cuánto debería invertir en publicidad?", a: "Depende de tu ciudad y tu competencia. Con un presupuesto muy bajo el algoritmo no consigue datos suficientes para optimizar y el sistema nunca aprende. En la auditoría te damos un rango realista según tu ubicación, tu estilo y tu ticket promedio." },
        { q: "¿La inversión publicitaria está incluida?", a: "No. La pagas tú directamente a la plataforma y es tuya, no nuestra. Nosotros cobramos por construir y operar el sistema. Así ves exactamente a dónde va cada dólar." },
        { q: "¿Ustedes crean mi contenido?", a: "Damos dirección creativa, te decimos qué publicar, cuándo y qué está funcionando según los datos. El material lo pones tú: nadie fotografía tu trabajo mejor que tú. Si no tienes contenido ni constancia, no vamos a encajar." },
        { q: "¿Quién responde los mensajes de Instagram?", a: "Lo definimos contigo. Puede responder tu equipo con nuestros guiones, podemos responder nosotros, o puede apoyarse en automatización para la primera respuesta y el seguimiento. Lo que no cambia es el proceso: calificar, agendar, seguir." },
        { q: "¿El sistema es automatizado?", a: "Parcialmente, y de forma deliberada. La respuesta inmediata y el seguimiento se automatizan porque ahí es donde se pierden las reservas. La conversación que define un tatuaje —idea, zona, tamaño, fecha— sigue siendo humana, porque el cliente nota la diferencia." },
        { q: "¿Puedo aprobar los guiones?", a: "Sí, y queremos que lo hagas. Tienen que sonar a ti, no a una agencia. Se ajustan hasta que los leas y te suenen tuyos." },
        { q: "¿Trabajan con estudios de tatuajes?", a: "Sí. En un estudio el sistema rinde más, porque hay más disponibilidad para absorber consultas y se puede repartir el proyecto entre varios artistas según el estilo." },
        { q: "¿Pueden promocionar a varios artistas?", a: "Sí. Se puede armar por artista, por estilo o por estudio, con la calificación dirigiendo cada consulta al artista correcto." },
        { q: "¿Pueden promocionar guest spots?", a: "Sí, y es donde el sistema más se nota: una ciudad nueva, fechas limitadas y una ventana corta para llenar la agenda. Ahí la velocidad de respuesta y el seguimiento lo son todo." },
        { q: "¿Garantizan reservas?", a: "No. Nadie serio puede garantizar reservas sin controlar tu calidad de trabajo, tu tiempo de respuesta, tus precios, tu disponibilidad y tu mercado. Lo que sí garantizamos es un sistema real y repetible, y visibilidad completa de cada etapa." },
        { q: "¿Qué pasa si mi ciudad es muy competitiva?", a: "Una ciudad competitiva significa que hay demanda. Suele encarecer el costo por consulta, y por eso importa todavía más la calificación y el seguimiento: no se gana pagando más, se gana convirtiendo mejor lo que ya entra." },
      ],
    },

    book: {
      eyebrow: "Agenda ahora",
      title: "Elige tu hora. Sin salir de aquí.",
      sub: "15 minutos, por videollamada. Revisamos tu Instagram, tu ciudad y tu proceso actual de consultas. Si no vemos una oportunidad clara, te lo decimos en la misma llamada.",
      loading: "Cargando el calendario…",
      fallback: "Abrir el calendario",
      intake: "Entrada de {mes}",
      remaining: "cupos disponibles",
      filled: "ocupado",
      open: "libre",
      days: "Cierra en {d} días.",
      closedT: "Entrada de {mes} cerrada",
      closedS: "Escríbenos y entras a la lista de {sig}.",
    },
    final: {
      title: "Tu próximo cliente podría estar ahora mismo dentro de tus mensajes.",
      sub: "La pregunta es si tienes el sistema para calificarlo, hacer seguimiento y recibir el depósito antes de que lo haga otro tatuador.",
      cta: "Solicita tu auditoría de 15 minutos",
      support: "Revisaremos tu Instagram, tu portafolio, tu ciudad, tu proceso actual de consultas y tu potencial de crecimiento. Si encontramos una oportunidad, te mostramos exactamente lo que MarketINK construiría.",
      urgency: "Cada semana sin un sistema de reservas significa más conversaciones enfriándose.",
    },

    sticky: "Auditoría gratis",
    footer: { tagline: "Sistemas de reservas para tatuadores y estudios. Trabajamos con artistas en todo el mundo.", follow: "Síguenos", write: "Escríbenos", where: "Dónde estamos", rights: "Todos los derechos reservados.", legal: "Legal", built: "Roca Digital LLC" },
  },

  // ══════════════════════════════════════════════════════════════
  en: {
    meta: {
      title: "MarketINK · Tattoo booking systems",
      desc: "We turn Instagram inquiries into booked consultations and deposits. Acquisition, qualification and follow-up built exclusively for tattoo artists and studios.",
    },
    nav: { system: "The system", results: "Results", process: "90 days", faq: "FAQ", cta: "Free audit" },

    hero: {
      eyebrow: "Booking systems for tattoo artists and studios",
      dmStatus: "Answered in 2 minutes",
      h1a: "Your tattoo work already creates demand.",
      h1b: "We turn it into booked consultations and deposits",
      sub: "MarketINK combines paid campaigns, Instagram inquiry qualification, fast follow-up and tattoo booking workflows to help serious artists build a more predictable calendar.",
      support: "Our artists go from inconsistent inquiries to calendars booked up to 90 days in advance.",
      cta1: "Request your 15-minute audit",
      cta2: "See the system",
      note: "For established tattoo artists and studios ready to turn more conversations into real bookings.",
    },

    metrics: {
      label: "60-day campaign · real figures, rounded",
      items: [
        { n: "130+", t: "tattoo inquiries generated" },
        { n: "65+", t: "qualified projects" },
        { n: "30+", t: "consultations booked" },
        { n: "18", t: "deposits secured" },
        { n: "~$14,400", t: "estimated booked value" },
        { n: "≈8×", t: "booked value to ad spend" },
      ],
      disclaimer: "Results from one real artist, rounded. They vary by city, style, pricing, portfolio and availability.",
    },

    video: {
      eyebrow: "In 90 seconds",
      title: "See how tattoo inquiries become booked sessions.",
      sub: "Discover how MarketINK turns paid attention into qualified tattoo projects, booked consultations and deposits.",
      cta: "Build my tattoo booking system",
      soon: "Video in production",
    },

    problem: {
      eyebrow: "The diagnosis",
      title: "You may not have a lead problem.",
      titleEm: "You may have a conversion problem.",
      items: [
        { n: "01", t: "Slow replies", d: "Tattoo inquiries arrive while you are tattooing, designing or sleeping. By the time you reply, the client may already be speaking with three other artists. The first qualified response often wins the consultation." },
        { n: "02", t: "Price-only conversations", d: "“How much?” tells you almost nothing. Without knowing the style, placement, size, references, city, budget and preferred date, you are not having a booking conversation. You are simply answering prices." },
        { n: "03", t: "No follow-up", d: "Up to half of the bookings you are losing today may already exist inside conversations that went cold. They asked. You answered. Nobody followed up. Another artist collected the deposit." },
        { n: "04", t: "Inconsistent demand", d: "Referrals and organic reach can bring great clients. But they do not give you control. You cannot build a predictable tattoo calendar around luck." },
      ],
      swipe: "Swipe →",
      close: "Your art is not the problem.",
      closeEm: "The missing infrastructure between interest and deposit is the problem.",
    },

    work: { eyebrow: "The work", title: "This isn't what's broken.", sub: "Real work from artists we work with. Shared with their permission." },

    system: {
      eyebrow: "The method",
      title: "The MarketINK",
      titleEm: "Tattoo Booking System",
      sub: "Built around the real way tattoo clients discover, compare, inquire and book.",
      note: "This is not generic marketing adapted to tattoo artists. It is a booking system built around how tattoo decisions actually get made.",
      steps: [
        { n: "01", t: "Attract real demand", d: "We place your best tattoo work in front of people actively interested in your style, location and type of project." },
        { n: "02", t: "Start qualified conversations", d: "The campaign is designed to start conversations, not to collect likes or empty clicks." },
        { n: "03", t: "Qualify the project", d: "We identify the idea, style, placement, size, references, location, budget and preferred date." },
        { n: "04", t: "Book the consultation", d: "Qualified projects are guided toward the next logical step: consultation, availability confirmation or deposit." },
        { n: "05", t: "Follow up until a decision", d: "Because a “not now” is not always a “no”. Some of your highest-value bookings come from structured follow-up." },
      ],
    },

    includes: {
      eyebrow: "What's included",
      title: "Everything required to turn tattoo attention into bookings.",
      groups: [
        { k: "Attract", items: ["Local tattoo market analysis", "Competitor review", "Portfolio audit", "Offer positioning", "Paid campaign strategy", "Campaign setup", "Creative direction", "Audience testing", "Advertising optimization"] },
        { k: "Convert", items: ["Instagram inquiry flows", "Tattoo project qualification", "Response scripts", "Follow-up sequences", "Consultation booking flow", "Deposit conversation flow", "Objection handling", "Re-engagement of cold inquiries"] },
        { k: "Scale", items: ["Tattoo booking pipeline", "Performance dashboard", "Cost per inquiry", "Qualified projects", "Booked consultations", "Deposits", "Monthly optimization", "Strategic support"] },
      ],
    },

    trust: {
      label: "We work with",
      points: ["Real tattoo artists, not generic brands", "Campaigns managed across countries", "Bookings that start in Instagram DMs", "Clear reporting, no hidden metrics"],
      seeAll: "See their profile",
    },
    cases: {
      eyebrow: "Real cases",
      title: "Two artists. Two very different starting points.",
      sub: "Published with their permission. You can open their profiles and check it yourself.",
      note: "Results from real clients, rounded. Not typical and not guaranteed: outcomes depend on your city, style, pricing, portfolio and availability.",
      inLabel: "In",
      movesLabel: "What we installed",
      items: [
        {
          k: "lvl", name: "Vanessa", studio: "LVL Tattoo", city: "Salt Lake City", handle: "@lvltattoo_",
          url: "https://www.instagram.com/lvltattoo_/",
          img: "/img/casos/lvl-feed.webp", avatar: "/img/casos/lvl-avatar.webp",
          span: "1 year working together",
          big: "2–3", unit: "months", tail: "of calendar booked in advance",
          before: "A calendar that depended on the month, the algorithm and referrals.",
          after: "Now books two to three months out.",
          moves: ["Content and feed rebuilt", "Paid campaigns running", "DM inquiry qualification", "Follow-up through to the deposit"],
          figures: [
            { k: "Inquiries generated", v: "130+" },
            { k: "Consultations booked", v: "30+" },
            { k: "Deposits secured", v: "18" },
            { k: "Estimated booked value", v: "~$14,400" },
          ],
          figNote: "Figures from one 60-day campaign inside that year.",
        },
        {
          k: "mth", name: "KAM", studio: "Made to Heal", city: "Salt Lake City", handle: "@madetohealtattoos",
          url: "https://www.instagram.com/madetohealtattoos/",
          img: "/img/casos/mth-feed.webp", avatar: "/img/casos/mth-avatar.webp",
          span: "60 days",
          big: "5 → 25+", unit: "bookings/mo", tail: "consistently",
          before: "Five bookings a month. Great work, no system behind it.",
          after: "Twenty-five plus a month, consistently, and walk-ins in other cities.",
          moves: ["Consistent profile", "Video format overhaul", "One viral video", "Clean booking flow"],
          figures: [],
          figNote: "",
        },
      ],
    },
    team: {
      eyebrow: "Who's behind it",
      title: "Not a generic agency that also does tattoo artists.",
      sub: "We're two people who sold and marketed inside large companies, and built this because we saw an industry full of talent and almost no commercial system.",
      people: [
        { k: "nick", name: "Nick", role: "Sales and commercial system", cred: "Ex LinkedIn · Ex Meta", img: "/img/equipo/nick.webp" },
        { k: "caro", name: "Caro", role: "Marketing and strategy", cred: "Ex Sephora · Ex Meta", img: "/img/equipo/caro.webp" },
      ],
    },
    caseStudy: {
      eyebrow: "Real case",
      title: "From inconsistent DMs to a calendar booked 90 days ahead.",
      sub: "A 60-day campaign with an established artist. Real figures, rounded.",
      figures: [
        { k: "Advertising investment", v: "~$1,800" },
        { k: "Estimated booked value", v: "~$14,400" },
        { k: "Booked value to ad spend", v: "≈8×" },
      ],
      beforeTitle: "Before",
      before: ["Slow replies", "No follow-up", "Empty weekdays", "Price shoppers", "No tracking", "Dependence on referrals"],
      afterTitle: "After",
      after: ["Qualified inquiries", "Faster responses", "Structured follow-up", "More booked consultations", "More deposits", "Pipeline visibility", "Calendar booked weeks in advance"],
      disclaimer: "Results from one real artist, rounded. Not typical and not guaranteed: outcomes depend on your city, style, pricing, portfolio and availability.",
    },

    calc: {
      eyebrow: "Do the math",
      title: "What is an unanswered inquiry really costing you?",
      sub: "Use your own numbers.",
      valueLabel: "Average tattoo project value",
      missedLabel: "Qualified inquiries missed per month",
      monthLabel: "You could be losing per month",
      yearLabel: "Per year",
      kicker: "You do not need to lose 100 inquiries to lose serious money.",
      kickerEm: "You only need to lose a few of the right ones.",
      note: "An illustrative scenario using your own numbers. Not a projection of results.",
      cta: "Request your audit",
    },

    fit: {
      eyebrow: "Who it's for",
      title: "Built for tattoo artists ready to grow.",
      yesTitle: "Ideal for",
      yes: ["Established tattoo artists", "Tattoo studios", "Artists with a strong portfolio", "Artists who want better projects", "Artists who can handle more bookings", "Artists willing to invest in advertising", "Studios with multiple artists", "Guest artists entering new cities"],
      noTitle: "Not for",
      no: ["Artists without a current portfolio", "Artists without availability", "Anyone looking for free exposure", "Anyone expecting guaranteed overnight results", "Anyone unwilling to follow a process"],
    },

    process: {
      eyebrow: "Your first 90 days",
      title: "Great tattoo calendars are not built overnight.",
      sub: "The goal is not one lucky month. It is a system that keeps generating qualified conversations month after month.",
      phases: [
        { d: "Days 1–15", t: "Foundation", items: ["Portfolio review", "Market analysis", "Offer positioning", "Tracking setup", "Campaign preparation"] },
        { d: "Days 15–30", t: "Launch", items: ["Campaign activation", "Audience testing", "Message testing", "First tattoo inquiries", "Initial qualification data"] },
        { d: "Days 30–60", t: "Optimization", items: ["Improve cost per inquiry", "Improve lead quality", "Refine qualification", "Strengthen follow-up", "Identify winning styles"] },
        { d: "Days 60–90", t: "Predictability", items: ["Scale winning campaigns", "More booked consultations", "Better deposit conversion", "A clearer pipeline", "Fewer empty days"] },
      ],
      close: "The system gets stronger with every serious inquiry.",
      closeEm: "The sooner it starts learning, the sooner your calendar can start filling.",
    },

    proof: {
      eyebrow: "From an artist",
      quote: "Before working together we were getting attention but not consistency. DMs were manual, follow-ups were messy, and bookings depended too much on timing. Once the system was installed everything got clearer: better conversations, clients who show up more prepared, and bookings that feel predictable.",
      name: "Vanessa",
      role: "LVL Tattoo · @lvltattoo_",
      outcome: "Fewer ghosts. Better conversations.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "What every artist asks before starting.",
      items: [
        { q: "What exactly does MarketINK do for tattoo artists?", a: "We build and manage your paid campaigns focused on generating Instagram inquiries, and we install the system that turns those inquiries into appointments: response scripts, project qualification, follow-up sequences, booking flow and deposit conversation. Ads are the door. The system is what fills the calendar." },
        { q: "How quickly can I start receiving inquiries?", a: "First inquiries usually appear within the first weeks after launch. What takes time isn't generating messages — it's learning which of those messages turn into deposits in your city, with your style." },
        { q: "Why does the system require approximately 90 days?", a: "Because a booking system is built with data. The first 30 days we launch and test which styles, audiences and messages generate serious inquiries. Between 30 and 60 we optimize qualification, follow-up and performance. By 60 to 90 the system has enough information to become predictable and scalable. These aren't 90 days of waiting — they're 90 days of building." },
        { q: "Can you help me book several months in advance?", a: "That's the goal. A calendar booked in advance doesn't come from more messages — it comes from qualifying better, replying faster and following up until a decision. Some artists have achieved it; it depends on your capacity, your pricing and your market." },
        { q: "How much should I invest in advertising?", a: "It depends on your city and your competition. On a very small budget the algorithm never gets enough data to optimize and the system never learns. On the audit we give you a realistic range based on your location, style and average ticket." },
        { q: "Is advertising spend included?", a: "No. You pay the platform directly and that spend is yours, not ours. We charge for building and running the system. That way you see exactly where every dollar goes." },
        { q: "Do you create my tattoo content?", a: "We give creative direction, tell you what to post, when, and what's working based on campaign data. You provide the material — nobody photographs your work better than you. If you have no content and no consistency, we won't be a fit." },
        { q: "Who replies to the Instagram messages?", a: "We define it with you. Your team can reply using our scripts, we can reply, or automation can handle the first response and follow-up. What doesn't change is the process: qualify, book, follow up." },
        { q: "Is the system automated?", a: "Partially, and deliberately so. Instant replies and follow-up get automated because that's where bookings are lost. The conversation that defines a tattoo — idea, placement, size, date — stays human, because clients can tell the difference." },
        { q: "Can I approve the scripts?", a: "Yes, and we want you to. They have to sound like you, not like an agency. We adjust them until you read them and they sound like yours." },
        { q: "Can you work with tattoo studios?", a: "Yes. In a studio the system performs better, because there's more availability to absorb inquiries and projects can be routed between artists by style." },
        { q: "Can you promote several artists?", a: "Yes. It can be structured by artist, by style or by studio, with qualification routing each inquiry to the right artist." },
        { q: "Can you promote guest spots?", a: "Yes, and it's where the system shows most: a new city, limited dates and a short window to fill the calendar. There, response speed and follow-up are everything." },
        { q: "Do you guarantee bookings?", a: "No. Nobody serious can guarantee bookings without controlling your work quality, responsiveness, pricing, availability and market. What we do guarantee is a real, repeatable system and full visibility into every stage." },
        { q: "What if my city is very competitive?", a: "A competitive city means there's demand. It usually raises cost per inquiry, which makes qualification and follow-up matter even more: you don't win by paying more, you win by converting better what already comes in." },
      ],
    },

    book: {
      eyebrow: "Book now",
      title: "Pick your time. Without leaving this page.",
      sub: "15 minutes, over video. We review your Instagram, your city and your current inquiry process. If we don't see a clear opportunity, we'll tell you on the call.",
      loading: "Loading the calendar…",
      fallback: "Open the calendar",
      intake: "{month} intake",
      remaining: "spots remaining",
      filled: "filled",
      open: "open",
      days: "Closes in {d} days.",
      closedT: "{month} intake closed",
      closedS: "Message us and we'll add you to the {nextm} list.",
    },
    final: {
      title: "Your next tattoo client may already be inside your DMs.",
      sub: "The question is whether you have the system to qualify, follow up and collect the deposit before another artist does.",
      cta: "Request your 15-minute audit",
      support: "We'll review your Instagram, your portfolio, your city, your current inquiry process and your growth potential. If we see an opportunity, we'll show you exactly what MarketINK would build.",
      urgency: "Every week without a booking system means more conversations going cold.",
    },

    sticky: "Free audit",
    footer: { tagline: "Booking systems for tattoo artists and studios. We work with artists worldwide.", follow: "Follow us", write: "Write to us", where: "Where we are", rights: "All rights reserved.", legal: "Legal", built: "Roca Digital LLC" },
  },
};

export type Copy = (typeof copy)["es"];
