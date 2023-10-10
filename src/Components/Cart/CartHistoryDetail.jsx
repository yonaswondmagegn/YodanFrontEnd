import React, { useEffect, useState } from "react";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "./EachCartProduct";
import { useLocation } from "react-router-dom";

const CartHistoryDetail = () => {
  const [cart, setcart] = useState([]);
  const cartstate = useSelector(state=>state.cart)
  const dispathc = useDispatch();
  const location = useLocation();

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
          console.log(res.data);
        },
      })
    );
  }, [cartstate?.HistoryLoad]);
  return (
    <div>
      {cart?.map((product) => (
        <ProductInCart product={product} comp="History" cartComp = {location?.state?.cartHistory} key={product.id}/>
      ))}
    </div>
  );
};

export default CartHistoryDetail;
