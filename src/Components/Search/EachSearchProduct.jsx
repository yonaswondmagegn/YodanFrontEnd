import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import './searchCss/search.css'
import { useNavigate } from 'react-router-dom'

const EachSearchProduct = ({product}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image,setimage] = useState()

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:`/store/image/${product?.images[0]}`,
            onSuccess:res=>{
                setimage(res.data)
            },
            onError:'onError'
        }))
    },[])

    const onClickHandler = ()=>{
        navigate(`/${product.id}`,{state:{
            product_data:product,
            product_images:[image]
        }})
    }

  return (
    <div className='eachsearchproduct__cont' onClick={onClickHandler}>
        <img src={image?.image} className='eachsearchproduct__img' alt="" />
        <div className="eachsearchproduct__disc">
               <p className="eachsearchproduct__title">{product.title}</p>
               <p className="eachsearchproduct__price">Price:{product.price}</p>
               <p className="eachsearchproduct__desc">{product.description}</p>
        </div>

    </div>
  )
}

export default EachSearchProduct