import path from 'path';
import fs from 'fs';
import csvParse from 'd3-dsv';

const data = csvParse(fs.readFileSync('data.csv', 'utf8'));

const publicDir = 'public';
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const getManifest = (slug) => ({
  name: `${slug.toUpperCase()} Atlas`,
  short_name: `${slug.toUpperCase()} Atlas`,
  start_url: `/${slug}/`,
  background_color: '#FFFFFF',
  theme_color: '#58585A',
  display: 'standalone',
  icons: [
    {
      src: '/img/logo-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/img/logo-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
});

for (const row of data) {
  const manifest = getManifest(row.iso_3);
  const output = path.resolve(publicDir, row.iso_3);
  const jsonPath = path.resolve(output, 'manifest.webmanifest');
  if (!fs.existsSync(output)) fs.mkdirSync(output);
  fs.writeFileSync(jsonPath, JSON.stringify(manifest));
}
