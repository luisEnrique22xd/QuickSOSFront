"use client";
import { motion } from "framer-motion";

interface Alerta {
  id: string;
  tipo: "Incendio" | "Robo" | "Accidente";
  ubicacion: string;
  severidad: "Alta" | "Media" | "Baja";
  hora: string;
}

interface Props {
  alerta: Alerta | null;
  onClose: () => void;
}


const DetallesCard: React.FC<Props> = ({ alerta, onClose }) => {
  if (!alerta) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-[9999]">
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

        <h2 className="text-xl font-semibold mb-4 text-black">Detalles de la Alerta</h2>
        <p className="text-gray-700 mb-2">🚨 Tipo: {alerta.tipo}</p>
        <p className="text-gray-700 mb-2">📍 Ubicación: {alerta.ubicacion}</p>
        <p className="text-gray-700 mb-2">⏰ Hora: {alerta.hora}</p>
        <p className="text-gray-700">
          ⚡ Severidad:{" "}
          <span
            className={
              alerta.severidad === "Alta"
                ? "text-red-600 font-bold"
                : alerta.severidad === "Media"
                ? "text-yellow-600 font-semibold"
                : "text-green-600"
            }
          >
            {alerta.severidad}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default DetallesCard;
