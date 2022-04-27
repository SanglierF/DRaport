import * as React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { Surface } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../database/LocalDatabase";
import WorkdayRepository from "../database/repositories/WorkdayRepository";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const workdayRepository = new WorkdayRepository(localDb.dbConnection);

  const [workdayId, setWorkdayId] = React.useState(-1); // If workdayId = -1 dont use it
  const [isWorking, setIsWorking] = React.useState(false);
  const [workdayCreated, setWorkdayCreated] = React.useState(false);
  const [disableWorkdayButton, setDisableWorkdayButton] = React.useState(false);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    if (workdayRepository) {
      workdayRepository.findByDate(date).then((found) => {
        if (found) {
          setWorkdayId(found.id);
          setIsWorking(true);
        } else {
          setWorkdayId(-1);
          setIsWorking(false);
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
      setIsWorking(true);
    });
  }

  return (
    <View style={localStyle.container}>
      <View style={localStyle.welcomeContainer}>
        <Text style={localStyle.welcomeText}>
          Welcome! {"\n"}
          {"\n"}
          Today is:
          {"\n"}
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      <View style={localStyle.smallTilesContainer}>
        <TouchableOpacity
          style={localStyle.pressable}
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
        >
          <Surface style={localStyle.surfaceSingle}>
            <Text style={localStyle.bigTileText}>{isWorking ? "Add visit" : "Start new day!"}</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyle.pressable}
          onPress={() => navigation.navigate("Workdays")}
        >
          <Surface style={localStyle.surface}>
            <Image
              style={localStyle.image}
              source={require("../assets/calendar.png")}
              accessibilityIgnoresInvertColors={true}
            />
            <Text style={localStyle.smallTileText}>Calendar</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyle.pressable}
          onPress={() => navigation.navigate("Clients")}
        >
          <Surface style={localStyle.surface}>
            <Image
              style={localStyle.image}
              source={require("../assets/clients.png")}
              accessibilityIgnoresInvertColors={true}
            />
            <Text style={localStyle.smallTileText}>Clients</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyle.pressable}
          onPress={() => navigation.navigate("Products")}
        >
          <Surface style={localStyle.surface}>
            <Image
              style={localStyle.image}
              source={require("../assets/products.png")}
              accessibilityIgnoresInvertColors={true}
            />
            <Text style={localStyle.smallTileText}>Products</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyle.pressable}
          onPress={() => navigation.navigate("Warehouses")}
        >
          <Surface style={localStyle.surface}>
            <Image
              style={localStyle.image}
              source={require("../assets/warehouses.png")}
              accessibilityIgnoresInvertColors={true}
            />
            <Text style={localStyle.smallTileText}>Warehouses</Text>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  welcomeContainer: {
    width: "100%",
    height: "35%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
  },
  surfaceSingle: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  bigTileText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 22,
  },
  smallTilesContainer: {
    width: "100%",
    height: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: "10%",
  },
  pressable: {
    alignSelf: "center",
    width: "90%",
    height: "45%",
    padding: "2%",
  },
  surface: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  image: {
    alignSelf: "center",
    marginLeft: "25%",
  },
  smallTileText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 22,
    marginLeft: "5%",
  },
});
