import * as React from "react";
import { FlatList } from "react-native";
import { List, FAB, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { ContextVisitedClients } from "./Workdays";

const localDb = LocalDatabase.getInstance();

export default function VisitClientListScreen({ navigation, route }: any) {
  const [clientList, setClientList] = React.useState([]);

  const contextVisitedClients = React.useRef(React.useContext(ContextVisitedClients));

  React.useEffect(() => {
    localDb.clientRepository
      .getAll()
      .then((found) => {
        const filteredList = found.filter((client) => {
          return !contextVisitedClients.current.visitedClients.includes(client.id);
        });
        setClientList(filteredList);
        return true;
      })
      .catch((error) => console.log(error));
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
                name: route.params.previousScreenName,
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
