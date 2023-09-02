import React, { useEffect, useState } from 'react'
import ScrollBar from '../Home/ScrollBar'
import axios from 'axios'

const ProductByChategory = ({chategory}) => {
    const [products,setproducts] = useState([])
    useEffect(()=>{

        axios.get(`http://127.0.0.1:8000/store/product/?chategory=${chategory.id}&ordering=-date`)
        .then(res=>setproducts(res.data.results))
    },[])

  return (
    <div className='productbychategory'>
        <p className="chategory__text">{chategory?.title}</p>
        <ScrollBar products={products}  />

    </div>
  )
}

export default ProductByChategory