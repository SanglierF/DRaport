import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import ModalConfirmation from "../../components/ModalConfirmation";
import OrderlistComponent from "./OrderlistComponent";

const localDb = LocalDatabase.getInstance();

export default function VisitAddScreen({ navigation, route }: any) {
  const [orderList, setOrderList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteOrderId, setDeleteOrderId] = React.useState(-1);
  const [visit, setVisit] = React.useState(null);
  const [client, setClient] = React.useState(null);
  const [workday, setWorkday] = React.useState(null);
  const [addVisitDisabled, setAddVisitDisabled] = React.useState(true);
  const [changeCounter, setChangeCounter] = React.useState(0);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    async function fetchWorkday() {
      try {
        const found = await localDb.workdayRepository.findById(route.params.workdayId);
        setWorkday(found);
      } catch (e) {
        console.log(e);
      }
    }
    fetchWorkday();
  }, [route.params.workdayId]);

  React.useEffect(() => {
    if (client === null) {
      navigation.navigate("VisitClient", { previousScreenName: route.name });
      return;
    }
  }, [client, navigation, route.name]);

  React.useEffect(() => {
    async function fetchClient() {
      try {
        const found = await localDb.clientRepository.findById(route.params.clientId);
        setClient(found);
      } catch (e) {
        console.log(e);
      }
    }
    if (route.params?.clientId) {
      fetchClient();
    }
  }, [route.params?.clientId]);

  React.useEffect(() => {
    async function createVisit() {
      try {
        const newVisit = localDb.visitRepository.create(workday, client);
        await localDb.visitRepository.save(newVisit);
        //TODO if multiple clients are allowed in a single workday it has to be changed to functionality returning id
        const found = await localDb.visitRepository.findVisitByWorkdayClient(workday, client);
        setVisit(found);
        setAddVisitDisabled(false);
      } catch (e) {
        console.log(e);
      }
    }
    async function updateClient() {
      try {
        visit.client = client;
        localDb.visitRepository.save(visit);
      } catch (e) {
        console.log(e);
      }
    }
    if (!client || !workday) return;
    if (!visit) {
      createVisit();
    } else if (visit.client.id !== client.id) {
      updateClient();
    }
  }, [client, visit, workday]);

  React.useEffect(() => {
    async function fetchOrderList() {
      try {
        const orders = await localDb.orderRepository.getAllInVisit(visit);
        setOrderList(orders);
      } catch (e) {
        console.log(e);
      }
    }
    if (!visit) return;
    fetchOrderList();
  }, [visit, isFocused, changeCounter]);

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
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10,
  },
});
