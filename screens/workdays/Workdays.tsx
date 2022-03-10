import "react-native-gesture-handler";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkdayCalendar from "./WorkdayCalendar";
import Workday from "./Workday";
const Stack = createNativeStackNavigator();

export default function Workdays() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Calendar" component={WorkdayCalendar} options={{ title: "Calendar" }} />
      <Stack.Screen name="Workday" component={Workday} options={{ title: "Workday" }} />
    </Stack.Navigator>
  );
}
