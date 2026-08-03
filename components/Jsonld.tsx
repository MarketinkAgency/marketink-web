import type { Copy, Lang } from "@/lib/copy";
import { entity } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

/**
 * Datos estructurados.
 *
 * Es lo que le permite a Google entender que esto es una empresa
 * concreta con dirección, servicios y preguntas frecuentes, en vez de
 * «una página con texto». Dos cosas prácticas salen de aquí:
 *
 *  · Las preguntas frecuentes pueden aparecer desplegadas dentro del
 *    resultado de búsqueda, ocupando el triple de espacio que un
 *    enlace normal.
 *  · La ficha de empresa (nombre, logo, redes, dirección) se asocia a
 *    la marca en vez de quedar suelta.
 *
 * Solo se declara lo que es cierto y está publicado en la página.
 * Marcar cosas que no existen es la forma rápida de que Google
 * ignore todo el bloque.
 */
export default function Jsonld({ t, lang }: { t: Copy; lang: Lang }) {
  const url = `${SITE_URL}/${lang}`;

  const org = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#org`,
    name: "MarketINK Agency",
    legalName: entity.legal,
    url: SITE_URL,
    email: entity.email,
    description: t.meta.desc,
    image: `${url}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1021 E Lincolnway, Suite #9463",
      addressLocality: "Cheyenne",
      addressRegion: "WY",
      postalCode: "82001",
      addressCountry: "US",
    },
    areaServed: "Worldwide",
    sameAs: ["https://instagram.com/marketinkagency"],
    knowsAbout: [
      "Tattoo studio marketing",
      "Instagram DM qualification",
      "Appointment setting",
      "Booking systems for tattoo artists",
    ],
  };

  const site = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: "MarketINK",
    publisher: { "@id": `${SITE_URL}/#org` },
    inLanguage: lang,
  };

  /* Las preguntas frecuentes tal cual están en la página. Si alguna
     desaparece del copy, desaparece de aquí sola. */
  const faq = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: t.audit.name,
    serviceType: "Marketing consultation",
    provider: { "@id": `${SITE_URL}/#org` },
    description: t.audit.promise,
    audience: { "@type": "Audience", audienceType: "Tattoo artists and studios" },
  };

  const data = { "@context": "https://schema.org", "@graph": [org, site, faq, service] };

  return (
    <script
      type="application/ld+json"
      // El contenido lo generamos nosotros a partir del copy; no entra
      // nada del usuario. Se escapa `<` por si algún texto lo trae.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
