import * as React from "react";
import { ToastAndroid, View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import ProductForm from "./ProductForm";

export default function ProductModifyScreen({ route }: any) {
  const dbConnection = React.useRef(LocalDatabase.getInstance().dbConnection);
  const productRepository = React.useRef(new ProductRepository(dbConnection.current));

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
        const product = await productRepository.current.findById(route.params.productId);
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
    productRepository.current.modify(product);
    (() => ToastAndroid.show("Succesfuly updated", ToastAndroid.SHORT))();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ProductForm productDetails={productDetails} submitProduct={editProduct} />
    </View>
  );
}
