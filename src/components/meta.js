import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default ({ description = '', lang = 'de', meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{lang}}
      title={title || site.siteMetadata.title}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : '%s'}
      meta={[
          { name: `description`, content: metaDescription },
          { property: `og:title`, content: title },
          { property: `og:description`, content: metaDescription },
          { property: `og:type`, content: `website` },
          { name: `twitter:card`, content: `summary` },
          { name: `twitter:creator`, content: site.siteMetadata.author },
          { name: `twitter:title`, content: title },
          { name: `twitter:description`, content: metaDescription }
        ].concat(meta)}
    />
  );
};