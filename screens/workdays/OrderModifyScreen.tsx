import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { Warehouse } from "../../database/entities/Warehouse";
import { OrderedProduct } from "../../database/entities/OrderedProduct";
import { Order } from "../../database/entities/Order";
import { ContextOrderProductList } from "./Workdays";
import OrderComponent from "./OrderComponent";

const localDb = LocalDatabase.getInstance();

export default function OrderModifyScreen({ navigation, route }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [warehouseList, setWarehouseList] = React.useState<Warehouse[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [warehouseId, setWarehouseId] = React.useState(-1);
  const [order, setOrder] = React.useState<Order>(null);
  const [orderedProducts, setOrderedProducts] = React.useState<OrderedProduct[]>([]);
  const [removedOrderedProductsIds, setRemovedOrderedProductsIds] = React.useState<number[]>([]);

  const contextOrderProductList = React.useRef(React.useContext(ContextOrderProductList));

  React.useEffect(() => {
    localDb.orderRepository
      .findById(route.params.orderId)
      .then((order) => {
        setOrder(order);
        return order;
      })
      .catch((e) => {
        console.log(e);
      });
  }, [route.params.orderId]);
  React.useEffect(() => {
    localDb.warehouseRepository
      .getAll()
      .then((warehouse) => {
        const noWarehouse = localDb.warehouseRepository.create({ nickname: "Default" });
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
    localDb.orderedProductRepository
      .getAllInOrder(order)
      .then((orderedProducts) => {
        setOrderedProducts(orderedProducts);
        const selectedProducts = orderedProducts.map((orderedProduct) => orderedProduct.product.id);
        contextOrderProductList.current.setOrderedProducts(selectedProducts);
        return orderedProducts;
      })
      .catch((e) => {
        console.log(e);
      });
  }, [order]);

  React.useEffect(() => {
    if (route.params?.productId) {
      localDb.productRepository
        .findById(route.params.productId)
        .then((product) => {
          const orderedProduct = localDb.orderedProductRepository.create(order, product, 1);
          setOrderedProducts((orderedProducts) => orderedProducts.concat(orderedProduct));
          return product;
        })
        .catch((e) => {
          console.log(e);
        });
      navigation.setParams({ productId: undefined });
    }
  }, [navigation, order, route.params?.productId]);

  React.useEffect(() => {
    const selectedProducts = orderedProducts.map((orderedProduct) => orderedProduct.product.id);
    contextOrderProductList.current.setOrderedProducts(selectedProducts);
  }, [orderedProducts]);

  function deleteOrderedProduct(productId: number) {
    orderedProducts.forEach((orderedProduct) => {
      if (orderedProduct.product.id === productId && orderedProduct.id) {
        setRemovedOrderedProductsIds((removedOrderedProductsIds) =>
          removedOrderedProductsIds.concat(orderedProduct.id)
        );
      }
    });
    setOrderedProducts(
      orderedProducts.filter((orderedProduct) => {
        return !(orderedProduct.product.id === productId);
      })
    );
  }

  function saveOrder() {
    (async () => {
      removedOrderedProductsIds.forEach((removedOrderedProductId) => {
        localDb.orderedProductRepository.delete(removedOrderedProductId);
      });
      localDb.orderRepository
        .save(order)
        .then((order) => {
          orderedProducts.forEach((orderedProduct) => (orderedProduct.order = order));
          localDb.orderedProductRepository.saveAll(orderedProducts);
          return order;
        })
        .catch((e) => {
          console.log(e);
        });
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
