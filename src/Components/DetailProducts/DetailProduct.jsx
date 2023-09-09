import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import OrderBtn from '../Cart/OrderBtn'
import AddToCart from '../Cart/AddToCart'
import AdminContact from './AdminContact'
import './DetailCss/detailproduct.css'
import CartIcon from '../Cart/CartIcon'

const DetailProduct = ({ }) => {
    const location = useLocation()
    const { id } = useParams()
    const [amount,setamount] = useState(1)
    const [FechedProduct, setFechedProduct] = useState({})
    const [FechedImages, setFechedImages] = useState([])

    useEffect(() => {
        const fechData = async () => {
            try {
                const productfeching = await axios.get(`http://127.0.0.1:8000/store/product/${id}`)
                const imagefeching = await axios.get(`http://127.0.0.1:8000/store/product/${id}/images`)

                setFechedProduct(productfeching.data)
                setFechedImages(imagefeching.data)
            } catch (error) {
                console.log(error);
            }
        }
        if (location.state?.product_data && location.state?.product_images) return;

        fechData()
    }, [])


    const product = location.state?.product_data || FechedProduct
    const images = location.state?.product_images || FechedImages


    return (
        <div className='detailproduct'>
            <div className="detailproduct__images" >
                {images && images.map(image => <img src={image?.image} className='detailimage__each' key={image?.id} />)}
                <img src={images[0]?.image} className='blur__img' />
                <CartIcon cName = 'detailproduct__carticon' />
                
            </div>
            <div className="dtailproduct__discription">
                <div className="detailproduct__title__price">
                    <p className="detailprodcut__title">{product?.title}</p>
                    <p className="detailproduct__price">Price {product?.price}</p>
                </div>
                <div className="detailprodcut__discription__content">
                    <h2 className="detailproduct__discription__self__text">Description</h2>
                    <p className="detailproduct__description__pdisc">{product?.description}</p>
                </div>
            </div>
            <div className="detailproduct__order__buttons">
                <button onClick={()=>setamount(prev=>prev+1)}>+ {amount}</button>
                <AddToCart product={product.id} amount={amount}/>
                
                <OrderBtn />
            </div>
           <AdminContact />
        </div>
    )
}

export default DetailProduct