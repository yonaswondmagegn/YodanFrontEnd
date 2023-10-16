import React, { useEffect, useState } from 'react'
import backIcon from '../adminCss/Icons.svg'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'


const AdminDetailOrder = ({cart}) => {
    const dispatch = useDispatch()
    const [products,setproducts] = useState([])

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:`cart/${cart.id}/cartproducts/`,
            headers: {
                'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess:res=>res
        }))
    },[])
  return (
    <div></div>
  )
}

export default AdminDetailOrder