import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import ModalConfirmation from "../../components/ModalConfirmation";
import { ContextVisitedClients } from "./Workdays";

const localDb = LocalDatabase.getInstance();

export default function WorkdayScreen({ navigation, route }: any) {
  const [workday, setWorkday] = React.useState(null);
  const [visitList, setVisitList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteVisitId, setDeleteVisitId] = React.useState(-1);

  const contextVisitedClients = React.useRef(React.useContext(ContextVisitedClients));

  let isFocused = useIsFocused();

  React.useEffect(() => {
    localDb.workdayRepository
      .findById(route.params.workdayId)
      .then((found) => {
        setWorkday(found);
        return true;
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (workday) {
      localDb.visitRepository
        .getAllInDay(workday)
        .then((found) => {
          setVisitList(found);
          return true;
        })
        .catch((error) => console.log(error));
    }
  }, [isFocused, changeCounter, workday]);

  React.useEffect(() => {
    const visitedClients = visitList.map((visit) => visit.client.id);
    contextVisitedClients.current.setVisitedClients(visitedClients);
  }, [visitList]);

  function renderItem({ item }) {
    return (
      <View>
        <List.Accordion
          title={item.client.nickname}
          left={(props) => <List.Icon {...props} icon="view-list" />}
        >
          <List.Item
            title={() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  icon="account-edit"
                  mode="text"
                  onPress={() => {
                    navigation.navigate("VisitModify", {
                      visitId: item.id,
                      workdayId: workday.id,
                    });
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  icon="delete"
                  mode="text"
                  onPress={() => {
                    setDeleteVisitId(item.id);
                    setModalVisible(true);
                  }}
                >
                  Usuń
                </Button>
              </View>
            )}
            right={() => <View />}
          />
        </List.Accordion>
      </View>
    );
  }

  function deleteVisit(visitId: number) {
    localDb.visitRepository.delete(visitId);
    setChangeCounter(changeCounter + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={visitList}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("VisitAdd", { workdayId: workday.id })}
      />
      <ModalConfirmation
        deleteObjectFn={deleteVisit}
        objectId={deleteVisitId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const localStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10,
  },
});
