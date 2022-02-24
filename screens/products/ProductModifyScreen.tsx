import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button} from "react-native-paper";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleProductDetails from "./styleProductDetails";

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
    <View style={styleModify.containerAdd}>
      <Image style={styleModify.image}
      source={require('../../assets/icon.png')}
      />
      <View style={styleModify.containerInputs}>
      <TextInput style={styleModify.textInput} label="Product name" mode='outlined' value={name} onChangeText={setName} autoComplete='off'/>
      <TextInput style={styleModify.textInput} label="Product price" mode='outlined' value={price} onChangeText={setPrice} autoComplete='off'/>
      </View>
      <Button style={styleModify.buttonAdd} onPress={editProduct} mode='contained'>
      Add product
      </Button>
    </View>
  );
}

const styleModify = styleProductDetails;
