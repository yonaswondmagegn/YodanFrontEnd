import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiCallBegin } from '../../reduxstates/Auth/authActions'
import { useNavigate } from 'react-router-dom'
import './adminCss/adminboostcss.css'
import EachBoostAdminProdcut from './AdminBoost/EachBoostAdminProdcut'


const AdminBoost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [boostedProducts,setboostedProducts] = useState()
    const [url,setUrl] = useState('store/boost/')

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:url,
            onSuccess:res=>{
                if(boostedProducts){
                    setboostedProducts(prev=>{
                       let ModifiedResult = res.data
                       ModifiedResult.results = [...prev.results,...ModifiedResult.results]
                       return ModifiedResult
                    })
                }else{
                    setboostedProducts(res.data)
                }
            },
            onError:"onError"
        }))
    },[url])

    const seeMoreHandler = ()=>{
        if(!boostedProducts?.next)return;
        setUrl(boostedProducts.next)
    }
  return (
    <div className='adminboost__main__cont'  >
        <button className='slogan__btns boost_add_btn' onClick={()=>navigate('/admin/boost/add')}>Boost +</button>
        {boostedProducts?.results?.map(product=><EachBoostAdminProdcut product={product}  key={product.id}/>)}
        <button className='slogan__btns' onClick={seeMoreHandler}>See More</button>
    </div>
  )
}

export default AdminBoost