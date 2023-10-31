import React, { useEffect, useState } from 'react'
import backIcon from '../../assets/Icons.svg'
import { useNavigate } from 'react-router-dom'
import './adminCss/admincss.css'
import { useLocation } from 'react-router-dom'

const AdminNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activateBtn,setActiveBtn] = useState()

    useEffect(()=>{
        setActiveBtn(location.pathname.slice(7))
        console.log(location.pathname.slice(7))
    },[])

  return (
    <div className='admin__nav__main__cont'>
        <div className="adminnav__backicon__cont">
            <img src= {backIcon} onClick={()=>navigate('/')} alt="" />
        </div>
        <div className="adminnav__redirect__btns">
            <button className= {activateBtn == 'orders'?'amdinnav__btn order__active__btn':"amdinnav__btn "} onClick={()=>{
                setActiveBtn('orders')
                navigate('/admin/orders')
                }}>Orders</button>
            <button  className= {activateBtn == 'products'?'amdinnav__btn order__active__btn':"amdinnav__btn "} onClick={()=>{
                setActiveBtn('products')
                navigate('/admin/products')
            }}>Products</button>
            <button  className= {activateBtn == 'boost'?'amdinnav__btn order__active__btn':"amdinnav__btn "} onClick={()=>{
                setActiveBtn('boost')
                navigate('/admin/boost')
            }}>Boost</button>

        </div>
    </div>
  )
}

export default AdminNavigation