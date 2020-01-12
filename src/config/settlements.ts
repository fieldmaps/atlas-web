import stops from './stops';
import filters from './filters';

const style = {
  version: 8,
  glyphs: '/fonts/{fontstack}/{range}.pbf',
  sources: {
    admin0: { type: 'geojson', data: '/data/admin0.geojson' },
    admin1: { type: 'geojson', data: '/data/admin1.geojson' },
    admin2: { type: 'geojson', data: '/data/admin2.geojson' },
    admin3: { type: 'geojson', data: '/data/admin3.geojson' },
    admin4: { type: 'geojson', data: '/data/admin4.geojson' },
    airports: { type: 'geojson', data: '/data/airports.geojson' },
    'sea-ports': { type: 'geojson', data: '/data/sea-ports.geojson' },
    'health-facilities': {
      type: 'geojson',
      data: '/data/health-facilities.geojson',
    },
    'financial-services': {
      type: 'geojson',
      data: '/data/financial-services.geojson',
    },
    'education-facilities': {
      type: 'geojson',
      data: '/data/education-facilities.geojson',
    },
    lakes: { type: 'geojson', data: '/data/lakes.geojson' },
    'protected-areas': {
      type: 'geojson',
      data: '/data/protected-areas.geojson',
    },
    rivers: { type: 'geojson', data: '/data/rivers.geojson' },
    roads: { type: 'geojson', data: '/data/roads.geojson' },
    settlements: { type: 'geojson', data: '/data/settlements.geojson' },
    'undetermined-areas': {
      type: 'geojson',
      data: '/data/undetermined-areas.geojson',
    },
  },
  layers: [
    {
      id: 'protected-areas',
      source: 'protected-areas',
      type: 'fill',
      paint: { 'fill-color': '#DAE3D9' },
    },
    {
      filter: ['==', 'type', 'wetland'],
      id: 'wetlands',
      source: 'lakes',
      type: 'fill',
      paint: { 'fill-color': '#B6DAE7' },
    },
    {
      id: 'rivers',
      paint: {
        'line-color': '#94CCDC',
        'line-width': { stops: stops.rivers, base: 2 },
      },
      source: 'rivers',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'water'],
      id: 'lakes',
      source: 'lakes',
      type: 'fill',
      paint: { 'fill-color': '#56B3CD' },
    },
    {
      filter: ['in', 'type', 'motorway', 'trunk', 'primary'],
      id: 'roads-primary',
      paint: {
        'line-color': '#F69E61',
        'line-gap-width': 1,
        'line-width': { stops: stops.roadsPrimary, base: 2 },
      },
      source: 'roads',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'secondary'],
      id: 'roads-secondary',
      paint: {
        'line-color': '#F69E61',
        'line-width': { stops: stops.roadsSecondary, base: 2 },
      },
      source: 'roads',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'tertiary'],
      id: 'roads-tertiary',
      paint: {
        'line-color': '#F69E61',
        'line-dasharray': [2, 2],
        'line-width': { stops: stops.roadsTertiary, base: 2 },
      },
      source: 'roads',
      type: 'line',
    },
    {
      id: 'admin0',
      source: 'admin0',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin0, base: 2 },
      },
    },
    {
      id: 'undetermined-areas',
      source: 'undetermined-areas',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-dasharray': [2, 2],
        'line-width': { stops: stops.undeterminedAreas, base: 2 },
      },
    },
    {
      id: 'admin1',
      source: 'admin1',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin1, base: 2 },
      },
    },
    {
      id: 'admin2',
      source: 'admin2',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin2, base: 2 },
      },
    },
    {
      id: 'sea-ports-2',
      minzoom: stops.seaPorts1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'sea-port',
        'icon-size': 0.03,
      },
      source: 'sea-ports',
      type: 'symbol',
    },
    {
      id: 'sea-ports-1',
      maxzoom: stops.seaPorts1[1][0],
      paint: {
        'circle-color': '#000000',
        'circle-radius': { stops: stops.seaPorts1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'sea-ports',
      type: 'circle',
    },
    {
      filter: ['==', 'type', 'helipad'],
      id: 'airports-3',
      minzoom: stops.airports1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'helipad',
        'icon-size': 0.03,
      },
      source: 'airports',
      type: 'symbol',
    },
    {
      filter: ['!=', 'type', 'helipad'],
      id: 'airports-2',
      minzoom: stops.airports1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'airport',
        'icon-size': 0.03,
      },
      source: 'airports',
      type: 'symbol',
    },
    {
      id: 'airports-1',
      maxzoom: stops.airports1[1][0],
      paint: {
        'circle-color': '#000000',
        'circle-radius': { stops: stops.airports1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'airports',
      type: 'circle',
    },
    {
      id: 'financial-services-2',
      minzoom: stops.financialServices1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'finance',
        'icon-size': 0.03,
      },
      source: 'financial-services',
      type: 'symbol',
    },
    {
      id: 'financial-services-1',
      maxzoom: stops.financialServices1[1][0],
      paint: {
        'circle-color': '#72966F',
        'circle-radius': { stops: stops.financialServices1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'financial-services',
      type: 'circle',
    },
    {
      id: 'education-facilities-2',
      minzoom: stops.educationFacilities1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'education',
        'icon-size': 0.025,
      },
      source: 'education-facilities',
      type: 'symbol',
    },
    {
      id: 'education-facilities-1',
      maxzoom: stops.educationFacilities1[1][0],
      paint: {
        'circle-color': '#72966F',
        'circle-radius': { stops: stops.educationFacilities1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'education-facilities',
      type: 'circle',
    },
    {
      id: 'health-facilities-2',
      minzoom: stops.healthFacilities1[1][0],
      layout: {
        'icon-allow-overlap': true,
        'icon-image': 'health',
        'icon-size': 0.025,
      },
      source: 'health-facilities',
      type: 'symbol',
    },
    {
      id: 'health-facilities-1',
      maxzoom: stops.healthFacilities1[1][0],
      paint: {
        'circle-color': '#EE585A',
        'circle-radius': { stops: stops.healthFacilities1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'health-facilities',
      type: 'circle',
    },
    {
      filter: filters.settlements6,
      id: 'settlements-6',
      minzoom: stops.settlements6[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements6, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements5,
      id: 'settlements-5',
      minzoom: stops.settlements5[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements5, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements4,
      id: 'settlements-4',
      minzoom: stops.settlements4[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements4, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements3,
      id: 'settlements-3',
      minzoom: stops.settlements3[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements3, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements2,
      id: 'settlements-2',
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements2, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements1,
      id: 'settlements-1',
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements6,
      id: 'settlements-text-6',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements6[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements5,
      id: 'settlements-text-5',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements5[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements4,
      id: 'settlements-text-4',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements4[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements3,
      id: 'settlements-text-3',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 14,
      },
      minzoom: stops.settlements3[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements2,
      id: 'settlements-text-2',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 14,
      },
      minzoom: stops.settlements2[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements1,
      id: 'settlements-text-1',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light'],
        'text-size': 14,
      },
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'settlements',
      type: 'symbol',
    },
    {
      id: 'undetermined-areas-text',
      source: 'undetermined-areas',
      type: 'symbol',
      layout: {
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 16,
      },
      minzoom: stops.admin2[0][0] + 1,
      maxzoom: stops.admin2[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
    },
    {
      id: 'admin2-text',
      source: 'admin2',
      type: 'symbol',
      layout: {
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 16,
      },
      minzoom: stops.admin2[0][0] + 1,
      maxzoom: stops.admin2[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
    },
    {
      id: 'admin1-text',
      source: 'admin1',
      type: 'symbol',
      layout: {
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 20,
      },
      minzoom: stops.admin1[1][0],
      maxzoom: stops.admin1[1][0] + 1,
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
    },
    {
      id: 'admin0-text',
      layout: {
        'text-field': '{name}',
        'text-font': ['roboto-condensed-light-italic'],
        'text-size': 22,
      },
      minzoom: stops.admin0[0][0],
      maxzoom: stops.admin0[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'admin0',
      type: 'symbol',
    },
  ],
};

export default style;
