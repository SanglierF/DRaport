import * as React from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { List, Button, FAB, Divider} from 'react-native-paper'
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import { Product } from "../../database/entities/Product";
import ItemFlatlist from "../../components/ItemFlatlist";

export default function ProductsListScreen({ navigation, route }: any) {
  const [productList, setProductList] = React.useState([]);
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (productRepository) {
      productRepository.getAll().then(found => {
        setProductList(found);
      });
    }
  }, [isFocused]);

  React.useEffect(() => {
    console.log(productList);
  }, [productList]);
  //keyExtractor={(item, index) => index.toString()}

  function renderItem({ item }) {
    return (
      <Pressable style={itemStyles.container} onPress={() => {}}>
        <Text>{item.name}</Text>
        <Text>{item.price.toString()}</Text>
      </Pressable>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProductsListScreen: {route.params.text} </Text>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={productList}
        keyExtractor={item => item.productId}
      />
      <Button
        onPress={() => navigation.navigate("AddProduct", { productId: 2 })}
        >Dodaj produkt
      </Button>
    </View>
  );
}

const itemStyles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  item: {
    borderWidth: 4,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center"
  }
});
