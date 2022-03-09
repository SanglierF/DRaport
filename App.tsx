import "reflect-metadata"; //for typeorm
import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeScreen from "./screens/HomeScreen";
import Clients from "./screens/clients/Clients";
import Products from "./screens/products/Products";
import Warehouses from "./screens/warehouses/Warehouses";
import Workdays from "./screens/workdays/Workdays";
import DbContext from "./DbContext";
import LocalDatabase from "./database/LocalDatabase";
import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const Drawer = createDrawerNavigator();

export default function App() {
  const queryClient = new QueryClient();

  const localDatabase = new LocalDatabase();

  return (
    <DbContext.Provider value={localDatabase}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Main screen" }} />
            <Drawer.Screen
              name="Clients"
              component={Clients}
              options={{
                title: "Clients",
                headerShown: false,
                unmountOnBlur: true
              }}
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
            <Drawer.Screen
              name="Warehouses"
              component={Warehouses}
              options={{
                title: "Warehouses",
                headerShown: false,
                unmountOnBlur: true
              }}
            />
            <Drawer.Screen
              name="Workdays"
              component={Workdays}
              options={{
                title: "Workdays",
                headerShown: false,
                unmountOnBlur: true
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </DbContext.Provider>
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
