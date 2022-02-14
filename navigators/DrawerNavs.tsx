import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProductNavs from "./ProductNavs";

const Drawer = createDrawerNavigator();

let defaultProductNavTitle = "Product list"

export function useProductNavTitle() {
  let [productNavTitle, setProductNavTitle] = React.useState(defaultProductNavTitle);
  return { productNavTitle, setProductNavTitle };
}

function DrawerNavs({navigation, route}: any) {

  const navTitle = useProductNavTitle().productNavTitle;

  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Main screen'}} />
      <Drawer.Screen name="Products" component={ProductNavs} options={{drawerLabel: "Products", headerTitle: navTitle,  unmountOnBlur: true}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavs;
