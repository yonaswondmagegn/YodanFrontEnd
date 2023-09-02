import { combineReducers } from "redux";
import authReducer from './Auth/authReducer'
import cartReduer from "./Cart/cartReduer";

const entities = combineReducers({
    auth:authReducer,
    cart:cartReduer
})


export default entities;