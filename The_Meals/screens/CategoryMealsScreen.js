import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES} from '../data/dummy-data.js';

const CategoryMealScreen = props => { 
  return (
    <Container  >
      <Text>Category Meal Screen!</Text>  
      <Button title="Go to Meals" onPress={()=> props.navigation.navigate('MealDetail')}/>
      <Button title="Go Back" onPress={()=> props.navigation.pop()}/>
    </Container>
  );
};

CategoryMealScreen.navigationOptions = (navData) => { 
  const catId = navData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(item=> item.id === catId);
  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: 'pink'
    }
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

 const Text = styled.Text``

export default CategoryMealScreen;
