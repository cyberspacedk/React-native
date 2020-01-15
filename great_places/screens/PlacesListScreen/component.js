import React from 'react';
import styled from 'styled-components';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Platform} from 'react-native';

import CustomHeaderButton from '../../components/HeaderButton'

const android = Platform.OS === 'android';
const icon = android ? 'md-add' : 'ios-add'
const PlacesListScreen = () => (
  <Screen>
    <Text>
       PlacesListScreen
    </Text>
  </Screen>
);

PlacesListScreen.navigationOptions = nav => ({
  headerTitle: 'All Places',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="Add Place" 
        iconName={icon} 
        onPress={()=> nav.navigation.navigate('NewPlace')} 
      />
    </HeaderButtons>
    )
})

const Screen = styled.View``;
const Text = styled.Text``;

export default PlacesListScreen;
