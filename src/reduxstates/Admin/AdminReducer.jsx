import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice({
    name:"admin",
    initialState:{
        NotDeliveredOrders:[],
        DeliveredOrders:[],
        OnProgressOrders:[],
        CanceledOrders:[],
        loadOP:false,
        loadC:false,
        loadD:false,
    },
    reducers:{
        setNotDeliveredOrders:(state,actions)=>{
            state.NotDeliveredOrders = actions.payload
        },
        setDeliveredOrders:(state,actions)=>{
            state.DeliveredOrders = actions.payload
        },
        
        setOnProgressOrders:(state,actions)=>{
            state.OnProgressOrders = actions.payload
        },
        setCanceledOrders:(state,actions)=>{
            state.CanceledOrders = actions.payload
        },
        editCustomerInNotDeliveredOrder:(state,actions)=>{
            const orderIndex = state.NotDeliveredOrders.findIndex(element =>element.id == actions.payload.id)
            state.NotDeliveredOrders[orderIndex].customer = actions.payload.customer
            
        },
        editCustomerInOnProgressOrder:(state,actions)=>{
            const orderIndex = state.OnProgressOrders.findIndex(element =>element.id == actions.payload.id)
            state.OnProgressOrders[orderIndex].customer = actions.payload.customer
            
        },
        editCustomerInCanceledOrder:(state,actions)=>{
            const orderIndex = state.CanceledOrders.findIndex(element =>element.id == actions.payload.id)
            state.CanceledOrders[orderIndex].customer = actions.payload.customer
            
        },
        editCustomerInDeliveredOrder:(state,actions)=>{
            const orderIndex = state.DeliveredOrders.findIndex(element => element.id == actions.payload.id)
            state.DeliveredOrders[orderIndex].customer = actions.payload.customer
        },
        acceptOrder:(state,actions)=>{
            let modifiedNDorder = state.NotDeliveredOrders.filter(order=>order.id != actions.payload.id)
            state.NotDeliveredOrders = modifiedNDorder
            if(state.OnProgressOrders?.length == 0 && !state.loadOP){
                state.loadOP = !state.loadOP
            }
            state.OnProgressOrders = [actions.payload,...state.OnProgressOrders]
            
            
        },
        cancelOrder:(state,actions)=>{
            if(actions.payload.conditionType == 'ND'){
                let modifiedNDorder = state.NotDeliveredOrders.filter(order=>order.id != actions.payload?.cart?.id)
                state.NotDeliveredOrders = modifiedNDorder
            }else if(actions.payload.conditionType == 'O'){
                let modifiedNDorder = state.OnProgressOrders.filter(order=>order.id != actions.payload?.cart?.id)
                state.OnProgressOrders = modifiedNDorder
            }
            if(state.CanceledOrders.length == 0 && !state.loadC){
                state.loadC = !state.loadC
            }
            state.CanceledOrders = [actions.payload.cart,...state.CanceledOrders]
        },
        deliverOrder:(state,actions)=>{
            let modifiedNDorder = state.OnProgressOrders.filter(order=>order.id != actions.payload.id)
            state.OnProgressOrders = modifiedNDorder

            if(state.DeliveredOrders.length == 0 && !state.loadD){
                state.loadD = !state.loadD
            }
            state.DeliveredOrders = [actions.payload,...state.DeliveredOrders]
        },
        loadOPToogler:(state,actions)=>{
            state.loadOP = !state.loadOP
        },
        loadCToogler:(state,actions)=>{
            state.loadC = !state.loadC
        },
        loadDToogler:(state,actions)=>{
            state.loadOP = state.loadD
        }
    }
})

export default AdminSlice.reducer
export const  {
    setDeliveredOrders,
    setNotDeliveredOrders,
    setCanceledOrders,
    setOnProgressOrders,
    editCustomerInDeliveredOrder,
    editCustomerInNotDeliveredOrder,
    editCustomerInCanceledOrder,
    editCustomerInOnProgressOrder,
    acceptOrder,
    loadCToogler,
    loadOPToogler,
    loadDToogler,
    cancelOrder,
    deliverOrder,
} = AdminSlice.actions