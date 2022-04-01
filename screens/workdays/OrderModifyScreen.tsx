/* eslint-disable react-native/no-raw-text */
import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, List, Divider, FAB, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import OrderRepository from "../../database/repositories/OrderRepository";
import OrderedProductRepository from "../../database/repositories/OrderedProductRepository";
import ProductRepository from "../../database/repositories/ProductRepository";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import { ContextOrderProductList } from "./Workdays";
import OrderComponent from "./OrderComponent";

export default function OrderAddScreen({ navigation, route }) {
  const localDb = LocalDatabase.getInstance();
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
  const [saveDisabled, setSaveDisabled] = React.useState(false);

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
      const selectedProducts = found.map((orderedProduct) => orderedProduct.product.id);
      contextOrderProductList.setOrderedProducts(selectedProducts);
      setSaveDisabled(false);
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
    setChangeCounter((counter) => counter++);
  }

  function saveOrder() {
    orderRepository
      .save(order)
      .then((order) => {
        orderedProducts.forEach((orderedProduct) => (orderedProduct.order = order));
        orderedProductRepository.saveAll(orderedProducts);
        return order;
      })
      .catch((e) => {
        console.log(e);
      });
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>
      <OrderComponent
        orderedProducts={orderedProducts}
        deleteOrderedProduct={deleteOrderedProduct}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => {
          navigation.navigate("OrderProductList", { previousScreenName: route.name });
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
