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
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function WarehousesListScreen({ navigation, route }: any) {
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = React.useState(-1);

  const context = React.useContext(DbContext);
  const warehouseRepository = new WarehouseRepository(context.dbConnection);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (warehouseRepository) {
      warehouseRepository.getAll().then(found => {
        setWarehouseList(found);
      });
    }
  }, [isFocused, changeCounter]);

  // TODO in List.Accordion change icon to minature image if i can
  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.name}
        left={props => <List.Icon {...props} icon="basket" />}
      >
        <List.Item title={"Price: "+item.price} right={() => <View />} />
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
                  navigation.navigate("ModifyWarehouse", {
                    warehouseId: item.warehouseId
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteWarehouseId(item.warehouseId);
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

  const deleteObject = () => {
    deleteWarehouse(deleteWarehouseId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={warehouseList}
        keyExtractor={item => item.warehouseId}
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
    textAlign: "center"
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10
  },
});
