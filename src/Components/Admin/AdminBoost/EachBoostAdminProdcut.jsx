import React, { useState } from 'react'
import '../adminCss/adminboostcss.css'
import { useDispatch} from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'


const EachBoostAdminProdcut = ({product}) => {
  const dispatch = useDispatch()
  const [isActive,setisActive] = useState(product.active)
  
  const onChangeHandler = ()=>{
   
   
    dispatch(apiCallBegin({
      url:`store/boostpost/${product.id}/`,
      method:'put',
      data:{
          active: !isActive,
          slogan: product.slogan,
          product: product.product.id
      },
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("auth")).access
        }`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      onSuccess:res=>{
        setisActive(res.data.active)
      },
      onError:'onError'
    }))
  }
  return (
    <div className='eachboostproduct__main__cont'>
        <img src={product.product.images[0].image} className='eachboostproduct__img' alt="" />
        <div className="eachboost__adminproduct__disc">
          <p className="eachboost__admin__title">Product: {product.product.title}</p>
          <p className="eachboost__admin__slogan">Slogan: {product.slogan}</p>
          <label >isActive</label>    
          <input type="checkbox" onChange={onChangeHandler} className='eachboostproduct__checkbox' checked = {isActive}/>
        </div>
    </div>
  )
}

export default EachBoostAdminProdcut