import { useState } from 'react';
import Map, { Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { mockGeoJSON } from '../data/mockGeoJSON';

// 1. Removed the strict FillLayer type annotation to bypass TS errors
const parcelLayerStyle = {
  id: 'parcels-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'status'],
      'registered', '#22c55e',    // Green
      'under_process', '#3b82f6', // Blue
      'disputed', '#ef4444',      // Red
      '#94a3b8'                   // Default Gray fallback
    ],
    'fill-opacity': 0.6,
    'fill-outline-color': '#0f172a'
  }
};

export default function CadastralMap() {
  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);

  const handleMapClick = (event: any) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setSelectedParcel(feature.properties);
    } else {
      setSelectedParcel(null);
    }
  };

  return (
    <div className="w-full grid grid-cols-12 gap-8 font-sans">
      {/* Map Interactive Canvas */}
      <div className="col-span-12 lg:col-span-8 h-[600px] w-full rounded-xl border border-slate-200 overflow-hidden relative">
        <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: 77.709,
            latitude: 29.168,
            zoom: 15
          }}
          mapStyle={{ version: 8, sources: {}, layers: [] }}
          interactiveLayerIds={['parcels-fill']} // Makes polygons clickable
          onClick={handleMapClick}
          cursor={selectedParcel ? 'pointer' : 'grab'}
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="top-left" />
          
          {/* Free OpenStreetMap Raster Base Layer */}
          <Source id="osm-tiles" type="raster" tiles={['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png']} tileSize={256}>
            <Layer id="osm-base" type="raster" minzoom={0} maxzoom={19} />
          </Source>

          {/* GeoJSON Polygon Overlay */}
          <Source id="cadastral-parcels" type="geojson" data={mockGeoJSON as any}>
            {/* 2. Cast to any to bypass strict React-Map-GL v8 type checking */}
            <Layer {...(parcelLayerStyle as any)} />
          </Source>
        </Map>
      </div>

      {/* Dynamic Cadastral Inspector Panel */}
      <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        {selectedParcel ? (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <h2 className="font-serif text-2xl text-[#1E3A8A] border-b pb-3">
              Khasra #{selectedParcel.khasraNumber || selectedParcel.khasra}
            </h2>
            <div className="flex flex-col gap-3 text-sm text-slate-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Status:</span>
                <span className="uppercase">{selectedParcel.status}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Owner:</span>
                <span>{selectedParcel.owner}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Total Area:</span>
                <span>{selectedParcel.area || selectedParcel.recArea}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-center text-sm">
            Click a colored land parcel on the map <br />to inspect its details.
          </div>
        )}
      </div>
    </div>
  );
}