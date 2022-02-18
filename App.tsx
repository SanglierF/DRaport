import "reflect-metadata"; //for typeorm
import 'react-native-gesture-handler';
import * as React from 'react';
import { createConnection, getRepository } from 'typeorm/browser';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import Products from "./screens/products/Products";

//entities
import { Product } from './database/sqlite/models/Product';

const Drawer = createDrawerNavigator();

async function alertAdd() {

  const dbConnection = await createConnection({
      database: "test",
      driver: require('expo-sqlite'),
      entities: [
         Product,
      ],
      synchronize: true,
     type: "expo",
   });


  const productxd = new Product();
  productxd.name = "hehexd"
  productxd.price = 12.54

  const productRepo = dbConnection.getRepository(Product)

  const message = await productRepo.save(productxd)

  console.log(message.name)

  console.log("tylko raz")

}

export default function App() {
  //TODO zmienić na klasę aby zadziałał orm???
  React.useEffect(() => {
    alertAdd();
  }, []
  )

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
