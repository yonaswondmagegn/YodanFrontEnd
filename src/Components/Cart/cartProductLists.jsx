import React from 'react'
import './CartCss/cartproducts.css'

const ProductInCart = ({product}) => {
  return (
    <div className='product__incart_container'>
      <img src={product?.product?.images[0]?.image} className='product__incart_img' alt="" />
      <div className="product__incart__detailinfo">
        <h4>{product?.product?.title}</h4>
        <h5 className="product__incart__amount">Amount:
        <button>-</button>
        {product.amount}
        <button>+</button></h5>
        <h5>Price:{product?.product?.price}</h5>
      </div>
      <div className="product__incart__delete">x</div>
    </div>
  )
}
const CartProductLists = ({products}) => {
  return (
    <div className='cart__product__list'>
      {products?.map(product=><ProductInCart product = {product} key={product?.id} />)}
    </div>
  )
}

export default CartProductLists

