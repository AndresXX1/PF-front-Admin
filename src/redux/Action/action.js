import axios from "axios";
import {

    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,


} from "../action-types/action-types";


export const newHotel = (hotel) => {
    return (dispatch) => {
      dispatch({ type: NEW_HOTEL_REQUEST });
      axios.post('https://back-hostel.onrender.com/products/create', hotel)
        .then(response => {
          dispatch({
            type: NEW_HOTEL_SUCCESS,
            payload: response.data // Puedes ajustar según la estructura de datos recibida
          });
        })
        .catch(error => {
          dispatch({
            type: NEW_HOTEL_FAILURE,
            payload: error.message // Puedes ajustar según la estructura de error que recibas
          });
        });
    };
  };

  export const getAllProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST }); 
        console.log("Fetching products...");
        const response = await axios.get('https://back-hostel.onrender.com/products/'); 
        const products = response.data;
        console.log("Products received:", products);
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };


  