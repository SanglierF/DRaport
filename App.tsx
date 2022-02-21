import "reflect-metadata"; //for typeorm
import "react-native-gesture-handler";
import * as React from "react";
import { createConnection, Connection } from "typeorm";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import Products from "./screens/products/Products";

//entities
import { Product } from "./database/sqlite/entities/Product";

const Drawer = createDrawerNavigator();

function conn() {
  return createConnection({
    name: "default",
    database: "test",
    driver: require('expo-sqlite'),
    entities: [Product],
    synchronize: true,
    type: "expo"
  });
}

async function alertAdd() {
  const con = await conn();
  const productRepo = con.getRepository(Product);

  const productxd = new Product();
  productxd.name = "hehexd";
  productxd.price = 12.54;

  const message = await productRepo.save(productxd);
  console.log(message.name);

  console.log("tylko raz");
}

export default function App() {
  React.useEffect(() => {
    alertAdd();
  }, []); //Runs only once

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Main screen" }}
        />
        <Drawer.Screen
          name="Products"
          component={Products}
          options={{
            title: "Products",
            headerShown: false,
            unmountOnBlur: true
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
