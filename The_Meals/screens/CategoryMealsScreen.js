import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES} from '../data/dummy-data.js';

const CategoryMealScreen = props => {
 const catId =  props.navigation.getParam('categoryId') ;
 const selectedCategory = CATEGORIES.find(item=> item.id === catId);
  return (
    <Container  >
      <Text>Category Meal Screen!</Text> 
      <Text>{selectedCategory.title}</Text>
      <Button title="Go to Meals" onPress={()=> props.navigation.navigate('MealDetail')}/>
      <Button title="Go Back" onPress={()=> props.navigation.pop()}/>
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

 const Text = styled.Text``

export default CategoryMealScreen;
