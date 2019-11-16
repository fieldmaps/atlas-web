require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: process.env.GATSBY_NAME,
    description: 'Offline interactive reference map',
    author: '@maxmalynowsky',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: process.env.GATSBY_NAME,
        short_name: process.env.GATSBY_NAME_SHORT,
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#58585A',
        display: 'standalone',
        icon: 'src/images/icon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: [
            '**/*.{js,css,html}',
            'manifest.json',
            'manifest.webmanifest',
            'page-data/*/**',
            'data/**/*',
            'fonts/**/*',
          ],
          globIgnores: ['idb-keyval-iife.min.js'],
          maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
          offlineGoogleAnalytics: true,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
};
