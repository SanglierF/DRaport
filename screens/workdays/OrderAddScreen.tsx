import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import VisitRepository from "../../database/repositories/VisitRepository";
import OrderRepository from "../../database/repositories/OrderRepository";
import OrderedProductRepository from "../../database/repositories/OrderedProductRepository";
import ProductRepository from "../../database/repositories/ProductRepository";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import { OrderedProduct } from "../../database/entities/OrderedProduct";
import { Visit } from "../../database/entities/Visit";
import { Order } from "../../database/entities/Order";
import { Warehouse } from "../../database/entities/Warehouse";
import { ContextOrderProductList } from "./Workdays";
import OrderComponent from "./OrderComponent";

export default function OrderAddScreen({ navigation, route }) {
  const dbConnection = React.useRef(LocalDatabase.getInstance().dbConnection);

  const visitRepository = React.useRef(new VisitRepository(dbConnection.current));
  const warehouseRepository = React.useRef(new WarehouseRepository(dbConnection.current));
  const orderRepository = React.useRef(new OrderRepository(dbConnection.current));
  const orderedProductRepository = React.useRef(new OrderedProductRepository(dbConnection.current));
  const productRepository = React.useRef(new ProductRepository(dbConnection.current));

  const [visit, setVisit] = React.useState<Visit>(null);
  const [warehouseList, setWarehouseList] = React.useState<Warehouse[]>([]);
  const [warehouseId, setWarehouseId] = React.useState(-1);
  const [order, setOrder] = React.useState<Order>(null);
  const [orderedProducts, setOrderedProducts] = React.useState<OrderedProduct[]>([]);

  const contextOrderProductList = React.useRef(React.useContext(ContextOrderProductList));

  React.useEffect(() => {
    async function fetchVisit() {
      try {
        const visit = await visitRepository.current.findById(route.params.visitId);
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
        const warehouses = await warehouseRepository.current.getAll();
        const noWarehouse = warehouseRepository.current.create({ nickname: "Default" });
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
      setOrder(orderRepository.current.create(visit));
    }
  }, [visit]);

  React.useEffect(() => {
    async function createProduct() {
      try {
        const product = await productRepository.current.findById(route.params.productId);
        const orderedProduct = orderedProductRepository.current.create(order, product, 1);
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
        const savedOrder = await orderRepository.current.save(order);
        orderedProducts.forEach((orderedProduct) => (orderedProduct.order = savedOrder));
        await orderedProductRepository.current.saveAll(orderedProducts);
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
