import type { Lang } from "@/lib/copy";

/**
 * QUIÉN FIRMA
 *
 * Los artículos del blog van firmados por una persona con nombre y
 * foto, no por «el equipo». No es vanidad: Google evalúa quién escribe
 * (experiencia real, perfil público, constancia) y un artículo sin
 * autor compite con desventaja. Y para el tatuador que lo lee, un
 * consejo firmado por alguien que vendió en LinkedIn y en Meta pesa más
 * que el mismo consejo firmado por una marca.
 *
 * Las credenciales son las mismas que en la sección de equipo de la
 * portada (lib/copy.ts → team). Si cambian allí, cambian aquí.
 */
export type AuthorKey = "nick" | "caro";

export type Author = {
  key: AuthorKey;
  name: string;
  img: string;
  role: Record<Lang, string>;
  cred: string;
  bio: Record<Lang, string>;
  sameAs: string[];
};

export const AUTHORS: Record<AuthorKey, Author> = {
  nick: {
    key: "nick",
    name: "Nick",
    img: "/img/equipo/nick.webp",
    role: { es: "Ventas y sistema comercial", en: "Sales and commercial systems" },
    cred: "Ex LinkedIn · Ex Meta",
    bio: {
      es: "Cofundador de MarketINK. Vendió dentro de LinkedIn y de Meta antes de montar el sistema de reservas para tatuadores. Escribe sobre lo que pasa entre el mensaje y el depósito.",
      en: "Co-founder of MarketINK. Sold inside LinkedIn and Meta before building the booking system for tattoo artists. Writes about what happens between the DM and the deposit.",
    },
    sameAs: ["https://instagram.com/marketinkagency"],
  },
  caro: {
    key: "caro",
    name: "Caro",
    img: "/img/equipo/caro.webp",
    role: { es: "Marketing y estrategia", en: "Marketing and strategy" },
    cred: "Ex Sephora · Ex Meta",
    bio: {
      es: "Cofundadora de MarketINK. Hizo marketing en Sephora y en Meta antes de dedicarse a los tatuadores. Escribe sobre campañas, Instagram y cómo se construye demanda sin depender de la suerte.",
      en: "Co-founder of MarketINK. Did marketing at Sephora and Meta before focusing on tattoo artists. Writes about campaigns, Instagram and how demand gets built without relying on luck.",
    },
    sameAs: ["https://instagram.com/marketinkagency"],
  },
};
