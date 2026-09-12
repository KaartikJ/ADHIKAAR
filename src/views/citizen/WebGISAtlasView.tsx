import React, { useState, useMemo, useRef } from 'react';
import Map, { Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PARCELS } from '../../data/mockData';
import { mockGeoJSON } from '../../data/mockGeoJSON';

interface Props {
  selectedKhasra?: string;
  onSelectParcel: (khasra: string) => void;
  onExportPDF: (khasra: string) => void;
  onOpenAudit: () => void;
}

export const WebGISAtlasView: React.FC<Props> = ({
  selectedKhasra = '789',
  onSelectParcel,
  onExportPDF,
  onOpenAudit
}) => {
  const [filterLayer, setFilterLayer] = useState<'ALL' | 'VERIFIED' | 'DISPUTED' | 'PMKISAN'>('ALL');
  const [measuring, setMeasuring] = useState(false);
  const [showInspector, setShowInspector] = useState(true);
  
  const mapRef = useRef<any>(null);
  const parcel = PARCELS[selectedKhasra] || PARCELS['789'];

  // Pre-process GeoJSON for MapLibre Data-Driven Styling
  const processedGeoJSON = useMemo(() => {
    if (!mockGeoJSON) return null;
    
    const features = mockGeoJSON.features.filter((f: any) => {
      if (filterLayer === 'ALL') return true;
      if (filterLayer === 'VERIFIED' && f.properties.status === 'verified') return true;
      if (filterLayer === 'DISPUTED' && f.properties.status === 'disputed') return true;
      if (f.properties.type === 'canal' || f.properties.type === 'road') return true;
      return false;
    }).map((f: any) => {
      const isSelected = f.properties.khasra === selectedKhasra;
      let fillColor = '#e2e8f0';
      let outlineColor = '#64748b';
      
      if (f.properties.type === 'canal') { fillColor = '#2563eb'; outlineColor = '#1d4ed8'; }
      else if (f.properties.type === 'road') { fillColor = '#475569'; outlineColor = '#334155'; }
      else if (f.properties.status === 'verified') { 
        fillColor = isSelected ? '#bbf7d0' : '#dcfce7'; 
        outlineColor = isSelected ? '#15803d' : '#16a34a'; 
      }
      else if (f.properties.status === 'residential') { 
        fillColor = isSelected ? '#bfdbfe' : '#e0f2fe'; 
        outlineColor = '#0284c7'; 
      }
      else if (f.properties.status === 'disputed') { 
        fillColor = '#fee2e2'; 
        outlineColor = '#dc2626'; 
      }
      else if (isSelected) { fillColor = '#cbd5e1'; }

      return {
        ...f,
        properties: { ...f.properties, fillColor, outlineColor }
      };
    });

    return { ...mockGeoJSON, features };
  }, [filterLayer, selectedKhasra]);

  // MapLibre Layer Definition
  const parcelLayerStyle = {
    id: 'parcels',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'fillColor'],
      'fill-opacity': 0.7,
      'fill-outline-color': ['get', 'outlineColor']
    }
  };

  const handleMapClick = (event: any) => {
    const feature = event.features && event.features[0];
    if (feature && feature.properties.type === 'parcel') {
      onSelectParcel(feature.properties.khasra);
    }
  };

  return (
    <div id="webgis-cadastral-atlas" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cbd5e1] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Spatial Decision Support System (SDSS)</span>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Village Hastinapur (Sheet 04)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            WebGIS Cadastral Atlas & Boundary Viewer
          </h1>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setFilterLayer('ALL')} className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${filterLayer === 'ALL' ? 'bg-[#1E3A8A] text-white' : 'bg-white text-slate-700'}`}>All Parcels</button>
          <button onClick={() => setFilterLayer('VERIFIED')} className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${filterLayer === 'VERIFIED' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'}`}>Verified</button>
          <button onClick={() => setFilterLayer('DISPUTED')} className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${filterLayer === 'DISPUTED' ? 'bg-red-700 text-white' : 'bg-white text-slate-700'}`}>Disputed</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className={`${showInspector ? 'lg:col-span-8' : 'lg:col-span-12'} bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-xs flex flex-col`}>
          <div className="p-3 bg-slate-100 border-b border-[#cbd5e1] flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0f172a]">Projection:</span>
              <span className="font-mono text-slate-600 text-[11px]">WGS84 / UTM Zone 44N</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => mapRef.current?.zoomOut()} className="px-2 py-1 bg-white border rounded font-bold hover:bg-slate-50">-</button>
              <button onClick={() => mapRef.current?.zoomIn()} className="px-2 py-1 bg-white border rounded font-bold hover:bg-slate-50">+</button>
              <button onClick={() => mapRef.current?.flyTo({ center: [77.709, 29.168], zoom: 16 })} className="px-2 py-1 bg-white border rounded text-[10px] font-medium hover:bg-slate-50">Reset</button>
              <button onClick={() => setShowInspector(!showInspector)} className="px-2 py-1 bg-white border rounded text-[10px] font-medium text-[#1E3A8A] hover:bg-slate-50">{showInspector ? 'Hide Panel' : 'Show Panel'}</button>
            </div>
          </div>

          <div className="relative bg-[#f8fafc] h-[600px] w-full overflow-hidden z-0">
            <Map
              ref={mapRef}
              mapLib={maplibregl}
              initialViewState={{ longitude: 77.709, latitude: 29.168, zoom: 16 }}
              mapStyle={{ version: 8, sources: {}, layers: [] }}
              interactiveLayerIds={['parcels']}
              onClick={handleMapClick}
              cursor="pointer"
              style={{ width: '100%', height: '100%' }}
            >
              <NavigationControl position="top-left" />
              <Source id="osm-tiles" type="raster" tiles={['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png']} tileSize={256}>
                <Layer id="osm-base" type="raster" minzoom={0} maxzoom={19} />
              </Source>
              {processedGeoJSON && (
                <Source id="cadastral-data" type="geojson" data={processedGeoJSON as any}>
                  {/* Cast to any to bypass strict React-Map-GL v8 type checking */}
                  <Layer {...(parcelLayerStyle as any)} />
                </Source>
              )}
            </Map>
          </div>
        </div>

        {showInspector && (
          <div className="lg:col-span-4 bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs flex flex-col gap-4 font-sans h-[600px] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cadastral Entity Inspector</span>
                <h3 className="font-serif text-xl font-bold text-[#0f172a]">Khasra #{parcel.khasra}</h3>
                <span className="text-xs text-slate-600 font-mono">{parcel.ulpin}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Landowner</span>
              <span className="font-bold text-[#0f172a] text-sm">{parcel.owner}</span>
              <span className="text-[11px] text-slate-500 mt-1">{parcel.relation}</span>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t">
              <button onClick={() => onExportPDF(parcel.khasra)} className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-md text-xs font-bold hover:bg-[#152b66]">
                Export Digital RoR Naksha PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebGISAtlasView;