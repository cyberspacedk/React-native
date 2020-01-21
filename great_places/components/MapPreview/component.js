import React from 'react'
import {Image, MapPreviewScreen} from './styles';
import {API} from '../../env';

const  MapPreview = (props) => {
  const {location, mapType, width, height} = props; 

  let imagePreviewUrl; 
  if(location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=${width}x${height}&maptype=${mapType}&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${API}`
  }
  console.log("➡️: MapPreview -> imagePreviewUrl", imagePreviewUrl)

  return (
    <MapPreviewScreen>
      {location ? <Image source={{uri: imagePreviewUrl}} /> : props.children}
    </MapPreviewScreen> 
  )
}

export default MapPreview;