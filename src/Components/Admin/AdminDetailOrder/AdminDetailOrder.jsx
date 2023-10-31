import React, { useEffect, useState } from 'react'
import backIcon from '../../../assets/Icons.svg'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import EachAdminDetailProduct from './EachAdminDetailProduct'
import { useNavigate,useLocation} from 'react-router-dom'
import '../adminCss/detailorder.css'

const AdminDetailOrder = () => {
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const location = useLocation()
    const [products,setproducts] = useState([])
    const [cart,setcart] = useState()
    const [totalprice,settotalprice] = useState(0)
    const [totalAmount,setTotalAmount] = useState(0)
    
    useEffect(()=>{

      setcart(location?.state?.cart)
      if(!location?.state?.cart){
        navigate('/')
        return
      }
    },[])

    useEffect(()=>{
      let totalprice =0;
      let totalamount = 0;
      products?.map(product=>{
        totalprice += product.product.price
        totalamount += product.amount
      })
      settotalprice(totalprice)
      setTotalAmount(totalamount)
    },[products])
    useEffect(()=>{
      if(!cart)return;
        dispatch(apiCallBegin({
            url:`store/cart/${cart?.id}/cartproducts`,
            headers: {
                'Authorization':`JWT ${JSON.parse(localStorage.getItem('auth')).access}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            onSuccess:res=>{
              setproducts(res.data)
              console.log(res.data,'from detailcart order llaksdjfasdf')
            },
            onError:'onError',
        }))
    },[cart])
  return (
    <div className='admin__detail__maincont'>
      <div className="admindetailorder__nav">
        <div className="admindetailorder__profile">
          <p className="admindetailorder__customername">{cart?.customer?.user?.username}</p>
          <p className="admindetailorder__customerphonenumber">{cart?.customer?.user?.phonenumber}</p>
          <p className="admindetailorder__totalamount">{totalAmount} products</p>
          <p className="admindetailorder_-totalprice"> Total Price {totalprice}</p>
        </div>
      </div>
      <div className="admindetalorder__order__maincont">
        {products.map(item=><EachAdminDetailProduct product= {item} key={item.id} />)}
      </div>
      
    </div>
  )
}

export default AdminDetailOrder