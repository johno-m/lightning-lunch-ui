# Step 4

## Aim:

Internal Product Card with props and CTA, return on the products.map

### 1

The great thing about React is that you can build reusable components that can be used in many different parts of the application.

Benefits of this include providing consistency - allowing greater control and scalability for those building the apps and a better experience for the users, and improved reliability, as the code has already been used by many different people.

We are going to build a reusable component that displays a product in a card.

First let's create the component so make a new folder in the components folder and call it `ProductCard`. Then create the JS file for the component and a scss file for it

Next import React and the scss file that you just created an example is below:

```js
import React from 'react'
import './ProductCard.scss'
```

Now your going to want to create a function that takes props. Again if you get stuck an example is below:

```js
const ProductCard = ({ id, name, priceNow, flashText, description, brand }) => {
  return <div></div>
}
```

Finally, we need to export our new component:

```js
export default ProductCard
```

---

### Note - Default vs Named exports

In Javascript, there are two types of exports, `default` and `named`.

Above we have a `default` export, this is unsurprisingly signalled by the fact that we are using the `default` keyword. Each file can have up to one default export.

To import another files default export:

```js
import ThisCanBeCalledWhateverYouWant from './some/relative/path'
```

Meanwhile, a file can have multiple `named` exports.

```js
export const myFunction = () => {}

export const CONSTANT = 'CONSTANT'
```

And to import it:

```js
import { myFunction, CONSTANT } from './some/relative/path'
```

You can import a named export at the same time as importing a default export:

```js
import MyDefaultExport, { myFunction } from './some/relative/path'
```

---

Okay, so now that we have our component, let's add the product name into it.

```js
const ProductCard = ({ id, name, priceNow, flashText, description, brand }) => {
  return <div>{name}</div>
}
```

And lets use render the `ProductCard` for each product in our map, and pass through the name (and key).

```js
{
  productList.length > 0 &&
    productList.map((product) => (
      <ProductCard key={product.id} name={product.attributes.name} />
    ))
}
```

Awesome, we should now see a list of products name, that match what we search for.

As before, whenever we save our code, we will lose our state, so we will have to keep searching for something.

To make our lives easier, we can use our `useEffect` to search for products when the page first loads:

```js
useEffect(() => {
  handleSearch('a')
}, [])
```

Now that we have a list of ProductCards, lets style them. We want the product cards to appear in a grid view, with a limit of maybe 5 per row.

For this we can use CSS Grid. It is an alternative to Flexbox - you can build exactly the same layout using Flexbox, but CSS Grid makes it a little bit easier.

Let's wrap our list of ProductCards in a div, with the classname `product-list-container`:

```js
{
  productList.length > 0 && (
    <div className='product-list-container'>
      {productList.map((product) => (
        <ProductCard key={product.id} name={product.attributes.name} />
      ))}
    </div>
  )
}
```

And let's add some styles to the `product-list-container` class in a `app.scss` file (remember to import this at the top of `App.js`!)

```css
.product-list-container {
  max-width: 1200px;

  padding: 10px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}
```

Awesome, we now have product names showing in a grid, which is responsive - if we resize it then columns will appear/hide as applicable!

Lets quickly go over what we've done:

```css
max-width: 1200px;

padding: 10px;
margin: auto;
```

