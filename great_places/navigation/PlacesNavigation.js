import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Platform } from 'react-native';

// screens
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlacesScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/colors';

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetails: PlaceDetailsScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default createAppContainer(PlacesNavigator);
