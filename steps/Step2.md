# Step 2

## Aim:

Add an external component and spruce up the product card.

### 1

One key part of a product display page is the option to add to trolley (ATT). For this we're going to want a button with some text and maybe an icon on it.

In order to keep our websites looking the same no matter which team built it, we use a common component library. Mike told you a bit about them, we currently have the Argos' Bolt and the Sainsbury's Luna. Since this is a Sainsbury's style lunch experience we'll use Luna.

We can find buttons in the `@jsluna/button` library. It has already been added as a dependency, but if it wasn't then we could add it using:

```bash
yarn add @jsluna/button
```

This will add the package to our `package.json` and our `yarn.lock` file.

Now we can import it in our Product component. We can see the different types you can use in the [luna docs](https://jsainsburyplc.github.io/luna/#/Packages/Button/Components?id=button-1) along with all the props available to pass in.

We can use the FilledButton example (the first one). So right at the top of our Product component with all the other imports, but under the React import:

```js
import { FilledButton } from "@jsluna/button';
```

Then we can add the `FilledButton` at the bottom of `product__details`:

```html
<div className="product__details">
  <h1 className="product__title">{product.attributes.name}</h1>
  <div clasName="product__info">
    <strong>{product.attributes.price.now}</strong>
    <p>{product.attributes.description}</p>
  </div>
  <FilledButton>Add to Trolley</FilledButton>
</div>
```

The title is looking a bit big, lets make it a little smaller by turning it into a h3.

## 2

We have many more attributes in our product data we can use, so let's get them onto the page.

<!--
Firstly, to tidy up the card we can put the price next to the Title, by wrapping them in their own block and adding flex to that parent too.

```
            <div className="product__header">
              <h1 className="product__title">{product.attributes.name}</h1>
              <strong>{product.attributes.price.now}</strong>
            </div>
```

```
.product {
    &__header {
    display: flex;
  }
}
``` -->

<!-- To make these two elements align neatly in the middle, we can use the `align-items` property and set it to center: `align-items: center;`
The title is also looking a bit big and gareish, let's try changing the h1 to a h3.
Luna also has a stylesheet which is adding some styles to these header properties. You can find these by inspecting the website and finding the h2 in the Elements tab, looking at the styles you'll see some styles which we haven't added - they're coming from luna to keep headings and many other elements consistent across our sites. -->

<!-- We can remove this margin by setting the margin to 0 on the title css. -->

We have the below information about the product's price:

```json
      "price": {
        "now": 3.49,
        "mealDeal": true,
        "flashText": "Great New Price"
      }
```

Let's add the `flashText` next to the price.

This would look good if it was in red, to make it stand out that, and if it came under the price.

Add another div wrapper around both price elements with classname of `product__price`, and add a classname to the flashText of `product__price--flash.`

In the `__price` css, make it flex again: `display: flex;`

We can see they're still next to each other, so we can use another flex property to make them stack instead, namely `flex-direction`. The default for flex-direction is `row`, which makes the flex 'flow' go left to right, we want this one to go from top to bottom so we can use the `column`

```css
  &__price {
    display: flex;
    flex-direction: column;
```

We can also align the text to the right using the css `align-items` property:
`align-items: flex-end;`

Looking much more like a product page already.

Now to make the flashText look like flash text, we can use red. Either we can use the css native 'red' colour, or we can use the luna variable for a colour red: `$ln-color-red` . For this we'll use the luna variable.

`color: $ln-color-red;`

Starting to come together. One thing you might notice is that, unless the backend has sent us a £ sign as part of the response for price, it's just a number.

To do this, lets create a helper function! This function can take the unformatted number as a parameter, and return the formatted price.

Firstly we define our function:

```js
const formatPrice = () => {}
```

We want to pass in a parameter, the price, so that goes inside the normal brackets `(price)`.

Finally, lets return our formatted price!

```js
return `£${price.toFixed(2)}`
```

This adds 2 digits after the `.`, with a £ at the front. Perfect!

Finally lets use the new function:

```html
<strong>{formatPrice(product.attributes.price.now)}</strong>
```

Have a play around with the leftover attributes, maybe style the Meal Deal into a badge style with some background colour.

[Step 3](./Step3.md)
