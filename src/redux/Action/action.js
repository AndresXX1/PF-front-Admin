import axios from "axios";
import {

    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER_ADMIN_REQUEST,
    UPDATE_USER_ADMIN_SUCCESS,
    UPDATE_USER_ADMIN_FAILURE,
    SET_REVIEWS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    FETCH_REVIEW_STATISTICS_FAILURE,
    FETCH_REVIEW_STATISTICS_SUCCESS,
    FETCH_REVIEW_STATISTICS_REQUEST,
    GET_PRODUCT_STATISTICS_REQUEST,
    GET_PRODUCT_STATISTICS_SUCCESS,
    GET_PRODUCT_STATISTICS_FAILURE,
    GET_USER_STATISTICS_FAILURE,
    GET_USER_STATISTICS_SUCCESS,
    GET_USER_STATISTICS_REQUEST,
    UPDATE_PRODUCT_ADMIN_FAILURE,
    UPDATE_PRODUCT_ADMIN_SUCCESS,
    UPDATE_PRODUCT_ADMIN_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,

} from "../action-types/action-types";


export const newHotel = (hotel) => {
    return (dispatch) => {
      dispatch({ type: NEW_HOTEL_REQUEST });
      axios.post('https://back-admin-hostel.onrender.com/products/create', hotel)
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



  //action para traer todos los usuarios

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
  });
  
  const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
  });
  
  export const fetchUsers = () => {
    return async (dispatch) => {
      dispatch(fetchUsersRequest());
  
      try {
        const response = await axios.get("https://back-admin-hostel.onrender.com/users/"); 
  
        dispatch(fetchUsersSuccess(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
        dispatch(fetchUsersFailure("Error fetching users"));
      }
    };
  };


  //para eliminar usuarios

  export const deleteUser = (userId) => async (dispatch) => {
    try {
  
      await axios.delete(`https://back-admin-hostel.onrender.com/users/delete/${userId}`);
  
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: userId,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: error.message || "Failed to delete user",
      });
    }
  };


