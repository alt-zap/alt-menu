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
      slug
      deliveryFee
      instagram
      live
      name
      whatsapp
      items {
        headline
        imgSrc
        items
        live
        name
        price
      }
      paymentMethods {
        checksForChange
        description
        imgSrc
        name
      }
    }
  }
`
