import * as React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";

export default function ProductModifyScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    productRepository.findById(route.params.productId).then(
      found => {
        setProduct(found);
        setName(found.name);
        setPrice(found.price.toString());
      },
      () => {}
    );
  }, []);

  function editProduct() {

    if (name && price) {
      product.name = name;
      product.price = price;
      productRepository.modify(product);
    }
  }

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product name:</Text>
      <TextInput placeholder="Hehe xd" value={name} onChangeText={setName} />
      <Text>Product price:</Text>
      <TextInput placeholder="13.37" value={price} onChangeText={setPrice} />
      <Button onPress={editProduct} title="Save changes" />
    </View>
  );
}
