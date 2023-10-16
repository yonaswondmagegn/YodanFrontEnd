import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductByChategory from './ProductByChategory'
import config from '../../../config'
import './byChategroy/byChategory.css'

const Chategory = () => {
    const [chategory,setchategory] = useState([])

    useEffect(()=>{
        axios.get(`${config.baseURL}/store/chategory/?ordering=-likedrating&relatedproducts_gte=3&relatedproducts_lte=`)
        .then(res=>setchategory(res.data.results))
    },[])
  return (
    <div className='byChategory'>
      {chategory?.length >0 && chategory.map(element=><ProductByChategory chategory={element}  key={element?.id} />) }
    </div>
  )
}

export default Chategory