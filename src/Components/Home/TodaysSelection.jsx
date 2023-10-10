import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ScrollBar from './ScrollBar'
import config from '../../../config'

const TodaysSelection = () => {
  const [products,setproducts] = useState([])

  useEffect(()=>{
    axios.get(`${config.baseURL}/store/product/?ordering=-soled_count`)
    .then(res =>setproducts(res.data.results))

  },[])
  
  return (
    <div className='todays_selection'>
      <h2 className='todays_selection__text  chategory__text'>Todays Selections</h2>
      <ScrollBar products={products} />
    </div>
  )
}

export default TodaysSelection