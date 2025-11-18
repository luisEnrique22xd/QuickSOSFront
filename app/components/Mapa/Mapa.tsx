// app/components/Mapa/Mapa.tsx
"use client";

import dynamic from "next/dynamic";

const MapaInterno = dynamic(() => import("./MapaInterno"), {
  ssr: false,
});

const MapaDeAlertas = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-black">Mapa de Alertas</h2>

      <div className="flex-grow" style={{ height: "500px" }}>
        <MapaInterno />
      </div>

      {/* LEYENDA ACTUALIZADA */}
      <div className="mt-4 flex space-x-4 text-sm">

        {/* Incendios (ROJO - #EF4444) */}
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Incendios</span>
        </div>

        {/* Robos (AZUL - #3B82F6) */}
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Robos</span>
        </div>

        {/* Accidentes (NARANJA/AMARILLO - #F59E0B) */}
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Accidentes</span>
        </div>

        {/* Otros (GRIS - #6B7280) */}
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Otros</span>
        </div>
      </div>
    </>
  );
};

export default MapaDeAlertas;