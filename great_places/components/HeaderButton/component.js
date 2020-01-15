import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons'
import {Platform} from 'react-native';

import Colors from '../../constants/colors';

const CustomHeaderButton = (props) => {
  const android = Platform.OS === 'android';
  const color = android ? 'white':Colors.primary
  return (
    <HeaderButton 
      {...props} 
      color={color}
      iconSize={23}
      IconComponent={Ionicons}
    />
  )
}

export default CustomHeaderButton;