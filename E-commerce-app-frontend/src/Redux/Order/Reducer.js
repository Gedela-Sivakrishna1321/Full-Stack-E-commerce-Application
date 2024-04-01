import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USER_ORDERS_FAILURE, GET_USER_ORDERS_SUCCESS } from "./ActionType"


const initialState = {
    orders : [],
    order : null,
    error : null,
    loading : false,
    userOrders : []
}

export const orderReducer = (state = initialState, action) => {

    switch(action.type) {
        case CREATE_ORDER_REQUEST : 
            return {
                ...state,
                loading : true};
        case CREATE_ORDER_SUCCESS :
            return {
                ...state,
                loading : false,
                order : action.payload,
            }
        case CREATE_ORDER_FAILURE : 
            return {
                state,
                loading : false,
                error : action.payload,
            }
        case GET_ORDER_BY_ID_REQUEST : 
            return {
                ...state,
                loading : true,
            }
        case GET_ORDER_BY_ID_SUCCESS :
            return {
                ...state,
                loading : false,
                order : action.payload,
            }
        case GET_ORDER_BY_ID_FAILURE : 
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case GET_USER_ORDERS_SUCCESS : 
            return {
                ...state,
                userOrders : action.payload
            }
        case GET_USER_ORDERS_FAILURE : 
            return {
                ...state,
                error : action.payload
            }
        default : 
            return state;
    }
}