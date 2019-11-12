import React from 'react'
import { View, StyleSheet } from 'react-native';

const Card = props => (
        <View style={{...styles.card, ...props.styles}}>
            {props.children}
        </View>
    ) 

const styles = StyleSheet.create({
    card: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowRadius: 6,
        shadowColor: 'black',
        shadowOffset:{width:0, height:2},
        shadowOpacity: .26,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        marginVertical: 20
    }
})

export default Card;