import * as React from "react";
import { ToastAndroid, View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import styleItemDetails from "../../styles/styleItemDetails";
import ProductForm from "./ProductForm";

const localDb = LocalDatabase.getInstance();

export default function ProductModifyScreen({ route }: any) {
  const [product, setProduct] = React.useState(null);
  const [productDetails, setProductDetails] = React.useState({
    name: "",
    price: "",
    image: "",
    fetched: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const product = await localDb.productRepository.findById(route.params.productId);
        setProduct(product);
        setProductDetails({
          name: product.name,
          price: product.price.toString(),
          image: "",
          fetched: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [route.params.productId]);

  function editProduct(data) {
    product.name = data.name;
    product.price = data.price;
    localDb.productRepository.modify(product);
    (() => ToastAndroid.show("Succesfuly updated", ToastAndroid.SHORT))();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ProductForm productDetails={productDetails} submitProduct={editProduct} />
    </View>
  );
}
