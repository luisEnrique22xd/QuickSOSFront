"use client";

import { useEffect, useState } from "react"; // 🟢 IMPORTAR useEffect y useState
import DetallesCard from "./detallesCard";

// 1. Interfaz AJUSTADA
interface Alerta {
  id: string;
  title: string;
  description: string;
  alertType: "Incendio" | "Robo" | "Accidente" | string;
  status: "En Proceso" | "Resuelto" | string;
  latitude: number;
  longitude: number;

  // 🟢 CORRECCIÓN DE TIPO: Usar 'number | null | undefined' si la API puede devolver 'undefined'
  createdAtSeconds: number | null | undefined;
  imageurl?: string; // Remove | null to match DetallesCard expectations
}

const Alertas = () => {
  // 2. ESTADOS
  const [alertas, setAlertas] = useState<Alerta[]>([]); // 🟢 ESTADO ES 'alertas'
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado de carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado de error
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<Alerta | null>(null);

  // 3. LÓGICA DE FETCH (Añadida)
  useEffect(() => {
    // Asegúrate de que Django esté corriendo en 8000
    fetch('https://quicksosbackend-production.up.railway.app/api/alerts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Alerta[] = await response.json();
        setAlertas(data);

      } catch (err) {
        console.error("Error al cargar alertas:", err);
        setError("Error al cargar las alertas desde el servidor. Verifique el backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []); // Se ejecuta solo al montar

  const getAlertTypeProps = (alertType: string): { color: string; emoji: string } => {
    switch (alertType) {
      case "Incendio":
        return { color: "text-red-500", emoji: "🔥" };
      case "Robo":
        return { color: "text-purple-500", emoji: "🚨" };
      case "Accidente":
        return { color: "text-yellow-500", emoji: "⚠️" };
      default:
        return { color: "text-gray-500", emoji: "❓" };
    }
  };

  // 4. Filtrado de alertas (CORRECTO, usa 'alertas')
  let alertasFiltradas = alertas.filter(alerta =>
    alerta.status === "En Proceso"
  );

  // Si deseas agregar filtros de tipo/estado, descomenta y usa los estados:
  /*
  if (filtroTipo) {
    alertasFiltradas = alertasFiltradas.filter(a => a.alertType === filtroTipo);
  }
  if (filtroEstado) {
    alertasFiltradas = alertasFiltradas.filter(a => a.status === filtroEstado);
  }
  */

  // 5. Manejo de estados de carga y error
  if (loading) {
    return <div className="text-center p-4 text-gray-600">Cargando alertas activas...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 font-semibold">{error}</div>;
  }

  // 6. Renderizado del componente
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* ... Encabezado y Filtros (Debes añadir el JSX para los filtros aquí) ... */}

      {/* Lista de alertas dinámica */}
      <div className="max-h-[50vh] overflow-y-auto">
        {alertasFiltradas.length > 0 ? (
          alertasFiltradas.map((alerta) => {
            const { color, emoji } = getAlertTypeProps(alerta.alertType);
            const statusColor = alerta.status === "Resuelto" ? "text-green-500" : "text-orange-500";

            // Corregido: Usar createdAtSeconds
            const time = alerta.createdAtSeconds
              ? new Date(alerta.createdAtSeconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : "N/D";

            return (
              <div key={alerta.id} className="border-b border-gray-300 py-3 last:border-b-0 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 flex items-center">
                    <span className={`mr-2 ${color}`}>{emoji}</span> {alerta.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Reportado a las {time}</p>
                </div>
                <button
                  onClick={() => setAlertaSeleccionada(alerta)}
                  className="text-blue-500 text-sm hover:underline p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                >
                  Ver Detalles
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm p-4 text-center">No hay alertas activas en este momento.</p>
        )}
      </div>

      {/* Modal de detalles */}
      {alertaSeleccionada && (
        <DetallesCard alerta={alertaSeleccionada} onClose={() => setAlertaSeleccionada(null)} />
      )}
    </div>
  );
};

export default Alertas;