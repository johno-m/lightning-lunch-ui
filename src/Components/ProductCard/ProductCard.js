import React from 'react'
import './ProductCard.scss'
import { FilledButton } from '@jsluna/button'
import { formatPrice } from '../../helpers'
import { QuantitySelector } from '../index.js'

const ProductCard = ({
  product,
  handleProductOnClick,
  handleAddToTrolleyClick,
  isInBasket,
}) => {
  const { id } = product
  const { name, price, flashText } = product.attributes

  return (
    <div className='productCard'>
      <img
        src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
        className='productCard__image'
        alt={`Product - ${name}`}
        onClick={() => handleProductOnClick(id)}
      />
      <h5 onClick={() => handleProductOnClick(id)}>{name}</h5>
      <div className='productCard__price'>
        <strong>{formatPrice(price.now)}</strong>
        <span className='productCard__price--flash'>{flashText}</span>
      </div>
      {isInBasket(id) ? (
        <QuantitySelector
          productQuantityInfo={isInBasket(id)}
          handleAddToTrolleyClick={handleAddToTrolleyClick}
        />
      ) : (
        <FilledButton onClick={() => handleAddToTrolleyClick(id, 1)}>
          Add to trolley
        </FilledButton>
      )}
    </div>
  )
}

export default ProductCard
