import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import '../adminCss/admincss.css'
const AdminEachProduct = ({product}) => {
  const dispatch = useDispatch()
  const [image,setImage] = useState()

  useEffect(()=>{
    dispatch(apiCallBegin({
      url:`store/image/${product.images[0]}/`,
      onSuccess:res=>{
        setImage(res.data)
      },
      onError:"onError"
    }))
  },[])
  return (
    <div className='admineachproduct__main__cont'>
      <img src={image?.image} className='admineachproduct__image' alt="" />
      <div className="admineachproduct__disc__cont">
        <p className="admineachproduct__title">Title:{product.title}</p>
        <p className="admineachproduct__price">Price:{product.price}</p>
      </div>
    </div>
  )
}

export default AdminEachProduct
