import React from 'react'
import styled from 'styled-components';

 const MealItem = (props) => {
  return (
    <Item>
      <Wrapper onPress={props.OnselectMeal}>
        <Container>
          <RowOne> 
            <Content> 
              {props.title}
            </Content>
          </RowOne>
          <RowTwo>

          </RowTwo>
      
        </Container>
      </Wrapper>
    </Item> 
  )
}

export default MealItem;
const Item = styled.View` 
  height: 200px;
  width:100%;
  background-color: #ccc;
`;
const Wrapper = styled.TouchableOpacity``;
const Container = styled.View``;
const RowOne = styled.View`
flex-direction: row;
`;
const RowTwo = styled.View`
flex-direction: row;
`; 


const Content = styled.Text``;