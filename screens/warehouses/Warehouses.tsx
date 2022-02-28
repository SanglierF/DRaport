import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WarehousesListScreen from "./WarehousesListScreen";
import WarehouseAddScreen from "./WarehouseAddScreen";
import WarehouseModifyScreen from "./WarehouseModifyScreen";
const Stack = createNativeStackNavigator();

export default function Warehouses({ navigation, route }: any) {
  return (
    <Stack.Navigator
      initialRouteName="WarehouseList"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="WarehouseList"
        component={WarehousesListScreen}
        initialParams={{ text: "test" }}
        options={{ title: "Warehouse list" }}
      />
      <Stack.Screen
        name="AddWarehouse"
        component={WarehouseAddScreen}
        options={{ title: "Add warehouse" }}
      />
      <Stack.Screen
        name="ModifyWarehouse"
        component={WarehouseModifyScreen}
        options={{ title: "Modify warehouse" }}
      />
    </Stack.Navigator>
  );
}
