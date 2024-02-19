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
  products: []
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

        default:
            return state;
        }
    }
  
  export default Reducer;