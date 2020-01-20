import {ADD_PLACE, SET_PLACES} from '../actions/place';
import Place from '../../models/place'

const initialState = {
  placesList : []
};

export default (state=initialState, action)=> {
  switch(action.type){
    case ADD_PLACE : {
      const place = new Place(
        action.placeData.id, 
        action.placeData.title, 
        action.placeData.imageUri,
        'dummy',
        7.7,
        5.5
        );
      return {
        placesList: [...state.placesList, place]
      }
    }
    case  SET_PLACES: 
      return {
        placesList: action.places
      }
    default: 
      return state;
  }
}