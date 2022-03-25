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
  const [workdayCreated, setWorkdayCreated] = React.useState(false);
  const [disableWorkdayButton, setDisableWorkdayButton] = React.useState(false);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    if (workdayRepository) {
      workdayRepository.findByDate(date).then((found) => {
        if (found) {
          setWorkdayId(found.id);
          setIsWorking("Continue day");
        } else {
          setWorkdayId(-1);
          setIsWorking("Start new day 2");
        }
      });
    }
    setDisableWorkdayButton(false);
  }, [isFocused]);

  React.useEffect(() => {
    if (workdayCreated) {
      navigation.navigate("Workdays", {
        screen: "Workday",
        params: { workdayId: workdayId },
      });
    }
  }, [workdayCreated]);

  function saveNewWorkday() {
    const workday = workdayRepository.create(new Date().toISOString());
    workdayRepository.save(workday).then((saved) => {
      setWorkdayId(saved.id);
      setWorkdayCreated(true);
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to ClientList" onPress={() => navigation.navigate("Clients")} />
      <Button title="Go to ProductList" onPress={() => navigation.navigate("Products")} />
      <Button title="Go to WarehouseList" onPress={() => navigation.navigate("Warehouses")} />
      <Button title="Go to Calendar" onPress={() => navigation.navigate("Workdays")} />
      <Button
        title={isWorking}
        disabled={disableWorkdayButton}
        onPress={() => {
          setDisableWorkdayButton(true);
          if (workdayId > -1) {
            navigation.navigate("Workdays", {
              screen: "Workday",
              params: { workdayId: workdayId },
            });
          } else {
            saveNewWorkday();
          }
        }}
      />
    </View>
  );
}
