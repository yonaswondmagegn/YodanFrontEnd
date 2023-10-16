import React, { useEffect, useState } from "react";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "./EachCartProduct";
import { useLocation } from "react-router-dom";
import backIcon from '../../assets/Icons.svg'
import { useNavigate } from "react-router-dom";

const CartHistoryDetail = () => {
  const [cart, setcart] = useState([]);
  const cartstate = useSelector(state=>state.cart)
  const dispathc = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()


  useEffect(() => {
    dispathc(
      apiCallBegin({
        url: `store/cart/${location?.state?.id}/cartproducts/`,
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("auth")).access
          }`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        onSuccess: (res) => {
          setcart(res.data);
          if(res.data.length ==0){
            navigate(-1)
          }
        },
      })
    );
  }, [cartstate?.HistoryLoad]);
  return (
    <div>
      <img src={backIcon} onClick={()=>navigate('/cart')} alt="" />
      {cart?.map((product) => (
        <ProductInCart product={product} comp="History" cartComp = {location?.state?.cartHistory} key={product.id}/>
      ))}
    </div>
  );
};

export default CartHistoryDetail;
