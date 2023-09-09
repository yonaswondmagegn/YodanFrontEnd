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
        updateCartInAuthUser:(state,action)=>{
            const cartIndex = state.cartsInAuthUser.findIndex(cart=>cart.id == action?.payload?.id)
            state.cartsInAuthUser[cartIndex]= action.payload.cart        
        },
        addcartsInLocalStorage:(state,action)=>{
            localStorage.setItem('cart',)
            state.cartsInLocalStorage.push(action.payload.product)
        },
        addProductsList:(state,action)=>{
            state.productsList.push(action.payload)

        },
    }
})

export default cartSlice.reducer;
export const {addcartsAuthUser,addcartsInLocalStorage,addProductsList,updateCartInAuthUser} = cartSlice.actions;
export  const productsByCartIndex = (state,cartindex)=>state.filter(productlist=>productlist.cartIndex ==cartindex)
export const cartById = (carts,id)=>carts.filter(cart=> cart?.id == id)