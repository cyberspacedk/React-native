import React from 'react'; 
import PropTypes from 'prop-types';
import {TouchableOpacity, Container, Image, Title, Address} from './styles';

const PlaceItem = ({image, title, address, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <Image source={{ uri: image }} />
      <Container>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </Container>
    </TouchableOpacity>
  );
}; 

PlaceItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default PlaceItem;