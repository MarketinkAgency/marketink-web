"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent } from "./Consent";

const GA = process.env.NEXT_PUBLIC_GA_ID;      // G-XXXXXXXXXX
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID; // 1234567890

/**
 * Medición — desactivada hasta que existan los identificadores.
 *
 * Para encenderla, en Vercel → Settings → Environment Variables:
 *
 *   NEXT_PUBLIC_GA_ID          = G-XXXXXXXXXX      (Google Analytics 4)
 *   NEXT_PUBLIC_META_PIXEL_ID  = 1234567890123456  (Meta Pixel)
 *
 * Guardas, redespliegas, y empieza a medir. Sin las variables no se
 * carga ni un byte: nada de scripts colgando ni cookies fantasma.
 *
 * Y nada se carga tampoco hasta que el visitante acepta. Esa es la
 * parte que hace legal el píxel en la UE y el Reino Unido, y la que
 * casi todo el mundo se salta.
 *
 * Recuerda añadir los dominios a la CSP de next.config.ts cuando los
 * actives, o el navegador los bloqueará y no entenderás por qué.
 */
export default function Analytics() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(readConsent() === "all");
    const onChoice = (e: Event) => setOk((e as CustomEvent).detail === "all");
    window.addEventListener("mk-consent", onChoice);
    return () => window.removeEventListener("mk-consent", onChoice);
  }, []);

  if (!ok) return null;

  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
              gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
