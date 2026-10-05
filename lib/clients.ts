/**
 * REPORTES MENSUALES DE CLIENTE
 *
 * Un sitio privado por cliente donde ve su mes. Igual que las
 * auditorías: una plantilla, un objeto de datos por cliente, y añadir
 * octubre en noviembre es añadir un elemento a un array.
 *
 * POR QUÉ ESTO EXISTE
 *
 * Un PDF de cierre de mes se abre una vez y se pierde en WhatsApp. Una
 * URL que el cliente guarda y a la que cada mes se le añade una capa
 * hace otra cosa: convierte el servicio en algo que se ve acumulado.
 * El valor no está en el mes que se reporta, está en la línea que se
 * dibuja entre meses.
 *
 * TRES REGLAS, Y NINGUNA ES DE ESTILO
 *
 *  1. Todo número sale de la API de Meta a través de Windsor, o de algo
 *     que el cliente dijo en una reunión y queda atribuido a él. Nada
 *     se redondea hacia arriba y nada se estima en silencio. El cliente
 *     puede entrar a su Business Manager mientras lee esto.
 *
 *  2. Lo que salió mal se cuenta. Un reporte donde todo es maravilloso
 *     no lo cree nadie que tenga el negocio en la cabeza, y la primera
 *     cifra floja que detecte el cliente tira abajo las otras diez que
 *     sí eran buenas. La caída de la semana cuatro va escrita, con su
 *     causa y con lo que ya se cambió.
 *
 *  3. El dinero lo pone el cliente. No afirmamos cuántas citas cerró ni
 *     cuánto facturó: eso lo sabe él y nosotros no. La sección de
 *     retorno es una calculadora con su ticket real, donde él mueve el
 *     número de citas. Es más contundente que cualquier cifra nuestra y
 *     no se puede discutir.
 *
 * Estas páginas no se indexan y no entran en el sitemap: son los
 * números privados de un negocio con nombre propio.
 */

export type Stat = { k: string; v: string; note?: string };

export type Delta = {
  k: string;
  /** El antes y el después, ya formateados. */
  from: string;
  to: string;
  /** El cambio, con su signo. */
  delta: string;
  /** Verde cuando mejoró, rojo cuando empeoró. */
  good: boolean;
  why: string;
};

export type Week = { label: string; conv: number; spend: string; cpc: string };

export type Creative = {
  name: string;
  spend: string;
  reach: string;
  conv: number;
  cpc: string;
  /** El que cargó el mes se marca. */
  hero?: boolean;
  note?: string;
};

export type Month = {
  /** Clave de URL y de orden: 2026-09. */
  id: string;
  label: string;
  /** El rango exacto de los datos, para que nadie discuta la ventana. */
  window: string;
  headline: string;
  intro: string[];
  stats: Stat[];
  deltas?: { tag: string; title: string; sub: string; items: Delta[] };
  weeks?: { tag: string; title: string; sub: string; items: Week[]; read: string };
  creatives?: { tag: string; title: string; sub: string; items: Creative[]; read: string };
  /** Lo que no salió bien. Va siempre. */
  honest?: { tag: string; title: string; items: { k: string; d: string }[] };
  /** El plan del mes siguiente. */
  next?: { tag: string; title: string; sub: string; items: { k: string; d: string }[] };
  /** Lo que necesitamos de ella. */
  asks?: { tag: string; title: string; items: string[] };
};

export type Client = {
  slug: string;
  name: string;
  handle: string;
  city: string;
  /** Desde cuándo trabajamos juntos. */
  since: string;
  /** El punto de partida, dicho con sus palabras en el diagnóstico. */
  baseline: {
    tag: string;
    title: string;
    sub: string;
    items: { k: string; d: string }[];
  };
  /** Su economía, declarada por ella. Alimenta la calculadora. */
  economics: { ticket: number; hourly: number; capacity: string; goal: string };
  roi: {
    tag: string;
    title: string;
    sub: string;
    bookingsLabel: string;
    ticketLabel: string;
    revenue: string;
    invested: string;
    net: string;
    perBooking: string;
    breakeven: string;
    note: string;
  };
  months: Month[];
};

