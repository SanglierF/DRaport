import * as React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { List, Button, FAB, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LocalDatabase from "../../database/LocalDatabase";
import ProductRepository from "../../database/repositories/ProductRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function ProductsListScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const productRepository = new ProductRepository(localDb.dbConnection);

  const [productList, setProductList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteProductId, setDeleteProductId] = React.useState(-1);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (productRepository) {
      productRepository.getAll().then((found) => {
        setProductList(found);
      });
    }
  }, [isFocused, changeCounter]);

  // TODO in List.Accordion change icon to minature image if i can
  function renderItem({ item }) {
    return (
      <List.Accordion title={item.name} left={(props) => <List.Icon {...props} icon="basket" />}>
        {item.price ? <List.Item title={`Price: ${item.price}`} right={() => <View />} /> : null}
        <Image
          style={{
            marginTop: 20,
            width: 140,
            height: 140,
            alignSelf: "center",
          }}
          source={require("../../assets/icon.png")}
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
                  navigation.navigate("ModifyProduct", {
                    productId: item.id,
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteProductId(item.id);
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
    );
  }

  function deleteProduct(id: number) {
    productRepository.delete(id);
    setChangeCounter(changeCounter + 1);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={productList}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={localStyle.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("AddProduct")}
      />
      <ModalConfirmation
        deleteObjectFn={deleteProduct}
        objectId={deleteProductId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const localStyle = StyleSheet.create({
  list: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10,
  },
});
