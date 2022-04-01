import * as React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { List, Button, FAB, Divider, TextInput } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { useIsFocused } from "@react-navigation/native";
import OrderRepository from "../../database/repositories/OrderRepository";
import ClientRepository from "../../database/repositories/ClientRepository";
import WorkdayRepository from "../../database/repositories/WorkdayRepository";
import VisitRepository from "../../database/repositories/VisitRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import ModalConfirmation from "../../components/ModalConfirmation";
import { ContextVisitedClients } from "./Workdays";

export default function VisitAddScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const orderRepository = new OrderRepository(localDb.dbConnection);
  const clientRepository = new ClientRepository(localDb.dbConnection);
  const workdayRepository = new WorkdayRepository(localDb.dbConnection);
  const visitRepository = new VisitRepository(localDb.dbConnection);

  const [orderList, setOrderList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteOrderId, setDeleteOrderId] = React.useState(-1);
  const [visit, setVisit] = React.useState(null);
  const [client, setClient] = React.useState(null);
  const [workday, setWorkday] = React.useState(null);
  const [addVisitDisabled, setAddVisitDisabled] = React.useState(true);

  let isFocused = useIsFocused();

  const contextVisitedClients = React.useContext(ContextVisitedClients);

  React.useEffect(() => {
    workdayRepository.findById(route.params.workdayId).then((found) => {
      setWorkday(found);
      if (!client) {
        navigation.navigate("VisitClient", { previousScreenName: route.name });
      }
    });
  }, []);

  React.useEffect(() => {
    if (visit) {
      orderRepository.getAllInVisit(visit).then((found) => {
        setOrderList(found);
      });
    }
  }, [isFocused, changeCounter, visit]);

  React.useEffect(() => {
    if (route.params?.clientId) {
      clientRepository.findById(route.params.clientId).then((found) => {
        setClient(found);
      });
    }
  }, [route.params?.clientId]);

  React.useEffect(() => {
    if (client === null) {
      return;
    }
    if (!visit) {
      const newVisit = visitRepository.create(workday, client);
      visitRepository.save(newVisit).then(() => {
        //TODO if multiple clients are allowed in a single workday it has to be changed to functionality returning id
        visitRepository.findVisitByWorkdayClient(workday, client).then((found) => {
          setVisit(found);
          setAddVisitDisabled(false);
        });
      });
    } else {
      visit.client = client;
      visitRepository.save(visit);
    }
  }, [client]);

  React.useEffect(() => {}, [visit]);

  function renderOrderItem({ item }) {
    return (
      <View>
        <List.Accordion title={item.id} left={(props) => <List.Icon {...props} icon="basket" />}>
          <FlatList
            extraData={isFocused}
            renderItem={renderOrderedProductItem}
            data={item.orderedProducts}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
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
                    navigation.navigate("ModifyOrder", {
                      orderId: item.id,
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

  function renderOrderedProductItem({ item }) {
    return (
      <List.Item
        title={`Product: ${item.product.name} Price: ${item.product.price} Number: ${item.quantity}`}
        right={() => <View />}
      />
    );
  }

  function deleteOrder(id: number) {
    orderRepository.delete(id);
    setChangeCounter(changeCounter + 1);
  }

  function selectClient() {
    navigation.navigate("VisitClient", { previousScreenName: route.name });
  }

  function goAddOrder() {
    navigation.navigate("AddOrder", { visitId: visit.id });
  }

  function Orders() {
    return (
      <View>
        <FlatList
          extraData={isFocused}
          renderItem={renderOrderItem}
          data={orderList}
          keyExtractor={(order) => order.id}
          ItemSeparatorComponent={Divider}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {client ? <Text>{client.nickname}</Text> : <Text>Wybierz klienta</Text>}
      <Button onPress={selectClient} mode="contained" style={{ width: 200, alignSelf: "flex-end" }}>
        Wybierz
      </Button>
      {client ? <Orders /> : <Text>Select client</Text>}
      {client ? (
        <FAB
          style={localStyle.fab}
          small
          icon="plus"
          disabled={addVisitDisabled}
          onPress={goAddOrder}
        />
      ) : null}
      <ModalConfirmation
        deleteObjectFn={deleteOrder}
        objectId={deleteOrderId}
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
