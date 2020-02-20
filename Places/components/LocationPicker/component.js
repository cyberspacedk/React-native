import React , {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Alert } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {LocationScreen, EmptyMessage, GetLocationButton, PickOnMapButton, ButtonContainer} from './styles';
import Colors from '../../constants/colors';

import MapPreview from '../MapPreview';

const LocationPicker = ({navigation, onLocationPicked}) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const pickedLocation =  navigation.getParam('location'); 

  useEffect(()=> {
    if(pickedLocation){
      setLocation(pickedLocation);
      onLocationPicked(pickedLocation);
    }
  }, [pickedLocation, onLocationPicked])

  const verifyPermission = async ()=> {
    const result =  await Permissions.askAsync(Permissions.LOCATION);

    if(result.status !== 'granted') {
      Alert.alert(
       'Permission denied !',
       'You need to grant camera permissions to use this app.',
       [{test: 'Okay'}]
      );
      return false;
     }
     return true; 
  };

  const getLocationHandler = async () => {
    const granted = await  verifyPermission();
    if(!granted) return;
    try{
      setLoading(true);
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({ timeout: 5000 }) 
      
      setLocation({ 
        latitude, 
        longitude 
      });

      onLocationPicked({
        latitude, 
        longitude 
      });

    }catch(error){
     Alert.alert('Could not fetch location', 'Please try again later or pick a location on the map.', [{text: 'Okay'}])
    }finally{
      setLoading(false)
    }
  };

  const pickOnMaphandler = ()=> {
    navigation.navigate('Map');
  }

  return (
    <LocationScreen>
      <MapPreview 
        location={location} 
        mapType="" 
        width="800" 
        height="400" 
        onPress={pickOnMaphandler} 
      >
        {loading ? <ActivityIndicator size="small" />
      :  (
        // eslint-disable-next-line react-native/no-raw-text
        <EmptyMessage>
            No location chosen yet!
        </EmptyMessage>
        )
    }  
      </MapPreview>
      <ButtonContainer>
        <GetLocationButton  
          title="Get User Location" 
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <PickOnMapButton 
          title="Pick on Map" 
          color={Colors.primary}
          onPress={pickOnMaphandler} 
        />
      </ButtonContainer>
      
    </LocationScreen>
  )
};

LocationPicker.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired, 
    getParam: PropTypes.func.isRequired
  }).isRequired,
  onLocationPicked: PropTypes.func.isRequired
}

export default LocationPicker;
