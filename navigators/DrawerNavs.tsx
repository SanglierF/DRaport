import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProductNavs from "./ProductNavs";

const Drawer = createDrawerNavigator();

let defaultProductNavTitle = "Product list"

export function useProductNavTitle() {

  const [productNavTitle, setNewProductNavTitle] = React.useState(defaultProductNavTitle);
  return { productNavTitle, setNewProductNavTitle };
}

function DrawerNavs({navigation, route}: any) {

  let xd = defaultProductNavTitle

  const productNavTitle = useProductNavTitle();

  React.useEffect(
    () => {
      xd = productNavTitle.productNavTitle
      console.log(xd)
    }, [xd, productNavTitle]
  );

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Main screen'}} />
      <Drawer.Screen name="Products" component={ProductNavs} options={{title: "Products", headerTitle: productNavTitle.productNavTitle,  unmountOnBlur: true}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavs;
