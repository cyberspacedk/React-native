import React, {useState} from 'react'
import { View, Text, StyleSheet , Button} from 'react-native'

import CartItem from './CartItem';
import Colors from '../../constatnts/Colors';

const OrderItem = ({total, date, items}) => {
  const [showDetails, setShowDetails] = useState(false);

 const handleShowDetails = ()=> {
    setShowDetails(prevState=> !prevState);
  }

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{total.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button color={Colors.primary} title={showDetails ? "Hide details" : "Show details"} onPress={handleShowDetails}/>
      {showDetails && (
        <View style={styles.detailsItems}>
          {items.map(item=> (<CartItem key={item.productId} {...item}/>))}
        </View>
      )}
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
  },
  detailsItems: {
    width: '100%'
  }
})


export default OrderItem
