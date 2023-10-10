import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";


const authSlice = createSlice({
    name:'auth',
    initialState:{
        auth:{},
        profile:{},
        error:"",
    },
    reducers:{
        saveTookns:(state,action)=>{
            localStorage.setItem("auth",JSON.stringify(action.payload))
            state.auth = action.payload
        },
        addProfile:(state,action)=>{
            state.profile = action.payload
            localStorage.setItem('profile',JSON.stringify(action.payload))
            if(state.error){
                state.error = ""
            }
        },
        setError:(state,action)=>{
            state.error = action.payload.msg
        },
        nullError:(state)=>{
            state.error = ""
        }
       
    }
})

export default authSlice.reducer;
export const {saveTookns,addProfile,setError,nullError} = authSlice.actions
