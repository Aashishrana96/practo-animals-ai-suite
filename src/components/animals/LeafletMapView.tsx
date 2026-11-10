import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Provider } from '../../types';
import { Star, Phone, MessageSquare, ExternalLink } from 'lucide-react';

interface LeafletMapViewProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  onOpenDetails: (provider: Provider) => void;
}

export const LeafletMapView: React.FC<LeafletMapViewProps> = ({
  providers,
  selectedProvider,
  onSelectProvider,
  onOpenDetails
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Default center on Bangalore
    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // OpenStreetMap standard tile layer (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when providers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    if (providers.length === 0) return;

    const bounds = L.latLngBounds([]);

    providers.forEach((p) => {
      const lat = p.coordinates.lat;
      const lng = p.coordinates.lng;
      bounds.extend([lat, lng]);

      // Category color & icon
      let badgeColor = '#0F766E'; // teal
      let iconEmoji = '🩺';
      if (p.serviceType === 'hospital') {
        badgeColor = '#DC2626'; // red
        iconEmoji = '🏥';
      } else if (p.serviceType === 'ambulance') {
        badgeColor = '#E11D48'; // crimson
        iconEmoji = '🚑';
      } else if (p.serviceType === 'boarding') {
        badgeColor = '#D97706'; // amber
        iconEmoji = '🏡';
      } else if (p.serviceType === 'diagnostics') {
        badgeColor = '#4F46E5'; // indigo
        iconEmoji = '🔬';
      } else if (p.serviceType === 'ngo') {
        badgeColor = '#059669'; // emerald
        iconEmoji = '🕊️';
      }

      const isSelected = selectedProvider?.id === p.id;

      // Custom Leaflet DivIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${badgeColor};
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            border: 2px solid ${isSelected ? '#FBBF24' : '#FFFFFF'};
            transform: translate(-50%, -50%) scale(${isSelected ? 1.25 : 1});
            transition: transform 0.2s;
            cursor: pointer;
            white-space: nowrap;
          ">
            <span>${iconEmoji}</span>
            <span>₹${p.consultationFee}</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Popup content
      const popupHtml = `
        <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; width: 220px; padding: 4px;">
          <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 10px; font-weight: 800; color: ${badgeColor}; text-transform: uppercase;">${p.serviceType.toUpperCase()} • ${p.locality}</div>
          <div style="font-size: 13px; font-weight: 800; color: #0F172A; line-height: 1.25; margin-top: 2px;">${p.name}</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Fee: <strong style="color: #0F172A;">₹${p.consultationFee}</strong> • ${p.rating} ★ (${p.reviewCount})</div>
          <div style="margin-top: 8px; display: flex; gap: 6px;">
            <a href="tel:${p.emergencyPhone || p.phone}" style="flex: 1; padding: 6px 0; background: #DC2626; color: white; text-align: center; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">Call</a>
            <a href="https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}?text=Hi!%20Found%20you%20on%20PawPulse." target="_blank" style="flex: 1; padding: 6px 0; background: #059669; color: white; text-align: center; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">WhatsApp</a>
          </div>
          <button id="view-profile-btn-${p.id}" style="width: 100%; margin-top: 6px; padding: 6px 0; background: #0F766E; color: white; border: none; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;">
            Full Profile & Reviews ➔
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectProvider(p);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-profile-btn-${p.id}`);
        if (btn) {
          btn.onclick = () => onOpenDetails(p);
        }
      });

      markersLayer.addLayer(marker);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [providers, selectedProvider]);

  return (
    <div className="relative w-full h-[580px] rounded-2xl overflow-hidden border border-slate-300 shadow-md">
      {/* Map Target Div */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Map Legend */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-lg text-xs text-slate-800 space-y-1 hidden sm:block">
        <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 mb-1">
          OpenStreetMap Verified Pins ({providers.length})
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold"><span className="text-rose-600">🏥</span> Hospital</span>
          <span className="flex items-center gap-1 font-semibold"><span className="text-teal-600">🩺</span> Clinic</span>
          <span className="flex items-center gap-1 font-semibold"><span className="text-rose-500">🚑</span> Ambulance</span>
          <span className="flex items-center gap-1 font-semibold"><span className="text-amber-600">🏡</span> Boarding</span>
          <span className="flex items-center gap-1 font-semibold"><span className="text-indigo-600">🔬</span> Lab</span>
          <span className="flex items-center gap-1 font-semibold"><span className="text-emerald-600">🕊️</span> NGO</span>
        </div>
      </div>
    </div>
  );
};
