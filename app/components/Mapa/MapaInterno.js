"use client";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// --- 1. Definición de los Íconos Personalizados (SVG - PIN DINÁMICO) ---

const createCustomIcon = (colorHex) => {
  // 🟢 Ícono SVG de Pin de Ubicación. El color se inyecta dinámicamente.
  const svgIcon = `
    <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      
      <path 
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
        fill="${colorHex}" 
        stroke="#fff" 
        stroke-width="0.5" 
      />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-marker',
    html: svgIcon,
    iconSize: [40, 40],
    iconAnchor: [12, 40],
    popupAnchor: [0, -38]
  });
};

// Mapeo de tipos de alerta a colores y creación de íconos
const ICON_TYPES = {
  'Incendio': createCustomIcon('#EF4444'), // Rojo
  'Robo': createCustomIcon('#3B82F6'),     // Azul
  'Accidente': createCustomIcon('#F59E0B'),  // Naranja/Ámbar
  'Otro': createCustomIcon('#6B7280')     // Gris
};
// ----------------------------------------------------


export default function MapaInterno() {

  // Estados
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const centerPosition = [19.02963, -98.22987];

  // Hook para cargar las alertas desde el Backend
  useEffect(() => {
    // 🚨 Solución al problema de los íconos por defecto de Leaflet en Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Iniciar la carga de datos
    fetch('http://127.0.0.1:8000/api/alerts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Revisa la configuración CORS en Django.`);
        }
        return response.json();
      })
      .then(data => {
        // AJUSTAR SEGÚN EL FORMATO DE RESPUESTA DE DJANGO
        setAlerts(data.alerts || data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener alertas:", err);
        setError("Fallo la carga de datos del backend. ¿CORS configurado?");
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <div style={{ height: "500px", textAlign: "center", paddingTop: "200px" }}>Cargando mapa y alertas...</div>;
  }

  if (error) {
    return <div style={{ height: "500px", textAlign: "center", paddingTop: "200px", color: "red" }}>Error: {error}</div>;
  }

  // Renderizado del mapa y marcadores dinámicos
  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        {alerts.map((alert) => {
          const icon = ICON_TYPES[alert.alertType] || ICON_TYPES['Otro'];

          // Verifica coordenadas
          if (alert.latitude && alert.longitude) {
            return (
              <Marker
                key={alert.id}
                icon={icon} // Ícono de color dinámico
                position={[alert.latitude, alert.longitude]}
              >
                <Popup>
                  <strong>{alert.title}</strong>
                  <br />
                  Tipo: {alert.alertType}
                  <br />
                  Descripcion: {alert.description}
                  <br />
                  { }
                  {alert.imageUrl && (
                    <img
                      src={alert.imageUrl}
                      alt="Evidencia"
                      style={{
                        maxWidth: '100%',     // 🟢 1. Usar 100% del contenedor del popup
                        maxHeight: '150px',    // 🟢 2. Definir una altura máxima razonable
                        width: '100%',         // 🟢 3. Ocupar todo el ancho (para centrar)
                        objectFit: 'contain',  // 🟢 4. CLAVE: Mantiene la proporción y muestra toda la imagen.
                        objectPosition: 'center' // 🟢 5. Centra la imagen dentro del espacio disponible.
                      }}
                    />
                  )}
                  <br />
                  Estado: <strong>{alert.status}</strong>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MarkerClusterGroup>

    </MapContainer>
  );
}