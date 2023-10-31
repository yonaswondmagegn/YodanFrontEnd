import React from 'react'
import '../adminCss/detailorder.css'

const EachAdminDetailProduct = ({product}) => {
  return (
    <div className='eachadmindetail__product'>
        <img src={product.product.images[0].image} className='eachadmindetail__img' alt="" />
        <div className="eachadmindetail__product__disc">
            <p className="product__title">title:{product.product.title}</p>
            <p className="product__price">price;{product.product.price}</p>
            <p className="prodcut__amount">amount:{product.amount}</p>
            <p className="product__total__price">total price:{product.product.price * product.amount}</p>
        </div>
    </div>
  )
}

export default EachAdminDetailProduct