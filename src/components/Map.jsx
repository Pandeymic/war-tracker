import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
  iconSize: [30, 30],
});

export default function Map({ events }) {
  return (
    <MapContainer center={[32, 53]} zoom={5} className="flex-1 z-0" style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events.filter(e => e.lat && e.lng).map(event => (
        <Marker key={event.id} position={[event.lat, event.lng]} icon={icon}>
          <Popup>
            <strong>{event.title}</strong><br />
            <a href={event.link} target="_blank">Read more</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
