"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Solución al bug del icono
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapaInterno() {
  const center = [19.02963, -98.22987]; // CDMX
  const position = [19.395779, -98.007649]; // Posición del marcador
  const position2 = [19.454562, -97.765431]; // Posición del segundo marcador (opcional)

  return (
    <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>¡Aquí hubo una emergencia!</Popup>
      </Marker>
      <Marker position={position}>
        <Popup>¡Aquí hubo un incendio!</Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>¡Aquí hubo un incendio!</Popup>
      </Marker>
    </MapContainer>
  );
}
