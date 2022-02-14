import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProductsListScreen({ navigation, route }: any) {
  
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ProductsListScreen: {route.params.text} </Text>
      <Button onPress={() => navigation.navigate('AddProduct', {productId: 2})} title="Add product" />
    </View>
  )
}
