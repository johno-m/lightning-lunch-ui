import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard, SearchPlaceholder } from '../'
import './SearchResults.scss'

const SearchResults = ({
  productList,
  searchQuery,
  handleSearch,
  handleProductOnClick,
  handleAddToTrolleyClick,
  isInBasket,
}) => {
  const { query } = useParams()

  if (!searchQuery && query) {
    handleSearch(query)
  }

  const SearchView =
    productList.length > 0 ? (
      <>
        <div className='search-results__banner'>
          "{searchQuery}" returned {productList.length}{' '}
          {productList.length === 1 ? 'result' : 'results'}
        </div>
        <div className='product-list-container'>
          {productList.map((product) => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              handleProductOnClick={handleProductOnClick}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
              isInBasket={isInBasket}
            />
          ))}
        </div>
      </>
    ) : (
      <SearchPlaceholder />
    )

  return SearchView
}

export default SearchResults
