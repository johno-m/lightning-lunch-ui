import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.scss'
import {
  Header,
  ProductPlaceholder,
  Product,
  Basket,
  SearchResults,
} from './Components/'

import axios from 'axios'

const App = () => {
  const [productData, setProductData] = useState(null)
  const [productList, setProductList] = useState([])
  const [searchQuery, setSearchQuery] = useState()
  const [basket, setBasket] = useState({
    basketId: '',
    basketItems: [],
  })

  const handleSearch = (searchTerm) => {
    if (!searchTerm) return

    axios
      .get(`http://localhost:8080/search/${searchTerm}`)
      .then((res) => {
        setProductList(res.data.data)
        setProductData(null)
        setSearchQuery(searchTerm)
      })
      .catch((e) => console.log(e))
  }

  const handleProductOnClick = (productId) => {
    axios
      .get(`http://localhost:8080/products/${productId}`)
      .then((res) => {
        setProductData(res.data)
        setProductList([])
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleAddToTrolleyClick = (productId, quantity) => {
    console.log('CLICK')
    if (basket.basketId) {
      console.log('ADDING TO BASKET')
      axios
        .put(`http://localhost:8080/baskets/${basket.basketId}`, {
          productId: productId,
          quantity: quantity,
        })
        .then((response) => {
          setBasket({
            basketId: response.data.id,
            basketItems: response.data.basketItems,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.log('CREATING BASKET')
      axios
        .post('http://localhost:8080/baskets', {
          productId: productId,
          quantity: quantity,
        })
        .then((response) => {
          setBasket({
            basketId: response.data.id,
            basketItems: response.data.basketItems,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function getBasketTotal() {
    let total = 0
    basket.basketItems.forEach((product) => {
      total += product.product.attributes.price.now * product.quantity
    })
    console.log(`basket total = ${total}`)
    return total
  }

  function isInBasket(productId) {
    let result = false
    basket.basketItems.forEach((item) => {
      if (item.product.id === productId) {
        result = item
      }
    })
    return result
  }

  const basketQuantity = basket.basketItems.reduce((accumulator, current) => {
    return accumulator + current.quantity
  }, 0)

  return (
    <Router>
      <div className='app'>
        <Header
          quantity={basket.basketItems ? basketQuantity : 0}
          basketTotal={getBasketTotal()}
          handleSearch={handleSearch}
        />
        <Switch>
          <Route path='/search/:query'>
            <SearchResults
              productList={productList}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
              handleProductOnClick={handleProductOnClick}
              isInBasket={isInBasket}
            />
          </Route>
          <Route path='/basket'>
            <Basket
              basket={basket}
              basketTotal={getBasketTotal()}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
            />
          </Route>
          <Route path='/product/:productId'>
            {productData ? (
              <Product
                key={`product-${productData.id}`}
                productData={productData}
                handleAddToTrolleyClick={handleAddToTrolleyClick}
                isInBasket={isInBasket}
              />
            ) : (
              <Product key='product-empty' />
            )}
          </Route>
          <Route exact path='/'>
            <ProductPlaceholder />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
