import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'; 

import {loadPlaces, removePlace} from '../../store/actions/place';

import CustomHeaderButton from '../../components/HeaderButton'
import PlaceItem from '../../components/PlaceItem';

import {FlatList} from './styles';

const android = Platform.OS === 'android';
const icon = android ? 'md-add' : 'ios-add';

const PlacesListScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(()=> { dispatch(loadPlaces())},[dispatch]);

  const handlePlaceRemove = async(title)=> {
    await dispatch(removePlace(title))
    dispatch(loadPlaces())
  }
  
  const placesList = useSelector(store=> store.places.placesList);  
  
  return ( 
    <FlatList 
      data={placesList} 
      renderItem={({item})=>(
        <PlaceItem 
          {...item}
          handlePlaceRemove={handlePlaceRemove}
          onSelect={()=> props.navigation.navigate('PlaceDetails', {
            placeId: item.id,
            placeTitle: item.title,
            placeImage: item.imageUri, 
            placeAddress: item.address
          })}
        />
      )}
      keyExtractor={item=>item.id}
    /> 
)};

PlacesListScreen.navigationOptions = nav => ({
  headerTitle: 'All Places',
  headerRight: ()=> (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="Add Place" 
        iconName={icon} 
        onPress={()=> nav.navigation.navigate('NewPlace')} 
      />
    </HeaderButtons>
    )
});

PlacesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
  
export default PlacesListScreen;
