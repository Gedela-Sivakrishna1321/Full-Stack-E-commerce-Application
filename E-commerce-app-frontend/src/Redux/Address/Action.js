import { api } from "../../Config/Config";
import { EMAIL_UPDATE_OTP_FAILURE, EMAIL_UPDATE_OTP_REQUEST, EMAIL_UPDATE_OTP_SUCCESS, MOBILE_UPDATE_OTP_FAILURE, MOBILE_UPDATE_OTP_REQUEST, MOBILE_UPDATE_OTP_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

export const ADD_NEW_ADDRESS_REQUEST = "ADD_NEW_ADDRESS_REQUEST";
export const ADD_NEW_ADDRESS_SUCCESS = "ADD_NEW_ADDRESS_SUCCESS";
export const ADD_NEW_ADDRESS_FAILURE = "ADD_NEW_ADDRESS_FAILURE";

export const REMOVE_ADDRESS_REQUEST = "REMOVE_ADDRESS_REQUEST";
export const REMOVE_ADDRESS_SUCCESS = "REMOVE_ADDRESS_SUCCESS";
export const REMOVE_ADDRESS_FAILURE = "REMOVE_ADDRESS_FAILURE";

export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE";

function addNewAddressRequest() {
    return {
        type : 'ADD_NEW_ADDRESS_REQUEST'
    }
}

function addNewAddressSuccess(user) {
    return {
        type : 'ADD_NEW_ADDRESS_SUCCESS',
        payload : user,
    }
}

function addNewAddressFailure(error) {
    return {
        type : 'ADD_NEW_ADDRESS_FAILURE',
        payload : error,
    }
}

function removeAddressRequest() {
    return {
        type : 'REMOVE_ADDRESS_REQUEST',
    }
}

function removeAddressSuccess(apiResponse) {
    return {
        type : 'REMOVE_ADDRESS_SUCCESS',
        payload : apiResponse,
    }
}

function removeAddressFailure(error) {
    return {
        type : 'REMOVE_ADDRESS_FAILURE',
        payload : error,
    }
}

function updateAddressRequest() {
    return {
        type : 'UPDATE_ADDRESS_REQUEST',
    }
}

function updateAddressSuccess(address) {
    return {
        type : 'UPDATE_ADDRESS_SUCCESS',
        payload : address,
    }
}

function updateAddressFailure(error) {
    return {
        type : 'UPDATE_ADDRESS_FAILURE',
        payload : error,
    }
}

function sendEmailOtpRequest() {
    return {
        type : EMAIL_UPDATE_OTP_REQUEST
    }
}

function sendEmailOtpSuccess(otp) {
    return {
        type : EMAIL_UPDATE_OTP_SUCCESS,
        payload : otp
    }
}

function sendEmailOtpFailure() {
    return {
        type : EMAIL_UPDATE_OTP_FAILURE,
    }
}

function sendMobileOtpRequest() {
    return {
        type : MOBILE_UPDATE_OTP_REQUEST
    }
}

function sendMobileOtpSuccess(otp) {
    return {
        type : MOBILE_UPDATE_OTP_SUCCESS,
        payload : otp
    }
}

function sendMobileOtpFailure() {
    return {
        type : MOBILE_UPDATE_OTP_FAILURE,
    }
}

export const addNewUserAddress = ({address, toast}) => async (dispatch) => {
    
    dispatch(addNewAddressRequest());

    try {
        
        const {data} = await api.post('/api/address/add/new', address);

        console.log("New Address added successfully -- ", data);

        dispatch(addNewAddressSuccess(data));

        toast.success("Address added successfully ");

    } catch (error) {
        console.log("Error occured while adding new address - ", error);
        dispatch(addNewAddressFailure(error));
    }
}

export const removeUserAddress = (reqData) => async (dispatch) => {
    console.log("Remove Address ReqData = ", reqData);
    dispatch(removeAddressRequest());

    try {
        
        const {data} = await api.delete(`api/address/delete/${reqData.id}`);

        console.log("Address Removed Successfully --> ", data);

        dispatch(removeAddressSuccess(data));

    } catch (error) {
        console.log("Error occured while removing address --> ", error);
        dispatch(removeAddressFailure(error))
    }
}

export const updateUserAddress = (reqData) => async (dispatch) => {

    dispatch(updateAddressRequest());

    try {
        
        const {data} = await api.put('/api/address/update', reqData);

        console.log("User Address updated successfully --> ", data);

        dispatch(updateAddressSuccess(data));

    } catch (error) {
        console.log("Error occured while updating user address --> ", error);
        dispatch(updateAddressFailure(error));
    }
}

export const sendMobileOtp = (reqData) => async (dispatch) => {
    dispatch(sendMobileOtpRequest());
    try {

        const {data} = await api.post('/api/admin/number-update/otp',reqData);

        console.log("Otp Sent to your mobile successfully = ",data);

        dispatch(sendMobileOtpSuccess(data));

    } catch (error) {
        console.log("Error occured while sending mobile otp ---> ", error);
        dispatch(sendMobileOtpFailure());
    }
}

export const sendEmailOtp = (reqData) => async (dispatch) => {
    dispatch(sendEmailOtpRequest());
    try {

        const {data} = await api.post('/api/admin/email-update/otp',reqData);

        console.log("Otp Sent to your Email successfully = ",data);

        dispatch(sendEmailOtpSuccess(data));

    } catch (error) {
        console.log("Error occured while sending email otp ---> ", error);
        dispatch(sendEmailOtpFailure());
    }
}

