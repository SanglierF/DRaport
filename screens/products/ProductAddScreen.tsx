import * as React from "react";
import { View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { priceValidation } from "../../utils/validators";
import ProductForm from "./ProductForm";

export default function ProductAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const productRepository = new ProductRepository(localDb.dbConnection);

  const [productDetails] = React.useState({
    name: "",
    price: "",
    image: "",
    fetched: true,
  });
  const [image, setImage] = React.useState(null);

  function addProduct(data) {
    let validFields = false;
    let priceConv = 0;
    try {
      priceConv = parseFloat(data.price);
      validFields = priceValidation(priceConv);
    } catch (exception) {
      alert("Invalid price");
    }
    if (validFields) {
      const newProduct = productRepository.create(data.name, priceConv);
      productRepository.save(newProduct);
      navigation.goBack();
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ProductForm productDetails={productDetails} submitProduct={addProduct} />
    </View>
  );
}
