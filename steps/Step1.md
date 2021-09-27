# Step 1

## Aim:

Use the search bar to search by product id and display the product information.

### 1 - Fetching product information

We currently `console.log` the input of our search bar. We want to instead use this input to fetch a product from the backend.

Let's change the `handleSearch` function to make a GET request to our backend whenever it is run.

There are various ways to make HTTP requests in Javascript. One popular way is to use a library called [`Axios`](https://axios-http.com/).

Axios has already been added as a dependency for you. We can use it as follows:

```js
import axios from 'axios'

...

const handleSearch = (searchTerm) => {
  if (!searchTerm) return

  axios
    .get(`http://localhost:8080/products/${searchTerm}`)
    .then((res) => {console.log(res)})
    .catch((e) => console.log(e));
  }
```

Because the URL is going to be dynamic (we need to insert the search term), then we need to use string interpolation. In Javascript this is easy, any string can use backticks (` `` `), and then we can use a variable for anything that is dynamic by using `${variable}`.

Hence if the search term was `123456`, the url would become `http://localhost:8080/products/123456`.

Axios is making a GET request to this dynamic url, it is then waiting for a response. Once it receives a response, it will trigger the `then` callback, which in our case is going to be logging the response to the console. This is the entire response, include the headers and status code that were set by the backend.

If there is an error, then axios will run the `catch` callback, and log the error to the console.

---

### Note - Promises

`axios.get` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We can either use the `.then(() => {}).catch(() => {})` syntax, or use `async/await`:

```js
const handleSearch = async (searchTerm) => {
  if (!searchTerm) return

  try {
    const res = await axios.get(`http://localhost:8080/products/${searchTerm}`)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
```

Both are valid approaches, and it is often down to personal preference which one is used.

---

Now we want to do something with the response, so lets store it in state.

In React, to set state you can use the [`useState`](https://reactjs.org/docs/hooks-state.html) hook.

```js
import React, { useState } from 'react'

...

const App = () => {
  const [productData, setProductData] = useState(null)

  ...

}
```

The `useState` function takes an initial value (null in our case) and returns an array, where the first value is the current value of that piece of state, and the second is a 'setter' to update that state.

Because `useState` returns an array, we can 'destructure' it. The above example is functionally exactly the same as the below example, but is much simpler, so this is how you will always see it used.

```js
const productState = useState(null)
const productData = productState[0]
const setProductData = productState[1]
```

`axios` provides the response body in `res.data`, and then the actual response from the backend is as follows:

```json
{
  "data": {
    "id": "4153955",
    "type": "products",
    "attributes": {
      "description": "Thai Sweet Chilli Flavour Potato Crisps",
      "name": "Sensations Thai Sweet Chilli Crisps 40g",
      "partNumber": "4153955",
      "brand": "Walkers",
      "price": {
        "now": 0.9,
        "mealDeal": true,
        "flashText": "Great New Price"
      }
    }
  }
}
```

So to store the product information in state:

```js
axios
  .get(`localhost:8080/products/${searchTerm}`)
  .then((res) => {
    setProductData(res.data.data)
  })
  .catch((e) => console.log(e))
```

Fab! We have the product data being stored in our local state, now we want to display this to the user.

### 2 - Displaying the product information

We can use our Product component to show the user the important information for the product. Firstly we need to pass the product data into the component, using props.

Props are simply attributes, or bits of information, that we want the consuming component to know about. They can be anything: a string, number, object, array, even another component!

Let's give our Product component a prop called `product` - the product we want to show.

```html
<Product product="{productData}" />
```

What if the productData hasn't been set yet? Do we still want to render the Product component? Probably not.

Because the initial value of productData is `null` we can treat it as a falsy value.

---

### Note - Truthiness

In Javascript, everything is either 'truthy' or 'falsy' (read more [here](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)).

The below values are falsy:

- `false`
- `0 (zero)`
- ` "", '', `` (empty strings) `
- `null`
- `undefined`
- `NaN (not a number)`

Everything else is truthy. Javascript is infamous for having strange behaviour when it comes to truthiness, so be careful!

---

Because Javascript treats `null` as falsy, we can use this to only render the Product component if the productData doesn't return a falsy value.

```
{ productData && <Product product={productData} />}
```

This works because of how the statement is executed. && is the AND operator in Javascript, so it may feel weird that we're just doing `productData AND component`, but it's actually because if it reaches a falsy then it will stop executing the statement.

So, we've fetched the productData, stored it in state, and passed it into the Product component. Now we need to show it in the Product component.

We may be passing the productData into the Product compoennt as a prop, but at the moment the component doesn't know this, we need to define the props in the component.

The Product Component is a functional component. This is denoted by the fact that it is a function (using an arrow function):

```js
const Product = () => {}
```

The one parameter that React will provided to the `Product` function is an object containing the props:

```js
const Product = (props) => {}
```

We can either access the `product` prop using `props.product`, or we can `destructure` the `props` object:

```js
const Product = ({ product }) => {}
```

Here, `product` may be referred to as a `named prop`.

From here we can get all the details in the product object that was returned from the backend by accessing fields inside the `product` object, e.g `product.attributes.name`

Everytime we save changes to our code, our component state will be lost. This means that we would have to search for a product everytime that we change something!

Because this is a pain, lets temporarily make our application fetch a product when it `mounts`/first renders.

We can do this using the [`useEffect`](https://reactjs.org/docs/hooks-effect.html) hook.

```js
import React, { useState, useEffect } from 'react'

