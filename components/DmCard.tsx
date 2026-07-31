import type { Lang } from "@/lib/copy";

const THREAD: Record<Lang, { me: boolean; text: string }[]> = {
  es: [
    { me: false, text: "hola, cuanto me cobras por un tatuaje en el antebrazo?" },
    { me: true, text: "¡Hola! ¿Ya tienes una idea o referencia de lo que quieres?" },
    { me: false, text: "si, un lobo con sombras, blanco y negro" },
    { me: true, text: "Perfecto, eso es realismo. ¿Del codo a la muñeca o más pequeño?" },
    { me: false, text: "del codo a la muñeca" },
    { me: true, text: "Te agendo una consulta de 15 min, sin costo. ¿Jueves 5pm o viernes 6pm?" },
    { me: false, text: "jueves a las 5 👌" },
  ],
  en: [
    { me: false, text: "hey how much for a forearm tattoo?" },
    { me: true, text: "Hey! Do you have a reference in mind?" },
    { me: false, text: "yeah a wolf, black and grey with shading" },
    { me: true, text: "Nice, that's realism. Elbow to wrist or smaller?" },
    { me: false, text: "elbow to wrist" },
    { me: true, text: "Let's get you a free 15-min consult. Thursday 5pm or Friday 6pm?" },
    { me: false, text: "thursday works 👌" },
  ],
};

/**
 * El objeto del hero: una conversación real terminando en cita.
 * No es un adorno — es literalmente lo que vende MarketINK.
 */
export default function DmCard({ lang, label }: { lang: Lang; label: string }) {
  return (
    <div className="glass w-full max-w-[420px] overflow-hidden rounded-[26px]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blood text-[17px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(225,6,0,0.9)]">
          💉
        </div>
        <div className="min-w-0 flex-1">
          <b className="block truncate text-[14px] font-semibold tracking-[-0.015em]">Ink &amp; Iron Studio</b>
          <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-blood">
            <i className="dot-live size-1.5 rounded-full bg-blood" />
            {label}
          </span>
        </div>
        <span className="hidden rounded-lg px-2 py-1 text-[9.5px] tracking-[0.16em] text-faint ring-1 ring-white/10 sm:block">
          DM
        </span>
      </div>

      <div className="flex flex-col gap-2 px-4 py-5">
        {THREAD[lang].map((m, i) => (
          <div
            key={i}
            className={`bubble max-w-[84%] px-4 py-2.5 text-[13.5px] leading-[1.45] ${
              m.me
                ? "self-end rounded-[17px] rounded-br-[6px] bg-blood font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_24px_-14px_rgba(225,6,0,0.9)]"
                : "self-start rounded-[17px] rounded-bl-[6px] bg-white/[0.055] text-bone ring-1 ring-white/[0.08]"
            }`}
            style={{ animationDelay: `${0.5 + i * 0.42}s` }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}
