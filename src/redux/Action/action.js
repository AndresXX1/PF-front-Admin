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
    FETCH_USER_STATS_REQUEST,
    FETCH_USER_STATS_SUCCESS,
    FETCH_USER_STATS_FAILURE,
    FETCH_REVIEW_STATS_REQUEST,
    FETCH_REVIEW_STATS_SUCCESS,
    FETCH_REVIEW_STATS_FAILURE,
    FETCH_PRODUCT_STATS_SEMANA_REQUEST,
    FETCH_PRODUCT_STATS_SEMANA_SUCCESS,
    FETCH_PRODUCT_STATS_SEMANA_FAILURE,
    FETCH_PRODUCT_STATS_MONTH_FAILURE,
    FETCH_PRODUCT_STATS_MONTH_REQUEST,
    FETCH_PRODUCT_STATS_MONTH_SUCCESS,
    FETCH_PRODUCT_STATS_MES_FAILURE,
    FETCH_PRODUCT_STATS_MES_SUCCESS,
    FETCH_PRODUCT_STATS_MES_REQUEST,
    FETCH_USER_STATS_MONTH_REQUEST,
    FETCH_USER_STATS_MONTH_SUCCESS,
    FETCH_USER_STATS_MONTH_FAILURE,
    FETCH_REVIEW_STATS_YEAR_REQUEST,
    FETCH_REVIEW_STATS_YEAR_SUCCESS,
    FETCH_REVIEW_STATS_YEAR_FAILURE,
    FETCH_PRODUCT_STATS_YEAR_REQUEST,
    FETCH_PRODUCT_STATS_YEAR_SUCCESS,
    FETCH_PRODUCT_STATS_YEAR_FAILURE,
    FETCH_USER_STATS_YEAR_REQUEST,
    FETCH_USER_STATS_YEAR_SUCCESS,
    FETCH_USER_STATS_YEAR_FAILURE,
    FETCH_HOURLY_RESERVATION_STATS_REQUEST,
    FETCH_HOURLY_RESERVATION_STATS_SUCCESS,
    FETCH_HOURLY_RESERVATION_STATS_FAILURE,
    FETCH_RANKING_REQUEST,
    FETCH_RANKING_SUCCESS,
    FETCH_RANKING_FAILURE,
    FETCH_RESERVAS_REQUEST,
    FETCH_RESERVAS_SUCCESS,
    FETCH_RESERVAS_FAILURE,
    DELETE_RESERVA_REQUEST,
    DELETE_RESERVA_SUCCESS,
    DELETE_RESERVA_FAILURE,
    BAN_USER, UNBAN_USER

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
        const response = await axios.get("http://localhost:3001/users/"); 
  
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
  
      await axios.delete(`http://localhost:3001/users/delete/${userId}`);
  
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
        `http://localhost:3001/users/eddituseradmin/${userId}`,
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
      const response = await axios.get("http://localhost:3001/reviews"); // Update the URL to the correct endpoint
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
        `http://localhost:3001/reviews/delete/${productId}/${reviewId}`
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
        const response = await axios.get('http://localhost:3001/products/'); 
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
      const response = await axios.get("http://localhost:3001/reviews/statistics");
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
        "http://localhost:3001/products/estadisticDay"
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
      "http://localhost:3001/users/estadisticapordia"
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
      `http://localhost:3001/products/edditProduct/${productId}`,
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
    const response = await axios.delete(`http://localhost:3001/products/delete/${idKey}`);
    dispatch(deleteProductSuccess());
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    dispatch(deleteProductFailure('Error deleting product'));
    throw error;
  }
};


//action para estadisticas de usuarios semanal

export const fetchUserStats = () => {
  return async dispatch => {
      dispatch(fetchUserStatsRequest());
      try {
          const response = await axios.get('http://localhost:3001/users/estadisticaporsemana');
          // Aquí puedes mapear los nombres de los días si es necesario
          dispatch(fetchUserStatsSuccess(response.data));
      } catch (error) {
          dispatch(fetchUserStatsFailure(error.message));
      }
  };
};

export const fetchUserStatsRequest = () => {
  return {
      type: FETCH_USER_STATS_REQUEST,
  };
};

export const fetchUserStatsSuccess = userStats => {
  return {
      type: FETCH_USER_STATS_SUCCESS,
      payload: userStats
  };
};

export const fetchUserStatsFailure = error => {
  return {
      type: FETCH_USER_STATS_FAILURE,
      payload: error
  };
};

//estadisticas para las reviews por semana

export const fetchReviewStats = () => {
  return async dispatch => {
      dispatch(fetchReviewStatsRequest());
      try {
          const response = await axios.get('http://localhost:3001/reviews/statisticsSemanal');
          // Aquí puedes mapear los nombres de los días si es necesario
          dispatch(fetchReviewStatsSuccess(response.data));
      } catch (error) {
          dispatch(fetchReviewStatsFailure(error.message));
      }
  };
};

export const fetchReviewStatsRequest = () => {
  return {
      type: FETCH_REVIEW_STATS_REQUEST,
  };
};

