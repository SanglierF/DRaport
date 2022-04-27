import * as React from "react";
import { FlatList, Text, Pressable } from "react-native";
import { List, Divider } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import { ContextOrderProductList } from "./Workdays";

const localDb = LocalDatabase.getInstance();

export default function OrderProductListScreen({ navigation, route }: any) {
  const contextOrderProductList = React.useRef(React.useContext(ContextOrderProductList));

  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    localDb.productRepository
      .getAll()
      .then((found) => {
        const filteredList = found.filter((product) => {
          return !contextOrderProductList.current.orderedProducts.includes(product.id);
        });
        setProductList(filteredList);
        return true;
      })
      .catch((error) => console.log(error));
  }, []);

  function renderProductItem({ item }) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate({
            name: route.params.previousScreenName,
            params: { productId: item.id },
            merge: true,
          })
        }
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
