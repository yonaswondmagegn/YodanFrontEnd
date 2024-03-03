import React, { useState } from 'react'
import SighnUp from './SighnUp'
import Login from './Login'
import './AuthCss/auth.css'
import ErrorMessage from '../Messages/ErrorMessage'
import { useSelector } from 'react-redux'
import backIcon from '../../assets/Icons.svg'
// C:\Users\yonas\Desktop\reactpros\yodan\src\assets\Icons.svg
import { useNavigate } from 'react-router-dom'


const Auth = () => {
  const error = useSelector(state=>state.auth.error)
  const [page,setpage] = useState(true)
  const navigate = useNavigate()

  const loginPageChangeHandler = ()=>{
    setpage(false)
  }
  const sighnupPageChangeHandler = ()=>{
    setpage(true)
  }

  const onBackIconClickHandler = ()=>{
    navigate('/')

  }
  return (

    <div className='auth' >
      {error &&<ErrorMessage message={error} />}
      <img src={backIcon} onClick={onBackIconClickHandler} alt="" />
      <div className="auth__btns">
        <button className = {page?'auth__btn auth__current__page':'auth__btn'} onClick={sighnupPageChangeHandler}>SighnUp</button>
        <button className={page?'auth__btn':'auth__btn auth__current__page'} onClick={loginPageChangeHandler}>Login</button>
   
      </div>
      {page? <SighnUp />: <Login />}
    </div>
  )
}

export default Auth
