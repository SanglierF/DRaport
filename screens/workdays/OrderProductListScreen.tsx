import * as React from "react";
import { StyleSheet, View, FlatList, Image, Text, Pressable } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import { ContextOrderProductList } from "./Workdays";

export default function OrderProductListScreen({ navigation, route }: any) {
  const localDb = LocalDatabase.getInstance();
  const productRepository = new ProductRepository(localDb.dbConnection);

  const contextOrderProductList = React.useContext(ContextOrderProductList);

  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    productRepository.getAll().then((found) => {
      setProductList(found); //TODO maybe set list after sorting
    });
  }, []);

  function renderProductItem({ item }) {
    return (
      <Pressable
        onPress={()=>navigation.navigate({
          name: "AddOrder",
          params: { productId: item.id },
          merge: true,
        })}
      >
        <List.Item title={`${item.name}`} right={() => <Text>Cena: {item.price}</Text>} />
      </Pressable>
    );
  }

  return (
    <FlatList
      renderItem={renderProductItem}
      data={productList}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Divider}
    />
  );
}
