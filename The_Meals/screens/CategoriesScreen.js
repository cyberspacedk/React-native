import React from 'react'; 
import styled from 'styled-components';
import {CATEGORIES} from '../data/dummy-data.js';
import {View, Platform} from 'react-native';
import Colors from '../constants/Colors'




const CategoriesScreen = props => {

  const renderGridItem = (itemData)=> (
    <Container onPress={()=> {
      props.navigation.navigate('CategoryMeals', {categoryId: itemData.item.id})
    }}>
      <View>
        <Text>{itemData.item.title}</Text>   
      </View>
    </Container>
  )
  return (
    <FlatList keyExtractor={item=>item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/> 
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',  
}

const Container = styled.TouchableOpacity`
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
  