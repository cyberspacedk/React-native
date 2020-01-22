import * as FileSystem from 'expo-file-system';
import {API} from '../../env';
import {insertPlace, getPlaces} from '../../db/methods';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, imageUri, location) => async dispatch => {
  const {latitude, longitude} = location; 
// get address by geo params 
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API}`);
  
  if(!response){
    throw new Error('Something went wrong');
  }
  
  const responseData = await response.json(); 

  if(!responseData.results){
    throw new Error('Something went wrong'); 
  }
  const address = responseData.results[0].formatted_address; 

  // get image name 
  const fileName = imageUri.split('/').pop();
  // get new path in document directory  
  const newPath = FileSystem.documentDirectory + fileName;

  try{
    // call moveAsyc method that moves old path and store new path
    FileSystem.moveAsync({
      from: imageUri,
      to: newPath
    });
    
    // insert data to db
    const dbresult = await insertPlace(title, imageUri, address,latitude, longitude);   
    
    // shoot action if all previous operation will succeed
    dispatch({ type: ADD_PLACE, placeData: { 
      id: dbresult.insertId, 
      title, 
      imageUri, 
      address, 
      coords: {
        latitude, 
        longitude
      } 
    }}); 
    
  }catch(err){
    throw new Error(err);  
  }  
}

export const loadPlaces = () => async dispatch => {
  try {
    const result = await getPlaces();   

    dispatch({
      type: SET_PLACES,
      places: result.rows._array
    });

    }catch(error){
      throw error
    }  
}