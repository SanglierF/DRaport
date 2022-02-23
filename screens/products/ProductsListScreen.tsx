import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image
} from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import DbContext from "../../DbContext";
import ProductRepository from "../../database/repositories/ProductRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function ProductsListScreen({ navigation, route }: any) {
  const [productList, setProductList] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteProductId, setDeleteProductId] = React.useState(-1);

  const context = React.useContext(DbContext);
  const productRepository = new ProductRepository(context.dbConnection);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    if (productRepository) {
      productRepository.getAll().then(found => {
        setProductList(found);
      });
    }
  }, [isFocused, changeCounter]);

  // TODO in List.Accordion change icon to minature image if i can
  function renderItem({ item }) {
    return (
      <List.Accordion
        title={item.name}
        left={props => <List.Icon {...props} icon="basket" />}
      >
        <List.Item title="Price:" right={() => <Text>{item.price}</Text>} />
        <Image
          style={{
            width: 140,
            height: 140,
            alignSelf: "center"
          }}
          source={{
            uri:
              "https://cdn.discordapp.com/attachments/937318254408523786/938473160171466782/miodlipowy.png"
          }}
        />
        <List.Item
          title={() => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Button
                icon="account-edit"
                mode="text"
                onPress={() => {
                  navigation.navigate("ModifyProduct", {
                    productId: item.productId
                  });
                }}
              >
                Edytuj
              </Button>
              <Button
                icon="delete"
                mode="text"
                onPress={() => {
                  setDeleteProductId(item.productId);
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

  function deleteProduct(productId: number) {
    productRepository.delete(productId);
    setChangeCounter(changeCounter + 1);
  }

  const deleteObject = () => {
    deleteProduct(deleteProductId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={isFocused}
        renderItem={renderItem}
        data={productList}
        keyExtractor={item => item.productId}
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
    textAlign: "center"
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 15,
    margin: 10
  },
});
