import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import styled from 'styled-components';
import Colors from '../../constants/colors';

const NewPlacesScreen = () => {
  const [title, setTitle] = useState('')

  const titleChangeHandler = text => setTitle(text);
  const savePlaceHandler = () => {}
  
  return(
    <ScrollView>
      <FormWrapper>
        <Title onChangeText={titleChangeHandler} value={title}>Title</Title>
        <TitleInput />
        <SaveButton 
          title="Save Place" 
          color={Colors.primary} 
          onPress={savePlaceHandler}
        />
      </FormWrapper>
    </ScrollView> 
)};

NewPlacesScreen.navigationOptions = {
  headerTitle: 'Add New Place'
}

const FormWrapper = styled.View`
  margin: 30px; 
`;
const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
`;
const TitleInput = styled.TextInput`
  border-bottom-color: #cccccc;
  border-bottom-width: 1px;
  margin-bottom: 15px;
  padding: 4px 2px; 
`;
const SaveButton = styled.Button`
`;

export default NewPlacesScreen;
