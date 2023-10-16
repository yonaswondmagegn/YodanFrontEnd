import React, { useEffect, useImperativeHandle, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useParams } from "react-router-dom";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { useDispatch,useSelector}from "react-redux";
import "./searchCss/search.css";
import EachSearchProduct from "./EachSearchProduct";


const Search = () => {
  const {que} = useParams()
  const dispatch = useDispatch()
  const [products,setproducts] = useState([])
  const [url,seturl] = useState(`store/product/?search=${que}`)

  useEffect(()=>{
    seturl(`store/product/?search=${que}`)
  },[que])

  console.log(que,'url')
  useEffect(()=>{
    if(que){
      if(que == 'q')return;
      dispatch(apiCallBegin({
        url:url,
        onSuccess:res=>{
          setproducts(prev=>res.data.results)
  
          
        },
        onError:"onError"
      }))
    }
  },[url])

  console.log(products,'hegelajfljkasdfaf')

  return (
    <div>
      <Navigation />
      <div className="search__main">
      {products.length == 0? <h1>Result Not Found !! </h1>:
      <div>
        <h1>Results...</h1>
        {products.map(product=><EachSearchProduct product={product} key={product.id} />)}
      </div>
      }
      </div>
    </div>
  );
};

export default Search;
