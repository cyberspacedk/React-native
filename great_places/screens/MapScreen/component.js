import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps'; 

const MapScreen = () =>  {
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
}
export default MapScreen;
 