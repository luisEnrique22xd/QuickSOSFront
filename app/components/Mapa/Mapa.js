"use client"; // si estás usando app router

import dynamic from "next/dynamic";

// ⚠️ Importa dinámicamente SOLO el componente que usa Leaflet
const MapaInterno = dynamic(() => import("./MapaInterno"), {
  ssr: false, // obligatorio para evitar errores con window
});

export default function Mapa() {
  return <MapaInterno />;
}
