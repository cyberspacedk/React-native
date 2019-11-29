import React, {useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text, 
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText'; 
import {toggleFavorite} from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {

  const mealId = props.navigation.getParam('mealId'); 

  const availableMeals = useSelector(state=> state.meals.meals); 
  // toggle favorites meal. check if meal exist in favorites array
  const currentMealIsFavorite = useSelector(state=> state.meals.favoritesMeals.some(meal=> meal.id === mealId) );
  // find current meal
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();
  // shoot action 
  const toggleFavoriteHandler = useCallback(() => dispatch(toggleFavorite(mealId)),[dispatch, mealId]);

  useEffect(()=> {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler
    })
  },[toggleFavoriteHandler]);

  // set Boolean isFav to navigation object
  useEffect(()=> {
    props.navigation.setParams({
      isFav: currentMealIsFavorite
    })
  }, [currentMealIsFavorite])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {  
  // get title 
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  // get toggle function
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  // get Boolean isFav value
  const isFav = navigationData.navigation.getParam('isFav');

  // now lets set this values to header app
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
