import axios from "axios"
import * as actions from '../Auth/authActions'
import config from "../../../config";

const apiCall = ({dispatch})=>next=>async action=>{
    if(action.type !== actions.apiCallBegin.type ) return next(action);
    console.log(action);

    next(action)
    const {url,method,data,onSuccess,onError,headers} = action.payload;
    try {
        const response = await axios.request({
            baseURL:config.baseURL,
            url,
            method,
            data,
            headers,
        })

        if(typeof onSuccess == "function"){
            onSuccess(response)
        }else{
            dispatch({type:onSuccess,payload:response.data})

        }

        
    } catch (error) {
        console.log(error)
        dispatch({type:onError,payload:{msg:"Problem Detected Please Try Again"}})
        
    }


    
}

export default apiCall;