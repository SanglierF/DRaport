import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientsListScreen from "./ClientsListScreen";
import ClientAddScreen from "./ClientAddScreen";
import ClientModifyScreen from "./ClientModifyScreen";
const Stack = createNativeStackNavigator();

export default function Clients({ navigation, route }: any) {
  return (
    <Stack.Navigator
      initialRouteName="ClientList"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="ClientList"
        component={ClientsListScreen}
        initialParams={{ text: "test" }}
        options={{ title: "Client list" }}
      />
      <Stack.Screen
        name="AddClient"
        component={ClientAddScreen}
        options={{ title: "Add product" }}
      />
      <Stack.Screen
        name="ModifyClient"
        component={ClientModifyScreen}
        options={{ title: "Modify product" }}
      />
    </Stack.Navigator>
  );
}
