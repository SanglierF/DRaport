import * as React from "react";

function useOrderedProductList(productList: Number = null) {
  const [orderedProducts, setOrderedProducts] = React.useState([]);

  useEffect(() => {
    if (productList) {
      setOrderedProducts(productList);
    }
  });

  return orderedProducts;
}
