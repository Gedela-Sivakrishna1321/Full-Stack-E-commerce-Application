import { authReducer } from "./Auth/Reducer";
import {combineReducers, applyMiddleware, legacy_createStore} from 'redux'
import {thunk} from 'redux-thunk'
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { adminOrderReducer } from "./Admin/Order/Reducer";

// const {  } = require("redux");
// const {  } = require("redux-thunk");


const rootReducers = combineReducers({
    auth : authReducer,
    products : customerProductReducer,
    cart : cartReducer,
    order : orderReducer,
    adminOrder : adminOrderReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))