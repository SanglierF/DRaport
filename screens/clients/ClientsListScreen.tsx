import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function ClientsListScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);

  const [clientList, setClientList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteClientId, setDeleteClientId] = React.useState(-1);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (clientRepository) {
      clientRepository.getAll().then((found) => {
        setClientList(found);
      });
    }
  }, [isFocused, changeCounter]);

  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.nickname}
        left={(props) => <List.Icon {...props} icon="basket" />}
      >
        {item.name ? <List.Item title={`Name: ${item.name}`} right={() => <View />} /> : null}
        {item.nip ? <List.Item title={`Nip: ${item.nip}`} right={() => <View />} /> : null}
        {item.regon ? <List.Item title={`regon: ${item.regon}`} right={() => <View />} /> : null}
        {item.voivodeship ? (
          <List.Item title={`voivodeship: ${item.voivodeship}`} right={() => <View />} />
        ) : null}
        {item.city ? <List.Item title={`city: ${item.city}`} right={() => <View />} /> : null}
        {item.zip_code ? (
          <List.Item title={`zip_code: ${item.zip_code}`} right={() => <View />} />
        ) : null}
        {item.street ? <List.Item title={`street: ${item.street}`} right={() => <View />} /> : null}
        {item.tel_number ? (
          <List.Item title={`tel_number: ${item.tel_number}`} right={() => <View />} />
        ) : null}
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
                  navigation.navigate("ModifyClient", {
                    clientId: item.id,
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteClientId(item.id);
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

  function deleteClient(clientId: number) {
    clientRepository.delete(clientId);
    setChangeCounter(changeCounter + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={clientList}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("AddClient")}
      />
      <ModalConfirmation
        deleteObjectFn={deleteClient}
        objectId={deleteClientId}
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
