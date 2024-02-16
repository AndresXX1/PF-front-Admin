import {
    SET_USER_DATA
} from "../action-types/action-types"


const initialState = {
    userDataSession: null,
 
     
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
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