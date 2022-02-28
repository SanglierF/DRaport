import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleProductDetails from "./styleProductDetails";
import { nameValidation, priceValidation } from "../../components/Validators"

export default function ProductAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  function addProduct() {
    let validFields = false;
    let priceConv = 0
    try {
      priceConv = parseFloat(price)
      console.log(priceConv)
      validFields = (nameValidation(name) && priceValidation(priceConv))? true: false;
    }catch (exception) {
      alert('Invalid price')
    }
    console.log(validFields)
    if (validFields) {
      const newProduct = productRepository.create(name, priceConv);
      console.log(newProduct);
      productRepository.save(newProduct)
      navigation.goBack();
    }
  }

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");


  React.useEffect(() => {
    setPrice(price.replace(',','.'))
  }, [price])

  return (
    <View style={styleAdd.containerAdd}>
      <Image style={styleAdd.image} source={require("../../assets/icon.png")} />
      <View style={styleAdd.containerInputs}>
        <TextInput
          style={styleAdd.textInput}
          label="Product name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Product price"
          mode="outlined"
          value={price}
          onChangeText={setPrice}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
      </View>
      <Button style={styleAdd.buttonAdd} onPress={addProduct} mode="contained">
        Add product
      </Button>
    </View>
  );
}

const styleAdd = styleProductDetails;
