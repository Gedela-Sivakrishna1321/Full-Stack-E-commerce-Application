import axios from "axios";
const jwt = localStorage.getItem("jwt");
export const API_BASE_URL = "http://localhost:8080";

if(jwt) {
    console.log("JWT retrived from local storage successfully ");
}
else {
    console.log("JWT Token not retrived from local storage !");
}

export const api = axios.create({
    baseURL : API_BASE_URL,
    headers : {
        "Authorization" : jwt ? `Bearer ${jwt}` : "",
        "Content-Type" : "application/json"
    }
})