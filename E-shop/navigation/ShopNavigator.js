import React from 'react' 
import {Platform} from 'react-native';

// navigation
import { createAppContainer } from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';

// helpers
import Colors from '../constatnts/Colors';

// screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';


const android = Platform.OS === 'android';


const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:  android ? Colors.primary : ''
    },
    headerTitleStyle:{
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: android ? '#fff': Colors.primary
  }
})

export default createAppContainer(ProductsNavigator);