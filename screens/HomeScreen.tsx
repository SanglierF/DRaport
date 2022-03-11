import * as React from "react";
import { Text, View, Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../database/LocalDatabase";
import WorkdayRepository from "../database/repositories/WorkdayRepository";

export default function HomeScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const workdayRepository = new WorkdayRepository(localDb.dbConnection);

  const [workdayId, setWorkdayId] = React.useState(-1); // If workdayId = -1 dont use it
  const [isWorking, setIsWorking] = React.useState("Start new day");

  let isFocused = useIsFocused();

  React.useEffect(() => {
    const date = new Date().toISOString().slice(0, 7);

    if (workdayRepository) {
      workdayRepository.findByDate(date).then((found) => {
        if(found){
          setWorkdayId(found.workdayId);
          setIsWorking("Continue day");
        }
      });
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to ClientList" onPress={() => navigation.navigate("Clients")} />
      <Button title="Go to ProductList" onPress={() => navigation.navigate("Products")} />
      <Button title="Go to WarehouseList" onPress={() => navigation.navigate("Warehouses")} />
      <Button title="Go to Calendar" onPress={() => navigation.navigate("Workdays")} />
      <Button
        title={isWorking}
        onPress={() => {
          if (workdayId > -1) {
            navigation.navigate("Workdays", {
              screen: "Workday",
              params: { workdayId: workdayId },
            });
          } else {
            const workday = workdayRepository.create(new Date().toISOString());
            workdayRepository.save(workday).then((saved) => {
              navigation.navigate("Workdays", {
                screen: "Workday",
                params: { workdayId: saved.workdayId },
              });
            });
          }
        }}
      />
    </View>
  );
}
