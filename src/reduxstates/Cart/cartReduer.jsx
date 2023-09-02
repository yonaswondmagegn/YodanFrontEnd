import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartsInAuthUser:[],
        cartsInLocalStorage:[],
        productsList:[]
    },
    reducers:{
        addcartsAuthUser:(state,action)=>{
            state.cartsInAuthUser=action.payload
        },
        addcartsInLocalStorage:(state,action)=>{
            localStorage.setItem('cart',)
            state.cartsInLocalStorage.push(action.payload.product)
        },
        addProductsList:(state,action)=>{
            state.productsList = action.payload

        }
    }
})

export default cartSlice.reducer;
export const {addcartsAuthUser,addcartsInLocalStorage,addProductsList} = cartSlice.actions;
