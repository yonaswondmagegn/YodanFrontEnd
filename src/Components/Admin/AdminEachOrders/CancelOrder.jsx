import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import { cancelOrder } from '../../../reduxstates/Admin/AdminReducer'
import '../adminCss/eachOrder.css'


const CancelOrder = ({cart}) => {
  const dispatch = useDispatch()
  
  const CancelBtnClikcHandler = ()=>{
    dispatch(apiCallBegin({
      url:`store/cart/${cart?.id}/`,
      method:"put",
      data:{
        id:cart?.id,
        condition: "C",
        ordercondition: "O",
        customer: cart?.customer?.id,
        products: cart?.products,
      },
      onSuccess:res=>{
        let orderdata = res.data
        orderdata.customer = cart.customer
        dispatch(cancelOrder({
          conditionType:cart?.condition,
          cart:orderdata
        }))
      },
      onError:"onError"
    }))
  }
  return (
    <button onClick={CancelBtnClikcHandler} className='admin__eachorder__btn admin__eachorder__cancel'>Cancel</button>
  )
}

export default CancelOrder