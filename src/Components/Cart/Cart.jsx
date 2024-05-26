import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import CartIcon from "./CartIcon";
import {  useNavigate } from "react-router-dom";
import { addProductsList } from "../../reduxstates/Cart/cartReduer";
import CartProductLists from "./cartProductLists";
import "./CartCss/cart.css";
import backIcon from "../../assets/Icons.svg";
import { ArrowLeft } from "react-feather";
import {
  addcartHistory,
  insertcartHistory,
} from "../../reduxstates/Cart/cartReduer";
import createNewCart from "./newCartCreator";
import CartHsitory from "./CartHistory";
import OrderBtn from "./OrderBtn";

export const loadCartProducts = (dispatch, cart) => {
  if (localStorage.getItem("auth")) {
    if (
      cart.cartsInAuthUser.products?.length == cart.productsList?.length &&
      cart?.cartsInAuthUser?.products?.length != 0
    )
      return;
    if (!cart.cartsInAuthUser) return;

    dispatch(
      apiCallBegin({
        url: `http://127.0.0.1:8000/store/cart/${cart?.cartsInAuthUser?.id}/cartproducts/`,
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("auth")).access
          }`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        onSuccess: (response) => {
          dispatch(addProductsList(response.data));
        },
        onError: "onError",
      })
    );
  }
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    loadCartProducts(dispatch, cart);
  }, [cart?.cartsInAuthUser]);

  const orderBtnHandler = () => {
    if (localStorage.getItem("auth")) {
      let cartInfo = cart.cartsInAuthUser;
      dispatch(
        apiCallBegin({
          url: `store/cart/${cartInfo.id}/`,
          method: "put",
          data: {
            condition: cartInfo?.condition,
            ordercondition: "O",
            customer: auth?.profile?.id,
            products: cartInfo?.products,
          },
          onSuccess: (res) => {
            dispatch(insertcartHistory(res.data));
            createNewCart(
              dispatch,
              JSON.parse(localStorage.getItem("profile")).id
            );
          },
          onError: "onError",
        })
      );
    }
  };

  return (
    <div className="cart__main__container">
       <div className="cart__main__product__side">
       <div className="cart__detail__cart__icon">
        <ArrowLeft
          onClick={() => navigate('/')}
          alt=""
          className="cart_backicon"
        />
        <CartIcon cName="detailproduct__carticon" />
      </div>
      <h2>
        {cart?.cartsInLocalStorage?.length > 0
          ? cart?.cartsInLocalStorage?.length
          : cart?.count}
        {" "}Products in The Cart
      </h2>

      {<CartProductLists products={cart?.productsList} />}
      {cart?.count != 0 && (
        <div className="cart_orderbtn__container">
          <button onClick={orderBtnHandler} className="main__cart__orderbtn">
            Order Know
          </button>
        </div>
      )}
       </div>
      <CartHsitory />
    </div>
  );
};

export default Cart;
