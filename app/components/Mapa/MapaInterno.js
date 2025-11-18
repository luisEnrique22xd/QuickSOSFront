// app/components/Mapa/Mapainterno.js
"use client";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster'; // 🚨 Nuevo Import

// --- 1. Definición de los Íconos Personalizados (SVG) ---

const createCustomIcon = (colorHex) => {
  // Ícono SVG circular con signo de exclamación
  const svgIcon = `
      <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="${colorHex}" stroke="#fff" stroke-width="5"/>
        <text x="50" y="50" font-size="60" text-anchor="middle" dominant-baseline="central" fill="#fff">!</text>
      </svg>`;

  return L.divIcon({
    className: 'custom-marker', // Puedes usar esta clase para CSS adicional
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
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
        // 🚨 AJUSTAR SEGÚN EL FORMATO DE RESPUESTA DE DJANGO:
        // Si tu JSON es { "alerts": [...] }, usa data.alerts. Si es un array directo, usa data.
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

      {/* 🟢 Implementación del Clustering de Marcadores */}
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
                  {alert.description}
                  <br />
                  {alert.imageurl && (
                    <img src={alert.imageurl} alt="Evidencia" style={{ maxWidth: '100px' }} />
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