export const fetchReviewStatsSuccess = reviewStats => {
  return {
      type: FETCH_REVIEW_STATS_SUCCESS,
      payload: reviewStats
  };
};

export const fetchReviewStatsFailure = error => {
  return {
      type: FETCH_REVIEW_STATS_FAILURE,
      payload: error
  };
};


//action para estadisticas de productos por semana...

export const fetchProductStatsSemana = () => {
  return async dispatch => {
    dispatch(fetchProductStatsSemanaRequest());
    try {
      const response = await axios.get('http://localhost:3001/products/estadisticsem');
      dispatch(fetchProductStatsSemanaSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductStatsSemanaFailure(error.message));
    }
  };
};

export const fetchProductStatsSemanaRequest = () => {
  return {
    type: FETCH_PRODUCT_STATS_SEMANA_REQUEST,
  };
};

export const fetchProductStatsSemanaSuccess = productStats => {
  return {
    type: FETCH_PRODUCT_STATS_SEMANA_SUCCESS,
    payload: productStats
  };
};

export const fetchProductStatsSemanaFailure = error => {
  return {
    type: FETCH_PRODUCT_STATS_SEMANA_FAILURE,
    payload: error
  };
};



//action para estadisticas por mes reviews

export const fetchProductStatsMonth = () => {
  return async dispatch => {
    dispatch(fetchProductStatsMonthRequest());
    try {
      const response = await axios.get('http://localhost:3001/reviews/statisticsMensual'); 
      dispatch(fetchProductStatsMonthSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductStatsMonthFailure(error.message));
    }
  };
};

export const fetchProductStatsMonthRequest = () => {
  return {
    type: FETCH_PRODUCT_STATS_MONTH_REQUEST, 
  };
};

export const fetchProductStatsMonthSuccess = productStats => {
  return {
    type: FETCH_PRODUCT_STATS_MONTH_SUCCESS, 
    payload: productStats
  };
};

export const fetchProductStatsMonthFailure = error => {
  return {
    type: FETCH_PRODUCT_STATS_MONTH_FAILURE, 
    payload: error
  };
};



//action para estadisticas de productos por mes

export const fetchProductStatsMes = () => {
  return async dispatch => {
    dispatch(fetchProductStatsMesRequest());
    try {
      const response = await axios.get('http://localhost:3001/products/estadisticMes');
      dispatch(fetchProductStatsMesSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductStatsMesFailure(error.message));
    }
  };
};

export const fetchProductStatsMesRequest = () => {
  return {
    type: FETCH_PRODUCT_STATS_MES_REQUEST,
  };
};

export const fetchProductStatsMesSuccess = productStats => {
  return {
    type: FETCH_PRODUCT_STATS_MES_SUCCESS,
    payload: productStats
  };
};

export const fetchProductStatsMesFailure = error => {
  return {
    type: FETCH_PRODUCT_STATS_MES_FAILURE,
    payload: error
  };
};


//estadisticas por mes usuarios

export const fetchUserStatsMonth = () => {
  return async (dispatch) => {
    dispatch(fetchUserStatsMonthRequest());
    try {
      const response = await axios.get('http://localhost:3001/users/estadisticaporMes');
      dispatch(fetchUserStatsMonthSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserStatsMonthFailure(error.message));
    }
  };
};

export const fetchUserStatsMonthRequest = () => {
  return {
    type: FETCH_USER_STATS_MONTH_REQUEST,
  };
};

export const fetchUserStatsMonthSuccess = (userStatsMonth) => {
  return {
    type: FETCH_USER_STATS_MONTH_SUCCESS,
    payload: userStatsMonth
  };
};

export const fetchUserStatsMonthFailure = (error) => {
  return {
    type: FETCH_USER_STATS_MONTH_FAILURE,
    payload: error
  };
};


//action para las estadisticas de reviews por año

export const fetchReviewStatsYear = () => {
  return async (dispatch) => {
    dispatch(fetchReviewStatsYearRequest());
    try {
      const response = await axios.get('http://localhost:3001/reviews/statisticsAnual');
      dispatch(fetchReviewStatsYearSuccess(response.data));
    } catch (error) {
      dispatch(fetchReviewStatsYearFailure(error.message));
    }
  };
};

export const fetchReviewStatsYearRequest = () => {
  return {
    type: FETCH_REVIEW_STATS_YEAR_REQUEST,
  };
};

export const fetchReviewStatsYearSuccess = (reviewStatsYear) => {
  return {
    type: FETCH_REVIEW_STATS_YEAR_SUCCESS,
    payload: reviewStatsYear
  };
};

export const fetchReviewStatsYearFailure = (error) => {
  return {
    type: FETCH_REVIEW_STATS_YEAR_FAILURE,
    payload: error
  };
};

//action para las estadisticas de los productos por año

export const fetchProductStatsYear = () => {
  return async dispatch => {
    dispatch(fetchProductStatsYearRequest());
    try {
      const response = await axios.get('http://localhost:3001/products/estadisticyear');
      dispatch(fetchProductStatsYearSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductStatsYearFailure(error.message));
    }
  };
};

