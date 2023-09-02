import React from 'react'
import './Boostedcss/bproduct.css'

const BoostedProduct = ({product}) => {
  return (
    <div className="boosted__product">
        <img src={product?.product?.images[0]?.image} alt="" className="boosted__product__img" />
        <div className="boosted__product__slogan">
            <p className="slogan__text">{product?.slogan}</p>
            <button className='buynow__btn'>Buy now</button>
        </div>
    </div>
  )
}

export default BoostedProduct