"use client";
import { useState } from "react";
import DetallesCard from "./detallesCard";

interface Alerta {
  id: string;
  tipo: "Incendio" | "Robo" | "Accidente";
  ubicacion: string;
  severidad: "Alta" | "Media" | "Baja";
  hora: string;
}

const alertas: Alerta[] = [
  { id: "1", tipo: "Incendio", ubicacion: "Av. Principal 123", severidad: "Alta", hora: "10:30" },
  { id: "2", tipo: "Robo", ubicacion: "Plaza Central", severidad: "Media", hora: "11:15" },
  { id: "3", tipo: "Accidente", ubicacion: "Calle 45 Norte", severidad: "Alta", hora: "09:45" },
];

const Alertas = () => {
  const [filtro, setFiltro] = useState<"Todos" | "Incendio" | "Robo" | "Accidente">("Todos");
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<Alerta | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const alertasFiltradas =
    filtro === "Todos" ? alertas : alertas.filter((alerta) => alerta.tipo === filtro);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Encabezado con menú hamburguesa */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">Alertas Activas</h2>

        {/* Botón menú visible solo en móviles */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Botones del filtro (siempre visibles en escritorio, colapsables en móvil) */}
<div
  className={`flex flex-wrap justify-center md:justify-start gap-2 mb-4 transition-all ${
    menuOpen ? "flex" : "hidden md:flex"
  }`}
>
        <button
          onClick={() => setFiltro("Todos")}
          className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
            filtro === "Todos" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setFiltro("Incendio")}
          className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
            filtro === "Incendio" ? "bg-red-500 text-white" : "bg-red-100 text-red-700"
          }`}
        >
          Incendios
        </button>

        <button
          onClick={() => setFiltro("Robo")}
          className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
            filtro === "Robo" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          Robos
        </button>

        <button
          onClick={() => setFiltro("Accidente")}
          className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
            filtro === "Accidente" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          Accidentes
        </button>
      </div>

      {/* Lista de alertas */}
      <div>
        {alertasFiltradas.length > 0 ? (
          alertasFiltradas.map((alerta) => (
            <div key={alerta.id} className="border-b border-gray-300 py-3 last:border-b-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800 flex items-center">
                  {alerta.tipo === "Incendio" && <span className="text-red-500 mr-2">🔥</span>}
                  {alerta.tipo === "Robo" && <span className="text-blue-500 mr-2">🚨</span>}
                  {alerta.tipo === "Accidente" && <span className="text-yellow-500 mr-2">⚠️</span>}
                  {alerta.tipo}
                </h3>
                <span className="text-gray-500 text-sm">{alerta.hora}</span>
              </div>
              <p className="text-gray-600 text-sm">{alerta.ubicacion}</p>
              <p className="text-gray-500 text-xs">
                Severidad:{" "}
                <span
                  className={`${
                    alerta.severidad === "Alta" ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {alerta.severidad}
                </span>
              </p>
              <button
                onClick={() => setAlertaSeleccionada(alerta)}
                className="text-blue-500 text-sm mt-1 hover:underline"
              >
                Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay alertas en esta categoría.</p>
        )}
      </div>

      {/* Modal de detalles */}
      <DetallesCard alerta={alertaSeleccionada} onClose={() => setAlertaSeleccionada(null)} />
    </div>
  );
};

export default Alertas;
