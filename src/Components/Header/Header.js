import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Header as LunaHeader,
  HeaderLogo,
  HeaderActions,
  HeaderSearch,
} from '@jsluna/header'
import { TextButton } from '@jsluna/button'
import { Basket } from '@jsluna/icons'
import { formatPrice } from '../../helpers/'

import './Header.scss'

const Header = ({ handleSearch, basketTotal, quantity }) => {
  const [searchTerm, setSearchTerm] = useState('')
  let history = useHistory()

  return (
    <LunaHeader>
      {/* <Link to='/'> */}
      <HeaderLogo>Lightning Lunch</HeaderLogo>
      {/* </Link> */}
      <HeaderSearch
        fullWidth
        tabBar='max-nav'
        tabBarSoft
        field={{ hasButton: true, placeholder: 'Search for products' }}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(searchTerm)
          history.push(`/search/${searchTerm}`)
        }}
      />

      <HeaderActions label='Basket'>
        <Link to='/basket'>
          <TextButton className='ln-u-pull-right'>
            <Basket /> {quantity}{' '}
            <span>
              {basketTotal > 0 ? `(${formatPrice(basketTotal)})` : null}
            </span>
            <span className='ln-u-visually-hidden'>Your basket</span>
          </TextButton>
        </Link>
      </HeaderActions>
    </LunaHeader>
  )
}

export default Header
