import axios from "axios";
import { api, API_BASE_URL } from "../../Config/Config"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./ActionType";

const registerRequest = () => ({type : REGISTER_REQUEST});
const registerSuccess = (user) => ({type : REGISTER_SUCCESS, payload : user});
const registerFailure = (error) => ({type : REGISTER_FAILURE, payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData );

        const user = response.data;

        if(user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        
        console.log("user created successfully !"); 
        console.log("user - ", user);
        
        dispatch(registerSuccess(user.jwt))
    } catch (error) {
        dispatch(registerFailure(error.message))
    }
}


const loginRequest = () => ({type : LOGIN_REQUEST});
const loginSuccess = (user) => ({type : LOGIN_SUCCESS, payload : user});
const loginFailure = (error) => ({type : LOGIN_FAILURE, payload:error});

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData );

        const user = response.data;

        if(user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        } 
        console.log("user - ", user);
        dispatch(loginSuccess(user.jwt))
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}


const getUserRequest = () => ({type : GET_USER_REQUEST});
const getUserSuccess = (user) => ({type : GET_USER_SUCCESS, payload : user});
const getUserFailure = (error) => ({type : GET_USER_FAILURE, payload:error});

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest())
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers : {
                "Authorization" : `Bearer ${jwt}`
            }
        } );

        const user = response.data;
        console.log("user - ", user);
      
        dispatch(getUserSuccess(user))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const logout = () => (dispatch) => {
    dispatch({type: LOGOUT, payload : null})
    localStorage.clear();
    // navigate("/")
    console.log("User Logged out successfull ..!")
}

function updateProfileSuccess(user) {
    return {
        type : UPDATE_PROFILE_SUCCESS,
        payload : user
    }
}

export const updateUserProfile = (reqData) => async (dispatch) => {
    try {
        const {data} = await api.post("/auth/update-profile",reqData);
        console.log("Updated User Profile Data = ", data);
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        console.log("Error occured while updating user profile = ", error);
    }
}