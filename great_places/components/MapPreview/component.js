import React from 'react';
import PropTypes from 'prop-types';
import {Image, MapPreviewScreen} from './styles';
import {API} from '../../env';

const  MapPreview = ({ onPress, location, mapType, width, height, children }) => {   

//  link to image 
  let imagePreviewUrl; 
  if(location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=${width}x${height}&maptype=${mapType}&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${API}`
  }
   
  return (
    <MapPreviewScreen onPress={onPress}>
      {location ? <Image source={{uri: imagePreviewUrl}} /> : children}
    </MapPreviewScreen> 
  )
}

MapPreview.propTypes = { 
  location: PropTypes.shape({
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired
  }).isRequired,
  mapType: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  children: PropTypes.node,
  onPress: PropTypes.func.isRequired
};

MapPreview.defaultProps = {
  children: null
}

export default MapPreview;