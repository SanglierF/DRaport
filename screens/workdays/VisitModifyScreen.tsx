import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import ModalConfirmation from "../../components/ModalConfirmation";
import { ContextVisitedClients } from "./Workdays";
import OrderlistComponent from "./OrderlistComponent";

const localDb = LocalDatabase.getInstance();

export default function VisitModifyScreen({ navigation, route }: any) {
  const [orderList, setOrderList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteOrderId, setDeleteOrderId] = React.useState(-1);
  const [visit, setVisit] = React.useState(null);
  const [client, setClient] = React.useState(null);

  let isFocused = useIsFocused();

  const contextVisitedClients = React.useRef(React.useContext(ContextVisitedClients));

  React.useEffect(() => {
    async function fetchVisit() {
      try {
        const found = await localDb.visitRepository.findByIdWithClient(route.params.visitId);
        setVisit(found);
        setClient(found.client);
        const filteredClientList = contextVisitedClients.current.visitedClients.filter(
          (filteredClient) => {
            return filteredClient !== found.client.id;
          }
        );
        console.log(filteredClientList);
        contextVisitedClients.current.setVisitedClients(filteredClientList);
      } catch (e) {
        console.log(e);
      }
    }
    fetchVisit();
  }, [route.params.visitId]);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const list = await localDb.orderRepository.getAllInVisit(visit);
        setOrderList(list);
      } catch (e) {
        console.log(e);
      }
    }
    if (visit) {
      fetchOrders();
    }
  }, [isFocused, changeCounter, visit]);

  React.useEffect(() => {
    async function fetchClient() {
      const found = await localDb.clientRepository.findById(route.params.clientId);
      setClient(found);
    }
    if (route.params?.clientId) {
      fetchClient();
    }
  }, [route.params?.clientId]);

  React.useEffect(() => {
    if (!client) return;
    if (visit.client.id !== client.id) {
      visit.client = client;
      localDb.visitRepository.save(visit);
    }
  }, [client, visit]);

  function deleteOrder(id: number) {
    localDb.orderRepository.delete(id);
    setChangeCounter(changeCounter + 1);
  }

  function selectClient() {
    navigation.navigate("VisitClient", { previousScreenName: route.name });
  }

  function goAddOrder() {
    navigation.navigate("AddOrder", { visitId: visit.id });
  }

  function modifyOrder(id) {
    navigation.navigate("ModifyOrder", {
      orderId: id,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {client ? <Text>{client.nickname}</Text> : <Text>Wybierz klienta</Text>}
      <Button onPress={selectClient} mode="contained" style={{ width: 200, alignSelf: "flex-end" }}>
        Wybierz
      </Button>
      {client ? (
        <OrderlistComponent
          isFocused={isFocused}
          orderList={orderList}
          setDeleteOrderId={setDeleteOrderId}
          setModalVisible={setModalVisible}
          modifyOrder={modifyOrder}
        />
      ) : (
        <Text>Select client</Text>
      )}
      {client ? <FAB style={localStyle.fab} small icon="plus" onPress={goAddOrder} /> : null}
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
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10,
  },
});
