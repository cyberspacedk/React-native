import styled from 'styled-components';
import { Platform } from 'react-native';
import Colors from '../../constants/colors';

const Screen = styled.View``;

export const Text = styled.Text`
  font-size: 16px;
  color: ${Platform.OS === 'android' ? 'white' : Colors.primary}
`;

export const TouchableOpacity = styled.TouchableOpacity`
  margin: 20px 0;

`;
