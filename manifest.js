const path = require('path');
const fs = require('fs');
const { csvParse } = require('d3-dsv');

const data = csvParse(
  fs.readFileSync(path.resolve(__dirname, 'data.csv'), 'utf8'),
);

const mapsDir = path.resolve(__dirname, 'static/maps');
if (!fs.existsSync(mapsDir)) fs.mkdirSync(mapsDir);

const sizes = [48, 72, 96, 144, 192, 256, 384, 512];

const getManifest = slug => ({
  name: `${slug.toUpperCase()} Atlas`,
  short_name: `${slug.toUpperCase()} Atlas`,
  start_url: `/maps/${slug}/`,
  background_color: '#FFFFFF',
  theme_color: '#58585A',
  display: 'standalone',
  icons: sizes.map(size => ({
    src: `/icons/icon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  })),
});

for (const row of data) {
  const manifest = getManifest(row.iso_3);
  const output = path.resolve(mapsDir, row.iso_3);
  const jsonPath = path.resolve(output, 'manifest.webmanifest');
  if (!fs.existsSync(output)) fs.mkdirSync(output);
  fs.writeFileSync(jsonPath, JSON.stringify(manifest));
}
