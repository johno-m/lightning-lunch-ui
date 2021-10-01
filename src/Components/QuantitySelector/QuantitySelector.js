import React from 'react'
import './QuantitySelector.scss'

const QuantitySelector = ({ productQuantityInfo, handleAddToTrolleyClick }) => {
  return (
    <div className='quantity'>
      <button
        onClick={() => {
          handleAddToTrolleyClick(productQuantityInfo.product.id, -1)
        }}
        className='quantity__button'
      >
        -
      </button>
      <span className='quantity__number'>{productQuantityInfo.quantity}</span>
      <button
        onClick={() => {
          handleAddToTrolleyClick(productQuantityInfo.product.id, 1)
        }}
        className='quantity__button'
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
