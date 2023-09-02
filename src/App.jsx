import React, { useEffect, useState } from 'react'
import { Routes,Route} from 'react-router-dom'
import { apiCallBegin } from './reduxstates/Auth/authActions'
import { addcartsAuthUser } from './reduxstates/Cart/cartReduer'
import { useSelector } from 'react-redux'
import './App.css'
import Home from './Components/Home/Home'
import Auth from './Components/Auth/Auth'
import Cart from './Components/Cart/Cart'
import DetailProduct from './Components/DetailProducts/DetailProduct'
import { setProfileHandler } from './Components/Auth/Login'
import { useDispatch } from 'react-redux'

function App() {
  const cart = useSelector(state=>state.cart)
  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    setProfileHandler(dispatch)
  },[])
  useEffect(()=>{
    if (localStorage.getItem('auth') && auth.profile.id) {
      dispatch(apiCallBegin({
        
        url:`store/cart/?customer=${auth?.profile?.id}&date=&ordercondition=NO&ordering=-id`,
        onSuccess:addcartsAuthUser.type,
        headers: {
          'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
        onError:"onError"
    }))

  }
  },[auth.profile.id])

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/:id' element = {<DetailProduct />} />
        <Route path='/auth' element = {<Auth />} />
        <Route path='/cart' element = {<Cart />} />
      </Routes>
  
    </>
  )
}

export default App
