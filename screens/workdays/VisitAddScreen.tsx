import * as React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { useIsFocused } from "@react-navigation/native";
import VisitRepository from "../../database/repositories/VisitRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function VisitAddScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const visitRepository = new VisitRepository(localDb.dbConnection);

  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [visitList, setVisitList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteVisitId, setDeleteVisitId] = React.useState(-1);
  const [client, setClient] = React.useState(null);
  const workday = route.params.workday;

  let isFocused = useIsFocused();

  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.cient.nickname}
        left={(props) => <List.Icon {...props} icon="basket" />}
      >
        {item.price ? <List.Item title={`Price: ${item.price}`} right={() => <View />} /> : null}
        <Image
          style={{
            marginTop: 20,
            width: 140,
            height: 140,
            alignSelf: "center",
          }}
          source={require("../../assets/icon.png")}
        />
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
                    id: item.id,
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
    );
  }

  function deleteVisit(id: number) {
    visitRepository.delete(id);
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
