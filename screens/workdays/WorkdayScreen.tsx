import * as React from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import WorkdayRepository from "../../database/repositories/WorkdayRepository";
import VisitRepository from "../../database/repositories/VisitRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function WorkdayScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const workdayRepository = new WorkdayRepository(localDb.dbConnection);
  const visitRepository = new VisitRepository(localDb.dbConnection);

  const [visitList, setVisitList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteVisitId, setDeleteVisitId] = React.useState(-1);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (visitRepository) {
      visitRepository.getAllInDay(route.params.workdayId).then((found) => {
        setVisitList(found);
      });
    }
  }, [isFocused, changeCounter]);

  function renderItem({ item }) {
    return (
      <View>
        <List.Accordion
          title={item.client.nickname}
          left={(props) => <List.Icon {...props} icon="basket" />}
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
                    navigation.navigate("ModifyVisit", {
                      visitId: item.visitId,
                    });
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  icon="delete"
                  mode="text"
                  onPress={() => {
                    setDeleteVisitId(item.visitId);
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
    visitRepository.delete(visitId);
    setChangeCounter(changeCounter + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={visitList}
        keyExtractor={(item) => item.visitId}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("AddVisit")}
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
  list: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10,
  },
});
