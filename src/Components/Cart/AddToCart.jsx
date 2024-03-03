import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import "./CartCss/cart.css";
import {
  addcartsAuthUser,
  isProductAvailableinCart,
  editAmount,
  insertProductList,
} from "../../reduxstates/Cart/cartReduer";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product, amount, productinst, images }) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartlist, setcartlist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onClickHandler = () => {
    if(!localStorage.getItem('auth')){
      navigate('/auth')
      return};
    let availebleProduct = isProductAvailableinCart(cart, product);
    if (availebleProduct?.length > 0) {
      let updatedamount = availebleProduct[0].amount + amount;
      updateSingleProductHandler(availebleProduct[0].id, updatedamount);
      return;
    }
    const cartidUpdateuser = cart?.cartsInAuthUser?.id;
    UpdateCartHandler(cartidUpdateuser);
  };

  const updateSingleProductHandler = (targetproductid, updateamount) => {
    if (localStorage.getItem("auth")) {
      dispatch(
        apiCallBegin({
          url: `store/cartproducts/${targetproductid}/`,
          method: "put",
          data: {
            amount: updateamount,
            product,
          },
          onSuccess: (response) => {
            dispatch(
              editAmount({
                id: targetproductid,
                amount: updateamount,
              })
            );
          },
          onError: "onError",
        })
      );
    }
    else{
      navigate('/auth')
    }
  }
  const UpdateCartHandler = (cartid) => {
    if (localStorage.getItem("auth")) {
      dispatch(
        apiCallBegin({
          url: "/store/cartproducts/",
          method: "post",
          data: {
            product,
            amount,
          },
          onSuccess: (response) => {
            if (response.status == 201) {
              const cartInfo = cart?.cartsInAuthUser;
              dispatch(
                apiCallBegin({
                  url: `/store/cart/${cartid}/`,
                  method: "put",
                  data: {
                    condition: cartInfo?.condition,
                    ordercondition: cartInfo?.ordercondition,
                    customer: auth?.profile?.id,
                    products: [...cartInfo?.products, response.data?.id],
                  },
                  onSuccess: (res) => {
                    let productWithImage = productinst;
                    productWithImage.images = images;
                    dispatch(
                      insertProductList({
                        id: response.data.id,
                        product: productWithImage,
                        amount,
                      })
                    );
                    dispatch(addcartsAuthUser(res.data));
                  },
                  onError: "onError",
                })
              );
            }
          },
          onError: "OnError",
        })
      );
    }
  };

  return (
    <div className="addtocart__cont">
      <button className="addtocart__btn cart__btn" onClick={onClickHandler}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
// const createCartProductHandler = (product_id, amount) => {
//   let Data = {
//     product: product_id,
//     amount: amount
//   }
