'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock hotspots in India
const hotspots = [
  { id: 1, name: 'Mumbai Cyber Cell', position: [19.0760, 72.8777], risk: 'High', cases: 450 },
  { id: 2, name: 'Delhi NCR Fraud Ring', position: [28.7041, 77.1025], risk: 'Critical', cases: 820 },
  { id: 3, name: 'Bengaluru Tech Scams', position: [12.9716, 77.5946], risk: 'Medium', cases: 310 },
  { id: 4, name: 'Hyderabad Identity Theft', position: [17.3850, 78.4867], risk: 'High', cases: 490 },
  { id: 5, name: 'Kolkata Phishing Hub', position: [22.5726, 88.3639], risk: 'Critical', cases: 670 },
  { id: 6, name: 'Chennai Card Cloning', position: [13.0827, 80.2707], risk: 'Medium', cases: 250 },
  { id: 7, name: 'Pune Mule Accounts', position: [18.5204, 73.8567], risk: 'Medium', cases: 180 },
  { id: 8, name: 'Ahmedabad Counterfeit', position: [23.0225, 72.5714], risk: 'High', cases: 420 },
  { id: 9, name: 'Jamtara Operations', position: [23.9575, 86.8124], risk: 'Critical', cases: 1200 },
];

const getColor = (risk: string) => {
  switch (risk) {
    case 'Critical': return '#FF3B5C'; // Destructive
    case 'High': return '#FFC857'; // Warning
    case 'Medium': return '#00E5FF'; // Primary
    default: return '#5B5FEF';
  }
};

export default function MapComponent() {
  return (
    <MapContainer 
      center={[20.5937, 78.9629]} // Center of India
      zoom={5} 
      style={{ height: '100%', width: '100%', background: '#0B1120' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {hotspots.map((spot) => (
        <CircleMarker
          key={spot.id}
          center={spot.position as [number, number]}
          radius={Math.max(10, spot.cases / 40)}
          pathOptions={{ 
            color: getColor(spot.risk), 
            fillColor: getColor(spot.risk), 
            fillOpacity: 0.6 
          }}
        >
          <Popup className="dark-popup">
            <div className="p-2">
              <h3 className="font-bold text-foreground">{spot.name}</h3>
              <p className="text-sm mt-1">Risk Level: <span style={{ color: getColor(spot.risk) }} className="font-semibold">{spot.risk}</span></p>
              <p className="text-sm">Active Cases: {spot.cases}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
