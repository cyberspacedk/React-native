import {ADD_PLACE} from '../actions/place';
import Place from '../../models/place'

const initialState = {
  placesList : []
};

export default (state=initialState, action)=> {
  switch(action.type){
    case ADD_PLACE : {
      const place = new Place(
        new Date().toString(), 
        action.placeData.title, 
        action.placeData.imageUri
        );
      return {
        placesList: [...state.placesList, place]
      }
    }
    default: 
      return state;
  }
}