const path = require('path');
const fs = require('fs');
const { csvParse } = require('d3-dsv');
const workboxBuild = require('workbox-build');

const data = csvParse(
  fs.readFileSync(path.resolve(__dirname, 'data.csv'), 'utf8')
);

for (const row of data) {
  workboxBuild.generateSW({
    skipWaiting: true,
    clientsClaim: true,
    globDirectory: `public/${row.iso_3}`,
    globPatterns: [
      'index.html',
      'manifest.webmanifest',
      '../*.{js,css}',
      '../page-data/app-data.json',
      `../page-data/${row.iso_3}/page-data.json`,
      `../v4/${row.iso_3}.json`,
      `../styles/v1/${row.iso_3}/**/*`,
      '../sprites/**/*',
      '../scripts/**/*',
      `../search/${row.iso_3}/**/*`,
      `../v4/${row.iso_3}/**/*`,
      '../fonts/**/*',
      '../icons/**/*',
    ],
    maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
    swDest: `public/${row.iso_3}/sw.js`,
  });
}
