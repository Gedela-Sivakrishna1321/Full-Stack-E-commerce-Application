import axios from "axios";
import { api, API_BASE_URL } from "../../Config/Config";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const getCart = (jwt) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
  //  console.log("Hello --- JEE")
    const  {data}  
                    = await axios.get(`${API_BASE_URL}/api/cart/`, {
                      headers : {
                          "Authorization" : `Bearer ${jwt}`
                      }
                  } )
    // console.log("User Cart fetched successfully ..!")
    dispatch({ type: GET_CART_SUCCESS, payload: data });
    console.log("User Cart - ", data);

  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
    console.log("Error occured, while fetching user cart !", error.message, error);
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.put("/api/cart/add", reqData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    console.log("Added Item to Cart - ", data);
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
    console.log("Item removed from cart successfully")
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.put(
      `/api/cart_items/${reqData.cartItemId}`,
      reqData.data
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    console.log("Cart item updated successfully ", data);
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
