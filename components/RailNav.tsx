"use client";

import { useEffect, useState } from "react";

/**
 * Índice lateral numerado.
 *
 * Marca en qué sección estás mientras bajas. En una página larga es lo
 * que la hace sentir intencional en vez de infinita. Solo en pantallas
 * anchas: en portátiles estrechos se comería el margen del contenido.
 */
export default function RailNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const secs = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!secs.length) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // la sección activa es la última cuyo borde superior ya pasó
        // el tercio superior de la pantalla
        const line = window.innerHeight * 0.34;
        let cur = secs[0].id;
        for (const s of secs) if (s.getBoundingClientRect().top <= line) cur = s.id;
        setActive(cur);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav className="rail-nav" aria-label="Índice">
      {items.map((i, n) => (
        <a key={i.id} href={`#${i.id}`} className={i.id === active ? "on" : undefined}>
          {String(n + 1).padStart(2, "0")}
          <em>{i.label}</em>
        </a>
      ))}
    </nav>
  );
}
