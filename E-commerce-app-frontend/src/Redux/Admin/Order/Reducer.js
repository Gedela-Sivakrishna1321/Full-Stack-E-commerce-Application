import { CANCELLED_ORDER_FAILURE, CANCELLED_ORDER_REQUEST, CANCELLED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    loading : false,
    orders : [],
    error : "",
}

export const adminOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDERS_REQUEST : 
            return {
                ...state, 
                loading : true,
                error : "",
            }
        case GET_ORDERS_SUCCESS : 
            return {
                loading : false,
                orders : action.payload,
            }
        case GET_ORDERS_FAILURE : 
            return {
                loading : false,
                orders : [],
                error : action.payload,
            }
        case CONFIRMED_ORDER_REQUEST :
        case PLACED_ORDER_REQUEST : 
        case DELIVERED_ORDER_REQUEST :
        case CANCELLED_ORDER_REQUEST : 
            return {
                loading : true,
                ...state,
            }
        case CONFIRMED_ORDER_SUCCESS : 
            return {
                ...state,
                confirmed : action.payload,
                loading : false,
            }
        case PLACED_ORDER_SUCCESS :
            return {
                ...state,
                placed : action.payload,
                loading : false,
            }
        case DELIVERED_ORDER_SUCCESS : 
            return {
                ...state,
                delivered : action.payload,
            }
        case CANCELLED_ORDER_SUCCESS : 
            return {
                ...state,
                cancelled : action.payload,
            }
        case CONFIRMED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE : 
        case SHIP_ORDER_FAILURE : 
        case CANCELLED_ORDER_FAILURE :
            return {
                ...state,
                error : action.payload,
            }
        case DELETE_ORDER_REQUEST : 
            return {
                ...state, loading : true,
            }
        case DELETE_ORDER_SUCCESS : 
            return {
                ...state, 
                loading : false,
                deleted :action.payload,
            }
        case DELETE_ORDER_FAILURE : 
            return {
                ...state,
                error : action.payload,
            }
        case SHIP_ORDER_REQUEST : 
            return {
                ...state,
                loading : true,
            }
        case SHIP_ORDER_SUCCESS : 
            return {
                loading : false,
                shipped : action.payload,
            }
        case SHIP_ORDER_FAILURE : 
            return {
                ...state,
                loading : false,
                error : action.payload,
            }
        default : 
            return state;
    }
}