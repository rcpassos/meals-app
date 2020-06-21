import {
  FETCHING_MEALS,
  fetchMeals,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_SUCCESS,
  SET_FILTERS,
  TOGGLE_FAVORITE,
} from '../actions/meals';

const initialState = {
  meals: [],
  filteredMeals: [],
  error: null,
  loading: true,
  appliedFilters: null,
  favoriteMeals: [],
};

function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MEALS:
      return {
        ...state,
        meals: [],
        filteredMeals: [],
        error: null,
        loading: true,
      };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        meals: action.meals,
        filteredMeals: getFilteredMeals(action.meals, state.appliedFilters),
        error: null,
        loading: false,
      };
    case FETCH_MEALS_ERROR:
      return {
        ...state,
        meals: [],
        filteredMeals: [],
        error: action.error,
        loading: false,
      };
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId,
      );

      if (existingIndex >= 0) {
        const updatedFavoriteMeals = [...state.favoriteMeals];
        updatedFavoriteMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavoriteMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;

      if (state.meals.length === 0) {
        fetchMeals();

        return {
          ...state,
          appliedFilters,
        };
      } else {
        return {
          ...state,
          filteredMeals: getFilteredMeals(state.meals, appliedFilters),
          appliedFilters,
        };
      }
    default:
      return state;
  }
}

function getFilteredMeals(meals, filters) {
  if (filters === null || filters === undefined) {
    return meals;
  }

  return meals.filter(meal => {
    if (filters.glutenFree && !meal.isGlutenFree) {
      return false;
    }

    if (filters.lactoseFree && !meal.isLactoseFree) {
      return false;
    }

    if (filters.vegan && !meal.isVegan) {
      return false;
    }

    if (filters.vegetarian && !meal.isVegetarian) {
      return false;
    }

    return true;
  });
}

export default mealsReducer;
