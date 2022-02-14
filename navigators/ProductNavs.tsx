import 'react-native-gesture-handler';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsListScreen from '../screens/ProductsListScreen'
import ProductAddScreen from '../screens/ProductAddScreen'

const Stack = createNativeStackNavigator();

export default function ProductNavs({navigation, route}: any){

  const headerSet = (newHeaderTitle: string) => {
    return
  }

  return (
    <Stack.Navigator initialRouteName="ProductList" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductsListScreen} initialParams={{ text: "test"}} options={{title: "Product list"}}/>
      <Stack.Screen name="AddProduct" component={ProductAddScreen} options={{title: "Add product"}}/>
    </Stack.Navigator>
  );
}
