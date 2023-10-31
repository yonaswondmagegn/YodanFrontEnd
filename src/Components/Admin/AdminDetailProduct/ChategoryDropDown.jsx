import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { apiCallBegin } from '../../../reduxstates/Auth/authActions'
import '../adminCss/adminpost.css'

const ChategoryDropDown = ({selectedDropdown,setSelectedDropdown}) => {
    const dispatch = useDispatch()
    const [dropdown,toogleDropDown] = useState(false)
    const [chategory,setchategory] = useState()

    useEffect(()=>{
        dispatch(apiCallBegin({
            url:`store/chategory/`,
            onSuccess:res=>{
                setchategory(res.data)
                console.log(res.data)
            },
            onError:"onError"
        }))
    },[])
    

  return (
    <div>
        <p className="postproduct__chaetory__text">Chategory</p>
        <div className="postproduct__chategory__btncont">

        <button className="dropdown__btn" onClick={()=>toogleDropDown(prev=>!prev)}>{selectedDropdown.title}</button>
        <button className="dropdown__btn">Add  +</button>
        </div>
        {dropdown &&<div className="dropdown__list__selcets">
            {chategory?.results?.map(element=><p className="dropdown__eachbtn" key={element.id} onClick={()=>{
                toogleDropDown(prev=>!prev)
                setSelectedDropdown(element)}}>{element.title}</p>
            )}
        </div> }

    </div>
  )
}

export default ChategoryDropDown