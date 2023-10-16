import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartsInAuthUser: {},
    cartsInLocalStorage: [],
    productsList: [],
    count:0,
    cartHistory:[],
    HistoryLoad:true,
    detailCartRender:{},
  },
  reducers: {
    addcartsAuthUser: (state, action) => {
      state.cartsInAuthUser = action.payload;
    },
    addcartsInLocalStorage: (state, action) => {
      localStorage.setItem("cart");
      state.cartsInLocalStorage.push(action.payload.product);
    },
    addProductsList: (state, action) => {
      state.productsList = action.payload;
    },
    insertProductList: (state, action) => {
      state.productsList.push(action.payload);
    },
    deleteProductList:(state,action)=>{
        const originalCartList = state.productsList.filter(product =>product.id != action.payload)
        state.productsList=originalCartList
    },
    editAmount: (state, action) => {
      const productid = state.productsList.findIndex(
        (product) => product.id == action.payload.id
      );
      state.productsList[productid].amount = action.payload.amount;
    },
    editCount:(state,action)=>{
        state.count = action.payload
    },
    addcartHistory:(state,action)=>{
        state.cartHistory = action.payload
    },
    insertcartHistory:(state,action)=>{
        state.cartHistory=[action.payload,...state.cartHistory]
    },
    historyUpdate:(state,action)=>{
      state.HistoryLoad = !state.HistoryLoad
    },
    detailCartRender:(state,action )=>{
      state.detailCartRender = action.payload
    },
    removeHistoryProducts:(state,action)=>{
      const cartIndex = state.cartHistory.findIndex(cart=>cart.id == action.payload.id)
      state.cartHistory[cartIndex].products = action.payload.products
    },
   

  },
});

export default cartSlice.reducer;
export const {
  addcartsAuthUser,
  addcartsInLocalStorage,
  addProductsList,
  updateCartInAuthUser,
  editAmount,
  insertProductList,
  editCount,
  deleteProductList,
  addcartHistory,
  insertcartHistory,
  historyUpdate,
  detailCartRender,
  removeHistoryProducts,
} = cartSlice.actions;

export const isProductAvailableinCart = (state, targetproduct) =>
  state.productsList.filter((product) => product?.product?.id == targetproduct);
