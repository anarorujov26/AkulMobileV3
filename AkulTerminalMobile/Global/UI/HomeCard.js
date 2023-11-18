import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeCard = ({ w, image, bottom }) => {

  const images = {
    product: require('../../Images/product.png'),
    akul: require('../../Images/akul.png'),
    customerorder: require('../../Images/customerorder.png'),
    demand: require('../../Images/demand.png'),
    demandreturn: require('../../Images/demandreturn.png'),
    inventory: require('../../Images/inventory.png'),
    price: require('../../Images/price.png'),
    supply: require('../../Images/supply.png'),
    supplyreturn: require('../../Images/supplyreturn.png'),
    oplata: require('../../Images/oplata.png'),
    owin: require('../../Images/owin.png'),
    financial: require('../../Images/financial.png'),
    rotation:require('../../Images/rotations.png'),
    accounts:require('../../Images/accounts.png')
  };


  return (
    <View style={{ width: w, height: 110, borderRadius: 10, shadowColor: 'black', elevation: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={images[image]} style={{ width: 60, height: 60 }} />
      <Text style={{ color: "black", fontWeight: 'bold', fontSize: 17, marginTop: 5 }}>{bottom}</Text>
    </View>
  )
}

export default HomeCard