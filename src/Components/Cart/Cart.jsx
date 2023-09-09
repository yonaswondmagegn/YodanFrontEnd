import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import CartIcon from './CartIcon'
import { addProductsList,productsByCartIndex} from '../../reduxstates/Cart/cartReduer'
import CartProductLists from './cartProductLists'
import './CartCss/cart.css'

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    
    const [cartNumber,setcartNumber] = useState(1)

    const dispatch = useDispatch()
    

    useEffect(()=>{
        console.log('rendered')
        if(localStorage.getItem('auth')){
            if(cart?.cartsInAuthUser[cartNumber-1]?.products?.length == 
                productsByCartIndex(cart?.productsList,cartNumber-1)[0]?.products?.length || null) return;
                console.log(cart?.cartsInAuthUser[cartNumber-1]?.products?.length,productsByCartIndex(cart?.productsList,cartNumber-1)[0]?.products?.length || null)
            dispatch(apiCallBegin({
                url:`http://127.0.0.1:8000/store/cart/${cart?.cartsInAuthUser[cartNumber-1]?.id}/cartproducts/`,
                headers: {
                    'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                onSuccess:response=>{
                    dispatch(addProductsList({
                        cartIndex:cartNumber-1,
                        products:response.data
                    }))

                },
                onError:"onError"
            }))
        }

    },[cart.cartsInAuthUser,cartNumber])


    const multipleCartSystemHandler = ()=>{
        if(localStorage.getItem("auth")){
            return cart?.cartsInAuthUser.map(
                (cart,index)=><p 
                className= {
                    index == cartNumber-1?"multiplecart_system_btn multiplecart_system_active_btn":
                    'multiplecart_system_btn'}
                onClick={()=>setcartNumber(index+1)}
                 key={index}>Cart {index +1}</p>)
        }
        else{
            return cart?.cartsInLocalStorage.map(
                (cart,index)=><p 
                className={index == cartNumber-1?
                    "multiplecart_system_btn multiplecart_system_active_btn":
                    'multiplecart_system_btn'}
                onClick={()=>setcartNumber(index +1)}
                 key={index}>Cart {index +1}</p>)

        }
    }

    return (
        <div className='cart__main__container'>
            <div className="cart__detail__cart__icon">
                a
            <CartIcon cName = 'detailproduct__carticon'/>
            </div>
            <h2>{cart?.cartsInLocalStorage?.length>0?
            cart?.cartsInLocalStorage?.length:
            cart?.cartsInAuthUser?.length} Products in The Cart</h2>
            <div className="multiplecartsystem__main__cont">
            {multipleCartSystemHandler()}
            </div>
            {<CartProductLists products = {productsByCartIndex(cart?.productsList,cartNumber-1)[0]?.products} />}
        </div>
    )
}

export default Cart