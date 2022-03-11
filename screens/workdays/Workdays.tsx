import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkdayCalendarScreen from "./WorkdayCalendarScreen";
import WorkdayScreen from "./WorkdayScreen";
const Stack = createNativeStackNavigator();

export default function Workdays() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Calendar" component={WorkdayCalendarScreen} options={{ title: "Calendar" }} />
      <Stack.Screen name="Workday" component={WorkdayScreen} options={{ title: "Workday" }} />
    </Stack.Navigator>
  );
}
