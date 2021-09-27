import React, { useState } from 'react'

import {
  Header as LunaHeader,
  HeaderLogo,
  HeaderActions,
  HeaderSearch,
} from '@jsluna/header'
import { TextButton } from '@jsluna/button'
import { Basket } from '@jsluna/icons'

import './Header.scss'

const Header = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <LunaHeader>
      <HeaderLogo>Lightning Lunch</HeaderLogo>
      <HeaderSearch
        fullWidth
        tabBar='max-nav'
        tabBarSoft
        field={{ hasButton: true, placeholder: 'Search for products' }}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(searchTerm)
        }}
      />

      <HeaderActions label='Basket'>
        <TextButton className='ln-u-pull-right'>
          <Basket /> 42
          <span className='ln-u-visually-hidden'>Your basket</span>
        </TextButton>
      </HeaderActions>
    </LunaHeader>
  )
}

export default Header
