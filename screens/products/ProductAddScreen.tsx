import * as React from "react";
import { View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import styleItemDetails from "../../styles/styleItemDetails";
import ProductForm from "./ProductForm";

const localDb = LocalDatabase.getInstance();

export default function ProductAddScreen({ navigation }: any) {
  const [productDetails] = React.useState({
    name: "",
    price: "",
    image: "",
    fetched: true,
  });
  const [image, setImage] = React.useState(null);

  function addProduct(data) {
    let priceConv = 0;
    try {
      priceConv = parseFloat(data.price.replace(/,/g, "."));
    } catch (exception) {
      alert("Invalid price");
    }
    const newProduct = localDb.productRepository.create(data.name, priceConv);
    localDb.productRepository.save(newProduct);
    navigation.goBack();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ProductForm productDetails={productDetails} submitProduct={addProduct} />
    </View>
  );
}
