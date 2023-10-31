import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import AddBoostEachProduct from './AddBoostEachProduct'
import'../adminCss/adminboostcss.css'
import backIcon from '../../../assets/Icons.svg'
import { useNavigate } from 'react-router-dom'

const AddBoost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedProduct,setselectedProduct] = useState()
    const [productList,setproductList] = useState()
    const [url,setUrl] = useState('store/product/?ordering=-id')
    const [seelistofProducts,setseeListofProducts] = useState(false)
    const textRef = useRef()

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:url,
            onSuccess:res=>{
                if(productList){

                    setproductList(prev=>{
                        let modifiedProduct = res.data
                        modifiedProduct.results = [...prev.results,...res.data.results]
                        return modifiedProduct
                    })
                }
                else{
                    setproductList(res.data)
                }
            },
            onError:'onError'
        }))
    },[url])

    const seeMoreHandler = ()=>{
        if(!productList?.next)return;
        setUrl(productList.next)
    }

    const onSubmitHandler = ()=>{
        if(!textRef || !selectedProduct) return;
        dispatch(apiCallBegin({
            url:`store/boostpost/`,
            method:'post',
            data:{
                active: true,
                slogan: textRef.current.value,
                product:selectedProduct.id
            },
            headers: {
                Authorization: `JWT ${
                  JSON.parse(localStorage.getItem("auth")).access
                }`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            onSuccess:res=>{
                navigate('/admin/boost')
            },
            onError:'onError'
            
        }))
    }

  return (
    <div>
        <img src={backIcon} onClick={()=>navigate(-1)} alt="" />
        {selectedProduct?<img className='addboost__selected__img' src={selectedProduct.images[0].image} alt="" />:<div className='addboost__notselected__product' onClick={()=>setseeListofProducts(prev=>!prev)}>Not Selected Yet</div>}
        <button onClick={()=>setseeListofProducts(prev=>!prev)}>Select Proudct</button>
        <input type="text" ref={textRef} placeholder='add Slogan...' className='addboost__slogan' id="" />
        <button className='slogan__btns' onClick={onSubmitHandler}>Submit</button>
        {seelistofProducts && <div className='addboost__product__main__cont'>
            {productList?.results?.map(ele=><AddBoostEachProduct product={ele} key={ele.id} setselectedProduct={setselectedProduct} setseeListofProducts={setseeListofProducts} />)}
            <button className='slogan__btns' onClick={seeMoreHandler}>seeMore</button>
            </div>}
    </div>
  )
}

export default AddBoost