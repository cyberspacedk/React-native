import {MEALS} from '../../data/dummy-data.js';
import {TOGGLE_FAVORITE, SET_FILTERS} from '../actions/meals'; 

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
      };
    case SET_FILTERS: 
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal=> {
        if(appliedFilters.glutenFree && !meal.isGlutenFree ) return false;
        if(appliedFilters.lactoseFree && !meal.isLactoseFree) return false;
        if(appliedFilters.vegetarian && !meal.isVegetarian) return false;
        if(appliedFilters.vegan && !meal.isVegan) return false;  
        return true;
      })
        return {
            ...state,
            filteredMeals: updatedFilteredMeals
        }

    default :
      return state;
  } 
}

export default mealsReducer;