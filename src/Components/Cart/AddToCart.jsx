import React, { useState } from 'react'
import getCookie from '../Auth/getCookie'
import axios from 'axios'
import './CartCss/cart.css'


const AddToCart = ({ product, amount }) => {
  const csrftoken = getCookie('csrftoken')
  
  const createCartProductHandler = (product_id, amount) => {
    let Data = {
      product: product_id,
      amount: amount
    }
    axios.post('http://127.0.0.1:8000/store/cartproducts/', Data, {
      headers: {
        'Authorization': `JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    })
      .then(res => getcartHandler(res.data))
      .catch(err => console.log(err))
  }

  const updateCartHandler = (cart,product) => {
    console.log(cart);
    cart?.products.push(product.id)
    console.log(product);

    axios.put(`http://127.0.0.1:8000/store/cart/${cart?.id}/`, cart, {
      headers: {
        'Authorization': `JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  const createCartHandler = ()=>{
    if(localStorage.getItem('profile')){
      let cartData = {
        customer:JSON.parse(localStorage.getItem('profile')).id
      }
      axios.post('',)
    }
  }

  const getcartHandler = (product) => {
    if (localStorage.getItem('profile')) {
      axios.get(`http://127.0.0.1:8000/store/cart/?customer=${JSON.parse(localStorage.getItem('profile')).id}&date=&ordercondition=NO&ordering=-id`)
        .then(res => {
          if(res.data?.length >0){
            updateCartHandler(res.data[0],product)
          }else{
            createCartHandler(product)
          }
        })
        .catch(err => console.log(err))

    }
  }


  const onClcickHandler = () => {
    if (localStorage.getItem('auth')) {
      createCartProductHandler(product.id,amount)
    }
    else {
      console.log('not authenicated');
    }

  }
  return (
    <button className='addtocart__btn cart__btn' onClick={onClcickHandler}>Add to Cart</button>
  )
}

export default AddToCart