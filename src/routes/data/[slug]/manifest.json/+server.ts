import manifest from '$lib/manifest.json';

export function GET({ url }) {
  manifest.name = `FieldMaps Atlas - ${url.pathname.split('/')[2].toUpperCase()}`;
  manifest.start_url = '/' + url.pathname.split('/')[2];
  return new Response(JSON.stringify(manifest));
}
