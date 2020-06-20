import {
  FECTHING_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/categories';

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FECTHING_CATEGORIES:
      return {
        categories: [],
        error: null,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        categories: action.categories,
        error: null,
        loading: false,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        categories: action.categories,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default categoriesReducer;
