import actionTypes from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return { ...state, loading: true };
    case actionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.user,
      };
    case actionTypes.REGISTRATION_SUCCESSFUL:
    case actionTypes.LOGIN:
      localStorage.setItem('token', action.data.token);
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        loading: false,
        errors: {},
      };
    case actionTypes.AUTHENTICATION_ERROR:
    case actionTypes.LOGIN_FAILED:
    case actionTypes.REGISTRATION_FAILED:
    case actionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        errors: action.data,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const getCurrentUser = state => state.user;
