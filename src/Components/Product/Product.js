import React from 'react'

import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'
import { FilledButton } from '@jsluna/button'
import { formatPrice } from '../../helpers'

import './Products.scss'

const Product = ({ productData, handleAddToTrolleyClick, isInBasket }) => {
  const { id } = productData
  const { name, price, description, flashText } = productData.attributes
  console.log(isInBasket)

  return (
    <Container size='xs' className='ln-u-push-top-xl'>
      <Section>
        <Card className='product'>
          <img
            src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
            className='product__image'
            alt={name}
          />
          <div className='product__details'>
            <h3 className='product__title'>{name}</h3>
            <div className='product__info'>
              <div className='product__price'>
                <strong>{formatPrice(price.now)}</strong>
                <div className='product__price--flashText'>{flashText}</div>
              </div>
              <p>{description}</p>
            </div>
            <FilledButton onClick={() => handleAddToTrolleyClick(id, 1)}>
              Add to Trolley
            </FilledButton>
          </div>
        </Card>
      </Section>
    </Container>
  )
}

export default Product
