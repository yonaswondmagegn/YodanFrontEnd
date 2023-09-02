import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { nullError } from '../../reduxstates/Auth/authReducer'
import './messagescss/errors.css'

const ErrorMessage = ({message}) => {
  const dispatch = useDispatch()
  
  const onCancelHandler = ()=>{
    dispatch(nullError())
  }
  return (
    <div className='error__message'>
      <p className='error__message__text'>

      {message}
      </p>
      <p className="cancelerror__message__btn" onClick={onCancelHandler}>X</p>

      </div>
  )
}

export default ErrorMessage