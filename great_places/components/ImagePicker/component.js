import React from 'react';
import {Alert} from 'react-native';
import * as Picker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {Container, ImageContainer, ImageLabel, UploadButton} from './styles';

import Colors from '../../constants/colors';

const ImagePicker = () => {

  const verifyPermissions = async ()=>{
   const result =  await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

   if(result.status !== 'granted') {
     Alert.alert(
      'Permission denied !',
      'You need to grant camera permissions to use this app.',
      [{test: 'Okay'}]
     );
     return true;
    }
    return false;
  };

  const pickImage = async () => {
    const granted = await verifyPermissions();
    if(!granted) return;
    await Picker.launchCameraAsync();
  };

  return (
    <Container>
      <ImageContainer>
        <ImageLabel>No image picked yet.</ImageLabel>
      </ImageContainer>
      <UploadButton 
        title="Upload image"
        color={Colors.primary}
        onPress={pickImage}
      />
    </Container>
  )
}

export default ImagePicker
