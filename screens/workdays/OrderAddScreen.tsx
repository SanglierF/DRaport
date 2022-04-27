import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { OrderedProduct } from "../../database/entities/OrderedProduct";
import { Visit } from "../../database/entities/Visit";
import { Order } from "../../database/entities/Order";
import { Warehouse } from "../../database/entities/Warehouse";
import { ContextOrderProductList } from "./Workdays";
import OrderComponent from "./OrderComponent";

const localDb = LocalDatabase.getInstance();

export default function OrderAddScreen({ navigation, route }) {
  const [visit, setVisit] = React.useState<Visit>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [warehouseList, setWarehouseList] = React.useState<Warehouse[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [warehouseId, setWarehouseId] = React.useState(-1);
  const [order, setOrder] = React.useState<Order>(null);
  const [orderedProducts, setOrderedProducts] = React.useState<OrderedProduct[]>([]);

  const contextOrderProductList = React.useRef(React.useContext(ContextOrderProductList));

  React.useEffect(() => {
    async function fetchVisit() {
      try {
        const visit = await localDb.visitRepository.findById(route.params.visitId);
        setVisit(visit);
      } catch (e) {
        console.log(e);
      }
    }
    fetchVisit();
  }, [route.params.visitId]);

  React.useEffect(() => {
    async function fetchWarehouses() {
      try {
        const warehouses = await localDb.warehouseRepository.getAll();
        const noWarehouse = localDb.warehouseRepository.create({ nickname: "Default" });
        noWarehouse.id = -1;
        const warehousesList = [noWarehouse].concat(warehouses);
        setWarehouseList(warehousesList);
      } catch (e) {
        console.log(e);
      }
    }
    fetchWarehouses();
  }, []);

  React.useEffect(() => {
    if (visit !== null) {
      setOrder(localDb.orderRepository.create(visit));
    }
  }, [visit]);

  React.useEffect(() => {
    async function createProduct() {
      try {
        const product = await localDb.productRepository.findById(route.params.productId);
        const orderedProduct = localDb.orderedProductRepository.create(order, product, 1);
        setOrderedProducts((orderedProducts) => orderedProducts.concat(orderedProduct));
      } catch (e) {
        console.log(e);
      }
    }
    if (route.params?.productId) {
      createProduct();
      navigation.setParams({ productId: undefined });
    }
  }, [navigation, order, route.params?.productId]);

  React.useEffect(() => {
    const selectedProducts = orderedProducts.map((orderedProduct) => orderedProduct.product.id);
    contextOrderProductList.current.setOrderedProducts(selectedProducts);
  }, [orderedProducts]);

  function deleteOrderedProduct(productId) {
    setOrderedProducts(
      orderedProducts.filter((orderedProduct) => {
        return !(orderedProduct.product.id === productId);
      })
    );
  }

  function saveOrder() {
    (async () => {
      try {
        const savedOrder = await localDb.orderRepository.save(order);
        orderedProducts.forEach((orderedProduct) => (orderedProduct.order = savedOrder));
        await localDb.orderedProductRepository.saveAll(orderedProducts);
      } catch (e) {
        console.log(e);
      }
    })();
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
      <Button onPress={saveOrder} disabled={!(orderedProducts.length > 0)}>
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
