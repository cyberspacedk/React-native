import React from 'react'
import { View, Text, StyleSheet , Button} from 'react-native'

import CartItem from './CartItem';
import Colors from '../../constatnts/Colors';

const OrderItem = ({total, date}) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{total}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button color={Colors.primary} title="Show details" onPress={()=> null}/>
    </View>
  )
} 

const styles = StyleSheet.create({
   orderItem: {
    shadowColor: 'black',
    shadowOpacity: .26,
    textShadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#fff',   
    margin: 20, 
    padding: 10,
    alignItems: 'center'
   },
   summary: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     width: '100%',
     marginBottom: 10
   },
   totalAmount: {
     fontFamily: 'open-sans-bold',
     fontSize: 16, 
  },
  date: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color: '#000'
  }
})


export default OrderItem
