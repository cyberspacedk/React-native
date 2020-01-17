import * as FileSystem from 'expo-file-system';
import {insertPlace} from '../../db/methods';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, imageUri) => async dispatch => {
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
    const dbresult = await insertPlace(title, imageUri, 'Dummy address', 7.5, 9.5); 
    // shoot action if all previous operation will succeed
    dispatch({ type: ADD_PLACE, placeData: {id: dbresult.insertId, title, imageUri}}); 
  }catch(err){
    throw err
  }  
}