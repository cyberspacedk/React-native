import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES, MEALS} from '../data/dummy-data.js';
import MealItem from '../components/MealItem'

const CategoryMealScreen = props => { 
  const renderMealItem = ({item})=> (
  <MealItem {...item} onSelectMeal={()=> {
    props.navigation.navigate('MealDetail', { mealId: item.id })
  }}/>
  )

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
  padding: 15px;
`;

 const Button = styled.Button` `;

 const Text = styled.Text``;

 const List = styled.FlatList`
  width:100%;
 `;

export default CategoryMealScreen;
