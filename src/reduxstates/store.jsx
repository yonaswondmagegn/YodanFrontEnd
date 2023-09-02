import { configureStore } from "@reduxjs/toolkit";
import entities from "./reducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import apiCall from "./middlwares/apiCall";

const customMiddleware = getDefaultMiddleware({
    serializableCheck:false
})

export default configureStore({
    reducer:entities,
    middleware:[...customMiddleware,apiCall]
})