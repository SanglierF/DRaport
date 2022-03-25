import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkdayCalendarScreen from "./WorkdayCalendarScreen";
import WorkdayScreen from "./WorkdayScreen";
import VisitAddScreen from "./VisitAddScreen";
import VisitModifyScreen from "./VisitModifyScreen"
import VisitClientListScreen from "./VisitClientListScreen";
import OrderAddScreen from "./OrderAddScreen";
import OrderProductListScreen from "./OrderProductListScreen";

const Stack = createNativeStackNavigator();

export const ContextOrderProductList = React.createContext({
  orderedProducts: [],
  setOrderedProducts: null,
});

export const ContextVisitedClients = React.createContext({
  visitedClients: [],
  setVisitedClients: null,
});

export default function Workdays() {
  const [orderedProducts, setOrderedProducts] = React.useState([]);
  const [visitedClients, setVisitedClients] = React.useState([]);
  const orderedProductsProviderValue = { orderedProducts, setOrderedProducts };
  const visitedClientsProviderValue = { visitedClients, setVisitedClients };

  return (
    <ContextOrderProductList.Provider value={orderedProductsProviderValue}>
      <ContextVisitedClients.Provider value={visitedClientsProviderValue}>
        <Stack.Navigator
          initialRouteName="Calendar"
          screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
        >
          <Stack.Screen
            name="Calendar"
            component={WorkdayCalendarScreen}
            options={{ title: "Calendar" }}
          />
          <Stack.Screen name="Workday" component={WorkdayScreen} options={{ title: "Workday" }} />
          <Stack.Screen name="VisitAdd" component={VisitAddScreen} options={{ title: "Visit" }} />
            <Stack.Screen name="VisitModify" component={VisitModifyScreen} options={{ title: "Visit" }} />
          <Stack.Screen
            name="VisitClient"
            component={VisitClientListScreen}
            options={{ title: "Client List" }}
          />
          <Stack.Screen name="AddOrder" component={OrderAddScreen} options={{ title: "Orders" }} />
          <Stack.Screen
            name="OrderProductList"
            component={OrderProductListScreen}
            options={{ title: "Products" }}
          />
        </Stack.Navigator>
      </ContextVisitedClients.Provider>
    </ContextOrderProductList.Provider>
  );
}
