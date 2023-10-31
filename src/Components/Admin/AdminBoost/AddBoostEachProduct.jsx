import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import '../adminCss/adminboostcss.css'

const AddBoostEachProduct = ({product,setselectedProduct,setseeListofProducts}) => {
    const dispatch = useDispatch()
    const [images,setImages] = useState([])

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:`store/product/${product.id}/images/`,
            onSuccess:res=>{
                setImages(res.data)
            },
            onError:"onError"
        }))
    },[])

    const onClickHandler = ()=>{
        let modifiedProduct = product
        modifiedProduct.images = images
        setselectedProduct(modifiedProduct)
        setseeListofProducts(prev=>!prev)
    }

  return (
    <div onClick={onClickHandler} className='addboostproduct__each__main__cont'>
        <img src={images[0]?.image} alt=""  className='eachboostproduct__img' />
        <div className="addboostproduct__each__disc">
            <p className="addboostproduct__each__title">Title:{product.title}</p>
        </div>

    </div>
  )
}

export default AddBoostEachProduct