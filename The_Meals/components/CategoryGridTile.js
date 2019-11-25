import React from 'react' 
import styled from 'styled-components'; 

const CategoryGridTile = (props) => {
  return ( 
    <Item onPress={props.onSelect}>
      <Container style={{backgroundColor: props.color}}>
        <Text>{props.title}</Text>    
      </Container>
    </Item>
  )
}

const Item = styled.TouchableOpacity` 
  display: flex;
  flex:1; 
  margin: 15px;
  height: 150px;  
`;
 

const Container = styled.View` 
  display: flex;
  flex:1;
  border-radius: 5px;
  padding: 15px;
  border: 2px solid #000; 
  justify-content: flex-end;
  align-items: flex-end;
`;

const Text = styled.Text`
  font-family: 'open-sans-bold';
  font-size: 18px; 
  text-align: right;
`;

export default CategoryGridTile; 