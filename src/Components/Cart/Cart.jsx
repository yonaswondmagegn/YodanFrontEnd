import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import CartIcon from './CartIcon'
import { addProductsList } from '../../reduxstates/Cart/cartReduer'


const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const [cartNumber,setcartNumber] = useState(1)
    
    const dispatch = useDispatch()
    

    // useEffect(()=>{
    //     if(localStorage.getItem('auth')){
    //         dispatch(apiCallBegin({
    //             url:`http://127.0.0.1:8000/store/cart/${cart?.cartsInAuthUser[cartNumber-1]?.id}/cartproducts/`
    //         }))
    //     }

    // },[])
    console.log(cartNumber,"cart only ")

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
        <div>
            <h2>{cart?.cartsInLocalStorage?.length>0?
            cart?.cartsInLocalStorage?.length:
            cart?.cartsInAuthUser?.length} Products in The Cart</h2>
            {multipleCartSystemHandler()}
            <input type="number" onChange={e=>{setcartNumber(e.target.value)}}/>
            <CartIcon cName = 'detailproduct__carticon'/>
        </div>
    )
}

export default Cart