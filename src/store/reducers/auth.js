import {
  AUTHENTICATE,
  CLEAR_ERROR,
  LOGIN_ERROR,
  LOGIN_START,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_START,
} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_START:
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case LOGIN_START:
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
      };
    case LOGOUT:
      return initialState;
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default authReducer;
