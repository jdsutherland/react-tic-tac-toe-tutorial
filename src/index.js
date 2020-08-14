import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

const ProductCategoryRow = ({category}) => {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

const ProductRow = ({product}) => {
  const name = product.stocked ?  product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const ProductTable = ({filterText, inStockOnly, products}) => {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (!product.name.includes(filterText)) return
    if (inStockOnly && !product.stocked) return

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const SearchBar = ({
  onFilterTextChange,
  onInStockChange,
  filterText,
  inStockOnly,
}) => {
  const handleFilterTextChange = e => onFilterTextChange(e.target.value)
  const handleInStockChange = e => onInStockChange(e.target.checked)

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  )
}

const FilterableProductTable = ({products}) => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  const handleFilterTextChange = filterText => setFilterText(filterText);
  const handleInStockChange = inStockOnly => setInStockOnly(inStockOnly);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
