import React from 'react'
import Product from './Product'
import './HomeCss/scrollbar.css'

const ScrollBar = ({products}) => {
  return (
    <div className='scrollbar'>
        {products.map(element=>
          <Product key={element.id} product = {element} />
        )}
    </div>
  )
}

export default ScrollBar