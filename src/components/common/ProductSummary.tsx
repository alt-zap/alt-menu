import React, { FC, Fragment, useState } from 'react'
import { Modal } from 'antd'
import QuantitySelector from '@bit/lucis.alt.quantity-selector'
import Real from '@bit/lucis.alt.real'
import { TenantConfig } from '@bit/lucis.alt.typings'

import LocalProductImage from './LocalProductImage'
import ProductDetails from './ProductDetails'

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]

type Props = {
  product: Omit<ArrayElement<TenantConfig['items']>, 'live'>
  selectedQuantity: string
  setQuantity: (qt: string) => void
  tenantNodeId: string
}

const ProductSummary: FC<Props> = ({
  product: { name, headline, price, imgSrc, localImage },
  product,
  selectedQuantity,
  setQuantity,
}) => {
  const [detailsModalOpened, setDetailsModal] = useState(false)

  return (
    <Fragment>
      <div
        className="shadow-1 br3 flex pa3 bg-white pointer"
        onClick={() => setDetailsModal(true)}
        onKeyPress={() => setDetailsModal(true)}
        role="button"
        tabIndex={0}
      >
        <div className="w-34" style={{ minWidth: '110px' }}>
          <LocalProductImage
            localImage={localImage}
            backupSrc={imgSrc}
            title={name}
            onClick={() => setDetailsModal(true)}
          />
        </div>
        <div className="flex flex-column ml3 justify-between">
          <div className="flex flex-column">
            <span
              className={`${name.length > 20 ? 'f4' : 'f3 fw2'}`}
              style={{ lineHeight: '25px' }}
            >
              {name}
            </span>
            <span className="f5 fw2 silver" style={{ lineHeight: '20px' }}>
              {headline}
            </span>
          </div>
          <span className="b black f3" style={{ marginBottom: '-6px' }}>
            <Real cents={price} />
          </span>
        </div>
        <div className="flex justify-end" style={{ flex: 1 }}>
          <QuantitySelector
            quantity={selectedQuantity}
            onQuantity={setQuantity}
          />
        </div>
      </div>
      <Modal
        title={name}
        footer={null}
        onCancel={() => setDetailsModal(false)}
        visible={detailsModalOpened}
      >
        <ProductDetails product={product} />
      </Modal>
    </Fragment>
  )
}

export default ProductSummary
