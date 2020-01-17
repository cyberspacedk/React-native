export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, imageUri) => ({
  type: ADD_PLACE,
  placeData: {title, imageUri} 
}) 