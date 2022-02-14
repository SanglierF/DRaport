import 'react-native-gesture-handler';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsListScreen from '../screens/ProductsListScreen'

const Stack = createNativeStackNavigator();

export default function DetailsNavs(){
  return (
    <Stack.Navigator initialRouteName="ProductList" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductsListScreen} initialParams={{ text: "test"}}/>
    </Stack.Navigator>
  );
}
