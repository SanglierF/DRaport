import * as React from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { useIsFocused } from "@react-navigation/native";
import OrderRepository from "../../database/repositories/OrderRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function VisitAddScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const orderRepository = new OrderRepository(localDb.dbConnection);

  const [orderList, setOrderList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteOrderId, setDeleteOrderId] = React.useState(-1);
  const [client, setClient] = React.useState(null);
  const workday = route.params.workday;

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (orderRepository) {
      orderRepository.getAll().then((found) => {
        setOrderList(found);
      });
    }
  }, [isFocused, changeCounter]);

  function renderItem({ item }) {
    return (
      <View>
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
                    setDeleteOrderId(item.id);
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

  function deleteVisit(id: number) {
    orderRepository.delete(id);
    setChangeCounter(changeCounter + 1);
  }

  function Orders() {
    return (
      <View>
        <FlatList
          extraData={isFocused}
          renderItem={renderItem}
          data={orderList}
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
          objectId={deleteOrderId}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      // TODO header with client
      {client ? <Orders /> : <Text>Select client</Text>}
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
