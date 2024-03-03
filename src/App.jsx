import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { apiCallBegin } from "./reduxstates/Auth/authActions";
import { addcartsAuthUser, editCount } from "./reduxstates/Cart/cartReduer";
import { useSelector } from "react-redux";
import "./App.css";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import Cart from "./Components/Cart/Cart";
import DetailProduct from "./Components/DetailProducts/DetailProduct";
import { setProfileHandler } from "./Components/Auth/Login";
import { useDispatch } from "react-redux";
import createNewCart from "./Components/Cart/newCartCreator";
import { loadCartProducts } from "./Components/Cart/Cart";
import CartHistoryDetail from "./Components/Cart/CartHistoryDetail";
import Search from "./Components/Search/Search";
import Admin from "./Components/Admin/Admin";
import AdminOrder from "./Components/Admin/AdminOrder";
import Footer from "./Components/Footer/Footer";
import AdminDetailOrder from "./Components/Admin/AdminDetailOrder/AdminDetailOrder";
import AdminProducts from "./Components/Admin/AdminProducts";
import PostProduct from "./Components/Admin/AdminDetailProduct/PostProduct";
import AdminBoost from "./Components/Admin/AdminBoost";
import AddBoost from "./Components/Admin/AdminBoost/AddBoost";
import { useNavigate } from "react-router-dom";
import Test from "./Test";


function App() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    setProfileHandler(dispatch);
  }, []);
  useEffect(() => {
    loadCartProducts(dispatch, cart);
  }, [cart?.cartsInAuthUser]);

  useEffect(() => {
    let count = 0;
    cart.productsList.forEach((element) => {
      count += element.amount;
    });

    dispatch(editCount(count));
  }, [cart.productsList]);

  useEffect(() => {
    if (localStorage.getItem("auth") && auth.profile.id) {
      dispatch(
        apiCallBegin({
          url: `store/cart/?customer=${auth?.profile?.id}&date=&ordercondition=NO&ordering=-id`,
          onSuccess: (response) => {
            if (response?.data?.length > 0) {
              dispatch(addcartsAuthUser(response.data[0]));
            } else {
              createNewCart(dispatch, auth?.profile?.id);
            }
          },
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("auth")).access
            }`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          onError: "onError",
        })
      );
    }
  }, [auth.profile.id]);

  return (
    <>
     {JSON.parse(localStorage.getItem('customerInfo'))?.user?.is_staff?<button onClick={()=>navigate('/admin/orders')} className="ABtn_btn">ABtn</button>:''}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailProduct />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/historydetail" element={<CartHistoryDetail />} />
        <Route path="/search/:que" element={<Search />} />
        <Route path="/admin" element={<Admin />}>
         
          <Route path="orders" element={<AdminOrder />} />
          <Route path = "orders/:id" element={<AdminDetailOrder />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="boost" element={<AdminBoost />} />
        </Route>
        <Route path="/admin/products/post" element= {<PostProduct />} />
        <Route path="/admin/boost/add" element= {<AddBoost/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
