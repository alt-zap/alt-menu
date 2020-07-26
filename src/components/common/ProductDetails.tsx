import React, { FC, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { TenantConfig } from '@bit/lucis.alt.typings'
import { Element } from '@bit/lucis.alt.utils'

import LocalProductImage from './LocalProductImage'

type Props = {
  product: Omit<Element<TenantConfig['items']>, 'live'>
}

const ProductDetails: FC<Props> = ({
  product: { imgSrc, name, description, headline, items, localImage },
}) => {
  const tempDescription = useMemo(() => (items ? items.join('\n\n') : ''), [
    items,
  ])

  return (
    <div className="flex flex-column items-center">
      <div className="w-100">
        <LocalProductImage
          backupSrc={imgSrc}
          localImage={localImage}
          title={name}
        />
      </div>
      <span className="f2 tc">{name}</span>
      <span className="gray f4 tc">{headline}</span>
      {(description ?? tempDescription) && (
        <ReactMarkdown
          className="tc pt2"
          source={description ?? tempDescription}
        />
      )}
    </div>
  )
}

export default ProductDetails
