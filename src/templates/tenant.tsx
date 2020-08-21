/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react'
import { PageProps, graphql } from 'gatsby'
import { TenantConfig } from '@bit/lucis.alt.typings'

import Seo from '../components/seo'
import Order from '../components/tenant/Order'

type DataProps = {
  tenant: TenantConfig
}

const Tenant: FC<PageProps<DataProps>> = ({ data: { tenant } }) => (
  <div>
    <Seo title={tenant.name} />
    <Order tenant={tenant} />
  </div>
)

export default Tenant

export const query = graphql`
  query TenantQuery($id: String!) {
    tenant(id: { eq: $id }) {
      name
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
        name
        imgSrc
        description
        category
        price
        localImage {
          size
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