export const CLIENTS: Record<string, Client> = {
  kat: {
    slug: "kat",
    name: "Kat Wilde",
    handle: "@bubl.kat",
    city: "Dacula, Georgia",
    since: "July 2026",

    baseline: {
      tag: "Where we started",
      title: "July 22nd, before any of this was running.",
      sub: "Your own words from the content diagnosis, so the comparison is honest and not something we made up later.",
      items: [
        { k: "245 followers", d: "That was the account on the day we sat down. We are not going to pretend it was anything else." },
        { k: "Boosting posts, getting nothing", d: "You told us boosted content brought «likes and comments but no bookings». The attention existed. The path to a booking did not." },
        { k: "No call to action anywhere", d: "Your content made people browse. Nothing in the profile asked them to do something next." },
        { k: "No price, no process, no way to book", d: "Three questions every person asks before they message a tattoo artist, and the profile answered none of them." },
        { k: "A profile that attracted anyone", d: "«Anyone for now. Accepting anything.» Your words. Great work, no filter — so the wrong people wrote and the right ones could not tell this was for them." },
      ],
    },

    economics: { ticket: 450, hourly: 150, capacity: "12–15 sessions a month", goal: "20–22" },

    roi: {
      tag: "What it's worth",
      title: "We're not going to put your numbers in your mouth.",
      sub: "You told us your average ticket is $450. You're the only one who knows how many of these conversations ended up in your chair — move the slider and the math does itself.",
      bookingsLabel: "Sessions booked from these conversations",
      ticketLabel: "Your average ticket",
      revenue: "What that's worth",
      invested: "Ad spend this month",
      net: "Difference",
      perBooking: "Ad cost per session booked",
      breakeven: "At your $450 average, a single session covers the month's ad spend — with $123 left over.",
      note: "This is straight multiplication of your own two numbers. Nothing here is our estimate. Ad spend does not include our fee.",
    },

    months: [
      {
        id: "2026-09",
        label: "September 2026",
        window: "September 1–30, 2026 · pulled from the Meta Ads API",
        headline: "72 people started a conversation with you. Each one cost $4.54.",
        intro: [
          "September is the first full month of ads, and it is the month the account stopped being an experiment. In August we were buying information: which creative, which audience, which message. In September that information started paying.",
          "The short version: you spent $326.65 and 72 people opened a conversation with you. In August the same conversation cost $11.55. In September it cost $4.54. That is the whole story of the month, and everything below is why it happened.",
        ],
        stats: [
          { k: "Ad spend", v: "$326.65", note: "$10.89 a day" },
          { k: "Conversations started", v: "72", note: "2.4 a day" },
          { k: "Cost per conversation", v: "$4.54", note: "down from $11.55" },
          { k: "People reached", v: "19,932", note: "23,538 impressions" },
        ],

        deltas: {
          tag: "August vs September",
          title: "Everything got cheaper and bigger at the same time.",
          sub: "August covers August 21–31, which is when the ads actually started delivering. Comparing a partial month to a full one is unfair on volume, so every line below is a rate, not a total.",
          items: [
            { k: "Cost per conversation", from: "$11.55", to: "$4.54", delta: "−61%", good: true,
              why: "This is the number that matters. The same dollar now brings two and a half times more people into your DMs than it did six weeks ago." },
            { k: "Conversations per day", from: "1.09", to: "2.40", delta: "+120%", good: true,
              why: "And we got there spending slightly less per day — $12.60 in August, $10.89 in September. More results on less money." },
            { k: "Click-through rate", from: "2.02%", to: "3.39%", delta: "+68%", good: true,
              why: "A higher CTR is Meta telling us the creative is landing. It is also why the cost dropped: the platform charges you less when people respond more." },
            { k: "Cost per 1,000 impressions", from: "$12.78", to: "$13.88", delta: "+9%", good: false,
              why: "The one number that went the wrong way, and we are showing it. Reaching people got slightly more expensive — but each person got far more likely to write, which is why the result still improved so much." },
          ],
        },

        weeks: {
          tag: "Week by week",
          title: "It climbed, it peaked, and then it told us something.",
          sub: "Conversations per week, with what each one cost.",
          items: [
            { label: "Sep 1–7", conv: 15, spend: "$74.43", cpc: "$4.96" },
            { label: "Sep 8–14", conv: 22, spend: "$66.81", cpc: "$3.04" },
            { label: "Sep 15–21", conv: 18, spend: "$73.16", cpc: "$4.06" },
            { label: "Sep 22–28", conv: 9, spend: "$73.45", cpc: "$8.16" },
            { label: "Sep 29–30", conv: 8, spend: "$38.80", cpc: "$4.85" },
          ],
          read: "Week two was the best week the account has had: 22 conversations at $3.04 each. Then week four halved it at nearly double the cost. That is not the market going quiet — that is one creative running for three weeks and the same people seeing it for the fourth time. We put a new video up on the 28th and the last two days of the month came back to $4.85. That is the whole lesson of September, and it is already the rule for October: a new video every 15 days, before the numbers tell us we needed one.",
        },

        creatives: {
          tag: "What worked",
          title: "One video carried the month. The rest told us what to stop.",
          sub: "Every creative that ran in September, with what it cost and what it brought.",
          items: [
            { name: "Video september", spend: "$255.38", reach: "10,101", conv: 59, cpc: "$4.33", hero: true,
              note: "You, on camera, saying your booking hours out loud. 59 of the month's 72 conversations." },
            { name: "Video 09/28", spend: "$4.57", reach: "94", conv: 3, cpc: "$1.52",
              note: "The refresh we put up at the end of the month. Cheapest conversations of the whole month — small sample, but it is the reason October started well." },
            { name: "Video feed 09/21", spend: "$22.87", reach: "525", conv: 3, cpc: "$7.62" },
            { name: "Instagram post · «Add a little whimsy…»", spend: "$1.57", reach: "140", conv: 2, cpc: "$0.79",
              note: "An organic post we put money behind. Two conversations for a dollar fifty-seven. Worth repeating." },
            { name: "Video daytona", spend: "$18.07", reach: "948", conv: 2, cpc: "$9.04",
              note: "Testing the Florida audience early, ahead of the October trip." },
            { name: "9 other tests", spend: "$23.99", reach: "1,037", conv: 2, cpc: "$12.00",
              note: "Stencil, healed, «how long», voice-over, feed variants. All switched off. Together they cost $24 — that is what it cost to find out they were not it." },
          ],
          read: "Two things to take from this table. The first is that the winner is you talking to the camera about availability — not a tattoo close-up, not a process video. People book a person, not a portfolio. The second is that nine failed tests cost a total of $24. Testing is not expensive. Not testing is.",
        },

        honest: {
          tag: "Straight talk",
          title: "What didn't work, and what's in the way.",
          items: [
            { k: "Lead quality is still the weak spot", d: "On September 2nd you rated the seriousness of the people writing at a 2 out of 10, and most were asking for fine line — which is not the work you want to be doing. The volume is there. The filter is not yet." },
            { k: "Your price is stopping conversations", d: "You flagged it yourself on the 17th: price is a stopper. Nothing in the ads or the profile sets the expectation before they message, so the number lands cold in the DM and the conversation ends there." },
            { k: "Nobody is following up", d: "Also your own answer on the 17th: follow-ups, none. Of 72 conversations this month, the ones that went quiet are still sitting there. That is the cheapest pile of money in this entire report, and nobody has touched it." },
            { k: "One creative doing 82% of the work", d: "«Video september» brought 59 of 72 conversations. That is a great video and a fragile setup: when it fatigues, the whole month fatigues with it — which is exactly what week four looked like." },
          ],
        },

        next: {
          tag: "October",
          title: "What we're changing, and why.",
          sub: "Each of these exists because of something in the numbers above, not because it was on a list.",
          items: [
            { k: "A new video every 15 days, no exceptions", d: "Week four is the proof. We stop waiting for a creative to die before replacing it. Two new videos from you per month is what keeps the cost per conversation where it is now." },
            { k: "More of you on camera", d: "The winner was you speaking. The next two scripts lean all the way into that instead of the polished process footage." },
            { k: "Price on screen, before the DM", d: "A «this costs X and takes Y hours» video. It answers the question that is currently killing conversations and it filters out the people who were never going to pay $450." },
            { k: "A follow-up routine", d: "Every conversation that goes quiet gets one message after 48 hours and one after a week. This is the highest-return thing on this list and it costs nothing in ad spend." },
            { k: "Daytona, Florida · Oct 15–18", d: "We tested that audience in September for $18 to see if it responds before we spend real money on it. Ads pause from the 18th to the 22nd while you travel back." },
            { k: "Style-based testing", d: "Three short videos — floral, character, colour realism — to find out which work Dacula actually wants. Right now we are guessing, and this is the cheapest way to stop guessing." },
          ],
        },

        asks: {
          tag: "What we need from you",
          title: "Three things, and October runs itself.",
          items: [
            "Two new videos by the 20th — you on camera, vertical, 10 to 20 seconds, finished tattoo in the first two seconds.",
            "One «this costs X and takes Y hours» video. This is the one we expect to move the needle most.",
            "Reply to the quiet conversations from September. We'll send the templates; you send the messages.",
          ],
        },
      },
    ],
  },
};

export const CLIENT_SLUGS = Object.keys(CLIENTS);
