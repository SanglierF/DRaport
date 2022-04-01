import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import VisitRepository from "../../database/repositories/VisitRepository";
import OrderRepository from "../../database/repositories/OrderRepository";
import OrderedProductRepository from "../../database/repositories/OrderedProductRepository";
import ProductRepository from "../../database/repositories/ProductRepository";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import { OrderedProduct } from "../../database/entities/OrderedProduct";
import { ContextOrderProductList } from "./Workdays";
import OrderComponent from "./OrderComponent";

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
  const [orderedProducts, setOrderedProducts] = React.useState<OrderedProduct[]>([]);
  const [changeCounter, setChangeCounter] = React.useState(0);

  const contextOrderProductList = React.useContext(ContextOrderProductList);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    visitRepository
      .findById(route.params.visitId)
      .then((visit) => {
        setVisit(visit);
        return visit;
      })
      .catch((e) => {
        console.log(e);
      });
    warehouseRepository
      .getAll()
      .then((warehouse) => {
        const noWarehouse = warehouseRepository.create({ nickname: "Default" });
        noWarehouse.id = -1;
        const warehouses = [noWarehouse].concat(warehouse);
        setWarehouseList(warehouses);
        return warehouse;
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    setOrder(orderRepository.create(visit));
  }, [visit]);

  React.useEffect(() => {
    if (route.params?.productId) {
      productRepository
        .findById(route.params.productId)
        .then((product) => {
          const orderedProduct = orderedProductRepository.create(order, product, 1);
          setOrderedProducts((orderedProducts) => orderedProducts.concat(orderedProduct));
          setChangeCounter((changeCounter) => changeCounter++);
          return product;
        })
        .catch((e) => {
          console.log(e);
        });
      navigation.setParams({ productId: undefined });
    }
  }, [isFocused]);

  React.useEffect(() => {
    const selectedProducts = orderedProducts.map((orderedProduct) => orderedProduct.product.id);
    contextOrderProductList.setOrderedProducts(selectedProducts);
  }, [changeCounter]);

  function deleteOrderedProduct(productId) {
    setOrderedProducts(
      orderedProducts.filter((orderedProduct) => {
        return !(orderedProduct.product.id === productId);
      })
    );
    setChangeCounter(changeCounter + 1);
  }

  function saveOrder() {
    orderRepository
      .save(order)
      .then((order) => {
        orderedProducts.forEach((orderedProduct) => (orderedProduct.order = order));
        orderedProductRepository.saveAll(orderedProducts);
        return orderedProducts;
      })
      .catch((e) => {
        console.log(e);
      });
    navigation.goBack();
  } // TODO in flatlist keyExtractor there is no item.id because the orders arent saved untill button press
  // TODO option to add warehouse to order and send productids in orderedproducts so they aren't shown in product lists pass context with param arrays
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
