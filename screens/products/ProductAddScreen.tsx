import * as React from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation, priceValidation } from "../../components/Validators";

export default function ProductAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const productRepository = new ProductRepository(localDb.dbConnection);

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  React.useEffect(() => {
    setPrice(price.replace(",", "."));
  }, [price]);

  function addProduct() {
    let validFields = false;
    let priceConv = 0;
    try {
      priceConv = parseFloat(price);
      validFields = nameValidation(name) && priceValidation(priceConv) ? true : false;
    } catch (exception) {
      alert("Invalid price");
    }
    if (validFields) {
      const newProduct = productRepository.create(name, priceConv);
      productRepository.save(newProduct).then((saved) => {
        console.log(saved)
      });
      navigation.goBack();
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <Image style={styleItemDetails.image} source={require("../../assets/icon.png")} />
      <View style={styleItemDetails.containerInputs}>
        <TextInput
          style={styleItemDetails.textInput}
          label="Product name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Product price"
          mode="outlined"
          value={price}
          onChangeText={setPrice}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
      </View>
      <Button style={styleItemDetails.buttonAdd} onPress={addProduct} mode="contained">
        Add product
      </Button>
    </View>
  );
}
