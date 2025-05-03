// src/components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type MarkerData = {
  lat: number;
  lng: number;
  jenis: string;
};

type MapViewProps = {
  markers: MarkerData[];
  selectedLocation: { lat: number; lng: number } | null;
};

function FlyToLocation({ selectedLocation }: { selectedLocation: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 16);
    }
  }, [selectedLocation, map]);

  return null;
}

const MapView = ({ markers, selectedLocation }: MapViewProps) => {
  return (
    <div className="relative z-0 h-80">
      <MapContainer
        center={[-8.15587, 113.716622]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>{marker.jenis}</Popup>
          </Marker>
        ))}

        {/* ← Tambahkan komponen ini */}
        <FlyToLocation selectedLocation={selectedLocation} />
      </MapContainer>
    </div>
  );
};

export default MapView;
