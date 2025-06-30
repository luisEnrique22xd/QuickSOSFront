"use client";

import dynamic from "next/dynamic";

// Importación dinámica del componente que contiene el mapa real
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

      <div className="mt-4 flex space-x-4 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Incendios</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Robos</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
          <span className="text-gray-800">Accidentes</span>
        </div>
      </div>
    </>
  );
};

export default MapaDeAlertas;
