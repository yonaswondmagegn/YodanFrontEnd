import React, { useState } from 'react'
import SighnUp from './SighnUp'
import Login from './Login'
import './AuthCss/auth.css'
import ErrorMessage from '../Messages/ErrorMessage'
import { useSelector } from 'react-redux'


const Auth = () => {
  const error = useSelector(state=>state.auth.error)
  const [page,setpage] = useState(true)

  const loginPageChangeHandler = ()=>{
    setpage(false)
  }
  const sighnupPageChangeHandler = ()=>{
    setpage(true)
  }
  return (

    <div className='auth' >
      {error &&<ErrorMessage message={error} />}
      <div className="auth__btns">
        <button className = {page?'auth__btn auth__current__page':'auth__btn'} onClick={sighnupPageChangeHandler}>SighnUp</button>
        <button className={page?'auth__btn':'auth__btn auth__current__page'} onClick={loginPageChangeHandler}>Login</button>
   
      </div>
      {page? <SighnUp />: <Login />}
    </div>
  )
}

export default Auth
