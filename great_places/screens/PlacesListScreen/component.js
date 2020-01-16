import React from 'react'; 
import PropTypes from 'prop-types';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Platform} from 'react-native';
import {useSelector} from 'react-redux'; 

import CustomHeaderButton from '../../components/HeaderButton'
import PlaceItem from '../../components/PlaceItem';

import {FlatList} from './styles';

const android = Platform.OS === 'android';
const icon = android ? 'md-add' : 'ios-add';

const PlacesListScreen = (props) => {
  const placesList = useSelector(store=> store.places.placesList); 
  return ( 
    <FlatList 
      data={placesList} 
      renderItem={({item})=> (
        <PlaceItem 
          {...item}
          onSelect={()=> props.navigation.navigate('PlaceDetails', {
            placeTitle: item.title,
            placeId: item.id
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
