import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkdayCalendarScreen from "./WorkdayCalendarScreen";
import WorkdayScreen from "./WorkdayScreen";
import VisitAddScreen from "./VisitAddScreen";
import VisitClientListScreen from "./VisitClientListScreen";
import OrderAddScreen from "./OrderAddScreen";
import OrderProductListScreen from "./OrderProductListScreen";

const Stack = createNativeStackNavigator();
export const ContextOrderProductList = React.createContext({ productList: [] });

export default function Workdays() {
  return (
    <ContextOrderProductList.Provider value={{ productList: [] }}>
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
    </ContextOrderProductList.Provider>
  );
}
