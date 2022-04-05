import * as React from 'react';
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styleForm from "../../styles/styleForm";

export default function ProductForm({productName, setProductName, productPrice, setProductPrice}) {
  React.useEffect(() => {
    setProductPrice(productPrice.replace(",", "."));
  }, [productPrice]);

  return (
    <View style={styleForm.containerForm}>
      <Image style={styleForm.image} source={require("../../assets/icon.png")} />
      <View style={styleForm.containerInputs}>
        <TextInput
          style={styleForm.textInput}
          label="Product name"
          mode="outlined"
          value={productName}
          onChangeText={(newName) => setProductName(newName)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Product price"
          mode="outlined"
          value={productPrice}
          onChangeText={(newPrice) => setProductPrice(newPrice)}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
      </View>
    </View>
  );
}
