import {
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    SET_NO_RESULTS_FOUND
  } from '../actions/heroActions';
  
  const initialState = {
    searchResults: [],
    loading: false,
    noResultsFound: false,
    error: null
  };
  
  const heroReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SEARCH_RESULTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SEARCH_RESULTS_SUCCESS:
        return { ...state, searchResults: action.payload, loading: false };
      case FETCH_SEARCH_RESULTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_TO_CART_SUCCESS:
        return { ...state }; // Handle success state if needed
      case ADD_TO_CART_FAILURE:
        return { ...state, error: action.payload };
      case SET_NO_RESULTS_FOUND:
        return { ...state, noResultsFound: action.payload };
      default:
        return state;
    }
  };
  
  export default heroReducer;
  