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

export function authenticate(token, userId) {
  return { type: AUTHENTICATE, userId, token };
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

      dispatch({
        type: AUTHENTICATE,
        token: data.idToken,
        userId: data.localId,
      });
      const expirationDate = new Date(
        new Date().getTime() + parseInt(data.expiresIn, 10) * 1000,
      );
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

      dispatch({
        type: AUTHENTICATE,
        token: data.idToken,
        userId: data.localId,
      });
      const expirationDate = new Date(
        new Date().getTime() + parseInt(data.expiresIn) * 1000,
      );
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
}

export function logout() {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
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
