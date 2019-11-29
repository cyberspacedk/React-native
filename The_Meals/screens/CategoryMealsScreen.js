import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import DefaultText from '../components/DefaultText';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state=> state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if(displayedMeals.length === 0){
    return (
      <View style={styles.notFountWrapper}>
        <DefaultText>
          No Meals Found, maybe check your filters ?
        </DefaultText>
      </View>
    )
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  notFountWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;
