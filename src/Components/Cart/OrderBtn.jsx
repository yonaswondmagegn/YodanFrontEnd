import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { insertcartHistory } from "../../reduxstates/Cart/cartReduer";

const OrderBtn = ({ product, amount }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(()=>{
    console.log(amount,'FROM ORDER BTN')
  },[])

  const onClickHandler = ()=>{
    if(!localStorage.getItem('auth'))return;
    dispatch(
      apiCallBegin({
        url: `store/cartproducts/`,
        method: "post",
        data: {
          product: product.id,
          amount,
        },
        onSuccess: (res) => {
          dispatch(
            apiCallBegin({
              url: `store/cart/`,
              method: "post",
              data: {
                condition: "ND",
                ordercondition: "O",
                customer:JSON.parse(localStorage.getItem('profile')).id ,
                products: [res.data.id],
              },
              onSuccess:res=>{
                console.log(res.data);
                dispatch(insertcartHistory(res.data))
              },
              onError:'onError'
            })
          );
        },
        onError: "onError",
      })
    );
  }
  return <button onClick={onClickHandler} className="order__now__btn cart__btn">Order Now</button>;
};

export default OrderBtn;
