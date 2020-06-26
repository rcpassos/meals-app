import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_API_KEY } from 'react-native-dotenv';
import axios from '../../data/api/auth';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const CLEAR_ERROR = 'CLEAR_ERROR';

let logoutTimer;

export function authenticate(token, userId, expiresIn) {
  return dispatch => {
    dispatch(setLogoutTimer(expiresIn));

    dispatch({ type: AUTHENTICATE, userId, token });
  };
}

export function signup(email, password) {
  return async dispatch => {
    dispatch({ type: SIGNUP_START });

    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(`:signUp?key=${AUTH_API_KEY}`, body);

      const data = response.data;

      const expiresIn = parseInt(data.expiresIn, 10) * 1000;

      dispatch(setLogoutTimer(expiresIn));
      dispatch({
        type: AUTHENTICATE,
        token: data.idToken,
        userId: data.localId,
      });
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, error });
    }
  };
}

export function login(email, password) {
  return async dispatch => {
    dispatch({ type: LOGIN_START });

    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        `:signInWithPassword?key=${AUTH_API_KEY}`,
        body,
      );

      const data = response.data;

      const expiresIn = parseInt(data.expiresIn, 10) * 1000;

      dispatch(setLogoutTimer(expiresIn));
      dispatch({
        type: AUTHENTICATE,
        token: data.idToken,
        userId: data.localId,
      });
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
}

export function logout() {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
}

function clearLogoutTimer() {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
}

function setLogoutTimer(expirationTime) {
  return dispatch => {
    logoutTimer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

function saveDataToStorage(token, userId, expirationDate) {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expirationDate: expirationDate.toISOString(),
    }),
  );
}
