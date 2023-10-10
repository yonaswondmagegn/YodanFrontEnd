import React from "react";
import "./CartCss/cartproducts.css";
import ProductInCart from "./EachCartProduct";


const CartProductLists = ({ products }) => {

  return (
    <div className="cart__product__list">
      {products?.length >0 ?products?.map((prod) => (
        <ProductInCart product={prod} key={prod?.id} comp="cart"  />
      )):<h1>No Products Yet !!</h1>}
    </div>
  );
};

export default CartProductLists;
