import React from 'react'; 
import PropTypes from 'prop-types';
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
  
  // add possibility to show map in separate screen
  const showMapHandler = () => {
    navigation.navigate('Map', {
      readOnly: true,
      initialLocation: placeLocation
    });
  }

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
          onPress={showMapHandler}
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
PlaceDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default PlaceDetailScreen;
