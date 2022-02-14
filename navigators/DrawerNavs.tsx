import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProductNavs from "./ProductNavs";

const Drawer = createDrawerNavigator();

function DrawerNavs() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Main sceen' }} />
      <Drawer.Screen name="ProductNavs" component={ProductNavs}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavs;
