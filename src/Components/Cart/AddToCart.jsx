import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import './CartCss/cart.css'
import { cartById } from '../../reduxstates/Cart/cartReduer'
import { updateCartInAuthUser } from '../../reduxstates/Cart/cartReduer'


const AddToCart = ({ product, amount }) => {
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  const [cartlist, setcartlist] = useState(false)
  const dispatch = useDispatch()

  const cartInfo = cartById(cart?.cartsInAuthUser, 3)[0]
  console.log(cartInfo)


  const onClickHandler = () => {
    if (cart?.cartsInAuthUser?.length > 1) {
      setcartlist(true)
      return
    }

    const cartidUpdateuser = cart?.cartsInAuthUser[0]?.id
    UpdateCartHandler(cartidUpdateuser)
    return




  }

  const UpdateCartHandler = (cartid) => {
    if (localStorage.getItem('auth')) {
      dispatch(apiCallBegin({
        url: "/store/cartproducts/",
        method: "post",
        data: {
          product,
          amount
        },
        onSuccess: response => {
          if (response.status == 201) {
            const cartInfo = cartById(cart?.cartsInAuthUser, cartid)[0]
            dispatch(apiCallBegin({
              url: `/store/cart/${cartid}/`,
              method: "put",
              data: {
                condition: cartInfo?.condition,
                ordercondition: cartInfo?.ordercondition,
                customer: auth?.profile?.id,
                products: [...cartInfo?.products, response.data?.id]
              },
              onSuccess: response => {
                dispatch(updateCartInAuthUser({
                  id: cartid,
                  cart: response.data
                }))
              },
              onError: "onError"
            }))
          }
        },
        onError: "OnError"
      }))
    }
  }


  return (
    <div className="addtocart__cont">

      <button className='addtocart__btn cart__btn' onClick={onClickHandler} >Add to Cart</button>
      {cartlist &&
        <div className="listof__carts">
          {cart?.cartsInAuthUser?.map((cart, index) => <p key={cart?.id} onClick={() => {

            console.log(cart?.id)
            UpdateCartHandler(cart?.id)
          }
          }>Cart {index + 1}</p>)}
        </div>}
    </div>
  )
}

export default AddToCart
  // const createCartProductHandler = (product_id, amount) => {
  //   let Data = {
  //     product: product_id,
  //     amount: amount
  //   }