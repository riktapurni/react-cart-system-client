import React from 'react'
// import { products } from '../../database/productData'
import ProductCard from './ProductCard'
import noProductImg from "../../assets/img/no-product-found.png"
const ProductList = ({products}) => {
  return (
    <div class="product-grid">
          {products.map((product) => (
  <ProductCard key={product.id} product={product}/>
          ))}
          {
            products.length < 1 && (
              <img src={noProductImg} alt="" className="m-auto w-60" />
            )
          }
         
        </div>
  )
}

export default ProductList