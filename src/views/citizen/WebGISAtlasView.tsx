import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PARCELS } from '../../data/mockData';
import { MOCK_CADASTRAL_GEOJSON } from '../../data/mockGeoJSON';

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
  const [mapZoom, setMapZoom] = useState(16);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const parcel = PARCELS[selectedKhasra] || PARCELS['789'];

  const getFeatureStyle = (feature: any) => {
    const isSelected = feature.properties.khasra === selectedKhasra;
    
    if (feature.properties.type === 'canal') {
      return { color: '#2563eb', weight: 4 };
    }
    if (feature.properties.type === 'road') {
      return { color: '#475569', weight: 4 };
    }
    
    let fillColor = '#e2e8f0';
    let color = '#64748b';
    let weight = isSelected ? 3 : 1.5;
    let dashArray = '';
    
    if (feature.properties.status === 'verified') {
      fillColor = isSelected ? '#bbf7d0' : '#dcfce7';
      color = isSelected ? '#15803d' : '#16a34a';
    } else if (feature.properties.status === 'residential') {
      fillColor = isSelected ? '#bfdbfe' : '#e0f2fe';
      color = '#0284c7';
    } else if (feature.properties.status === 'disputed') {
      fillColor = '#fee2e2';
      color = '#dc2626';
      dashArray = '4 2';
    } else if (isSelected) {
      fillColor = '#cbd5e1';
    }

    return {
      fillColor,
      color,
      weight,
      dashArray,
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties.type === 'parcel') {
      layer.on({
        click: () => {
          onSelectParcel(feature.properties.khasra);
        },
        mouseover: (e: any) => {
          const l = e.target;
          l.setStyle({ fillOpacity: 0.9 });
        },
        mouseout: (e: any) => {
          const l = e.target;
          l.setStyle({ fillOpacity: 0.7 });
        }
      });
      layer.bindTooltip(`Khasra ${feature.properties.khasra}`, { permanent: false, direction: 'center' });
    } else if (feature.properties.name) {
      layer.bindTooltip(feature.properties.name, { permanent: true, direction: 'center', className: 'text-xs font-bold text-slate-700 bg-transparent border-0 shadow-none' });
    }
  };

  return (
    <div id="webgis-cadastral-atlas" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col gap-5 font-sans-gov">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cbd5e1] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Spatial Decision Support System (SDSS)</span>
            <span>/</span>
            <span>Bhu-Naksha Cadastre</span>
            <span>/</span>
            <span className="font-bold text-[#0f172a]">Village Hastinapur (Sheet 04)</span>
          </div>
          <h1 className="font-serif-gov text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            WebGIS Cadastral Atlas & Boundary Viewer
          </h1>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterLayer('ALL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              filterLayer === 'ALL' ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Parcels: 142
          </button>
          <button
            onClick={() => setFilterLayer('VERIFIED')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              filterLayer === 'VERIFIED' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Verified: 110
          </button>
          <button
            onClick={() => setFilterLayer('DISPUTED')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              filterLayer === 'DISPUTED' ? 'bg-red-700 text-white border-red-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Disputed: 6
          </button>
        </div>
      </div>

      {/* Main Map + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center Map Canvas (8 or 12 Cols depending on Inspector toggle) */}
        <div className={`${showInspector ? 'lg:col-span-8' : 'lg:col-span-12'} bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-xs flex flex-col`}>
          {/* Map Controls Ribbon */}
          <div className="p-3 bg-slate-100 border-b border-[#cbd5e1] flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0f172a]">Projection:</span>
              <span className="font-mono text-slate-600 text-[11px]">WGS84 / UTM Zone 44N (EPSG:32644)</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (mapInstance) {
                    const newZoom = Math.max(1, mapInstance.getZoom() - 1);
                    mapInstance.setZoom(newZoom);
                    setMapZoom(newZoom);
                  }
                }}
                className="px-2 py-1 bg-white border border-slate-300 rounded font-bold hover:bg-slate-50"
                title="Zoom Out"
              >
                -
              </button>
              <span className="px-2 text-[11px] font-mono text-slate-700">
                {Math.round((mapZoom / 20) * 100)}%
              </span>
              <button
                onClick={() => {
                  if (mapInstance) {
                    const newZoom = Math.min(20, mapInstance.getZoom() + 1);
                    mapInstance.setZoom(newZoom);
                    setMapZoom(newZoom);
                  }
                }}
                className="px-2 py-1 bg-white border border-slate-300 rounded font-bold hover:bg-slate-50"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => { 
                  if (mapInstance) {
                    mapInstance.setView([29.168, 77.709], 16);
                    setMapZoom(16);
                  }
                }}
                className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-medium hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={() => setMeasuring(!measuring)}
                className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors ${
                  measuring ? 'bg-amber-400 text-black border-amber-500' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Measure Tool
              </button>
              <button
                onClick={() => setShowInspector(!showInspector)}
                className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-medium text-[#1E3A8A] hover:bg-slate-50"
              >
                {showInspector ? 'Hide Panel' : 'Show Panel'}
              </button>
            </div>
          </div>

          {/* Interactive Cadastral WebGIS Canvas */}
          <div className="relative bg-[#f8fafc] h-[600px] w-full overflow-hidden flex flex-col z-0">
            {/* Measuring Tool Banner if active */}
            {measuring && (
              <div className="absolute top-4 right-4 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg shadow-sm text-xs text-amber-900 font-medium z-[1000]">
                Measure tool active: Click boundary line for geodetic distance
              </div>
            )}
            
            <MapContainer 
              center={[29.168, 77.709]} 
              zoom={16} 
              className="h-full w-full z-0"
              zoomControl={false}
              ref={setMapInstance}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON 
                key={selectedKhasra + filterLayer} // Re-render when selection or filter changes
                data={MOCK_CADASTRAL_GEOJSON as any} 
                style={getFeatureStyle}
                onEachFeature={onEachFeature}
                filter={(feature: any) => {
                  if (filterLayer === 'ALL') return true;
                  if (filterLayer === 'VERIFIED' && feature.properties.status === 'verified') return true;
                  if (filterLayer === 'DISPUTED' && feature.properties.status === 'disputed') return true;
                  // Always show canals and roads
                  if (feature.properties.type === 'canal' || feature.properties.type === 'road') return true;
                  return false;
                }}
              />
            </MapContainer>
          </div>

          {/* Map Footer */}
          <div className="p-3 bg-slate-50 border-t border-[#cbd5e1] flex items-center justify-between text-[11px] text-slate-500">
            <span>Ortho-Rectified Drone Imagery: Survey of India (SOI) SVAMITVA Flight 2025</span>
            <span className="font-mono">Resolution: 5cm/pixel • Acc: ±5cm</span>
          </div>
        </div>

        {/* Right Inspector Drawer (4 Cols) */}
        {showInspector && (
          <div className="lg:col-span-4 bg-white border border-[#cbd5e1] rounded-xl p-5 shadow-xs transition-all duration-300 ease-in-out hover:border-[#1E3A8A] hover:shadow-lg hover:-translate-y-0.5 flex flex-col gap-4 font-sans-gov">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Cadastral Entity Inspector
                </span>
                <h3 className="font-serif-gov text-xl font-bold text-[#0f172a]">
                  Khasra #{parcel.khasra}
                </h3>
                <span className="text-xs text-slate-600 font-mono">
                  {parcel.ulpin}
                </span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                parcel.status === 'disputed'
                  ? 'bg-red-50 text-red-700 border-red-300'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
              }`}>
                {parcel.statusBadge}
              </span>
            </div>

            {/* Landowner Record */}
            <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Landowner</span>
              <span className="font-bold text-[#0f172a] text-sm">{parcel.owner}</span>
              <span className="text-slate-600">{parcel.ownerHindi}</span>
              <span className="text-[11px] text-slate-500 mt-1">{parcel.relation}</span>
            </div>

            {/* Spatial & Dimension Audit */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-2 text-xs">
              <span className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider">
                Spatial & Dimension Audit
              </span>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Khatauni Area:</span>
                <span className="font-bold text-[#0f172a]">{parcel.recArea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">GIS Calculated Area:</span>
                <span className="font-bold text-[#1E3A8A]">{parcel.gisArea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Perimeter:</span>
                <span className="font-bold text-slate-700">{parcel.perimeter}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Boundary Nodes:</span>
                <span className="font-mono text-slate-700">{parcel.vertices}</span>
              </div>
            </div>

            {/* Adjoining Parcels */}
            <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2 text-xs">
              <span className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider">
                Adjoining Neighbors (Chauhaddi)
              </span>
              <div className="text-[11px] text-slate-600 flex flex-col gap-1">
                <div><strong>North:</strong> {parcel.adjoining.North}</div>
                <div><strong>South:</strong> {parcel.adjoining.South}</div>
                <div><strong>East:</strong> {parcel.adjoining.East}</div>
                <div><strong>West:</strong> {parcel.adjoining.West}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onExportPDF(parcel.khasra)}
                className="w-full bg-[#1E3A8A] hover:bg-[#152b66] text-white font-medium py-2.5 rounded-md text-xs font-serif-gov transition-colors shadow-xs"
              >
                Export Digital RoR Naksha PDF
              </button>
              <button
                onClick={onOpenAudit}
                className="w-full bg-white border border-[#1E3A8A] text-[#1E3A8A] transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-md font-medium py-2 rounded-md text-xs font-serif-gov"
              >
                View Spatial Audit Log
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
