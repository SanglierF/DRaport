import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useProductNavTitle } from '../navigators/DrawerNavs'

export default function ProductsListScreen({ navigation, route }: any) {

  const { setNewProductNavTitle } = useProductNavTitle();

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ProductsListScreen: {route.params.text} </Text>
      <Button onPress={() => navigation.navigate('AddProduct', {productId: 2})} title="Add product" />
      <Button onPress={() => setNewProductNavTitle("NEW TITLE")} title="Change title" />
    </View>
  )
}
