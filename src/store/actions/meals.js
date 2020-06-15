export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export function toggleFavorite(id) {
  return { type: TOGGLE_FAVORITE, mealId: id };
}

export function setFilters(filterSettings) {
  return { type: SET_FILTERS, filters: filterSettings };
}
