import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { addcartHistory } from "../../reduxstates/Cart/cartReduer";
import './CartCss/cartHistory.css'
import { useNavigate } from "react-router-dom";

const EachCartHistory = ({cart})=>{
    const [condition,setCondition] = useState()
    const navigate = useNavigate()


    const classNameEachCart = `each_carthistory ${cart?.condition}`
    useEffect(()=>{
        if(cart?.condition == "ND"){
            setCondition('Not Delivered')
        }else if(cart?.condition == "D"){
            setCondition("Delivered")
        }else if(cart?.condition == "O"){
            setCondition("On Progress")
        }else if(cart?.condition == "C"){
            setCondition("Cancelled")
        }
    },[condition])
    return(
        <div onClick={()=>navigate('/cart/historydetail',{state:{id:cart?.id,cartHistory:cart}})} className = {classNameEachCart}>
            <div>
            <p>{cart?.products?.length} Type of Products</p>
            <p>Condition : {condition}</p>
            </div>
            <div>
                <button className="cartHistory__cancel__btn">{cart?.condition == "C"?"Cancelled":"Cancel"}</button>
                <p className="cartHistory__date">{cart?.updated_date?.slice(0,10)}</p>
            </div>

            
        </div>
    )
}

const CartHsitory = ()=>{
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(cart.cartHistory?.length !=0)return;
        dispatch(apiCallBegin({
            url:`store/cart/?condition=&customer=${JSON.parse(localStorage.getItem('profile')).id}&ordercondition=O&ordering=-id`,
            headers: {
                'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess:res=>{
                dispatch(addcartHistory(res.data))
            },
            onError:"onError",
        }))
    },[cart])

    return(
        <div className="cartHistory__main">
            <h2 className="cartHistory__main__text">History</h2>
            {cart.cartHistory.map((cartelement,index)=>{
                if(cartelement?.products?.length == 0)return;
                return <EachCartHistory cart = {cartelement} key={cartelement.id} />
            })}
        </div>
    )
}

export default CartHsitory;