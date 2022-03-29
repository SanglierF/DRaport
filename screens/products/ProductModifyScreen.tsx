import * as React from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import ProductForm from "./ProductForm";

export default function ProductModifyScreen({ route }: any) {
  const localDb = LocalDatabase.getInstance();
  const productRepository = new ProductRepository(localDb.dbConnection);

  const [product, setProduct] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    productRepository.findById(route.params.productId).then(
      (found) => {
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

  return (
    <View style={styleItemDetails.containerAdd}>
      <ProductForm
        productName={name}
        setProductName={setName}
        productPrice={price}
        setProductPrice={setPrice}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={editProduct} mode="contained">
        Edit product
      </Button>
    </View>
  );
}