export const fetchProductStatsYearRequest = () => {
  return {
    type: FETCH_PRODUCT_STATS_YEAR_REQUEST,
  };
};

export const fetchProductStatsYearSuccess = productStatsYear => {
  return {
    type: FETCH_PRODUCT_STATS_YEAR_SUCCESS,
    payload: productStatsYear
  };
};

export const fetchProductStatsYearFailure = error => {
  return {
    type: FETCH_PRODUCT_STATS_YEAR_FAILURE,
    payload: error
  };
};


//action para las estadisticas de usuarios por año

export const fetchUserStatsYear = () => {
  return async dispatch => {
    dispatch(fetchUserStatsYearRequest());
    try {
      const response = await axios.get('http://localhost:3001/users/estadisticaporAnual');
      dispatch(fetchUserStatsYearSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserStatsYearFailure(error.message));
    }
  };
};

export const fetchUserStatsYearRequest = () => {
  return {
    type: FETCH_USER_STATS_YEAR_REQUEST,
  };
};

export const fetchUserStatsYearSuccess = userStatsYear => {
  return {
    type: FETCH_USER_STATS_YEAR_SUCCESS,
    payload: userStatsYear
  };
};

export const fetchUserStatsYearFailure = error => {
  return {
    type: FETCH_USER_STATS_YEAR_FAILURE,
    payload: error
  };
};

//estadistica por hora para reservas

export const fetchHourlyReservationStats = () => {
  return async dispatch => {
    dispatch(fetchHourlyReservationStatsRequest());
    try {
      const response = await axios.get('http://localhost:3001/recervas/estadistica'); 
      dispatch(fetchHourlyReservationStatsSuccess(response.data));
    } catch (error) {
      dispatch(fetchHourlyReservationStatsFailure(error.message));
    }
  };
};

export const fetchHourlyReservationStatsRequest = () => ({
  type: FETCH_HOURLY_RESERVATION_STATS_REQUEST
});

export const fetchHourlyReservationStatsSuccess = stats => ({
  type: FETCH_HOURLY_RESERVATION_STATS_SUCCESS,
  payload: stats
});

export const fetchHourlyReservationStatsFailure = error => ({
  type: FETCH_HOURLY_RESERVATION_STATS_FAILURE,
  payload: error
});


//action para el ranking de recervas

export const fetchRanking = () => {
  return async (dispatch) => {
    dispatch(fetchRankingRequest());
    try {
      const response = await axios.get('http://localhost:3001/recervas/ranking');
      dispatch(fetchRankingSuccess(response.data.ranking));
    } catch (error) {
      dispatch(fetchRankingFailure(error.message));
    }
  };
};

export const fetchRankingRequest = () => ({
  type: FETCH_RANKING_REQUEST
});

export const fetchRankingSuccess = (ranking) => ({
  type: FETCH_RANKING_SUCCESS,
  payload: ranking
});

export const fetchRankingFailure = (error) => ({
  type: FETCH_RANKING_FAILURE,
  payload: error
});


// trae a todas las reservas de la db

export const fetchReservasRequest = () => {
  return {
    type: FETCH_RESERVAS_REQUEST
  };
};

export const fetchReservasSuccess = (reservas) => {
  return {
    type: FETCH_RESERVAS_SUCCESS,
    payload: reservas
  };
};

export const fetchReservasFailure = (error) => {
  return {
    type: FETCH_RESERVAS_FAILURE,
    payload: error
  };
};

export const fetchReservas = () => {
  return async (dispatch) => {
    dispatch(fetchReservasRequest());
    try {
      const response = await axios.get('http://localhost:3001/recervas/todas'); // Ajusta la ruta según tu configuración
      dispatch(fetchReservasSuccess(response.data));
    } catch (error) {
      dispatch(fetchReservasFailure(error.message));
    }
  };
};


//action para eliminar reservas

export const deleteReservaRequest = () => {
  return {
    type: DELETE_RESERVA_REQUEST
  };
};

export const deleteReservaSuccess = () => {
  return {
    type: DELETE_RESERVA_SUCCESS
  };
};

export const deleteReservaFailure = (error) => {
  return {
    type: DELETE_RESERVA_FAILURE,
    payload: error
  };
};

export const deleteReserva = (reservaId) => {
  return async (dispatch) => {
    dispatch(deleteReservaRequest());
    try {
      await axios.delete(`http://localhost:3001/recervas/delete/${reservaId}`); 
      dispatch(deleteReservaSuccess());
    } catch (error) {
      dispatch(deleteReservaFailure(error.message));
    }
  };
};


// Acción para banear un usuario
export const banUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/users/banner/${userId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error al banear al usuario');
      }
      dispatch({ type: BAN_USER, payload: userId });
    } catch (error) {
      console.error('Error baneando usuario:', error);
    }
  };
};

// Acción para desbanear un usuario
export const unbanUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/users/unbanner/${userId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error al desbanear al usuario');
      }
      dispatch({ type: UNBAN_USER, payload: userId });
    } catch (error) {
      console.error('Error des-baneando usuario:', error);
    }
  };
};