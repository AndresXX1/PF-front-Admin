import {
    SET_USER_DATA,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
} from "../action-types/action-types"


const initialState = {
    userDataSession: null,
 
     
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false, error: null };

    case GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case SET_USER_DATA:
        return {
          ...state,
          userDataSession: action.payload,
        };

        default:
            return state;
        }

    }
  
  export default Reducer;