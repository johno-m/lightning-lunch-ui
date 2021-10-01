import React from 'react'
import { formatPrice } from '../../helpers/'
import './Basket.scss'
import { FilledButton } from '@jsluna/button'
import { QuantitySelector } from '../index.js'

const Basket = ({ basket, basketTotal, handleAddToTrolleyClick }) => {
  const ProductList =
    basket.basketItems.length > 0 ? (
      <div className='basket'>
        <div className='basket__container'>
          <div className='basket__row--columntop'>
            <span className='basket__name'>Name:</span>
            <span className='basket__cell'>Quantity</span>
            <span className='basket__cell'>Price</span>
            <span className='basket__cell'>Total</span>
          </div>
          {basket.basketItems.map((product) => (
            <div className='basket__row' key={`id-${product.product.id}`}>
              <span className='basket__name'>
                {product.product.attributes.name}
              </span>
              <span className='basket__cell'>
                <QuantitySelector
                  productQuantityInfo={product}
                  handleAddToTrolleyClick={handleAddToTrolleyClick}
                />
              </span>
              <span className='basket__price basket__cell'>
                {formatPrice(product.product.attributes.price.now)}
              </span>
              <span className='basket__price basket__cell'>
                {formatPrice(
                  product.product.attributes.price.now * product.quantity
                )}
              </span>
            </div>
          ))}
          <div className='basket__totalrow'>
            <span className='basket__total'>
              Total: {formatPrice(basketTotal)}
            </span>
            <FilledButton>Check Out</FilledButton>
          </div>
        </div>
      </div>
    ) : (
      <div className='basket__container'>
        <p>You have no items in your basket</p>
      </div>
    )
  return ProductList
}

export default Basket
