import {
  DELETE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  FIND_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_CATEGORY_REQUEST,
  FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  productsByCategory: [],
  allProducts: [],
  createdProduct: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case FIND_PRODUCT_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };
    case FIND_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productsByCategory: action.payload,
      };
    case FIND_ALL_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.payload };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, createdProduct: action.payload };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case FIND_PRODUCT_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
