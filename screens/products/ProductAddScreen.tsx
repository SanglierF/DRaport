import * as React from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation, priceValidation } from "../../components/Validators";

export default function ProductAddScreen({ navigation }: any) {
  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

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
      console.log(priceConv);
      validFields = nameValidation(name) && priceValidation(priceConv) ? true : false;
    } catch (exception) {
      alert("Invalid price");
    }
    console.log(validFields);
    if (validFields) {
      const newProduct = productRepository.create(name, priceConv);
      console.log(newProduct);
      productRepository.save(newProduct);
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
