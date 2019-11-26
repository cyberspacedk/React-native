import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components'; 
import MealItem from '../components/MealItem'

const MealDetailScreen = props => { 
  const renderMealItem = itemData=> <MealItem title={itemData.item.title} />
  
  const catId = props.navigation.getParam('categoryId');
  const displayedMeals = MEALS.filter(meal=> meal.categoryIds.indexOf(catId)>=0);

  return (
    <Container>
      <Text>The Meal Detail Screen!</Text>
      <Button title="Go Back to Categories" onPress={()=> props.navigation.popToTop()}/> 
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
`;

 const Button = styled.Button`
  
 `;

export default MealDetailScreen;
