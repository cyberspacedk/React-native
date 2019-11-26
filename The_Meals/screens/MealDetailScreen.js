import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';  
import {MEALS} from '../data/dummy-data.js';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import  HeaderButton from '../components/HeaderButton';

const MealDetailScreen = props => { 
 
   const mealId = props.navigation.getParam('mealId');
   const selectedMeal = MEALS.find(({id})=> id === mealId);

  return (
    <Container>
      <Text>{selectedMeal.title}</Text>
      <Button title="Go Back to Categories" onPress={()=> props.navigation.popToTop()}/> 
    </Container>
  );
};

MealDetailScreen.navigationOptions = (nav) => {
  const mealId = nav.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(({id})=> id === mealId);

  return {
    headerTitle: selectedMeal.title, 
    headerRight:  (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Favorite" iconName="ios-star" onPress={()=> console.log('FAV')}/>  
                  </HeaderButtons>),
  } 
}

const Container = styled.View`
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
`;

 const Button = styled.Button`
  
 `;

export default MealDetailScreen;
