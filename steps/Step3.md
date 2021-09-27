# Step 3

## Aim:

Searching by product id doesn’t make sense, change the endpoint to /search and map through products with a simple output

### 1

The next step will be a crucial part of the app as you want to search through the products and then display the data using a simple output.

So far we have a simple search box which can only be used to search for a single product by id, which isn't very user friendly at all. Now, we want to change this functionality a bit to utilise our `/search` endpoint.

Firstly, change the axios get request to use `/search`.
We might want use different state as well, so that we can use `productData` when we want to show the Product Display Page (PDP) in the future.

```js
const [productList, setProductList] = useState([])
```

which means we need to change the setProductData in the axios to setProductList.

We can now add a check for the productList, since it starts as an empty list all we need to do is check it has length greater than 0, then map through the products

Under the Header add a code block using `{}` and do the same type of defensive check as we did for productData:

`productList.length > 0 && ...`

Altogether that should look like:

```js
<div className="app">
  <header handleSearch="{handleSearch}" />
  { productList.length > 0 && ( )}
  { productData &&
    <Product product="{productData}" />
  }
</div>
```

Now to map through our products and show the customer something useful, we'll start with just the product name for now, in a simple `<div>`

[Arrays in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) have a few useful functions you can use to iterate through them and manipulate them in cases, each one accepting a function.
Here we just want to simply output something for each item, so we can use [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

The `map` function needs to be provided with a function, which it will run for every element in the array. Each of the values that get returned will then be combined into an array.

so we can do:

```js
productList.map((product) => <div>{product.attributes.name}</div>)
```

Now you should be able to see a list of product names when you search.

Finally, we need to provide a `key` for each of our products, this is to help react remain performant when working out what to render, lets use the product id:

```js
productList.map((product) => (
  <div key={product.id}>{product.attributes.name}</div>
))
```

[Step 4](./Step4.md)
