import React, {useState} from 'react';
import Proptypes from 'prop-types';
import {Alert} from 'react-native';
import * as Picker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {Container, ImageContainer, ImageLabel, Image, UploadButton} from './styles';

import Colors from '../../constants/colors';

const ImagePicker = (props) => {
  const [pickedImage, setPicketImage] = useState(null);

  const verifyPermissions = async ()=>{
   const result =  await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

   if(result.status !== 'granted') {
     Alert.alert(
      'Permission denied !',
      'You need to grant camera permissions to use this app.',
      [{test: 'Okay'}]
     );
     return false;
    }
    return true;
  };

  const pickImage = async () => {
    const granted = await verifyPermissions();
    if(!granted) return;
    const image = await Picker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5
    });
    setPicketImage(image.uri);
    props.onImageTake(image.uri);
  };

  return (
    <Container>
      <ImageContainer>
        {pickedImage ? 
          <Image source={{uri: pickedImage}} />
        :
          <ImageLabel>No image picked yet.</ImageLabel> 
        }
      </ImageContainer>
      <UploadButton 
        title="Upload image"
        color={Colors.primary}
        onPress={pickImage}
      />
    </Container>
  )
}
ImagePicker.propTypes = {
  onImageTake: Proptypes.func.isRequired
}

export default ImagePicker
