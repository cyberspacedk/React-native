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
        action.placeData.address,
        action.placeData.coords.latitude,
        action.placeData.coords.longitude
        );
      return {
        placesList: [...state.placesList, place]
      } 
    }

    case  SET_PLACES: 
      return {
        placesList: action.places.map(place => new Place(
         place.id, 
          place.title, 
          place.imageUri, 
          place.address, 
          place.lat, 
          place.lng
          ))
      }
    default: 
      return state;
  }
}