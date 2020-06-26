import axios from '../../data/api';
import Meal from '../../models/meal';

export const FETCHING_MEALS = 'FETCHING_MEALS';
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_MEALS_ERROR = 'FETCH_MEALS_ERROR';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export function toggleFavorite(id) {
  return { type: TOGGLE_FAVORITE, mealId: id };
}

export function setFilters(filterSettings) {
  return { type: SET_FILTERS, filters: filterSettings };
}

export function fetchMeals() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_MEALS });

    try {
      const token = getState().auth.token;

      const response = await axios.get(`meals.json?auth=${token}`);
      const data = response.data;
      const meals = [];

      for (const key in data) {
        meals.push(
          new Meal(
            key,
            data[key].categoryIds,
            data[key].title,
            data[key].affordability,
            data[key].complexity,
            data[key].imageUrl,
            data[key].duration,
            data[key].ingredients,
            data[key].steps,
            data[key].isGlutenFree,
            data[key].isVegan,
            data[key].isVegetarian,
            data[key].isLactoseFree,
          ),
        );
      }

      dispatch({ type: FETCH_MEALS_SUCCESS, meals });
    } catch (error) {
      dispatch({ type: FETCH_MEALS_ERROR, error });
    }
  };
}
