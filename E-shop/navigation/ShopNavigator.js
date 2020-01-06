import React from 'react' 
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// helpers
import Colors from '../constatnts/Colors';

// screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';  

// screens for admin
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

// define platform 
const ios = Platform.OS === 'ios';

// create reuseful options object
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor:  ios ? '' :  Colors.primary
  },
  headerTitleStyle:{
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: ios ? Colors.primary : '#fff' 
}

// navigation for products and buy products
const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen, 
},{
  navigationOptions: {
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-cart':'md-cart'} size={23} color={drawerConfig.tintColor}/>
  },
  defaultNavigationOptions
})

// navigation for orders page
const OrderNavigator = createStackNavigator({
  Orders: OrderScreen
 },{ 
  navigationOptions: {
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-list':'md-list'} size={23} color={drawerConfig.tintColor}/>
  },
   defaultNavigationOptions
  }
)

// navigation for orders page
const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct : EditProductScreen
 },{ 
  navigationOptions: {
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-create':'md-create'} size={23} color={drawerConfig.tintColor}/>
  },
   defaultNavigationOptions
  }
)

// combite these navigators in Drawer navigator
const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator,
},{
  contentOptions: {
    acttiveTintColor: Colors.primary
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
},{
  defaultNavigationOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator); 