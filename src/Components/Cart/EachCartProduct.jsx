import React from "react";
import "./CartCss/cartproducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductList,
  addcartsAuthUser,
} from "../../reduxstates/Cart/cartReduer";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { useState } from "react";
import { editAmount,historyUpdate} from "../../reduxstates/Cart/cartReduer";



const ProductInCart = ({ product,comp,compCart}) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [editedamount,seteditedamount] = useState(product.amount);
  const dispatch = useDispatch();

  const removeProductHandler = () => {
    const cartInfo = comp == "History"?compCart:cart?.cartsInAuthUser

    const cartproducts = cartInfo.products.filter((id) => id != product.id);
    dispatch(
      apiCallBegin({
        url: `/store/cart/${cartInfo.id}/`,
        method: "put",
        data: {
          condition: cartInfo?.condition,
          ordercondition: cartInfo?.ordercondition,
          customer: auth?.profile?.id,
          products: cartproducts,
        },
        onSuccess: (response) => {
          if(comp == "cart"){
              dispatch(deleteProductList(product.id));
              dispatch(addcartsAuthUser(response.data));
              return
          }
          dispatch(historyUpdate())
        },
        onError: "onError",
      })
    );
  };

  const mathButtonHandler = (cond)=>{
    if(cond == "INC"){
      seteditedamount(prev=>prev+1)
    }
    else if(cond == 'DEC'){
      seteditedamount(prev=>prev-1)
    }
  }

  const modifyHandler = ()=>{
    dispatch(apiCallBegin({
      url:`store/cartproducts/${product.id}/`,
      method:"put",
      data:{
        product:product.product.id,
        amount:editedamount,
      },
      onSuccess:response=>{
        if(comp == "cart"){
            dispatch(editAmount({id:response.data.id,amount:response.data.amount}))
            return;
        }
        dispatch(historyUpdate())

      }
    }))
  }

  return (
    <div className="product__incart_container">
      <img
        src={product?.product?.images[0]?.image}
        className="product__incart_img"
        alt=""
      />
      <div className="product__incart__detailinfo">
        <h4>{product?.product?.title}</h4>
        <h5 className="product__incart__amount">
          Amount:
          <button onClick={()=>mathButtonHandler("DEC")} className="math_btn">-</button>
          {editedamount}
          <button className="math_btn" onClick={()=>mathButtonHandler('INC')}>+</button>
        </h5>
        <h5>Price:{product?.product?.price *product?.amount}</h5>
      </div>
      <div onClick={removeProductHandler} className="product__incart__delete">
        x
      </div>
      {editedamount != product.amount ? <button onClick={modifyHandler}>Modify</button> : ""}
    </div>
  );
};


export default ProductInCart