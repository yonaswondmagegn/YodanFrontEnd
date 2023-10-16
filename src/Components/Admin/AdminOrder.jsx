import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import { 
    setNotDeliveredOrders,
    setDeliveredOrders,
    setOnProgressOrders,
    setCanceledOrders,
    loadCToogler,
    loadOPToogler,
    loadDToogler
} from '../../reduxstates/Admin/AdminReducer'
import EachOrder from './AdminEachOrders/EachOrder'
import './adminCss/adminOrder.css'

const AdminOrder = () => {
    const [ordertype,setordertype] = useState('ND')
    const orders = useSelector(state=>state.admin)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(ordertype == "ND" && orders?.NotDeliveredOrders?.length >0)return;
        if((ordertype == "D" && orders?.DeliveredOrders?.length > 0) && !orders.loadD ) return;
        if((ordertype == 'O' && orders?.OnProgressOrders?.length >0) && !orders.loadOP) return;
        if((ordertype == "C" && orders?.CanceledOrders?.length >0) && !orders.loadC) return;
        dispatch(apiCallBegin({
            url:`store/cart/?condition=${ordertype}&customer=&ordercondition=O&ordering=-updated_date`,
            onSuccess:res=>{
                if(ordertype == "ND"){
                    dispatch(setNotDeliveredOrders(res.data))
                }else if(ordertype == 'D'){
                    dispatch(setDeliveredOrders(res.data))
                    if(orders.loadD){
                        dispatch(loadDToogler())
                    }
                }else if(ordertype == 'O'){
                    dispatch(setOnProgressOrders(res.data))
                    if(orders.loadOP){
                        dispatch(loadOPToogler())
                    }
                }else if(ordertype == 'C'){
                    dispatch(setCanceledOrders(res.data))
                    if(orders.loadC){
                        dispatch(loadCToogler())
                    }
                }
            },
            onError:"onError"
        }))

    },[ordertype])
  return (
    <div>
        <div className="nav__status__toogler">
            <button className={ordertype == 'ND'?"status__toogler__btn status__toogler__active":"status__toogler__btn"} onClick={()=>setordertype('ND')}>NotDelivered</button>
            <button className={ordertype == 'D'?"status__toogler__btn status__toogler__active":"status__toogler__btn"} onClick={()=>setordertype('D')}>Delivered</button>
            <button className={ordertype == 'O'?"status__toogler__btn status__toogler__active":"status__toogler__btn"} onClick={()=>setordertype('O')}>OnProgress</button>
            <button className={ordertype == 'C'?"status__toogler__btn status__toogler__active":"status__toogler__btn"} onClick={()=>setordertype('C')}>Canceled</button>
        </div>
        <div className="adminorder__list">
            {ordertype == 'ND' && orders?.NotDeliveredOrders?.map(order=>order?.products?.length >0 &&<EachOrder order = {order} key={order.id}/>)}
            {ordertype == 'D' && orders?.DeliveredOrders?.map(order=>order?.products?.length >0 &&<EachOrder order = {order} key={order.id}/>)}
            {ordertype == 'O' && orders?.OnProgressOrders?.map(order=>order?.products?.length >0 &&<EachOrder order = {order} key={order.id}/>)}
            {ordertype == 'C' && orders?.CanceledOrders?.map(order=>order?.products?.length >0 &&<EachOrder order = {order} key={order.id}/>)}
        </div>

        <Outlet />
    </div>
  )
}

export default AdminOrder