This means that the max width of the product list container will be 1200px, after which point there will be a margin at each side of the list (because of the margin: auto), and at all screensizes there will be a 10px padding, so that the grid is separated from the header.

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-gap: 20px;
```

Just like how to make an element a flex container you have to give it `display: flex`, to make an element a grid container you have to give it `display: grid`.

However, `display: grid` on it's own doesn't do anything, we need to define our grid.

```css
grid-template-columns: 200px 200px;
```

would create a grid where there are two columns, each 200px wide.

If we wanted the columns to be an even side, then we can use `fr`, the fractional unit where `1fr` is one part of the available space.

Hence

```css
grid-template-columns: 1fr 1fr;
// this is the same as
// grid-template-columns: repeat(2, 1fr)
```

would create two columns, where each take up 50% of the available space.

These columns are responsive, and will resize as we change ths size of the viewport. However on small screens, two columns will be too many, and at larger screens, two will be too few!

We could fix this using media queries, by changing the number of columns at certain widths, however grid is pretty cool and we can actually have it change the number of columns for us:

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

This will add as many columns as are necessary, such that all columns are at least 200px wide. If the columns are about to become less than 200px wide, then it will remove 1 of the columns, and make the existing columns bigger.

( Note: one of the consequences of this is that if you only have a few products returned, then they will be really big. This is because CSS Grid is telling them to take up as much space as possible. So maybe the `repeat(auto-fit, minmax(200px, 1fr))` approach isn't right after-all, but instead we should use media queries to change the number of columns depending on the viewport width. Feel free to play-around with this, or you can leave it as is. )

Finally, `grid-gap: 20px` will add a 20px gap between each column/row.

Okay, now lets add some more information to the ProductCard such as the image and price (this will be fairly similar to our `Product` component):

```js
const ProductCard = ({ name, id, priceNow, flashText }) => {
  return (
    <div className='productCard'>
      <img
        src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
        className='productCard__image'
      />
      <h5>{name}</h5>
      <div className='productCard__price'>
        <strong>{priceNow}</strong>
        <span className='productCard__price--flash'>{flashText}</span>
      </div>
      <FilledButton>Add to trolley</FilledButton>
    </div>
  )
}
```

Remember to update the props that you are padding to the `ProductCard` in `App.js`!

```js
<ProductCard
  key={product.id}
  id={product.id}
  name={product.attributes.name}
  priceNow={product.attributes.price.now}
  flashText={product.attributes.price.flashText}
/>
```

Feel free to add more information if you have time!

Okay, so everything is appearing in the UI, let's add some CSS to make it look better.

Let's start with creating a 'card' effect, by giving each card a white background, and a box-shadow:

```css
.productCard {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
```

Next let's add a `padding`, so that the contents isn't flush with the edge of the card:

```css
padding: 10px;
```

And let's make the image a bit smaller:

```css
&__image {
  width: 50%;
}
```

Now the image is smaller, we can see that the image isn't being centered. We can fix this by turning the `productCard` into a flex container, and adding `align-self: center` to the image class.

By default, a flex container has a direction of row, we want to change this to `column`, so will have to add `flex-direction: column;`.

Let's also center all of the text, using `text-align: center;`

CSS so far:

```css
.productCard {
  padding: 10px;
  text-align: center;

  display: flex;
  flex-direction: column;

  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &__image {
    width: 50%;

    align-self: center;
  }
}
```

It would look good if the price and add to trolley button were at the bottom of the card. To do this, lets adjust the margin of `productCard__price`:

```css
margin-top: auto;
margin-bottom: 10px;
```

Finally, we need to style the price, so that the price is on top of the flash text. Lets make `productCard__price` class a flex container, with a column direction.

And the flash text should be red`productCard__price--flash` be red, like on the product page:

```css
  &__price {
    display: flex;
    flex-direction: column;

    &--flash {
      color: $ln-color-red;
    }
```

(you will have to import `@import '@jsluna/foundation/scss/main';` at the top of the `scss` file!)

Awesome, the card is looking pretty good! We should probably use our `formatPrice` helper again, to convert the numerical price into a user-friendly one.

If you haven't already, lets move the `formatPrice` helper into a new folder/file, in `./src/helpers/formatPrice.js`.

```js
const formatPrice = (price) => {
  return `£${price.toFixed(2)}`
}

export default formatPrice
```

---

### Note - index files

We have added our `formatPrice` helper in `./src/helpers/formatPrice`, which means that to import it in the `ProductCard`, we would have to do

```js
import formatPrice from '../../helpers/formatPrice'
```

Wouldn't it be nice if we could just import it straight from `helpers`?

We can do this, using a `index.js` file.

```js
// helpers/index.js

export { default as formatPrice } from './formatPrice'
```

Then to import `formatPrice`:

```js
// ProductCard.js

import { formatPrice } from '../../helpers'
```

You don't have to do this, but it can help you to keep your imports tidy (imagine that we were importing multiple helpers).

---

Okay, let's use the helper:

```js
<strong>{formatPrice(priceNow)}</strong>
```

Awesome, our product card is looking pretty good. Feel free to add more information to it, or style it in a different way, if you have the time!

[Step 5](./Step5.md)
