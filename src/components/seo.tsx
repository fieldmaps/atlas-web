import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  lang?: string;
  keywords?: string[];
  title: string;
}

const SEO = ({ description, lang = 'en', keywords = [], title }: Props) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={site.siteMetadata.title}
      titleTemplate={'%s'}
      meta={[
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: site.siteMetadata.title },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: site.siteMetadata.author },
        { name: 'twitter:title', content: site.siteMetadata.title },
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
