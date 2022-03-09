import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "./WorkdaysCalendar";
import Workday from "./Workday";
const Stack = createNativeStackNavigator();

export default function Workdays({ navigation, route }: any) {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
    <Stack.Screen
      name="Calendar"
      component={WorkdaysCalendar}
      options={{ title: "Workday" }}
    />
      <Stack.Screen
        name="Workday"
        component={Workday}
        options={{ title: "Workday" }}
      />
    </Stack.Navigator>
  );
}
