import {MEALS} from '../../data/dummy-data.js';
import {TOGGLE_FAVORITE} from '../actions/meals'; 

const initialState = {
  meals:MEALS,
  filteredMeals:MEALS,
  favoritesMeals: []
}

const mealsReducer = (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_FAVORITE: 
    // find index 
      const existingIndex = state.favoritesMeals.findIndex(meal => meal.id === action.mealId );
    // if meal already exist in favorites
      if(existingIndex >=0){
        // make copy of favorites array
        const updatedFavMeals = [...state.favoritesMeals];
        // cut off this meal from copied array
        updatedFavMeals.splice(existingIndex,1);
        // return upadted array
        return {
          ...state,
          favoritesMeals: updatedFavMeals
        }
      }else {
        // if meal is new , then find it 
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return {
          ...state, 
          // and add to favorites array
          favoritesMeals: state.favoritesMeals.concat(meal)
        }
      } 
    default :
      return state;
  } 
}

export default mealsReducer;