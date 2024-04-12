import { api } from "../../Config/Config";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_CATEGORY_REQUEST,
  FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  try {
    // console.log(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}
    // &minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&
    // pageSize=${pageSize}`)

    const { data } =
      await api.get(`/api/products/?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&PageSize=${pageSize}`);

    console.log("Products Data - ", data);

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    console.log("Data - ", data);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({type : CREATE_PRODUCT_REQUEST})
  try {
    
    const {data} = await api.post(`/api/admin/products/`, product);
    console.log("Created Product - ", data);
    dispatch({
      type : CREATE_PRODUCT_SUCCESS,
      payload : data,
    })

  } catch (error) {
    dispatch({type : CREATE_PRODUCT_FAILURE, payload : error.message})
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({type : DELETE_PRODUCT_REQUEST})
  try {
    
    const {data} = await api.delete(`/api/admin/products/${productId}/delete`);
    console.log("Product deleted successfully - ", data);
    dispatch({
      type : DELETE_PRODUCT_SUCCESS,
      payload : productId,
    })

  } catch (error) {
    dispatch({type : DELETE_PRODUCT_FAILURE, payload : error.message})
  }
}

export const findProductsByCategory = (reqData) => async (dispatch) => {

  dispatch({type : FIND_PRODUCT_BY_CATEGORY_REQUEST})
  try {

    const {data} = await api.get(`api/products/${reqData.category}`);

    console.log("Products By Category Fetched Successfully - ", data);

    dispatch({
      type : FIND_PRODUCT_BY_CATEGORY_SUCCESS,
      payload : data
    })
    
  } catch (error) {
    console.log("Error occured while fetching Products By Category - ", error.message);
  }
}

export const findAllProducts = () => async (dispatch) => {

    try {
      
      const {data} = await api.get('api/products/all');

      console.log("All Products Data fetched successfully ,,,,", data);

      dispatch({
        type : FIND_ALL_PRODUCTS_SUCCESS,
        payload : data,
      })
    } catch (error) {

      console.log("Error occured while finding all products ", error.message);
    
    }
}