import axios from 'axios';
import { baseUrl } from '/src/components/Urls';

export const FETCH_SEARCH_RESULTS_REQUEST = 'FETCH_SEARCH_RESULTS_REQUEST';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const SET_NO_RESULTS_FOUND = 'SET_NO_RESULTS_FOUND';

export const fetchSearchResults = (query) => async (dispatch) => {
  dispatch({ type: FETCH_SEARCH_RESULTS_REQUEST });
  try {
    const response = await axios.get(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`);
    if (response.data.message === 'nothing') {
      dispatch({ type: SET_NO_RESULTS_FOUND, payload: true });
    } else {
      dispatch({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: response.data });
      dispatch({ type: SET_NO_RESULTS_FOUND, payload: false });
    }
  } catch (error) {
    dispatch({ type: FETCH_SEARCH_RESULTS_FAILURE, payload: error.message });
  }
};

export const addToCart = (productId) => async (dispatch) => {
  try {
    await axios.post(`${baseUrl}/api/card/${productId}`, { itemId: productId });
    dispatch({ type: ADD_TO_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.response?.data?.error || error.message });
  }
};
