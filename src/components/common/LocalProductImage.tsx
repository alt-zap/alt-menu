import React, { FC } from 'react'
import Img from 'gatsby-image'

type Props = {
  localImage: any
  backupSrc?: string
  title: string
  onClick?: () => void
}

const ProductImage: FC<Props> = ({ backupSrc, onClick, title, localImage }) => {
  return (
    <div
      className="pointer"
      onClick={() => onClick?.()}
      onKeyPress={() => onClick?.()}
      role="button"
      tabIndex={0}
    >
      {localImage ? (
        <Img
          fluid={localImage.childImageSharp.fluid}
          alt={title}
          title={title}
          className="br3 shadow-1"
        />
      ) : (
        <img
          src={
            backupSrc ??
            'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'
          }
          alt={title}
          title={title}
          className="br3 shadow-1"
        />
      )}
    </div>
  )
}

export default ProductImage
