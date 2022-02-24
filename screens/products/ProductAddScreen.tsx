import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button} from "react-native-paper";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleProductDetails from "./styleProductDetails";

export default function ProductAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  function addProduct() {
    let success = null;

    if (name && price) {
      const newProduct = productRepository.create(name, Number(price));
      console.log(newProduct);
      success = productRepository.save(newProduct);
    }
    if (success) navigation.goBack();
  }

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  return (
    <View style={styleAdd.containerAdd}>
      <Image style={styleAdd.image}
      source={require('../../assets/icon.png')}
      />
      <View style={styleAdd.containerInputs}>
      <TextInput style={styleAdd.textInput} label="Product name" mode='outlined' value={name} onChangeText={setName} autoComplete='off'/>
      <TextInput style={styleAdd.textInput} label="Product price" mode='outlined' value={price} onChangeText={setPrice} autoComplete='off'/>
      </View>
      <Button style={styleAdd.buttonAdd} onPress={addProduct} mode='contained'>
      Add product
      </Button>
    </View>
  );
}

const styleAdd = styleProductDetails;
