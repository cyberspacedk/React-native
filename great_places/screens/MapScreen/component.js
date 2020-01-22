import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import MapView, {Marker} from 'react-native-maps'; 

import {TouchableOpacity, Text} from './styles';

const MapScreen = ({navigation}) =>  {
  const [selectedLocation, setSelectedLocation] = useState(); 
  
  const mapRegion = {
    latitude: 37.78, 
    longitude: -122.43,
    latitudeDelta: 0.0922, 
    longitudeDelta:  0.0421 
  }
  
  const selectLocationHandler = ({nativeEvent}) => {
    const {coordinate} = nativeEvent;
    setSelectedLocation(coordinate) 
  };
  
  const savePickedLocationHandler = useCallback(()=>{
    if(!selectedLocation) return ;
    navigation.navigate('NewPlace', {
      location: selectedLocation
    })
  },[selectedLocation]);

  useEffect(()=>{
    navigation.setParams({
      saveLocation: savePickedLocationHandler
    }); 
  },[savePickedLocationHandler]);
  
  let markerCoordinates;
  if(selectedLocation){
    markerCoordinates = {
      ...selectedLocation
    }
  }  
  
  return (
    <MapView region={mapRegion} style={{flex: 1 }} onPress={selectLocationHandler}>
      {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates} />}
    </MapView>
  )
};

MapScreen.navigationOptions = nav => {
  const saveHandler = nav.navigation.getParam('saveLocation');

  return {
    headerRight: ()=> (
      <TouchableOpacity onPress={saveHandler}>
        <Text>
          Save
        </Text>
      </TouchableOpacity>
    )
  }
};

MapScreen.propTypes = { 
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired
  }).isRequired
}

export default MapScreen;
 