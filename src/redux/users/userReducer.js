import {
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "./userTypes";

import { initialState } from "./userActions";

const reducer = (state, action) => {
  switch (action.type) {
    case SIGNUP_USER_BEGIN:
    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: true };
    case SIGNUP_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.currentUser,
        isLoading: false,
        error: "",
      };

    case SIGNUP_USER_ERROR:
    case LOGIN_USER_ERROR:
      return { ...state, isLoading: false };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
      };

    default:
      if (!state) {
        return initialState;
      }
      return state;
  }
};

export default reducer;
