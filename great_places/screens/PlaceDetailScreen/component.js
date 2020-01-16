import React from 'react';
import styled from 'styled-components';

const PlaceDetailScreen = () => (
  <Screen>
    <Text>
        Detail
    </Text>
  </Screen>
);

PlaceDetailScreen.navigationOptions = nav => {
  return {
    headerTitle: nav.navigation.getParam('placeTitle')
  }
}
const Screen = styled.View``;
const Text = styled.Text``;

export default PlaceDetailScreen;
