import React from 'react'; 
import {useSelector} from 'react-redux';
import {ScrollView, DetailScreen, Image, Title, Address} from './styles';
import MapPreview from '../../components/MapPreview';

const PlaceDetailScreen = ({navigation}) => {
  const placeId = navigation.getParam('placeId');
  const place = useSelector(state=> state.places.placesList.find(item=> item.id === placeId));  

  const placeLocation = {
    latitude: place.latitude,
    longitude: place.longitude
  }; 
  
  return (
    <ScrollView>
      <Title>{place.title}</Title> 
      <Image source={{uri: place.imageUri}} />
      <DetailScreen>
        <Address>{place.address}</Address>
        <MapPreview 
          mapType="" 
          width="800" 
          height="400" 
          location={placeLocation}
        />
      </DetailScreen>
    </ScrollView>
)};

PlaceDetailScreen.navigationOptions = nav => {
  return {
    headerTitle: nav.navigation.getParam('placeTitle')
  }
}

export default PlaceDetailScreen;
