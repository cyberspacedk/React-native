import React from 'react';
import MapView from 'react-native-maps';

import {Screen, Text} from './styles';

const MapScreen = () =>  {

  const mapRegion = {
    latitude: 37.78, 
    longitude: -122.43,
    latitudeDelta: 0.0922, 
    longitudeDelta:  0.0421 
  }

  return (
    <MapView region={mapRegion} style={{flex: 1 }} /> 
  )
}
export default MapScreen;
 