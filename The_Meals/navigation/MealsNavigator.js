import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform} from 'react-native';

import Colors from '../constants/Colors'
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    //   },
    //   headerTintColor: 'yellow' 
    // }
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    //   },
    //   headerTintColor: 'yellow' 
    // }
  },
  MealDetail: MealDetailScreen
}, { 
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 'yellow' 
  }
});




export default createAppContainer(MealsNavigator);
