import React from 'react'

import Header from './Components/Header/Header'
import Product from './Components/Products/Product'

const App = () => {
  const handleSearch = (searchTerm) => {
    if (searchTerm) console.log(searchTerm)
  }

  return (
    <div className='app'>
      <Header handleSearch={handleSearch} />
      <Product />
    </div>
  )
}

export default App
