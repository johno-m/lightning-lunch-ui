import React from 'react'

import './SearchPlaceholder.scss'

const SearchPlaceholder = () => {
  return (
    <div className='search-placeholder__container'>
      <h1>Oh no!</h1>
      <img
        className='search-placeholder__image'
        src='../images/sad.png'
        alt='Sad Magnifying Glass'
      />
      <h3>No products could be found - try another search</h3>
    </div>
  )
}

export default SearchPlaceholder
