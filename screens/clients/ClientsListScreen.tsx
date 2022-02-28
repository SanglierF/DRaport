import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image
} from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function ClientsListScreen({ navigation, route }: any) {
  const [clientList, setClientList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteClientId, setDeleteClientId] = React.useState(-1);

  const context = React.useContext(DbContext);
  const clientRepository = new ClientRepository(context.dbConnection);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (clientRepository) {
      clientRepository.getAll().then(found => {
        setClientList(found);
      });
    }
  }, [isFocused, changeCounter]);

  // TODO in List.Accordion change icon to minature image if i can
  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.nickname}
        left={props => <List.Icon {...props} icon="basket" />}
      >
        <List.Item title={"Nickname: "+item.name} right={() => <View />} />
        <List.Item title={"Nip: "+item.nip} right={() => <View />} />
        <List.Item title={"voivodeship: "+item.voivodeship} right={() => <View />} />

        <List.Item
          title={() => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Button
                icon="account-edit"
                mode="text"
                onPress={() => {
                  navigation.navigate("ModifyClient", {
                    clientId: item.clientId
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteClientId(item.clientId);
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

  const deleteObject = () => {
    deleteClient(deleteClientId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={clientList}
        keyExtractor={item => item.clientId}
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
    textAlign: "center"
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10
  },
});
