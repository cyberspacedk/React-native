import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES} from '../data/dummy-data.js';
import {View, Platform} from 'react-native';
import Colors from '../constants/Colors'
import CategoryGridTile from '../components/CategoryGridTile'



const CategoriesScreen = props => {

  const renderGridItem = ({item})=> (
    <CategoryGridTile 
      id={item.id} 
      title={item.title} 
      color={item.color}
      onSelect={()=> props.navigation.navigate('CategoryMeals', {categoryId: item.id})}/>
    );

  return (
    <FlatList keyExtractor={item=>item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/> 
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',  
} 

const FlatList = styled.FlatList`
  
`;


export default CategoriesScreen;
  