export const MOCK_CADASTRAL_GEOJSON: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        khasra: '789',
        status: 'verified',
        type: 'parcel',
        owner: 'Rajesh Kumar Singh'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [77.71, 29.17],
            [77.712, 29.17],
            [77.711, 29.168],
            [77.709, 29.168],
            [77.71, 29.17]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        khasra: '788',
        status: 'standard',
        type: 'parcel',
        owner: 'Unknown'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [77.708, 29.17],
            [77.71, 29.17],
            [77.709, 29.168],
            [77.707, 29.168],
            [77.708, 29.17]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        khasra: '422/A',
        status: 'residential',
        type: 'parcel',
        owner: 'Ramesh'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [77.707, 29.168],
            [77.709, 29.168],
            [77.708, 29.166],
            [77.706, 29.166],
            [77.707, 29.168]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        khasra: '512',
        status: 'disputed',
        type: 'parcel',
        owner: 'Multiple Claims'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [77.709, 29.168],
            [77.711, 29.168],
            [77.71, 29.166],
            [77.708, 29.166],
            [77.709, 29.168]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'canal',
        type: 'canal',
        name: 'Canal Feeder Branch #4'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.705, 29.172],
          [77.715, 29.168]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'road',
        type: 'road',
        name: 'Mawana - Hastinapur Road'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.705, 29.165],
          [77.715, 29.165]
        ]
      }
    }
  ]
};
