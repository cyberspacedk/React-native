import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES} from '../data/dummy-data.js';


const renderGridItem = (itemData)=> (
    <Container>
      <Text>{itemData.item.title}</Text>  
      {/* <Button title="Go to Meals" onPress={()=> props.navigation.navigate('CategoryMeals')}/>   */}
    </Container>
)


const CategoriesScreen = props => {
  return (
    <FlatList keyExtractor={item=>item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/> 
  );
};



const Container = styled.View`
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
  margin: 15px;
  height: 50px;
`
const Button = styled.Button`
`
const Text = styled.Text``;

const FlatList = styled.FlatList``;


export default CategoriesScreen;
