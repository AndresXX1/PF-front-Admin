import {
    SET_USER_DATA,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER_ADMIN_REQUEST,
    UPDATE_USER_ADMIN_SUCCESS,
    UPDATE_USER_ADMIN_FAILURE,
    SET_REVIEWS,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
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
    GET_USER_STATISTICS_REQUEST,
    GET_USER_STATISTICS_SUCCESS,
    GET_USER_STATISTICS_FAILURE,
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

} from "../action-types/action-types"


const initialState = {
  userDataSession: null,
  users: [],
  loading: false,
  error: null,  
  product: {
    detail: null,
    createdProduct: null,
    loading: false,
    error: null,
  },
  updatingUserAdmin: false,
  updateUserAdminError: null,
  updatingProductAdmin: false,
  updateProductAdminError: null, 
  reviews: [],
  reviewStatistics: [],
  productStatistics: [],
  data: [], 
  products: [],
  stats: [],
  stats1: [],
  productStats: [],
  productStatsMonth: [],
  productStatsMes: [],
  userStatsMonth: [],
  reviewStatsYear: [],
  productStatsYear: [],
  userStatsYear: [],
  hourlyReservationStats: [],
 ranking: {
  loading: false,
  error: null,
  ranking:[],
 },
 reservas: [],
 success: false,
 
};

  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_DATA:
        return {
          ...state,
          userDataSession: action.payload,
        };

        case FETCH_USERS_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
      
          case FETCH_USERS_SUCCESS:
            return {
              ...state,
              users: action.payload,
              loading: false,
              error: null,
            };
      
          case FETCH_USERS_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };

            case DELETE_USER_SUCCESS:
                return {
                  ...state,
                  users: state.users.filter((user) => user.id !== action.payload),
                  error: null,
                };
              case DELETE_USER_FAILURE:
                return {
                  ...state,
                  error: action.payload,
                };
                case UPDATE_USER_ADMIN_REQUEST:
                    return {
                      ...state,
                      updatingUserAdmin: true,
                      updateUserAdminError: null,
                    };
              
                  case UPDATE_USER_ADMIN_SUCCESS:
                    return {
                      ...state,
                      updatingUserAdmin: false,
                      updateUserAdminError: null,
                    };
              
                  case UPDATE_USER_ADMIN_FAILURE:
                    return {
                      ...state,
                      updatingUserAdmin: false,
                      updateUserAdminError: action.payload,
                    };
                    case SET_REVIEWS:
                        return {
                          ...state,
                          reviews: action.payload,
                        };

                    case DELETE_REVIEW_REQUEST:
                    return {
                        ...state,
                        loading: true,
                        error: null,
                    };
                    case DELETE_REVIEW_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                    };
                    case DELETE_REVIEW_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload,
                    };

                    
                case GET_ALL_PRODUCTS_REQUEST:
                    return { ...state, loading: true, error: null };
            
                case GET_ALL_PRODUCTS_SUCCESS:
                    return { ...state, products: action.payload, loading: false, error: null };
            
                case GET_ALL_PRODUCTS_FAILURE:
                    return { ...state, loading: false, error: action.payload };
  

                    case FETCH_REVIEW_STATISTICS_REQUEST:
                        return {
                          ...state,
                          loading: true,
                          error: null
                        };
                      case FETCH_REVIEW_STATISTICS_SUCCESS:
                        return {
                          ...state,
                          reviewStatistics: action.payload,
                          loading: false,
                          error: null
                        };
                      case FETCH_REVIEW_STATISTICS_FAILURE:
                        return {
                          ...state,
                          loading: false,
                          error: action.payload
                        };

                        case GET_PRODUCT_STATISTICS_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case GET_PRODUCT_STATISTICS_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            productStatistics: action.payload,
                          };
                        case GET_PRODUCT_STATISTICS_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };

                          case GET_USER_STATISTICS_REQUEST:
                            return {
                              ...state,
                              loading: true,
                              error: null,
                            };
                          case GET_USER_STATISTICS_SUCCESS:
                            return {
                              ...state,
                              loading: false,
                              data: action.payload,
                              error: null,
                            };
                          case GET_USER_STATISTICS_FAILURE:
                            return {
                              ...state,
                              loading: false,
                              error: action.payload,
                            };

                            case UPDATE_PRODUCT_ADMIN_REQUEST:
                              return {
                                ...state,
                                updatingProductAdmin: true,
                                updateProductAdminError: null,
                              };
                            case UPDATE_PRODUCT_ADMIN_SUCCESS:
                              return {
                                ...state,
                                updatingProductAdmin: false,
                                product: {
                                  ...state.product,
                                  detail: action.payload,
                                },
                              };
                            case UPDATE_PRODUCT_ADMIN_FAILURE:
                              return {
                                ...state,
                                updatingProductAdmin: false,
                                updateProductAdminError: action.payload,
                              };

                              case DELETE_PRODUCT_REQUEST:
                                return {
                                  ...state,
                                  loading: true,
                                  error: null,
                                };
                              case DELETE_PRODUCT_SUCCESS:
                                return {
                                  ...state,
                                  loading: false,
                                };
                              case DELETE_PRODUCT_FAILURE:
                                return {
                                  ...state,
                                  loading: false,
                                  error: action.payload,
                                };
                                case FETCH_USER_STATS_REQUEST:
                                  return {
                                      ...state,
                                      loading: true
                                  };
                              case FETCH_USER_STATS_SUCCESS:
                                  return {
                                      loading: false,
                                      stats: action.payload,
                                      error: ''
                                  };
                              case FETCH_USER_STATS_FAILURE:
                                  return {
                                      loading: false,
                                      stats: [],
                                      error: action.payload
                                  };
                                  case FETCH_REVIEW_STATS_REQUEST:
                              return {
                                ...state,
                                loading: true,
                                error: null,
                              };
                            case FETCH_REVIEW_STATS_SUCCESS:
                              return {
                                ...state,
                                loading: false,
                                stats1: action.payload,
                                error: null,
                              };
                            case FETCH_REVIEW_STATS_FAILURE:
                              return {
                                ...state,
                                loading: false,
                                stats1: [],
                                error: action.payload,
                              };
                              case FETCH_PRODUCT_STATS_SEMANA_REQUEST:
                                return {
                                  ...state,
                                  loading: true,
                                  error: null
                                };
                              case FETCH_PRODUCT_STATS_SEMANA_SUCCESS:
                                return {
                                  ...state,
                                  loading: false,
                                  productStats: action.payload,
                                  error: null
                                };
                              case FETCH_PRODUCT_STATS_SEMANA_FAILURE:
                                return {
                                  ...state,
                                  loading: false,
                                  error: action.payload
                                };
                                case FETCH_PRODUCT_STATS_MONTH_REQUEST:
                                  return {
                                    ...state,
                                    loading: true,
                                    error: null
                                  };
                                case FETCH_PRODUCT_STATS_MONTH_SUCCESS:
                                  return {
                                    ...state,
                                    loading: false,
                                    productStatsMonth: action.payload,
                                    error: null
                                  };
                                case FETCH_PRODUCT_STATS_MONTH_FAILURE:
                                  return {
                                    ...state,
                                    loading: false,
                                    error: action.payload
                                  };
                                  case FETCH_PRODUCT_STATS_MES_REQUEST:
                                    return {
                                      ...state,
                                      loading: true,
                                      error: null
                                    };
                                  case FETCH_PRODUCT_STATS_MES_SUCCESS:
                                    return {
                                      ...state,
                                      loading: false,
                                      productStatsMes: action.payload,
                                      error: null
                                    };
                                  case FETCH_PRODUCT_STATS_MES_FAILURE:
                                    return {
                                      ...state,
                                      loading: false,
                                      error: action.payload
                                    };
                                    case FETCH_USER_STATS_MONTH_REQUEST:
                                      return {
                                        ...state,
                                        loading: true,
                                        error: null
                                      };
                                    case FETCH_USER_STATS_MONTH_SUCCESS:
                                      return {
                                        ...state,
                                        userStatsMonth: action.payload,
                                        loading: false,
                                        error: null
                                      };
                                    case FETCH_USER_STATS_MONTH_FAILURE:
                                      return {
                                        ...state,
                                        loading: false,
                                        error: action.payload
                                      };
                                      case FETCH_REVIEW_STATS_YEAR_REQUEST:
                                        return {
                                          ...state,
                                          loading: true
                                        };
                                      case FETCH_REVIEW_STATS_YEAR_SUCCESS:
                                        return {
                                          ...state,
                                          loading: false,
                                          reviewStatsYear: action.payload,
                                          error: ''
                                        };
                                      case FETCH_REVIEW_STATS_YEAR_FAILURE:
                                        return {
                                          ...state,
                                          loading: false,
                                          reviewStatsYear: [],
                                          error: action.payload
                                        };

                                        case FETCH_PRODUCT_STATS_YEAR_REQUEST:
                                          return {
                                            ...state,
                                            loading: true
                                          };
                                        case FETCH_PRODUCT_STATS_YEAR_SUCCESS:
                                          return {
                                            loading: false,
                                            productStatsYear: action.payload,
                                            error: ''
                                          };
                                        case FETCH_PRODUCT_STATS_YEAR_FAILURE:
                                          return {
                                            loading: false,
                                            productStatsYear: [],
                                            error: action.payload
                                          };
                                          case FETCH_USER_STATS_YEAR_REQUEST:
                                            return {
                                              ...state,
                                              loading: true
                                            };
                                          case FETCH_USER_STATS_YEAR_SUCCESS:
                                            return {
                                              loading: false,
                                              userStatsYear: action.payload,
                                              error: ''
                                            };
                                          case FETCH_USER_STATS_YEAR_FAILURE:
                                            return {
                                              loading: false,
                                              userStatsYear: [],
                                              error: action.payload
                                            };

                                            case FETCH_HOURLY_RESERVATION_STATS_REQUEST:
                                              return {
                                                ...state,
                                                loading: true,
                                                error: null
                                              };
                                            case FETCH_HOURLY_RESERVATION_STATS_SUCCESS:
                                              return {
                                                ...state,
                                                hourlyReservationStats: action.payload,
                                                loading: false,
                                                error: null
                                              };
                                            case FETCH_HOURLY_RESERVATION_STATS_FAILURE:
                                              return {
                                                ...state,
                                                loading: false,
                                                error: action.payload
                                              };
                                              case FETCH_RANKING_REQUEST:
                                                return {
                                                  ...state,
                                                  ranking:{
                                                  loading: true,
                                                  error: null
                                                  }
                                                };
                                                case FETCH_RANKING_SUCCESS:
                                                  return {
                                                    ...state,
                                                    ranking:{
                                                    loading: false,
                                                    ranking: action.payload, 
                                                    error: null,
                                                    }
                                                  };
                                              case FETCH_RANKING_FAILURE:
                                                return {
                                                  ...state,
                                                  ranking:{
                                                  loading: false,
                                                  ranking: [],
                                                  error: action.payload
                                                  }
                                                };

                                                case FETCH_RESERVAS_REQUEST:
                                                return {
                                                  ...state,
                                                  loading: true
                                                };
                                              case FETCH_RESERVAS_SUCCESS:
                                                return {
                                                  loading: false,
                                                  reservas: action.payload,
                                                  error: ''
                                                };
                                              case FETCH_RESERVAS_FAILURE:
                                                return {
                                                  loading: false,
                                                  reservas: [],
                                                  error: action.payload
                                                };
                                                case DELETE_RESERVA_REQUEST:
                                                  return {
                                                    ...state,
                                                    loading: true
                                                  };
                                                case DELETE_RESERVA_SUCCESS:
                                                  return {
                                                    loading: false,
                                                    success: true,
                                                    error: ''
                                                  };
                                                case DELETE_RESERVA_FAILURE:
                                                  return {
                                                    loading: false,
                                                    success: false,
                                                    error: action.payload
                                                  };

                                                  case BAN_USER:
                                                    return {
                                                      ...state,
                                                      users: state.users.map(user =>
                                                        user.id === action.payload ? { ...user, banned: true } : user
                                                      ),
                                                    };
                                                  case UNBAN_USER:
                                                    return {
                                                      ...state,
                                                      users: state.users.map(user =>
                                                        user.id === action.payload ? { ...user, banned: false } : user
                                                      ),
                                                    };
                                                default:
                                                    return state;
                                                }
                                            }
                                          
                                          export default Reducer;