//action para modificar los datos del usuario desde admin
const updateUserAdminRequest = () => ({
    type: UPDATE_USER_ADMIN_REQUEST,
  });
  
  const updateUserAdminSuccess = (user) => ({
    type: UPDATE_USER_ADMIN_SUCCESS,
    payload: user,
  });
  
  const updateUserAdminFailure = (error) => ({
    type: UPDATE_USER_ADMIN_FAILURE,
    payload: error,
  });
  
  export const updateUserAdmin = (userId, userData) => async (dispatch) => {
    dispatch(updateUserAdminRequest());
  
    try {
      const response = await axios.put(
        `https://back-admin-hostel.onrender.com/users/eddituseradmin/${userId}`,
        userData
      );
  
      dispatch(updateUserAdminSuccess(response.data)); 
    } catch (error) {
      console.error("Error updating user by admin:", error);
      dispatch(updateUserAdminFailure("Error updating user by admin"));
    }
  };

  export const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    payload: reviews,
  });


  
  export const fetchReviews = () => async (dispatch) => {
    try {
      const response = await axios.get("https://back-admin-hostel.onrender.com/reviews"); // Update the URL to the correct endpoint
      const data = response.data;
      console.log("TODAS LAS REVIEWS:", data);
      if (Array.isArray(data)) {
        dispatch(setReviews(data));
      } else {
        console.error("Error: The response is not an array of reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
 
 

  // Acción asincrónica para eliminar la revisión

  export const deleteReviewRequest = () => ({
    type: DELETE_REVIEW_REQUEST,
  });
  
  export const deleteReviewSuccess = () => ({
    type: DELETE_REVIEW_SUCCESS,
  });
  
  export const deleteReviewFailure = (error) => ({
    type: DELETE_REVIEW_FAILURE,
    payload: error,
  });
  
  export const deleteReview = (productId, reviewId) => async (dispatch) => {
    try {
      dispatch(deleteReviewRequest());
  
      await axios.delete(
        `https://back-admin-hostel.onrender.com/reviews/delete/${productId}/${reviewId}`
      );
  
      dispatch(deleteReviewSuccess());
    } catch (error) {
      dispatch(deleteReviewFailure(error.message));
    }
  };


  export const getAllProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST }); 
        console.log("Fetching products...");
        const response = await axios.get('https://back-admin-hostel.onrender.com/products/'); 
        const products = response.data;
        console.log("Products received:", products);
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };


  //action para las estadisticas de las reviews

  export const fetchReviewStatisticsRequest = () => ({
    type: FETCH_REVIEW_STATISTICS_REQUEST
  });
  
  export const fetchReviewStatisticsSuccess = (data) => ({
    type: FETCH_REVIEW_STATISTICS_SUCCESS,
    payload: data
  });
  
  export const fetchReviewStatisticsFailure = (error) => ({
    type: FETCH_REVIEW_STATISTICS_FAILURE,
    payload: error
  });
  
  export const fetchReviewStatistics = () => async (dispatch) => {
    dispatch(fetchReviewStatisticsRequest());
    try {
      const response = await axios.get("https://back-admin-hostel.onrender.com/reviews/statistics");
      const data = response.data.map(item => ({
        hour: item.hour,
        reviewCount: parseInt(item.reviewCount) // Convertir la cadena a número
      }));
      dispatch(fetchReviewStatisticsSuccess(data));
    } catch (error) {
      dispatch(fetchReviewStatisticsFailure(error));
    }
  };


  //action para las estadisticas de productos

  export const getProductStatisticsRequest = () => ({
    type: GET_PRODUCT_STATISTICS_REQUEST,
  });
  
  export const getProductStatisticsSuccess = (data) => ({
    type: GET_PRODUCT_STATISTICS_SUCCESS,
    payload: data,
  });
  
  export const getProductStatisticsFailure = (error) => ({
    type: GET_PRODUCT_STATISTICS_FAILURE,
    payload: error,
  });
  
  export const getProductStatistics = () => async (dispatch) => {
    dispatch(getProductStatisticsRequest());
    try {
      const response = await axios.get(
        "https://back-admin-hostel.onrender.com/products/estadisticDay"
      );
      const data = response.data.map((item) => ({
        hour: item.hour,
        productCount: parseInt(item.productCount), // Convertir la cadena a número
      }));
      dispatch(getProductStatisticsSuccess(data));
    } catch (error) {
      dispatch(getProductStatisticsFailure(error));
    }
  };



  // Acción de solicitud de estadísticas de usuarios
export const getUserStatisticsRequest = () => ({
  type: GET_USER_STATISTICS_REQUEST,
});


export const getUserStatisticsSuccess = (data) => ({
  type: GET_USER_STATISTICS_SUCCESS,
  payload: data,
});


export const getUserStatisticsFailure = (error) => ({
  type: GET_USER_STATISTICS_FAILURE,
  payload: error,
});


export const getUserStatistics = () => async (dispatch) => {
  dispatch(getUserStatisticsRequest());
  try {
    const response = await axios.get(
      "https://back-admin-hostel.onrender.com/users/estadisticapordia"
    ); 
    const data = response.data.map((item) => ({
      hour: item.hour,
      userCount: parseInt(item.userCount), 
    }));
    dispatch(getUserStatisticsSuccess(data));
  } catch (error) {
    dispatch(getUserStatisticsFailure(error));
  }
};


//action para modificar los datos del usuario

export const updateProductAdminRequest = () => ({
  type: UPDATE_PRODUCT_ADMIN_REQUEST,
});

export const updateProductAdminSuccess = (product) => ({
  type: UPDATE_PRODUCT_ADMIN_SUCCESS,
  payload: product,
});

export const updateProductAdminFailure = (error) => ({
  type: UPDATE_PRODUCT_ADMIN_FAILURE,
  payload: error,
});

export const updateProductAdmin = (productId, productData) => async (dispatch) => {
  dispatch(updateProductAdminRequest());

  try {
    const response = await axios.put(
      `https://back-admin-hostel.onrender.com/products/edditProduct/${productId}`,
      productData
    );

    dispatch(updateProductAdminSuccess(response.data)); 
  } catch (error) {
    console.error("Error updating product by admin:", error);
    dispatch(updateProductAdminFailure("Error updating product by admin"));
  }
};



//esta es la action para eliminar productos

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProduct = (idKey) => async (dispatch) => {
  dispatch(deleteProductRequest());
  try {
    const response = await axios.delete(`https://back-admin-hostel.onrender.com/products/delete/${idKey}`);
    dispatch(deleteProductSuccess());
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    dispatch(deleteProductFailure('Error deleting product'));
    throw error;
  }
};