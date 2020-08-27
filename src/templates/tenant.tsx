/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react'
import { PageProps, graphql } from 'gatsby'
import { TenantConfig } from '@bit/lucis.alt.typings'

import TenantSEO from '../components/TenantSEO'
import Order from '../components/tenant/Order'
import { GatsbyProduct } from '../typings'
import { OrderContextProvider } from '../contexts/order/OrderContext'

interface GatsbyTenant extends TenantConfig {
  products: GatsbyProduct[]
}

type DataProps = {
  tenant: GatsbyTenant
}

type ContextProps = {
  id: string
}

const Tenant: FC<PageProps<DataProps, ContextProps>> = ({
  data: {
    tenant: { products, ...rest },
  },
  pageContext: { id },
}) => (
  <div>
    <OrderContextProvider>
      <TenantSEO tenant={rest} />
      <Order tenant={rest} products={products} tenantNodeId={id} />
    </OrderContextProvider>
  </div>
)

export default Tenant

export const query = graphql`
  query TenantQuery($id: String!) {
    tenant(id: { eq: $id }) {
      name
      live
      slug
      color
      userId
      whatsapp
      category
      categories {
        name
        slug
        live
      }
      address {
        cidade
        estado
        numero
        bairro
        logradouro
        complemento
      }
      openingHours {
        intervals {
          days
          from
          to
        }
      }
      paymentMethods {
        name
        checksForChange
        description
        imgSrc
      }
      shippingStrategies {
        takeaway {
          active
        }
        deliveryFixed {
          active
          price
        }
      }
      products {
        id
        live
        name
        imgSrc
        description
        category
        price
        localImage {
          childImageSharp {
            fluid(maxWidth: 200, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        assemblyOptions {
          live
          min
          name
          type
          price
          options {
            name
            initialQuantity
            price
            live
          }
        }
      }
    }
  }
`
