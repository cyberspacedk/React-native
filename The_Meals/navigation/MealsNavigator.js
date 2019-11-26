import React from 'react'
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const MealsNavigator = createStackNavigator({
  Categories:  CategoriesScreen, 
  CategoryMeals:  CategoryMealsScreen ,
  MealDetail: MealDetailScreen
},{ 
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 'yellow' 
  }
});


const RootNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo)=> <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarLabel: 'Fav',
      tabBarIcon: (tabInfo)=> <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/> 
    }
  }
},{
  tabBarOptions:{
    activeTintColor: Colors.accentColor,

  }
})

export default createAppContainer(RootNavigator);
