"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Revelado por máscara, palabra por palabra.
 *
 * Cada palabra vive dentro de un corte con `overflow: hidden` y entra
 * subiendo desde debajo. Es la técnica de los estudios que ganan premios
 * y cuesta cero: solo transform, sin librerías, sin WebGL.
 *
 * Accesibilidad: se parte por PALABRAS, no por caracteres. Los lectores de
 * pantalla leen el texto igual. Con `prefers-reduced-motion` no se anima.
 *
 * OJO: el espacio entre palabras va FUERA del corte. Si va dentro, el
 * `overflow: hidden` se lo come y el título sale pegado.
 */
export default function Split({
  text,
  className = "",
  dim,
  delay = 0,
  stagger = 42,
  tail,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** Palabras a partir de este índice se pintan apagadas. */
  dim?: number;
  delay?: number;
  stagger?: number;
  /** Se pinta pegado a la última palabra, dentro de la misma línea. */
  tail?: ReactNode;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={`split ${className}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="split-w">
            <span
              className={dim !== undefined && i >= dim ? "text-faint" : undefined}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
      {tail}
    </Tag>
  );
}
