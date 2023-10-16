import { combineReducers } from "redux";
import authReducer from './Auth/authReducer'
import cartReduer from "./Cart/cartReduer";
import adminReducer from './Admin/AdminReducer'

const entities = combineReducers({
    auth:authReducer,
    cart:cartReduer,
    admin:adminReducer,
})


export default entities;