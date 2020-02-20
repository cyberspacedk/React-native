import React from 'react'; 
import PropTypes from 'prop-types'; 
import {TouchableOpacity, Container, Image, Title, Address, Screen, Button, ButtonWrapper} from './styles';

const PlaceItem = ({imageUri, title, address, onSelect, handlePlaceRemove }) =>  { 
  return (
    <TouchableOpacity onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <Screen>
        <Container>
          <Title>{title}</Title>
          <Address>{address}</Address>  
        </Container>  
        <ButtonWrapper>
          <Button title="Remove" onPress={()=> handlePlaceRemove(title)} />
        </ButtonWrapper> 
      </Screen>   
    </TouchableOpacity>
  );
}; 

PlaceItem.propTypes = {
  imageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  handlePlaceRemove: PropTypes.func.isRequired
}

export default PlaceItem;