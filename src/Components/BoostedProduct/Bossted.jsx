import React, { useEffect, useState } from 'react'
import BoostedProduct from './BoostedProduct'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import './Boostedcss/bproduct.css'

const Bossted = () => {
    const [product, setproducts] = useState([])
    const [count, setcount] = useState(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/store/boost/?active=true&ordering=-date')
            .then(res => setproducts(res.data.results))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {

        const countinterval = setInterval(() => {
            if (count >= product.length-1) {
                setcount(0)
            } else {

                setcount(prev => prev += 1)
            }
        }, 4000);
        return () => clearInterval(countinterval)
    }, [product, count])
    return (
        <div className='boosted'>
            <TransitionGroup className='flex-div'>
                <CSSTransition
                    key={product[count]?.id}
                    timeout={3000}
                    classNames="fade"
                >
                    <BoostedProduct product={product[count]} />
                </CSSTransition>
            </TransitionGroup>

        </div>
    )
}

export default Bossted
