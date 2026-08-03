import type { Lang } from "@/lib/copy";

/**
 * Documentos legales de MarketINK.
 *
 * Vienen de las páginas que ya existían en Shopify, reescritos para la
 * etapa nueva: agencia mundial, sin precios publicados, con las cifras
 * del caso real cubiertas por un descargo explícito y sin Shopify entre
 * los proveedores.
 *
 * NO es asesoría legal. Antes de publicar conviene que un abogado en
 * Wyoming lo revise, sobre todo el punto de «sin reembolsos» frente a
 * clientes en la UE y el Reino Unido.
 */

export type Section = { h: string; p?: string[]; ul?: string[] };
export type Doc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

export const LEGAL_SLUGS = ["terminos", "privacidad", "reembolsos", "aviso-legal", "contacto"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export const entity = {
  legal: "ROCA DIGITAL LLC",
  trade: "MarketINK Agency",
  address: "1021 E Lincolnway, Suite #9463, Cheyenne, Wyoming 82001, United States",
  email: "hello@marketinkagency.com",
  law: { es: "Estado de Wyoming, Estados Unidos", en: "State of Wyoming, United States" },
  updated: { es: "3 de agosto de 2026", en: "August 3, 2026" },
};

const ES: Record<LegalSlug, Doc> = {
  terminos: {
    slug: "terminos",
    title: "Términos del servicio",
    updated: entity.updated.es,
    intro: `MarketINK Agency es operada por ${entity.legal}, con domicilio en ${entity.address}. Al contratar cualquier servicio de MarketINK aceptas estos términos.`,
    sections: [
      {
        h: "1. Naturaleza del servicio",
        p: [
          "MarketINK presta servicios profesionales personalizados, intangibles y basados en tiempo, orientados a generación de oportunidades y agendamiento de citas para tatuadores y estudios de tatuaje.",
          "No se entrega ningún producto físico. No hay envíos ni bienes tangibles de ningún tipo.",
          "Los servicios se contratan entre empresas. El cliente declara que contrata en el ejercicio de su actividad profesional o comercial, no como consumidor final.",
        ],
      },
      {
        h: "2. Alcance y precios",
        p: [
          "MarketINK opera con clientes en cualquier país. El alcance, la duración, la moneda y el precio de cada colaboración se acuerdan de forma individual por escrito antes de comenzar, tras una llamada de diagnóstico.",
          "Esta web no publica precios. Ninguna cifra mostrada en el sitio constituye una oferta vinculante.",
        ],
      },
      {
        h: "3. Inicio del servicio",
        p: [
          "El servicio se considera iniciado en el momento en que ocurra primero cualquiera de estos hechos: se completa la llamada de incorporación, MarketINK comienza el trabajo de configuración, o el cliente entrega los materiales de incorporación.",
        ],
      },
      {
        h: "4. Pagos y renovación",
        p: [
          "Los servicios recurrentes se facturan por adelantado y se renuevan automáticamente en la fecha acordada hasta que el cliente cancele.",
          "Los pagos se procesan a través de Stripe. MarketINK no almacena datos de tarjeta.",
          "La inversión publicitaria del cliente es independiente de los honorarios de MarketINK y se paga directamente a la plataforma correspondiente.",
        ],
      },
      {
        h: "5. Cancelación",
        p: [
          "El cliente puede cancelar en cualquier momento antes de la siguiente fecha de facturación escribiendo a " + entity.email + ".",
          "La cancelación detiene los cobros futuros. No genera reembolsos, créditos ni prorrateos del periodo en curso.",
        ],
      },
      {
        h: "6. Sin garantía de resultados",
        p: [
          "MarketINK no garantiza reservas, oportunidades, ingresos, tasas de conversión ni retorno de la inversión.",
          "Los resultados de marketing dependen de factores fuera del control de MarketINK, entre ellos la ciudad, el estilo, los precios, el portafolio, la disponibilidad de agenda, la capacidad de respuesta del cliente, el presupuesto publicitario y las políticas de las plataformas.",
        ],
      },
      {
        h: "7. Cifras publicadas",
        p: [
          "Las cifras que aparecen en esta web corresponden a resultados reales de clientes concretos, redondeados, y se publican con su autorización.",
          "No son promedios, no son proyecciones y no representan lo que cualquier cliente vaya a obtener. Tu resultado será distinto.",
        ],
      },
      {
        h: "8. Responsabilidades del cliente",
        ul: [
          "Entregar accesos, materiales e información veraz en tiempo razonable.",
          "Responder a las oportunidades generadas y mantener su agenda actualizada.",
          "Cumplir las normas de las plataformas que utilice, incluidas las de Meta.",
          "Contar con los permisos necesarios sobre las imágenes y contenidos que aporte.",
        ],
      },
      {
        h: "9. Propiedad intelectual",
        p: [
          "El cliente conserva la titularidad de sus marcas, imágenes y obra. MarketINK conserva la titularidad de sus metodologías, plantillas, guiones y sistemas internos.",
          "Salvo pacto en contrario por escrito, MarketINK puede mencionar la colaboración y mostrar resultados de forma anónima con fines comerciales.",
        ],
      },
      {
        h: "10. Confidencialidad",
        p: [
          "Ambas partes tratarán como confidencial la información comercial no pública a la que accedan durante la colaboración.",
        ],
      },
      {
        h: "11. Límite de responsabilidad",
        p: [
          "En la máxima medida permitida por la ley, la responsabilidad total de MarketINK no excederá el importe pagado por el cliente en los treinta (30) días inmediatamente anteriores al hecho que origine la reclamación.",
          "MarketINK no responde por daños indirectos, lucro cesante ni pérdida de oportunidades.",
        ],
      },
      {
        h: "12. Tiempos de respuesta",
        p: [
          "MarketINK procura responder las comunicaciones dentro de tres (3) días hábiles estadounidenses. No es un plazo garantizado.",
        ],
      },
      {
        h: "13. Suspensión y terminación",
        p: [
          "MarketINK puede suspender o terminar el servicio ante impago, uso indebido, conducta abusiva o incumplimiento de estos términos.",
        ],
      },
      {
        h: "14. Ley aplicable",
        p: [
          `Estos términos se rigen por las leyes del ${entity.law.es}, sin atender a normas de conflicto de leyes. Cualquier controversia se someterá a los tribunales competentes de dicha jurisdicción.`,
        ],
      },
      {
        h: "15. Cambios",
        p: [
          "MarketINK puede modificar estos términos. La versión vigente es la publicada en esta página. El uso continuado del servicio implica su aceptación.",
        ],
      },
    ],
  },

  privacidad: {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: entity.updated.es,
    intro: `Esta política explica qué datos trata ${entity.legal} (MarketINK Agency) y con qué finalidad. Aplica a visitantes de la web, clientes, prospectos y personas que interactúan con nuestros formularios, campañas o herramientas.`,
    sections: [
      {
        h: "1. Responsable",
        p: [`${entity.legal}, ${entity.address}. Contacto: ${entity.email}.`],
      },
      {
        h: "2. Datos que recogemos",
        ul: [
          "Datos que nos facilitas: nombre, correo, nombre del negocio, usuario de Instagram, teléfono y datos de facturación.",
          "Datos de campañas: nombre y datos de contacto de las personas que responden a los anuncios.",
          "Datos técnicos automáticos: dirección IP, tipo de dispositivo, navegador, páginas visitadas y URL de procedencia.",
          "Contenido de conversaciones gestionadas por nosotros o por INKY en los canales que el cliente autorice.",
        ],
      },
      {
        h: "3. Para qué los usamos",
        ul: [
          "Prestar el servicio contratado y configurar el CRM.",
          "Agendar y gestionar llamadas y citas.",
          "Responder consultas y hacer seguimiento comercial.",
          "Medir y optimizar campañas publicitarias.",
          "Procesar pagos y cumplir obligaciones contables.",
        ],
      },
      {
        h: "4. No vendemos datos personales",
        p: ["MarketINK no vende ni alquila datos personales a terceros."],
      },
      {
        h: "5. Cookies y medición",
        p: [
          "Este sitio puede usar herramientas de medición para entender qué campañas generan consultas reales. En concreto: Meta Pixel, Google Analytics 4 y Google Tag Manager.",
          "Ninguna de estas herramientas se carga hasta que aceptas expresamente. Al entrar por primera vez verás un aviso con dos opciones: aceptar la medición o quedarte solo con lo estrictamente necesario para que la web funcione. Si eliges lo segundo, no se carga ningún script de terceros ni se escribe ninguna cookie de seguimiento.",
          "Puedes cambiar de opinión en cualquier momento borrando los datos del sitio desde tu navegador: volverá a preguntarte.",
        ],
        ul: [
          "Meta Pixel — mide qué anuncios de Instagram y Facebook terminan en una consulta, y permite mostrar anuncios a quien ya visitó la web.",
          "Google Analytics 4 — mide páginas vistas, procedencia del tráfico y comportamiento agregado. Con anonimización de IP activada.",
          "Google Tag Manager — solo gestiona los dos anteriores; por sí mismo no recoge nada.",
        ],
      },
      {
        h: "5 bis. Publicidad personalizada",
        p: [
          "Si aceptas la medición, Meta puede usar tu visita para mostrarte anuncios de MarketINK más adelante. Puedes desactivarlo desde la configuración de anuncios de tu cuenta de Meta, y desde los ajustes de tu dispositivo.",
          "MarketINK no cruza estos datos con tu nombre ni con tu correo salvo que tú nos los facilites en un formulario o al agendar una llamada.",
        ],
      },
      {
        h: "6. Proveedores que tratan datos por nuestra cuenta",
        ul: [
          "Stripe — cobros y facturación.",
          "Calendly — agendamiento de llamadas.",
          "Zoho CRM — gestión de oportunidades.",
          "Meta Platforms — publicidad y mensajería de Instagram.",
          "Google — analítica y etiquetado.",
          "Vercel — alojamiento del sitio web.",
          "OpenAI — procesamiento de texto en las funciones de INKY.",
        ],
        p: ["Cada proveedor trata los datos conforme a sus propias políticas."],
      },
      {
        h: "7. Transferencias internacionales",
        p: [
          "MarketINK opera desde Estados Unidos y trabaja con clientes en distintos países. Al contratar el servicio o enviarnos tus datos, aceptas que puedan tratarse en Estados Unidos y en los países donde operen nuestros proveedores.",
        ],
      },
      {
        h: "8. Conservación",
        ul: [
          "Registros de facturación: hasta 7 años, por obligación contable.",
          "Datos de marketing: hasta que retires el consentimiento o te des de baja.",
          "Oportunidades en CRM: mientras sea razonablemente necesario para la relación comercial.",
        ],
      },
      {
        h: "9. Tus derechos",
        p: [
          "Puedes solicitar acceso, corrección, supresión, limitación del tratamiento, portabilidad u oposición escribiendo a " +
            entity.email +
            ". Podemos pedirte que acredites tu identidad antes de atender la solicitud.",
          "Si resides en la Unión Europea o el Reino Unido, estos derechos te asisten conforme al RGPD. Si resides en California, puedes ejercer los derechos previstos en la CCPA/CPRA, incluido el derecho a saber y a solicitar la supresión.",
        ],
      },
      {
        h: "10. Datos de Instagram e INKY",
        p: [
          "Si conectaste tu cuenta de Instagram a INKY y quieres que borremos tus datos, escribe a " +
            entity.email +
            " con el asunto «Data Deletion Request», indicando tu usuario de Instagram y el correo asociado.",
          "Eliminaremos los datos de conexión almacenados, los tokens de acceso, los registros de mensajes y la información de cuenta relacionada en un plazo de 7 días hábiles, salvo lo que debamos conservar por obligación legal o por seguridad.",
        ],
      },
      {
        h: "11. Menores",
        p: ["El servicio no está dirigido a menores de 18 años y no recogemos sus datos de forma consciente."],
      },
      {
        h: "12. Cambios",
        p: ["Publicaremos cualquier cambio en esta página, actualizando la fecha de revisión."],
      },
    ],
  },

  reembolsos: {
    slug: "reembolsos",
    title: "Política de reembolsos",
    updated: entity.updated.es,
    intro: `MarketINK Agency, operada por ${entity.legal}, presta exclusivamente servicios digitales y profesionales. No comercializa productos físicos ni realiza envíos.`,
    sections: [
      {
        h: "1. Pagos finales",
        p: [
          "Todos los pagos realizados a MarketINK son finales y no reembolsables. Esto incluye cuotas recurrentes, cuotas de configuración, trabajo de implementación y sesiones de consultoría.",
        ],
      },
      {
        h: "2. Por qué",
        p: [
          "Una vez comienza la incorporación, se realiza la llamada de estrategia o se otorgan accesos, el servicio se considera prestado. El tiempo de trabajo y los recursos asignados no son recuperables.",
        ],
      },
      {
        h: "3. Suscripciones",
        p: [
          "Las suscripciones se renuevan automáticamente. La cancelación detiene los cobros futuros pero no genera reembolsos, créditos ni prorrateos del periodo ya facturado.",
          "Para cancelar, escribe a " + entity.email + " antes de la siguiente fecha de facturación.",
        ],
      },
      {
        h: "4. Resultados",
        p: [
          "MarketINK no garantiza reservas, oportunidades, ingresos, tasas de conversión ni retorno de la inversión. La ausencia de un resultado esperado no da derecho a reembolso.",
        ],
      },
      {
        h: "5. Inversión publicitaria",
        p: [
          "El presupuesto de publicidad lo paga el cliente directamente a la plataforma y es independiente de los honorarios de MarketINK. MarketINK no reembolsa inversión publicitaria.",
        ],
      },
      {
        h: "6. Contracargos",
        p: [
          "Si tienes un problema con un cobro, escríbenos primero. Iniciar un contracargo sin haber intentado resolverlo por contacto directo constituye un incumplimiento de los términos del servicio.",
        ],
      },
      {
        h: "7. Excepciones legales",
        p: [
          "Nada en esta política limita los derechos que la ley aplicable te reconozca de forma imperativa.",
        ],
      },
    ],
  },

  "aviso-legal": {
    slug: "aviso-legal",
    title: "Aviso legal",
    updated: entity.updated.es,
    intro: `Información legal sobre ${entity.trade}, operada por ${entity.legal}.`,
    sections: [
      {
        h: "Identificación",
        p: [`${entity.legal}, sociedad constituida en Wyoming, Estados Unidos.`, entity.address, entity.email],
      },
      {
        h: "Descargo sobre resultados",
        p: [
          "MarketINK presta servicios de marketing y agendamiento comercial. No es un plan de ingresos garantizados ni una oportunidad de inversión.",
          "Las cifras y ejemplos publicados en este sitio corresponden a clientes concretos, están redondeados y se comparten con su autorización. No son promedios ni proyecciones, y no deben interpretarse como una previsión de lo que un cliente vaya a obtener.",
          "El resultado de cualquier estrategia de marketing depende de la ciudad, el estilo, los precios, el portafolio, la disponibilidad de agenda, la capacidad de respuesta, el presupuesto publicitario y las políticas de las plataformas.",
        ],
      },
      {
        h: "Solicitud de eliminación de datos de Instagram",
        p: [
          "Si conectaste tu cuenta de Instagram a INKY y quieres que borremos tus datos, escribe a " +
            entity.email +
            " con el asunto «Data Deletion Request». Indica tu usuario de Instagram y el correo asociado.",
          "Eliminaremos los datos de conexión almacenados, los tokens de acceso, los registros de mensajes y la información de cuenta relacionada en un plazo de 7 días hábiles, salvo lo que debamos conservar por obligación legal o por seguridad.",
        ],
      },
      {
        h: "Marcas y contenidos",
        p: [
          "Las marcas, nombres comerciales y contenidos de terceros que aparezcan en este sitio pertenecen a sus respectivos titulares.",
          "Las imágenes de tatuajes se publican con permiso de sus autores. No se identifica al artista a petición suya.",
          "MarketINK no está afiliada, patrocinada ni respaldada por Meta Platforms, Google, Stripe ni ninguna otra plataforma mencionada.",
        ],
      },
      {
        h: "Enlaces externos",
        p: [
          "Este sitio puede enlazar a páginas de terceros. MarketINK no controla su contenido ni responde por él.",
        ],
      },
    ],
  },

  contacto: {
    slug: "contacto",
    title: "Información de contacto",
    updated: entity.updated.es,
    intro: `${entity.trade} es operada por ${entity.legal}.`,
    sections: [
      { h: "Domicilio", p: [entity.address] },
      { h: "Correo", p: [entity.email] },
      {
        h: "Horario",
        p: [
          "MarketINK opera en días hábiles de Estados Unidos. Los tiempos de respuesta pueden variar en festivos o circunstancias excepcionales.",
        ],
      },
      {
        h: "Atención",
        p: [
          "Atendemos todas las consultas por correo, incluidas las de facturación, cancelación y privacidad. Procuramos responder dentro de tres días hábiles.",
          "Para solicitudes formales podemos pedirte que acredites tu identidad.",
        ],
      },
      {
        h: "Sin oficina de atención presencial",
        p: [
          "Los servicios de MarketINK se prestan de forma digital. No hay oficina física para visitas de clientes.",
        ],
      },
    ],
  },
};

const EN: Record<LegalSlug, Doc> = {
  terminos: {
    slug: "terminos",
    title: "Terms of Service",
    updated: entity.updated.en,
    intro: `MarketINK Agency is operated by ${entity.legal}, located at ${entity.address}. By engaging any MarketINK service you agree to these terms.`,
    sections: [
      {
        h: "1. Nature of the service",
        p: [
          "MarketINK provides customized, non-tangible, time-based professional services designed to support lead generation and booking outcomes for tattoo artists and studios.",
          "No physical product is delivered. There is no shipping and there are no tangible goods of any kind.",
          "Services are contracted business to business. The client represents that it is contracting in the course of its trade or profession, not as a consumer.",
        ],
      },
      {
        h: "2. Scope and pricing",
        p: [
          "MarketINK works with clients in any country. Scope, duration, currency and price are agreed individually and in writing before work begins, following a diagnostic call.",
          "This website does not publish prices. No figure shown on this site constitutes a binding offer.",
        ],
      },
      {
        h: "3. When service begins",
        p: [
          "Service is deemed to have commenced upon whichever happens first: completion of the onboarding call, MarketINK initiating setup work, or the client submitting onboarding materials.",
        ],
      },
      {
        h: "4. Payment and renewal",
        p: [
          "Recurring services are billed in advance and renew automatically on the agreed date until the client cancels.",
          "Payments are processed through Stripe. MarketINK does not store card data.",
          "Client advertising budget is separate from MarketINK fees and is paid directly to the relevant platform.",
        ],
      },
      {
        h: "5. Cancellation",
        p: [
          "The client may cancel at any time before the next billing date by writing to " + entity.email + ".",
          "Cancellation stops future billing only. It does not result in refunds, credits or prorations of the current period.",
        ],
      },
      {
        h: "6. No guarantee of results",
        p: [
          "MarketINK does not guarantee bookings, leads, revenue, conversion rates or return on investment.",
          "Marketing outcomes depend on factors outside MarketINK's control, including city, style, pricing, portfolio, calendar availability, client responsiveness, advertising budget and platform policies.",
        ],
      },
      {
        h: "7. Published figures",
        p: [
          "Figures shown on this website reflect real results from specific clients, rounded, and are published with their permission.",
          "They are not averages, not projections, and do not represent what any client will achieve. Your result will differ.",
        ],
      },
      {
        h: "8. Client responsibilities",
        ul: [
          "Provide access, materials and accurate information within a reasonable time.",
          "Respond to the opportunities generated and keep the calendar current.",
          "Comply with the rules of the platforms used, including Meta's.",
          "Hold the necessary rights to any images and content supplied.",
        ],
      },
      {
        h: "9. Intellectual property",
        p: [
          "The client retains ownership of its brand, images and artwork. MarketINK retains ownership of its methodologies, templates, scripts and internal systems.",
          "Unless otherwise agreed in writing, MarketINK may reference the engagement and present anonymized results for commercial purposes.",
        ],
      },
      {
        h: "10. Confidentiality",
        p: [
          "Both parties will treat as confidential any non-public commercial information accessed during the engagement.",
        ],
      },
      {
        h: "11. Limitation of liability",
        p: [
          "To the maximum extent permitted by law, MarketINK's total liability shall not exceed the amount paid by the client in the thirty (30) days immediately preceding the event giving rise to the claim.",
          "MarketINK is not liable for indirect damages, lost profits or lost opportunities.",
        ],
      },
      {
        h: "12. Response times",
        p: [
          "MarketINK aims to respond to communications within three (3) U.S. business days. This is a target, not a guarantee.",
        ],
      },
      {
        h: "13. Suspension and termination",
        p: [
          "MarketINK may suspend or terminate service for non-payment, misuse, abusive conduct or breach of these terms.",
        ],
      },
      {
        h: "14. Governing law",
        p: [
          `These terms are governed by the laws of the ${entity.law.en}, without regard to conflict of law rules. Any dispute shall be submitted to the competent courts of that jurisdiction.`,
        ],
      },
      {
        h: "15. Changes",
        p: [
          "MarketINK may amend these terms. The version published on this page is the one in force. Continued use of the service constitutes acceptance.",
        ],
      },
    ],
  },

  privacidad: {
    slug: "privacidad",
    title: "Privacy Policy",
    updated: entity.updated.en,
    intro: `This policy explains what data ${entity.legal} (MarketINK Agency) processes and why. It applies to website visitors, clients, prospects and anyone interacting with our forms, campaigns or tools.`,
    sections: [
      { h: "1. Controller", p: [`${entity.legal}, ${entity.address}. Contact: ${entity.email}.`] },
      {
        h: "2. Data we collect",
        ul: [
          "Data you provide: name, email, business name, Instagram handle, phone and billing details.",
          "Campaign data: name and contact details of people who respond to ads.",
          "Automatic technical data: IP address, device type, browser, pages visited and referring URLs.",
          "Content of conversations handled by us or by INKY on the channels the client authorizes.",
        ],
      },
      {
        h: "3. How we use it",
        ul: [
          "Deliver the contracted service and configure the CRM.",
          "Schedule and manage calls and appointments.",
          "Answer inquiries and follow up commercially.",
          "Measure and optimize advertising campaigns.",
          "Process payments and meet accounting obligations.",
        ],
      },
      { h: "4. We do not sell personal data", p: ["MarketINK does not sell or rent personal data to third parties."] },
      {
        h: "5. Cookies and measurement",
        p: [
          "This site may use measurement tools to understand which campaigns generate real inquiries. Specifically: Meta Pixel, Google Analytics 4 and Google Tag Manager.",
          "None of these tools load until you expressly accept. On your first visit you'll see a notice with two options: accept measurement, or keep only what is strictly necessary for the site to work. If you choose the latter, no third-party script is loaded and no tracking cookie is written.",
          "You can change your mind at any time by clearing this site's data in your browser: it will ask you again.",
        ],
        ul: [
          "Meta Pixel — measures which Instagram and Facebook ads end in an inquiry, and allows showing ads to people who already visited the site.",
          "Google Analytics 4 — measures page views, traffic sources and aggregate behaviour. With IP anonymization enabled.",
          "Google Tag Manager — only manages the two above; on its own it collects nothing.",
        ],
      },
      {
        h: "5b. Personalized advertising",
        p: [
          "If you accept measurement, Meta may use your visit to show you MarketINK ads later. You can turn this off from your Meta account's ad settings, and from your device settings.",
          "MarketINK does not link this data to your name or email unless you provide them in a form or when booking a call.",
        ],
      },
      {
        h: "6. Processors acting on our behalf",
        ul: [
          "Stripe — payments and billing.",
          "Calendly — call scheduling.",
          "Zoho CRM — opportunity management.",
          "Meta Platforms — advertising and Instagram messaging.",
          "Google — analytics and tagging.",
          "Vercel — website hosting.",
          "OpenAI — text processing for INKY features.",
        ],
        p: ["Each processor handles data under its own policies."],
      },
      {
        h: "7. International transfers",
        p: [
          "MarketINK operates from the United States and works with clients in multiple countries. By engaging the service or submitting your data, you accept that it may be processed in the United States and in the countries where our processors operate.",
        ],
      },
      {
        h: "8. Retention",
        ul: [
          "Billing records: up to 7 years, for accounting compliance.",
          "Marketing data: until you withdraw consent or unsubscribe.",
          "CRM leads: as long as reasonably necessary for the commercial relationship.",
        ],
      },
      {
        h: "9. Your rights",
        p: [
          "You may request access, correction, deletion, restriction of processing, portability or objection by writing to " +
            entity.email +
            ". We may ask you to verify your identity before acting on the request.",
          "If you reside in the European Union or the United Kingdom, these rights apply under the GDPR. If you reside in California, you may exercise the rights provided under the CCPA/CPRA, including the right to know and the right to request deletion.",
        ],
      },
      {
        h: "10. Instagram and INKY data",
        p: [
          "If you connected your Instagram account to INKY and want your data deleted, email " +
            entity.email +
            ' with the subject "Data Deletion Request", including your Instagram username and the associated email address.',
          "We will remove stored connection data, access tokens, message logs and related account information from our systems within 7 business days, except for what we must retain by law or for security.",
        ],
      },
      { h: "11. Minors", p: ["The service is not directed at people under 18 and we do not knowingly collect their data."] },
      { h: "12. Changes", p: ["Any changes will be published on this page with an updated revision date."] },
    ],
  },

  reembolsos: {
    slug: "reembolsos",
    title: "Refund Policy",
    updated: entity.updated.en,
    intro: `MarketINK Agency, operated by ${entity.legal}, provides digital and professional services only. It does not sell physical products and does not ship goods.`,
    sections: [
      {
        h: "1. Payments are final",
        p: [
          "All payments made to MarketINK are final and non-refundable. This includes recurring fees, setup fees, implementation work and consulting sessions.",
        ],
      },
      {
        h: "2. Why",
        p: [
          "Once onboarding begins, the strategy call takes place or account access is granted, the service is considered delivered. Allocated time and resources are not recoverable.",
        ],
      },
      {
        h: "3. Subscriptions",
        p: [
          "Subscriptions renew automatically. Cancellation stops future charges but does not produce refunds, credits or prorations of a period already billed.",
          "To cancel, email " + entity.email + " before the next billing date.",
        ],
      },
      {
        h: "4. Results",
        p: [
          "MarketINK does not guarantee bookings, leads, revenue, conversion rates or return on investment. The absence of an expected result does not entitle you to a refund.",
        ],
      },
      {
        h: "5. Advertising spend",
        p: [
          "Advertising budget is paid by the client directly to the platform and is separate from MarketINK fees. MarketINK does not refund ad spend.",
        ],
      },
      {
        h: "6. Chargebacks",
        p: [
          "If you have an issue with a charge, contact us first. Filing a chargeback without first attempting to resolve it directly constitutes a breach of the terms of service.",
        ],
      },
      {
        h: "7. Statutory exceptions",
        p: ["Nothing in this policy limits rights granted to you on a mandatory basis by applicable law."],
      },
    ],
  },

  "aviso-legal": {
    slug: "aviso-legal",
    title: "Legal Notice",
    updated: entity.updated.en,
    intro: `Legal information about ${entity.trade}, operated by ${entity.legal}.`,
    sections: [
      {
        h: "Identification",
        p: [`${entity.legal}, a company incorporated in Wyoming, United States.`, entity.address, entity.email],
      },
      {
        h: "Results disclaimer",
        p: [
          "MarketINK provides marketing and commercial booking services. It is not a guaranteed income plan and is not an investment opportunity.",
          "Figures and examples published on this site come from specific clients, are rounded, and are shared with their permission. They are not averages or projections and should not be read as a forecast of what any client will achieve.",
          "The outcome of any marketing strategy depends on city, style, pricing, portfolio, calendar availability, responsiveness, advertising budget and platform policies.",
        ],
      },
      {
        h: "Instagram data deletion request",
        p: [
          "If you connected your Instagram account to INKY and want your data deleted, email " +
            entity.email +
            ' with the subject "Data Deletion Request". Include your Instagram username and the associated email address.',
          "We will remove stored connection data, access tokens, message logs and related account information from our systems within 7 business days, except for what we must retain by law or for security.",
        ],
      },
      {
        h: "Trademarks and content",
        p: [
          "Third-party trademarks, trade names and content appearing on this site belong to their respective owners.",
          "Tattoo images are published with the permission of their artists. Artists are not identified at their request.",
          "MarketINK is not affiliated with, sponsored by or endorsed by Meta Platforms, Google, Stripe or any other platform mentioned.",
        ],
      },
      {
        h: "External links",
        p: ["This site may link to third-party pages. MarketINK does not control their content and is not responsible for it."],
      },
    ],
  },

  contacto: {
    slug: "contacto",
    title: "Contact Information",
    updated: entity.updated.en,
    intro: `${entity.trade} is operated by ${entity.legal}.`,
    sections: [
      { h: "Address", p: [entity.address] },
      { h: "Email", p: [entity.email] },
      {
        h: "Hours",
        p: [
          "MarketINK operates on U.S. business days. Response times may vary during public holidays or exceptional circumstances.",
        ],
      },
      {
        h: "Support",
        p: [
          "We handle all inquiries by email, including billing, cancellation and privacy requests. We aim to respond within three business days.",
          "For formal requests we may ask you to verify your identity.",
        ],
      },
      {
        h: "No walk-in office",
        p: ["MarketINK services are delivered digitally. There is no physical office for client visits."],
      },
    ],
  },
};

export const legal: Record<Lang, Record<LegalSlug, Doc>> = { es: ES, en: EN };

/** Etiquetas del pie, por idioma. */
export const legalNav: Record<Lang, { slug: LegalSlug; label: string }[]> = {
  es: [
    { slug: "terminos", label: "Términos" },
    { slug: "privacidad", label: "Privacidad" },
    { slug: "reembolsos", label: "Reembolsos" },
    { slug: "aviso-legal", label: "Aviso legal" },
    { slug: "contacto", label: "Contacto" },
  ],
  en: [
    { slug: "terminos", label: "Terms" },
    { slug: "privacidad", label: "Privacy" },
    { slug: "reembolsos", label: "Refunds" },
    { slug: "aviso-legal", label: "Legal notice" },
    { slug: "contacto", label: "Contact" },
  ],
};