...

const App = () => {
  const [productData, setProductData] = useState(null)

  // TODO: remove when we have finished developing!
  useEffect(() => {
    handleSearch('4153955')
  }, [])

  ...

```

---

### Note - useEffect

The `useEffect` hook allows certain things to have 'side-effects'. A single component can have multiple effects. It is provided with a callback (a function), and then a dependency array.

If no dependency array is provided, then the callback will be run everytime the component re-renders (if their props/state changes, or a parent re-renders).

If a dependency array is provided, then the effect will be run whenever any value in the dependency array changes. If an empty array is provided, then the effect will run when the component renders for the first time.

Hence, the first time the `App` component is rendered, it will run the `handleSearch `function, which will populate our state. Perfect!

#### Styling

Firstly we can change our image to be the product we have searched for, using the public sainsburys assets, `https://assets.sainsburys-groceries.co.uk/gol/[productId]/1/640x640.jpg`.

Once again, we can use string interpolation to make the string dynamic:

```js
src={`https://assets.sainsburys-groceries.co.uk/gol/${product.id}/1/640x640.jpg`}
```

We should probably also change some classnames here, given they're not very relevant anymore for a product display page. Notice that class names in React are `className=` rather than the HTML `class=`.

If we reflect back to [BEM](http://getbem.com/introduction/) then we know that we want our classnames to follow the pattern of `block__element--modifier`. In this component our block can be `product` and our element can be `image`.

```html
<img
src={`https://assets.sainsburys-groceries.co.uk/gol/${product.id}/1/640x640.jpg`}
className='product__image' alt={product.attributes.name} />
```

We know need to update our CSS. Open the `Products.scss` file. Note that we are using `SCSS` a CSS pre-processor which can make writing CSS that little bit easier.

We could write

```css
.product__image {
  display: block;
  width: 16rem;
  margin: $ln-space auto;
}
```

However because we are using `SCSS`, let's do a little future proofing:

```css
.product {
  &__image {
    display: block;
    width: 16rem;
    margin: $ln-space auto;
  }
}
```

This means that when we add more elements we don't have to write `.product...{}` every time.

Lets move the image to the left of the product page.

At the moment there is `margin: $ln-space auto;` which is using the `ln-space` variable from luna, and auto is moving the image to the middle.

The `margin` is using short hand for the 4 margins of the image - top, bottom, left and right. These are four different ways you can define the size of the margin:

```css
margin: T R B L;
margin: T RL B;
margin: TB RL;
margin TRBL;
```

Hence our current top/bottom margin is `$ln-space`, and the left/right margin is auto. Auto means that the margin will take up as much space as it can, resulting in a centered image.

Change this to just be `margin: $ln-space` would result in an even margin all the way round the image, with it now on the left.

We can change the width to be 30% so that it will scale when the screen size changes.

```css
.product {
  &__image {
    display: block;
    margin: $ln-space;
    width: 30%;
  }
}
```

Now lets go back to adding our product attributes, some important attributes would be title, price and description which are in the `product.attributes` object.

We can add the `name` into the existing `h1` tag:

```html
<h1 className="product__title">{product.attributes.name}</h1>
```

And below it, we can add the price:

```html
<div clasName="product__info">
  <strong>{product.attributes.price.now}</strong>
  <p>{product.attributes.description}</p>
</div>
```

We want to have the title on the right, and the image on the left.

There are various ways that we can do this. Lets use [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).

To make the styling easier, lets move the product title and product info into a new div:

```html
<div className="product__details">
  <h1 className="product__title">{product.attributes.name}</h1>
  <div clasName="product__info">
    <strong>{product.attributes.price.now}</strong>
    <p>{product.attributes.description}</p>
  </div>
</div>
```

Also, lets replace the existing `hero` class with `product`.

```css
.product {
  text-align: center;

  &__image {
    display: block;
    margin: $ln-space;
    width: 30%;
  }
}
```

```html
<Card className="product">...</Card>
```

We can make the `product` class a flex container by giving it `display: flex;`

Awesome, the image is now on the left, with the title, price and description on the right!

This is because the default `flex-direction` is `row`.

If we were to change it to `column` in the `product` class, then the styling would revert back to how it was before.

However when we make the page smaller, the image loses it's aspect ratio.
Let's give the `product__image` class `object-fit: contain;`

```css
.product {
  display: flex;
  text-align: center;

  &__image {
    display: block;
    margin: $ln-space;
    width: 30%;
    object-fit: contain;
  }
}
```

---

### Optional extra - media queries

It may be better to change our design entirely for certain screen sizes, as the image is starting to shrink and we are running out of room for our text. We can conditionally add styling to certain screen sizes using [`media queries`](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp).

e.g. for the flexbox example, lets try stacking the image on top of the product details at a small screen size:

```css
.product {
  display: flex;
  text-align: center;

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }

  &__image {
    display: block;
    margin: $ln-space;
    flex-shrink: 0;
    width: 30%;
    object-fit: contain;
  }
}
```

---

[Step 2](./Step2.md)
