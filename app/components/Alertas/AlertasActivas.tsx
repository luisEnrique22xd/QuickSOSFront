"use client";

import { useEffect, useState } from "react"; // Necesitas useEffect para el fetch
import DetallesCard from "./detallesCard"; // Asumiendo que este componente existe

// 1. Interfaz ajustada para coincidir con el backend de Django/Firestore
interface Alerta {
  id: string;
  title: string;
  description: string;
  alertType: "Incendio" | "Robo" | "Accidente" | string; // Permitir 'string' para otros tipos
  status: "En Proceso" | "Resuelto" | string;
  latitude: number;
  longitude: number;
  createdAt: { _seconds: number };
  imageurl?: string;
}

const Alertas = () => {
  // 2. Estados para la lógica del componente
  const [alerts, setAlerts] = useState<Alerta[]>([]); // Estado que guarda las alertas del backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<"Todos" | "Incendio" | "Robo" | "Accidente">("Todos");
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<Alerta | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 3. Hook para hacer el FETCH a tu API de Django
  useEffect(() => {
    // Asegúrate de que Django esté corriendo en 8000
    fetch('http://127.0.0.1:8000/api/alerts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`La conexión falló. Código: ${response.status}. ¿CORS o servidor caído?`);
        }
        return response.json();
      })
      .then((data: Alerta[]) => {
        setAlerts(data); // Almacenar los datos reales
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener datos:", err);
        setError("Fallo al cargar las alertas del servidor.");
        setLoading(false);
      });
  }, []); // Se ejecuta solo al montar el componente

  // 4. Lógica de Filtrado usando los datos reales (alerts)
  const alertasFiltradas =
    filtro === "Todos" 
      ? alerts 
      : alerts.filter((alerta) => alerta.alertType === filtro);
  
  // 5. Función para obtener el color y emoji basado en el tipo
  const getAlertTypeProps = (type: string) => {
    switch (type) {
      case "Incendio":
        return { color: "text-red-500", emoji: "🔥" };
      case "Robo":
        return { color: "text-blue-500", emoji: "🚨" };
      case "Accidente":
        return { color: "text-yellow-500", emoji: "⚠️" };
      default:
        return { color: "text-gray-500", emoji: "📌" };
    }
  };

  // 6. Manejo de estados de carga y error
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-40">
        <p className="text-gray-600">Cargando alertas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h2 className="text-xl font-semibold text-red-700">Error de Conexión</h2>
        <p className="text-sm text-gray-600">No se pudieron cargar las alertas. {error}</p>
        <p className="text-xs mt-2 text-gray-500">Verifica que tu servidor de Django esté activo y que la configuración CORS permita el acceso desde localhost:3000.</p>
      </div>
    );
  }

  // 7. Renderizado del componente (usando los datos reales)
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

      {/* Botones del filtro */}
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

        {/* Los botones usan alertType === filtro */}
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

      {/* Lista de alertas dinámica */}
      <div className="max-h-[50vh] overflow-y-auto">
        {alertasFiltradas.length > 0 ? (
          alertasFiltradas.map((alerta) => {
            const { color, emoji } = getAlertTypeProps(alerta.alertType);
            const statusColor = alerta.status === "Resuelto" ? "text-green-500" : "text-orange-500";
            const time = alerta.createdAt ? new Date(alerta.createdAt._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/D";
            
            return (
              <div key={alerta.id} className="border-b border-gray-300 py-3 last:border-b-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <span className={`${color} mr-2`}>{emoji}</span>
                    {alerta.alertType}
                  </h3>
                  <span className="text-gray-500 text-sm">{time}</span>
                </div>
                <p className="text-gray-600 text-sm">{alerta.title}</p>
                <p className="text-gray-500 text-xs">
                  Estado:{" "}
                  <span className={statusColor}>
                    {alerta.status}
                  </span>
                </p>
                <button
                  onClick={() => setAlertaSeleccionada(alerta)}
                  className="text-blue-500 text-sm mt-1 hover:underline"
                >
                  Ver Detalles
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No hay alertas activas en esta categoría.</p>
        )}
      </div>

      {/* Modal de detalles */}
      {/* Pasamos la alerta completa, incluyendo la URL de la imagen y coordenadas */}
      <DetallesCard alerta={alertaSeleccionada} onClose={() => setAlertaSeleccionada(null)} />
    </div>
  );
};

export default Alertas;