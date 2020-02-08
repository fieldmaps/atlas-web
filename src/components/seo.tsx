import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  lang?: string;
  keywords?: string[];
  title: string;
  slug: string;
}

const sizes = [48, 72, 96, 144, 192, 256, 384, 512];

const SEO = ({
  description,
  lang = 'en',
  keywords = [],
  slug = 'Country',
}: Props) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          author
        }
      }
    }
  `);
  const title = slug.toUpperCase() + ' Atlas';
  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={'%s'}
      link={[
        { rel: 'manifest', href: `/${slug}/manifest.webmanifest` },
        { rel: 'icon', href: '/icons/icon-48x48.png' },
        ...sizes.map(size => ({
          rel: 'apple-touch-icon',
          sizes: `${size}x${size}`,
          href: `/icons/icon-${size}x${size}.png`,
        })),
      ]}
      meta={[
        { name: 'theme-color', content: '#58585A' },
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: title },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: site.siteMetadata.author },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
      ].concat(
        keywords.length > 0
          ? { name: 'keywords', content: keywords.join(', ') }
          : [],
      )}
    />
  );
};

export default SEO;
