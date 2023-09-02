import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import { loginHandler } from './Login'
import { setError } from '../../reduxstates/Auth/authReducer'
import { useRef } from 'react'
import './AuthCss/sighnup.css'



const SighnUp = () => {
    const entities = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const userref = useRef()
    const phoneref = useRef()
    const passwordref = useRef()
    console.log(entities)

    

    const sighnupHandler = (event)=>{
        event.preventDefault()
        if(passwordref?.current?.value.length < 8){
            console.log("The Password Must be Greater Than 8 Characters");
            dispatch(setError({msg:"the password must be greater than 8"}))
            return;
        }
        else if(userref?.current?.value.length== 0 ){
            dispatch(setError({msg:"UserName Needed"}))
            console.log("username needed")
            return;
        }
        let signupData = {
            username: userref.current.value,
            phonenumber: phoneref.current.value,
            password: passwordref.current.value
        }
        let loginData = {
            username: userref.current.value,
            password: passwordref.current.value

        }
        localStorage.removeItem('auth')
        dispatch(apiCallBegin({
            url: "auth/users/",
            method:"post",
            data:signupData,
            onSuccess:response=>{
                if(response.status == 201){
                    loginHandler(dispatch,loginData)
                }
            },
            onError:setError.type
         }))


         

      
    }
    

  return (
    <div className='sighnup'>
            
        <form className='sighnup__form' onSubmit={sighnupHandler}>
            <p className="sighnup__text">Your Name:</p>
            <input type="text" name="" id="username" className='sighnup__input' ref={userref} />
            <p className="sighnup__text">Your PhoneNumber:</p>
            <input type="number" name="" id="phone" className='sighnup__input' ref={phoneref} />
            <p className="sighnup__text">PassWord:</p>
            <input type="password" name="" id="password" className='sighnup__input' ref={passwordref} /> 
            <input type="submit" value="SighnUp" className='sighnup__submit__btn'/>        
        </form>
      
    </div>
  )
}

export default SighnUp



// const [Errors,SetErrors] = useState([])
//     let userData  = {}

//     const onsuccesLoginHandler = (auth)=>{
//         localStorage.clear('auth')
//         localStorage.setItem('auth',JSON.stringify(auth))
//         axios.get('http://127.0.0.1:8000/auth/users/me/',{ headers: {
//             'Authorization':`JWT ${auth.access}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         }}).then(res=>localStorage.setItem('profile',JSON.stringify(res.data)))
//         .catch(err=>SetErrors(prev=>[...prev,err.request.response]))
//     }
    
    
//     const loginUser = (userData) => {
//         const csrftoken = getCookie('csrftoken');
        
//         axios.post('http://127.0.0.1:8000/auth/jwt/create', userData,
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': csrftoken
//                 },
//             }
//         ).then(res => onsuccesLoginHandler(res.data))
//         .catch(err =>SetErrors(prev=>[...prev,err.request.response]))
//     }

//     const passwordValidator=(password)=>{
//         if (password.length <8){
//             SetErrors(prev=>[...prev,'The password is less than 8 characters'])
//             return false
//         }else{
//             return true
//         }
//     }
//     const phonenumberValidator= (phoneNumber)=>{
//         if(phoneNumber.length !=10){
//             SetErrors(prev=>[...prev,'The phoneNumber is not Correct'])
//             return false
//         }
//         else{
//             return true
//         }
//     }

//     function handleSubmit (event){
//         event.preventDefault();
//         SetErrors([])
//         if(!passwordValidator(passwordref.current.value) || !phonenumberValidator(phoneref.current.value))return;
//         console.log(userData);
//         userData = {
            // username:userref.current.value,
            // phonenumber:phoneref.current.value,
            // password:passwordref.current.value
//         }
//         let loginuserData = {
//             username:userref.current.value,
//             password:passwordref.current.value
//         }
//         axios.post('http://127.0.0.1:8000/auth/users/',userData,{
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken
//               },
//         })
//         .then(res=>{
//             console.log(res.status)
//             loginUser(loginuserData)
//         })
//         .catch(err=>SetErrors(prev=>[...prev,JSON.stringify(err.request.response)]))

//     }