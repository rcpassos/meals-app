import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import './i18n';
import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import categoriesReducer from './store/reducers/categories';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
  meals: mealsReducer,
  categories: categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
