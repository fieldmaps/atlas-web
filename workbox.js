const path = require('path');
const fs = require('fs');
const { csvParse } = require('d3-dsv');
const workboxBuild = require('workbox-build');

const data = csvParse(
  fs.readFileSync(path.resolve(__dirname, 'data.csv'), 'utf8'),
);

for (const row of data) {
  workboxBuild.generateSW({
    importWorkboxFrom: 'local',
    skipWaiting: true,
    clientsClaim: true,
    globDirectory: `public/maps/${row.iso_3}`,
    globPatterns: [
      'index.html',
      'manifest.webmanifest',
      '../../*.{js,css}',
      '../../icons/**/*',
      '../../fonts/**/*',
      '../../page-data/app-data.json',
      `../../page-data/maps/${row.iso_3}/page-data.json`,
      '../../scripts/**/*',
      `../../search/${row.iso_3}/**/*`,
      '../../sprites/**/*',
      `../../styles/${row.iso_3}/**/*`,
      `../../tiles/${row.iso_3}/**/*`,
    ],
    maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
    offlineGoogleAnalytics: true,
    swDest: `public/maps/${row.iso_3}/sw.js`,
  });
}
