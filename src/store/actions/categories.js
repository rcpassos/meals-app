import axios from '../../data/api';
import Category from '../../models/category';

export const FETCHING_CATEGORIES = 'FECTCHING_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

export function fetchCategories() {
  return async dispatch => {
    dispatch({ type: FETCHING_CATEGORIES });

    try {
      const response = await axios.get('/categories.json');
      const data = response.data;
      const categories = [];

      for (const key in data) {
        categories.push(new Category(key, data[key].title, data[key].color));
      }

      dispatch({ type: FETCH_CATEGORIES_SUCCESS, categories });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_ERROR, error });
    }
  };
}
