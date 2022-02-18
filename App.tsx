import 'react-native-gesture-handler';
import * as React from 'react';
import "reflect-metadata"; //for typeorm
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import Products from "./screens/products/Products";

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerTitleAlign: 'center'}}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Main screen'}} />
        <Drawer.Screen name="Products" component={Products} options={{title: "Products", headerShown: false,  unmountOnBlur: true}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
