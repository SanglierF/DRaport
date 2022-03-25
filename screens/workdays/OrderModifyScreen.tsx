import * as React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Button, List, Divider, FAB, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import VisitRepository from "../../database/repositories/VisitRepository";
import OrderRepository from "../../database/repositories/OrderRepository";
import OrderedProductRepository from "../../database/repositories/OrderedProductRepository";
import ProductRepository from "../../database/repositories/ProductRepository";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import { ContextOrderProductList } from "./Workdays";

export default function OrderAddScreen({ navigation, route }) {
  const localDb = LocalDatabase.getInstance();
  const visitRepository = new VisitRepository(localDb.dbConnection);
  const orderRepository = new OrderRepository(localDb.dbConnection);
  const orderedProductRepository = new OrderedProductRepository(localDb.dbConnection);
  const productRepository = new ProductRepository(localDb.dbConnection);
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [visit, setVisit] = React.useState(null);
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [warehouseId, setWarehouseId] = React.useState(-1);
  const [order, setOrder] = React.useState(null);
  const [orderedProducts, setOrderedProducts] = React.useState([]);
  const [selectProductId, setSelectedProductId] = React.useState(-1);
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [saveDisabled, setSaveDisabled] = React.useState(true);

  const contextOrderProductList = React.useContext(ContextOrderProductList);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    orderRepository.findById(route.params.orderId).then((found) => {
      setOrder(found);
    });
    warehouseRepository.getAll().then((found) => {
      const noWarehouse = warehouseRepository.create({ nickname: "Default" });
      noWarehouse.id = -1;
      const warehouses = [noWarehouse].concat(found);
      setWarehouseList(warehouses);
    });
  }, []);

  React.useEffect(() => {
    orderedProductRepository.getAllInOrder(order).then((found) => {
      setOrderedProducts(found);
    });
  }, [order]);

  React.useEffect(() => {
    if (route.params?.productId) {
      productRepository.findById(route.params.productId).then((found) => {
        const orderedProduct = orderedProductRepository.create(order, found, 1);
        setOrderedProducts(orderedProducts.concat(orderedProduct));
        setChangeCounter(changeCounter + 1);
      });
      navigation.setParams({ productId: undefined });
    }
  }, [isFocused]);

  React.useEffect(() => {
    orderedProducts.length > 0 ? setSaveDisabled(false) : setSaveDisabled(true);
    const selectedProducts = orderedProducts.map((orderedProduct) => orderedProduct.product.id);
    contextOrderProductList.setOrderedProducts(selectedProducts);
  }, [changeCounter]);

  function renderProductItem({ item }) {
    return (
      <View style={{ justifyContent: "space-evenly" }}>
        <List.Item
          title={`${item.product.name}`}
          right={() => (
            <TextInput
              style={{ width: 120 }}
              label="Quantity"
              mode="outlined"
              defaultValue={item.quantity.toString()}
              onChangeText={(text) => {
                item.quantity = Number(text);
              }}
              autoComplete="off"
              keyboardType="decimal-pad"
            />
          )}
        />
        <FAB
          small
          icon="minus"
          onPress={() => {
            deleteOrderedProduct(item.product.id);
          }}
        />
      </View>
    );
  }

  function deleteOrderedProduct(productId) {
    setOrderedProducts(
      orderedProducts.filter((orderedProduct) => {
        return !(orderedProduct.product.id === productId);
      })
    );
    setChangeCounter(changeCounter + 1);
  }

  function saveOrder() {
    orderRepository.save(order).then((found) => {
      orderedProducts.forEach((orderedProduct) => (orderedProduct.order = found));
      orderedProductRepository.saveAll(orderedProducts);
    });
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        renderItem={renderProductItem}
        data={orderedProducts}
        keyExtractor={(item) => item.product.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => {
          navigation.navigate("OrderProductList");
        }}
      />
      <Button onPress={saveOrder} disabled={saveDisabled}>
        Zapisz zamówienie
      </Button>
    </View>
  );
}

const localStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
    margin: 10,
  },
});
