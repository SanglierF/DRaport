import * as React from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to ClientList" onPress={() => navigation.navigate("Clients")} />
      <Button title="Go to ProductList" onPress={() => navigation.navigate("Products")} />
      <Button title="Go to WarehouseList" onPress={() => navigation.navigate("Warehouses")} />
      <Button title="Go to Calendar" onPress={() => navigation.navigate("Calendar")} />
    </View>
  );
}
