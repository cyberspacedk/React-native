/* eslint-disable react/display-name */
import React from 'react' 
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

// helpers
import {useDispatch} from 'react-redux';
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

// auth handling
import {logout} from '../store/actions/auth';

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
  Cart: CartScreen 
},{
  navigationOptions: {
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-cart':'md-cart'} size={23} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions
})

// navigation for orders page
const OrderNavigator = createStackNavigator({
  Orders: OrderScreen
 },{ 
  navigationOptions: {
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-list':'md-list'} size={23} color={drawerConfig.tintColor} />
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
    drawerIcon: drawerConfig =><Ionicons name={ios ? 'ios-create':'md-create'} size={23} color={drawerConfig.tintColor} />
  },
   defaultNavigationOptions
  }
)

// combine these navigators in Drawer navigator
const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator
},{
  contentOptions: {
    acttiveTintColor: Colors.primary
  },
  // let define custom component in drawer
  // eslint-disable-next-line react/display-name
  contentComponent: props => {
    const dispatch = useDispatch();

    const handleLogout = () => {
      // shoot action logout
      dispatch(logout()); 
    }

    return (
      <View style={{flex: 1, paddingVertical: 30}}>
        <SafeAreaView forceInset={{top:'always', horizontal: 'never'}}>
          {/* items which we define before */}
          <DrawerItems {...props} />
          {/* custom component - button */}
          <Button title="Logout" color={Colors.primary} onPress={handleLogout} />
        </SafeAreaView>
      </View>
    )
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