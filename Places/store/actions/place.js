import * as FileSystem from 'expo-file-system';
import {API} from '../../env';
import {insertPlace, getPlaces, deletePlace} from '../../db/methods';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = (title, imageUri, location) => async dispatch => {
  const {latitude, longitude} = location;  

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API}`);
  
  if(!response){
    throw new Error('Something went wrong');
  }
  
  const responseData = await response.json(); 

  if(!responseData.results){
    throw new Error('Something went wrong'); 
  }
  const address = responseData.results[0].formatted_address; 
 
  const fileName = imageUri.split('/').pop();  
  const newPath = FileSystem.documentDirectory + fileName; 

  try{ 
    FileSystem.moveAsync({
      from: imageUri,
      to: newPath
    });
     
    const dbresult = await insertPlace(title, newPath, address,latitude, longitude);   
     
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

export const removePlace = (placeTitle) => async dispatch =>{
  try{
    const result = await deletePlace(placeTitle);
    console.log(result)
  }catch(error){
    throw error
  }
}