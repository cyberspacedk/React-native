import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList'; 
import DefaultText from '../components/DefaultText'
const FavoritesScreen = props => {
  const favMeals= useSelector(state=>state.meals.favoritesMeals);

  if(favMeals.length === 0 || !favMeals){
    return (
      <View style={styles.emptyFav}>
        <DefaultText>
          No Favorite Meals Found !
        </DefaultText>
      </View>
    )
  }
 
  return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  emptyFav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default FavoritesScreen;
