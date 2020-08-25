import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { TenantConfig } from '@bit/lucis.alt.typings'

type Props = {
  tenant: TenantConfig
}

const SEO: FC<Props> = ({ tenant }) => {
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
  )

  const metaDescription = tenant.name || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang: 'pt-br',
      }}
      title={tenant.name}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: tenant.name,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: tenant.name,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat([])}
    />
  )
}

export default SEO
