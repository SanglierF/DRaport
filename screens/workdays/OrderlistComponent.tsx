import React from "react";
import { FlatList, View } from "react-native";
import { Button, Divider, List } from "react-native-paper";

export default function OrderList({
  isFocused,
  orderList,
  setDeleteOrderId,
  setModalVisible,
  modifyOrder,
}) {
  function renderOrderedProductItem({ item }) {
    return (
      <List.Item
        title={`Product: ${item.product.name} Price: ${item.product.price} Number: ${item.quantity}`}
        right={() => <View />}
      />
    );
  }

  function renderOrderItem({ item }) {
    return (
      <View>
        <List.Accordion title={item.id} left={(props) => <List.Icon {...props} icon="basket" />}>
          <FlatList
            extraData={isFocused}
            renderItem={renderOrderedProductItem}
            data={item.orderedProducts}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
          />
          <List.Item
            title={() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  icon="account-edit"
                  mode="text"
                  onPress={() => {
                    modifyOrder(item.id);
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  icon="delete"
                  mode="text"
                  onPress={() => {
                    setDeleteOrderId(item.id);
                    setModalVisible(true);
                  }}
                >
                  Usuń
                </Button>
              </View>
            )}
            right={() => <View />}
          />
        </List.Accordion>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        extraData={isFocused}
        renderItem={renderOrderItem}
        data={orderList}
        keyExtractor={(order) => order.id}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
}
