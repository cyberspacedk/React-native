import React from 'react'
import PropTypes from 'prop-types'

 import styled from 'styled-components'; 
 
 const Card = ({children, style}) => {
   return (
     <Screen style={{...style}}> 
       {children}
     </Screen>
   )
 }

const Screen = styled.View`
  background-color: #fff;
  border-radius: 5px;   
  border: 1px solid #ccc;
` 
Card.propTypes ={
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}).isRequired
};

export default Card
 