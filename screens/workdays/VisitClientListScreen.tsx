import * as React from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";

export default function VisitClientListScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);

  const [clientList, setClientList] = React.useState([]);

  React.useEffect(() => {
    clientRepository.getAll().then((found) => {
      setClientList(found); //TODO maybe set list after sorting
    });
  }, []);

  function renderClientItem({ item }) {
    return (
      <List.Item
        title={`${item.nickname} Distance: TODO`}
        right={() => (
          <FAB
            small
            icon="plus"
            onPress={() => {
              navigation.navigate({
                name: "VisitAdd",
                params: { clientId: item.id },
                merge: true,
              });
            }}
          />
        )}
      />
    );
  }

  return (
    <FlatList
      renderItem={renderClientItem}
      data={clientList}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Divider}
    />
  );
}
