import * as React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";

export default function ProductAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  function addProduct() {
    let success = null

    if (name && price) {
      const newProduct = productRepository.create(name, Number(price));
      console.log(newProduct);
      success = productRepository.save(newProduct);
    }
    if(success) navigation.goBack();
  }

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product name:</Text>
      <TextInput placeholder="Hehe xd" value={name} onChangeText={setName} />
      <Text>Product price:</Text>
      <TextInput placeholder="13.37" value={price} onChangeText={setPrice} />
      <Button onPress={
        addProduct
      } title="Add test product" />
    </View>
  );
}
