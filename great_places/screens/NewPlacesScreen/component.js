import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native'; 
import {useDispatch} from 'react-redux';

import ImagePicker from '../../components/ImagePicker';
import LocationPicker from '../../components/LocationPicker';

import {addPlace} from '../../store/actions/place';

import {FormWrapper, Title, TitleInput, SaveButton} from './styles';
import Colors from '../../constants/colors';

const NewPlacesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const titleChangeHandler = text => setTitle(text); 
  
  const savePlaceHandler = () => {
    dispatch(addPlace(title, image)); 
    navigation.goBack();
  } 
  const onImageTake = (imageUri) => setImage(imageUri);
  
  return(
    <ScrollView>
      <FormWrapper>
        <Title>Title</Title>
        <TitleInput onChangeText={titleChangeHandler} value={title} />
        <ImagePicker onImageTake={onImageTake} />
        <LocationPicker navigation={navigation} />
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

NewPlacesScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default NewPlacesScreen;
