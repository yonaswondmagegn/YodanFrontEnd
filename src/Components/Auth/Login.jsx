import React, { useState } from 'react'
import { useRef } from 'react'
import './AuthCss/sighnup.css'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import { useSelector,useDispatch } from 'react-redux'
import { saveTookns ,addProfile,setError,nullError} from '../../reduxstates/Auth/authReducer'

export const setProfileHandler = (dispatch)=>{
            if(localStorage.getItem('auth')){
                dispatch(apiCallBegin({
                    url: "auth/users/me",
                    headers: {
                        'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    onSuccess:addProfile.type,
                    onError:setError.type,
            
                }))
            }
    
}
export const loginHandler = (dispatch,data)=>{

    dispatch(apiCallBegin({
        url:"auth/jwt/create",
        method:"post",
        data,
        onSuccess:response=>{
            dispatch(saveTookns(response.data))
            setProfileHandler(dispatch)

            
        },
        onError:setError.type,
     }))
    
}
const Login = () => {
    const dispatch = useDispatch()
    const nameref = useRef()
    const passwordref = useRef()


    const onSubmitHandler = (event)=>{
        event.preventDefault()


        if(passwordref?.current?.value.length < 8){
            console.log("the password must be greater than 8");
            return;
        }
        else if(nameref?.current?.value.length== 0 ){
            console.log("username needed")
            return;
         }
         let data = {
                username: nameref.current.value,
                password: passwordref.current.value
            }
         loginHandler(dispatch,data)
    }
    return (
        <div className='sighnup' onSubmit={onSubmitHandler}>

            <form className='sighnup__form' >
                <p className="sighnup__text">Your Name:</p>

                <input type="text" autoComplete= 'none' ref={nameref} name="" className="sighnup__input login__username" />
                <p className="sighnup__text">Passwrod:</p>

                <input type="password" ref={passwordref} name="" className='sighnup__input login__password' />
                <input type="submit" className='sighnup__submit__btn' value="Login" />
            </form>
        </div>
    )
}

export default Login

















        // const onsuccesLoginHandler = (auth)=>{
        //     localStorage.clear('auth')
        //     localStorage.setItem('auth',JSON.stringify(auth))
        //     axios.get('http://127.0.0.1:8000/auth/users/me/',{ headers: {
        //         'Authorization':`JWT ${auth.access}`,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }}).then(res=>localStorage.setItem('profile',JSON.stringify(res.data)))
        //     .catch(err=>SetErrors(prev=>[...prev,err.request.response]))
        // }
        
        
        // const loginUser = (userData) => {
        //     const csrftoken = getCookie('csrftoken');
            
        //     axios.post('http://127.0.0.1:8000/auth/jwt/create', userData,
        //         {

        //         }
        //     ).then(res => onsuccesLoginHandler(res.data))
        //     .catch(err =>SetErrors(prev=>[...prev,err.request.response]))
        // }
        
       
        // const loginHandler = (event) => {
        //     event.preventDefault();
        //     let userData = {
        //         username: nameref.current.value,
        //         password: passwordref.current.value
        //     }d
        //     loginUser(userData)
           
        // }