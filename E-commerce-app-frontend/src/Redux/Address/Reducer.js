import { EMAIL_UPDATE_OTP_FAILURE, EMAIL_UPDATE_OTP_SUCCESS, MOBILE_UPDATE_OTP_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./ActionType";

const initialState = {
    newlyAddedAddress : null,
    isLoading : false,
    updatedAddress : null,
    removedAddress : null,
    error : null,
    otp : null,
}

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_ADDRESS_REQUEST':
            return {...state, isLoading : true};
        case 'ADD_NEW_ADDRESS_SUCCESS':
            return {...state, isLoading : false, newlyAddedAddress : action.payload.address};
        case 'ADD_NEW_ADDRESS_FAILURE':
            return {...state, isLoading : false, error : action.payload,};
        case 'REMOVE_ADDRESS_REQUEST':
            return {...state, isLoading : true};
        case 'REMOVE_ADDRESS_SUCCESS':
            return {...state, isLoading : false, removedAddress : action.payload};
        case 'REMOVE_ADDRESS_FAILURE':
            return {...state, isLoading : false, error : action.payload};
        case 'UPDATE_ADDRESS_REQUEST':
            return {...state, isLoading : true,};
        case 'UPDATE_ADDRESS_SUCCESS':
            return {...state, isLoading : false, updatedAddress : action.payload};
        case 'UPDATE_ADDRESS_FAILURE':
            return {...state, isLoading : false, error : action.payload};
        case EMAIL_UPDATE_OTP_SUCCESS:
            return {...state, otp : action.payload};
        case MOBILE_UPDATE_OTP_SUCCESS:
            return {...state, otp : action.payload};
        default:
            return {...state};
    }
}