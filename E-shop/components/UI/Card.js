 import React from 'react'
 import { View, StyleSheet } from 'react-native'
 
 const Card = ({children, style}) => {
   return (
     <View style={{...styles.card, ...style}}> 
       {children}
     </View>
   )
 }

 const styles = StyleSheet.create({
    card: {
      shadowColor: 'black',
      shadowOpacity: .26,
      textShadowOffset: { width: 0, height: 2},
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 5,
      backgroundColor: '#fff',  
    }
 })
 
 
 export default Card
 