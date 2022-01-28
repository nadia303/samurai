import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default authReducer;

export const setAuthUserData = (userId, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

export const getCaptchaUrlSuccess = (captchaUrl) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
  };
};

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    let action = stopSubmit("login", {
      _error: message,
    });
    dispatch(action);
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  const captcha = response.data.url;
  dispatch(getCaptchaUrlSuccess(captcha));
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
