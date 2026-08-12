import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, LOCALES, site } from "@/lib/copy";
import Ink from "@/components/Ink";

/**
 * DESPUÉS DE PAGAR
 *
 * A esta página llega el artista desde Stripe, en el enlace de pago, con
 * «After the payment → redirect». Sin ella, el momento siguiente al pago
 * es una pantalla gris de Stripe que dice «gracias» y nada más — y ese
 * minuto es exactamente donde alguien decide si acaba de hacer una buena
 * compra o si acaba de mandar dinero a un desconocido.
 *
 * Por eso aquí no hay felicitación: hay tres cosas que van a pasar, con
 * plazos, y una manera de escribirnos hoy mismo. Se promete poco y se
 * promete concreto.
 *
 * No se indexa: no es una página del sitio, es el final de un camino.
 */

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "es" ? "Bienvenido a MarketINK" : "Welcome to MarketINK",
    robots: { index: false, follow: false },
    alternates: {},
  };
}

const t = {
  en: {
    kicker: "You're in",
    title: "Nothing else for you to do today.",
    body: "Your payment went through and we already have everything we need to start. Here's exactly what happens next, so you're not waiting on a surprise.",
    steps: [
      {
        k: "Within 24 hours",
        d: "An email from us with a short intake: your prices, the styles you want more of, the ones you'd rather stop doing, and access to whatever we need to set up.",
      },
      {
        k: "This week",
        d: "We build the doorway — booking link, the questions that qualify, the deposit — and we write the replies in your voice. You approve them before anything goes live.",
      },
      {
        k: "From day one",
        d: "Your DMs get answered in minutes, and the people who go quiet get followed up. You keep tattooing.",
      },
    ],
    q: "Something you want to tell us before we start?",
    write: "Write to us",
    cal: "Or book a time to talk",
    receipt: "Stripe emailed your receipt. You can cancel or change your card any time from the link in that email.",
  },
  es: {
    kicker: "Ya estás dentro",
    title: "Hoy no tienes que hacer nada más.",
    body: "El pago entró y ya tenemos todo lo que necesitamos para empezar. Esto es lo que pasa ahora, para que no estés esperando una sorpresa.",
    steps: [
      {
        k: "En 24 horas",
        d: "Un correo nuestro con un cuestionario corto: tus precios, los estilos que quieres hacer más, los que preferirías dejar de hacer, y los accesos que necesitamos.",
      },
      {
        k: "Esta semana",
        d: "Montamos la puerta de entrada —enlace de reserva, las preguntas que califican, el depósito— y escribimos las respuestas con tu voz. Las apruebas tú antes de que nada salga en vivo.",
      },
      {
        k: "Desde el primer día",
        d: "Tus mensajes se contestan en minutos y a los que se quedan callados se les hace seguimiento. Tú sigues tatuando.",
      },
    ],
    q: "¿Algo que quieras contarnos antes de empezar?",
    write: "Escríbenos",
    cal: "O agenda un rato para hablar",
    receipt: "Stripe te mandó el recibo por correo. Desde ese mismo correo puedes cambiar la tarjeta o cancelar cuando quieras.",
  },
} as const;

export default async function Welcome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = t[lang];

  return (
    <main className="relative overflow-hidden">
      <Ink />
      <section className="relative mx-auto flex min-h-[100svh] max-w-[900px] flex-col justify-center px-6 py-24 sm:px-10">
        <a href={`/${lang}`} className="text-[17px] font-extrabold tracking-tight text-bone">
          market<b className="font-black">INK</b>
          <i className="ml-[3px] inline-block size-[7px] rounded-full bg-blood align-baseline" aria-hidden />
        </a>

        <p className="mt-16 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-blood">
          <i className="dot-live size-1.5 rounded-full bg-blood" aria-hidden />
          {c.kicker}
        </p>
        <h1 className="flash-type mt-6 max-w-[16ch] text-[clamp(34px,6.4vw,72px)]">{c.title}</h1>
        <p className="mt-7 max-w-[56ch] text-[16.5px] leading-[1.75] text-muted">{c.body}</p>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08]">
          {c.steps.map((s, i) => (
            <li key={s.k} className="bg-void px-7 py-8">
              <span className="text-[12px] font-bold tabular-nums text-blood">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 flash-sub text-[13.5px] text-bone">{s.k}</h2>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-muted">{s.d}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-[15px] text-muted">{c.q}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href={`mailto:${site.email}`} className="btn">
            {c.write}
          </a>
          <a href={site.call} target="_blank" rel="noopener" className="btn btn-ghost">
            {c.cal}
          </a>
        </div>

        <p className="mt-12 max-w-[58ch] text-[13px] leading-relaxed text-faint">{c.receipt}</p>
      </section>
    </main>
  );
}
