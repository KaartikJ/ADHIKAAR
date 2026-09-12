export const mockGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        khasra: '789',
        ulpin: 'UP001002003004',
        owner: 'RAMESH SINGH',
        ownerHindi: 'रमेश सिंह',
        relation: 'S/o SURESH SINGH',
        status: 'verified',
        statusBadge: 'Clean Title',
        recArea: '1.5000 Ha',
        gisArea: '1.5002 Ha',
        perimeter: '420 m',
        vertices: 5,
        type: 'parcel',
        adjoining: { North: 'ROAD', South: 'Khasra 790', East: 'CANAL', West: 'Khasra 788' }
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[77.708, 29.168], [77.710, 29.168], [77.710, 29.169], [77.708, 29.169], [77.708, 29.168]]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        khasra: '790',
        ulpin: 'UP001002003005',
        owner: 'ANIL KUMAR',
        ownerHindi: 'अनिल कुमार',
        relation: 'S/o RAJESH KUMAR',
        status: 'disputed',
        statusBadge: 'Court Stay',
        recArea: '0.8000 Ha',
        gisArea: '0.8005 Ha',
        perimeter: '210 m',
        vertices: 5,
        type: 'parcel',
        adjoining: { North: 'Khasra 789', South: 'Khasra 791', East: 'CANAL', West: 'Khasra 788' }
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[77.708, 29.167], [77.710, 29.167], [77.710, 29.168], [77.708, 29.168], [77.708, 29.167]]
        ]
      }
    }
  ]
};