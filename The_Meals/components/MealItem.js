import React from 'react'
import styled from 'styled-components';

 const MealItem = ({title, duration, complexity, affordability, imageUrl, onSelectMeal}) => {
  return (
    <Item>
      <Wrapper  onPress={onSelectMeal}>
        <Container>

          <MealHeader> 
            <Image source={{uri: imageUrl}}>
              <HeaderText> 
                {title}
              </HeaderText>
            </Image>
          
          </MealHeader>

          <MealDetail>
            <Text numberOfLines={1}>{duration}</Text>
            <Text>{complexity.toUpperCase()}</Text>  
            <Text>{affordability.toUpperCase()}</Text>  
          </MealDetail>
      
        </Container>
      </Wrapper>
    </Item> 
  )
}

export default MealItem;

// Touch
const Wrapper = styled.TouchableOpacity``;

// View
const Item = styled.View` 
  height: 200px;
  width:100%;
  background-color: #f5f5f5;
  border-radius: 10;
  overflow: hidden;
  margin: 10px 0;
`;
const Container = styled.View``;

const MealHeader = styled.View`
  flex-direction: row;
  height: 80%;
`;
const MealDetail = styled.View`
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-between; 
  align-items: center;
  height: 20%;
`; 

// Image
const Image  = styled.ImageBackground`
  width:100%;
  height:100%;
  justify-content: flex-end;
`; 

// Text
const HeaderText = styled.Text`
  color: #fff;
  font-family: 'open-sans-bold';
  font-size: 22px;
  padding: 5px 12px;
  background-color: rgba(0,0,0,.6);
  text-align:center;

`; 

const Text = styled.Text``;