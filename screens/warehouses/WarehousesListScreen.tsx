import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function WarehousesListScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [warehouseList, setWarehouseList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = React.useState(-1);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (warehouseRepository) {
      warehouseRepository.getAll().then((found) => {
        setWarehouseList(found);
      });
    }
  }, [isFocused, changeCounter]);

  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.nickname}
        left={(props) => <List.Icon {...props} icon="basket" />}
      >
        <List.Item title={`Full name ${item.name}`} right={() => <View />} />
        {item.nip ? <List.Item title={`Nip: ${item.nip}`} right={() => <View />} /> : null}

        {item.regon ? <List.Item title={`regon: ${item.regon}`} right={() => <View />} /> : null}
        {item.tel_number ? (
          <List.Item title={`tel_number: ${item.tel_number}`} right={() => <View />} />
        ) : null}
        {item.email ? <List.Item title={`email: ${item.email}`} right={() => <View />} /> : null}
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
                  navigation.navigate("ModifyWarehouse", {
                    warehouseId: item.id,
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteWarehouseId(item.id);
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

  function deleteWarehouse(warehouseId: number) {
    warehouseRepository.delete(warehouseId);
    setChangeCounter(changeCounter + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={warehouseList}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("AddWarehouse")}
      />
      <ModalConfirmation
        deleteObjectFn={deleteWarehouse}
        objectId={deleteWarehouseId}
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
