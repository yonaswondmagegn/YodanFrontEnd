import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./CancelOrder";
import DeliveredOrder from "./DeliveredOrder";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegin } from "../../../reduxstates/Auth/authActions";
import {
  editCustomerInDeliveredOrder,
  editCustomerInNotDeliveredOrder,
  editCustomerInCanceledOrder,
  editCustomerInOnProgressOrder,
} from "../../../reduxstates/Admin/AdminReducer";
import AcceptOrder from "./AcceptOrder";
import '../adminCss/eachOrder.css'

const EachOrder = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const adminOrder = useSelector((state) => state.admin);
  const [customerEachOrder, setCustomerEachOrder] = useState();

  useEffect(() => {
    let customer;
    if (order?.condition == "ND") {
      customer = adminOrder?.NotDeliveredOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "D") {
      customer = adminOrder?.DeliveredOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "O") {
      customer = adminOrder?.OnProgressOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "C") {
      customer = adminOrder?.CanceledOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    }
    if (typeof customer != "number") return;
    dispatch(
      apiCallBegin({
        url: `/customer/customer/${customer}/`,
        onSuccess: (res) => {
          const data = {
            id: order?.id,
            customer: res.data,
          };
          if (order?.condition == "ND") {
            dispatch(editCustomerInNotDeliveredOrder(data));
          } else if (order?.condition == "D") {
            dispatch(editCustomerInDeliveredOrder(data));
          } else if (order?.condition == "O") {
            dispatch(editCustomerInOnProgressOrder(data));
          } else if (order?.condition == "C") {
            dispatch(editCustomerInCanceledOrder(data));
          }
        },
        onError: "onError",
      })
    );
  }, []);

  useEffect(() => {
    let customer;
    if (order?.condition == "ND") {
      customer = adminOrder?.NotDeliveredOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "D") {
      customer = adminOrder?.DeliveredOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "O") {
      customer = adminOrder?.OnProgressOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    } else if (order?.condition == "C") {
      customer = adminOrder?.CanceledOrders?.filter(
        (element) => element.id == order.id
      )[0]?.customer;
    }
    if (typeof customer == "object") {
      setCustomerEachOrder(customer);
    }
  }, [adminOrder]);

  const onClickHandler = ()=>{

    navigate(`/admin/orders/${order.id}`,{state:{
      cart:order
    }})
  }

  return (
    <div className="eachorder__main__cont" >
        <div className="eachorder__profile" onClick={onClickHandler} >
          <p className="profile__name"> {customerEachOrder?.user?.username}</p>
          <p className="profile__phonenumber">
            {customerEachOrder?.user?.phonenumber}
          </p>
        </div>
      <div className="eachorder__product__cont">
        <div className="order__disc" onClick={onClickHandler}>
          <p className="number_of_products">
            {order?.products?.length} Type of Products
          </p>
          <p className="eachorder__condition">condition :{order?.condition}</p>
          <p className="eachorder__date">{order?.updated_date?.slice(0, 10)}</p>
        </div>
      {order?.condition != "D" && order?.condition != "C" && (
          <div className="order__btns">
          <CancelOrder cart={order} />
          {order?.condition == "ND" && <AcceptOrder cart={order} />}
          {order?.condition != 'ND' &&<DeliveredOrder cart={order} />}
        </div>
      )}
    </div>
    </div>
  );
};

export default EachOrder;
