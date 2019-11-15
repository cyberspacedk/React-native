import React from 'react'; 
import styled from 'styled-components';

const CategoryMealScreen = props => {
  return (
    <Container  >
      <Text>Category Meal Screen!</Text> 
      <Button title="Go to Meals" onPress={()=> props.navigation.navigate('MealDetail')}/>
      <Button title="Go Back" onPress={()=> props.navigation.goBack()}/>
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
