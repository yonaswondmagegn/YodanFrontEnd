import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './HomeCss/product.css'

const Product = ({ product }) => {
  const [images, setimages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/store/product/${product.id}/images/`)
    .then(res => setimages(res.data))
    .catch(err => console.log(err))

  }, [])

 

  const prductClickHandler = ()=>{
    navigate(`${product.id}`,{state:{
      product_data:product,
      product_images:images,
    
    }}) 
  }

  return (
    <div className='product__cont' onClick={prductClickHandler}>
      <img src={images[0]?.image} alt="" className="product__img" />
      <div className="product__description">
        <p className="title__text">{product.title}</p>
        <p className="product__price">{product.price}</p>
      </div>
    </div>
  )
}

export default Product