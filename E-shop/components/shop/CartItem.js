import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CartItem = ({quantity, productTitle, productPrice,  sum, onRemove, deleteable}) => {
  return (
    <View style={styles.cartItem}>

      <View style={styles.itemData}>
        <Text style={styles.title}>{productTitle}</Text> 
        <Text style={styles.quantity}>{quantity}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.amount}>${sum.toFixed(2)}</Text>
        {deleteable &&  (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red"/>
          </TouchableOpacity>
        )}
       
      </View> 

    </View>
  )
}

const styles = StyleSheet.create({ 
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16, 
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  amount: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16, 
  },
  deleteButton: {
    marginLeft: 20
  }
})


export default CartItem
