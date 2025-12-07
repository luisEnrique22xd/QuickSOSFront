"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// 1. Interfaz de Datos Alinearada con el nuevo campo del Backend
interface Alerta {
  id: string;
  title: string;
  description: string;
  alertType: "Incendio" | "Robo" | "Accidente" | string;
  status: "En Proceso" | "Resuelto" | string;
  latitude: number;
  longitude: number;
  createdAt: { _seconds: number };   // <— LA QUE VIENE DE TU BACK
  imageurl?: string;
}


interface Props {
  alerta: Alerta | null;
  onClose: () => void;
}


const DetallesCard: React.FC<Props> = ({ alerta, onClose }) => {

  // 🟢 2. HOOKS MOVIDOS AL PRINCIPIO (Solución a error de Hooks)
  const [direccion, setDireccion] = useState("Cargando ubicación...");

  // Lógica de Geocodificación Inversa
  useEffect(() => {
    if (!alerta || !alerta.latitude || !alerta.longitude) {
      return;
    }

    setDireccion("Buscando dirección legible...");

    // API de Geocodificación Inversa (Nominatim)
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${alerta.latitude}&lon=${alerta.longitude}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.display_name) {
          setDireccion(data.display_name);
        } else {
          setDireccion("Dirección no encontrada.");
        }
      })
      .catch(err => {
        console.error("Error al obtener geocodificación:", err);
        setDireccion("Error al cargar dirección.");
      });
  }, [alerta]);


  // 3. SALIDA ANTICIPADA MOVIDA DESPUÉS DE LOS HOOKS
  if (!alerta) return null;


  // 4. Cálculo de Fecha y Hora (CORREGIDO)
  let hora = "N/D";
  let fecha = "N/D";

  // 🚨 Usamos el nuevo campo numérico para el cálculo
  if (alerta.createdAt?._seconds) {
    const timestampMs = alerta.createdAt._seconds * 1000;

      const date = new Date(timestampMs);
      
      hora = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      fecha = date.toLocaleDateString();
  }

  // Clase para colorear el estado
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Resuelto":
        return "text-green-600 font-bold";
      case "En Proceso":
        return "text-orange-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full relative"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black border-b pb-2">{alerta.title}</h2>

        <div className="space-y-3 text-sm">
          <p className="text-gray-700">🚨 Tipo de Alerta: <span className="font-semibold">{alerta.alertType}</span></p>

          {/* 📍 Ubicación Legible */}
          <p className="text-gray-700">📍 Ubicación: <span className="font-semibold">{direccion}</span></p>

          {/* 🗺️ Coordenadas (para referencia) */}
          <p className="text-gray-500 text-xs">🗺️ Coordenadas: {alerta.latitude.toFixed(5)}, {alerta.longitude.toFixed(5)}</p>

          {/* 📅 Fecha y Hora Corregidas */}
          <p className="text-gray-700">📅 Fecha: <span className="font-semibold">{fecha}</span></p>
          <p className="text-gray-700">⏰ Hora: <span className="font-semibold">{hora}</span></p>

          <p className="text-gray-700 mt-4">
            ⚡ Estado Actual:{" "}
            <span className={getStatusClass(alerta.status)}>
              {alerta.status}
            </span>
          </p>

          <div className="pt-3 border-t">
            <h3 className="font-semibold mb-1 text-gray-800">Descripción:</h3>
            <p className="text-gray-600 italic">{alerta.description}</p>
          </div>
        </div>

        {/* 🖼️ LÓGICA DE LA IMAGEN */}
        {alerta.imageUrl && ( // Solo si imagenUrl NO es null o vacío
          <div className="mt-4 border p-2 rounded-md bg-gray-50">
            <p className="text-gray-800 font-semibold mb-2">Evidencia:</p>
            <img
              src={alerta.imageUrl} // Usa la URL de Supabase directamente
              alt={`Evidencia de ${alerta.title}`}
              className="w-full h-auto rounded-md object-cover max-h-55"
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Cerrar
        </button>

      </motion.div>
    </div>
  );
};

export default DetallesCard;