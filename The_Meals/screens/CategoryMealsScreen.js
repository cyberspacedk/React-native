import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES, MEALS} from '../data/dummy-data.js';
import MealItem from '../components/MealItem'

const CategoryMealScreen = props => { 
  const renderMealItem = itemData=> <MealItem title={itemData.item.title} /> 
  const catId = props.navigation.getParam('categoryId');
  const displayedMeals = MEALS.filter(meal=> meal.categoryIds.indexOf(catId)>=0);

  return (
    <Container>
      <List data={displayedMeals} keyExtractor={(item,index)=>item.id} renderItem={renderMealItem}/>
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

 const Button = styled.Button` `;

 const Text = styled.Text``;

 const List = styled.FlatList``;

export default CategoryMealScreen;
