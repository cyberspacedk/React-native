import React , {useState} from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {LocationScreen, EmptyMessage, GetLocationButton, MapPreview} from './styles';
import Colors from '../../constants/colors';

const LocationPicker = (props) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

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

    }catch(error){
     Alert.alert('Could not fetch location', 'Please try again later or pick a location on the map.', [{text: 'Okay'}])
    }finally{
      setLoading(false)
    }
  } 

  return (
    <LocationScreen>
      <MapPreview>
        {loading ? <ActivityIndicator size="small" />
          :  (
            <EmptyMessage>
                No location chosen yet!
            </EmptyMessage>
            )
        }  
      </MapPreview> 
      <GetLocationButton 
        title="Get User Location" 
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </LocationScreen>
  )
}

export default LocationPicker;
