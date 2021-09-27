# Step 5

## Aim:

Access the product page from the product lister page by clicking on a product and use the add to basket button to add a product using a POST request to our backend.

### 1

So we have a lovely product lister page with our products, we now want to allow the user to get to the product display page.

We'll make 2 parts of our product card take the user to the product display, our image and our title. To do this we'll need to use the `onClick` function and pass it into the product, and then we want to use the onClick function to update our product data in the state.

<!-- Let's add a new prop to the `ProductCard` called `handleProductOnClick` which we can add to the `img` and `h5` tags. -->

In our App.js file lets add a new function called `handleProductOnClick`, below `handleSearch`:

```js
const handleProductOnClick = (productId) => {
  console.log(productId)
}
```

Now we can pass this through as a prop to the `ProductCard`

```js
<ProductCard
  key={product.id}
  id={product.id}
  name={product.attributes.name}
  priceNow={product.attributes.price.now}
  flashText={product.attributes.price.flashText}
  brand={product.attributes.brand}
  handleProductOnClick={handleProductOnClick}
/>
```

And in the `ProductCard`, lets attach this function to the `onClick` for the `img` and `h5`:

```js
<img
  src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
  className='productCard__image'
  onClick={() => handleProductOnClick(id)}
/>
<h5 onClick={() => handleProductOnClick(id)}>{name}</h5>
```

So now we need to think about what our function needs to do, at the moment our app will show the Product component if the product data is populated, so that's what we'll need to populate, we can use the product id to fetch the product data from the backend and populate our data.

We're going to use axios again to make a request to our backend to fetch the productData for that individual product.

So our handleProductOnClick should look like:

```js
const handleProductOnClick = (productId) => {
  axios
    .get(`http://localhost:8080/products/${productId}`)
    .then((res) => {
      setProductData(res.data)
    })
    .catch((e) => {
      console.log(e)
    })
}
```

This is great! We have navigated to the PDP from the PLP! Yay!

We should probably make the `productData` disappear when we search for something, and then make the search results disappear when we click on something.

```js
const handleSearch = (searchTerm) => {
  if (!searchTerm) return

  axios
    .get(`http://localhost:8080/search/${searchTerm}`)
    .then((res) => {
      setProductList(res.data.data)
      setProductData()
    })
    .catch((e) => console.log(e))
}

const handleProductOnClick = (productId) => {
  axios
    .get(`http://localhost:8080/products/${productId}`)
    .then((res) => {
      setProductData(res.data.data)
      setProductList([])
    })
    .catch((e) => {
      console.log(e)
    })
}
```

### 2

Now we want to use the add to trolley button. To do this we also want to store a basket in our local state, our basket can be an object, which we will give an id and the list of products, just like what the backend does;

```
{
  basketId: 'someId',
  basketItems: [
    {item1},
    {item2}
  ]
}
```

So use our hooks to set the initial state:

```js
const [basket, setBasket] = useState({ basketId: '', basketItems: [] })
```

We'll need another onClick handler to pass to our Trolley buttons, so lets start with creating a `handleAddToTrolleyClick` function:

```js
const handleAddToTrolleyClick = () => {
  console.log('ATT clicked')
}
```

We can then pass this function into both the Product Component and the ProductCard component.

Once passed in, add the `onClick` to both the Add to Trolley buttons, we will want to pass through the product id, and the quantity. For the time-being, the quantity will always be 1 - feel free to extend this functionality to allow for us to add multiple quantity.

```js
<FilledButton onClick={() => handleAddToTrolleyClick(id, 1)}>
  Add to trolley
</FilledButton>
```

---

### Note

Curious as to why we did

```js
onClick={() => handleAddToTrolleyClick(id, 1)}
```

and not

```js
onClick={handleAddToTrolleyClick(id, 1)}
```

?

Well this is because the `onClick` prop takes a function, however `handleAddToTrolleyClick(id, 1)` will call the `handleAddToTrolleyClick` function, and then pass what it returns to the `onClick`. Instead we want to pass through a function, which returns what `handleAddToTrolleyClick(id, 1)` returns.

Hence using

```
() => handleAddToTrolleyClick(id, 1)
```

This way, the function only gets called when onClick function is triggered.

---

We want to do a POST or a PUT request to the backend, which one depends on whether we already have a basket.

We're going to store the basketId after we've got one back from the backend, so we can use the value in the state to ascertain whether we want to do a POST or a PUT:

```js
if (basket.basketId) {
  do an axios PUT
} else {
  do an axios POST
}
```

our axios post request will look like this:

```js
axios
  .post('localhost:8080/baskets', {
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
```

replicate this using a put:
`` axios.put(`localhost:8080/baskets/\${basket.basketId}`, {...}) ``

### 3

Now we want to update the basket count depending on how many items are in the basket. We can pass the basketItems from state into our header, and do some array magic in there.

```js
<Header handleSearch={handleSearch} basketItems={basket.basketItems} />
```

Now in our Header.js, which we haven't looked in a lot yet, we'll want to update the basket number with our actual number.

The best way to do this is to use [`Array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

```js
const basketQuantity = basketItems.reduce((accumulator, current) => {
  return accumulator + current.quantity
}, 0)
```

Here we are iterating over every item in the array. For each item, we are adding the quantity to our 'accumulator', which starts with a value of 0.

Tada!

Some extra tasks if you have time:

- Display the products that are in the basket
- Add the ability to remove products from a basket
- Have separate pages for the home page, search results and product page:
  - Home page (`http://localhost:3000`)
  - Search page (`http://localhost:3000/search/<searchTerm>`)
  - Product page (`http://localhost:3000/product/<product id>`)
  - This can be done using [`React-Router`](https://reactrouter.com/web/guides/quick-start).
