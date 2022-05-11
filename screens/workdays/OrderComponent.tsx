import * as React from "react";
import { FlatList, View } from "react-native";
import { Divider, FAB, List, TextInput } from "react-native-paper";
import { OrderedProduct } from "../../database/entities/OrderedProduct";

export default function OrderComponent({
  orderedProducts,
  deleteOrderedProduct,
}: {
  orderedProducts: OrderedProduct[];
  deleteOrderedProduct: Function;
}) {
  function renderProductItem({ item }) {
    return (
      <View style={{ justifyContent: "space-evenly" }}>
        <List.Item
          title={`${item.product.name}`}
          right={() => (
            <TextInput
              style={{ width: 120 }}
              label="Quantity"
              mode="outlined"
              defaultValue={item.quantity.toString()}
              onChangeText={(text) => {
                item.quantity = Number(text);
              }}
              autoComplete="off"
              keyboardType="decimal-pad"
            />
          )}
        />
        <FAB
          small
          icon="minus"
          onPress={() => {
            deleteOrderedProduct(item.product.id);
          }}
        />
      </View>
    );
  }

  return (
    <FlatList
      renderItem={renderProductItem}
      data={orderedProducts}
      keyExtractor={(item) => item.product.id}
      ItemSeparatorComponent={Divider}
    />
  );
}
