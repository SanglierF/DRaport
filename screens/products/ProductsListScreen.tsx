import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DbContext from '../../DbContext'
import ProductRepository from '../../database/repositories/ProductRepository';

export default function ProductsListScreen({ navigation, route }: any) {

  const context = React.useContext(DbContext);
  let productsList = [];
  let productRepository = null;

  React.useEffect(() => {
    productRepository = new ProductRepository(context.dbConnection);
    console.log("first init")
  },[productsList]) //

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ProductsListScreen: {route.params.text} </Text>
      <Button onPress={() => navigation.navigate('AddProduct', {productId: 2})} title="Add product" />
    </View>
  )
}
