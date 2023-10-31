import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegin } from "../../../reduxstates/Auth/authActions";
import ChategoryDropDown from "./ChategoryDropDown";
import ImageAccepter from "./ImageAccepter";
import { useNavigate } from "react-router-dom";
import '../adminCss/adminpost.css'
import backIcon from '../../../assets/Icons.svg'

const PostProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [file, setFile] = useState();
  const [selectedDropdown, setSelectedDropdown] = useState({title: "Select",});
  const titleRef = useRef()
  const priceRef = useRef()
  const discRef = useRef()

  useEffect(()=>{
    console.log(file)
    console.log(titleRef)
  },[file,titleRef])

  const onSubmitHandler = ()=>{
    if(!titleRef || !priceRef || !discRef || !file || selectedDropdown.title == 'Select')return;
    const Form = new FormData()
    Form.append('image',file)

    dispatch(apiCallBegin({
      url:`store/image/`,
      method:"post",
      data:Form,
      headers: {
        Authorization: `JWT ${JSON.parse(localStorage.getItem("auth")).access}`,
        "Content-Type": "multipart/form-data",
      },
      onSuccess:res=>{
        console.log(res.data)
     
        const productData = {
          title:titleRef.current.value,
          price:priceRef.current.value,
          down_price:priceRef.current.value,
          description:discRef.current.value,
          chategory:selectedDropdown.id,
          images:[res.data.id],


        }
        console.log(productData);
        dispatch(apiCallBegin({
          url:`store/product/`,
          method:'post',
          data:productData,
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("auth")).access
            }`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          onSuccess:res=>{
            console.log(res.data);
          },
          onError:'onError'
        }))
      },
      onError:"onError"
    }))
  }
  return (
    <div className="postproducts__main__cont">
      <div className="postproduct__backicon__cont">
        <img src={backIcon} onClick={()=>navigate(-1)} alt="" />
      </div>
      <input type="text" ref={titleRef} className="input__title input__field" placeholder="Title..." />{" "}
      <br></br>
      <input type="number" ref={priceRef} className="input__price input__field" placeholder="Price..." />{" "}
      <br></br>
      <ChategoryDropDown
        selectedDropdown={selectedDropdown}
        setSelectedDropdown={setSelectedDropdown}
      />
      <div className="postproduct__disc__cont">
        <p className="postproduct__disc__text">Discription</p>
      <textarea className="postproduct__textarea" name="" ref={discRef} id="" cols="30" rows="10"></textarea>

      </div>
      <ImageAccepter setFile={setFile} />
      <button onClick={onSubmitHandler} className="postproduct__disc__submit__btn">Submit</button>
    </div>
  );
};

export default PostProduct;
