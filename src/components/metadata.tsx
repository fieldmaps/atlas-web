import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  name: string;
  slug: string;
}

const url = 'https://atlas.fieldmaps.io/';
const img = 'https://atlas.fieldmaps.io/img/atlas-ssd-preview.png';
const title = 'Fieldmaps.io — Humanitarian Atlas';
const description =
  'Mobile, offline, interactive reference maps for humanitarian use.';

export default ({ name, slug }: Props) => (
  <Helmet>
    <title>{name} | Fieldmaps.io</title>
    <link rel="manifest" href={`${slug}/manifest.webmanifest`} />
    <link rel="icon" type="image/png" href="img/logo-192.png" />
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={img} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={img} />
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "4c2d512f347d47b5bf303b367560bcfd"}'
    />
  </Helmet>
);
