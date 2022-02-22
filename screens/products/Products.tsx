import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsListScreen from "./ProductsListScreen";
import ProductAddScreen from "./ProductAddScreen";
import ProductModifyScreen from "./ProductModifyScreen";
const Stack = createNativeStackNavigator();

export default function Products({ navigation, route }: any) {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductsListScreen}
        initialParams={{ text: "test" }}
        options={{ title: "Product list" }}
      />
      <Stack.Screen
        name="AddProduct"
        component={ProductAddScreen}
        options={{ title: "Add product" }}
      />
      <Stack.Screen
        name="ModifyProduct"
        component={ProductModifyScreen}
        options={{ title: "Modify product" }}
      />
    </Stack.Navigator>
  );
}
