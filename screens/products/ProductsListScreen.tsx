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
import { Product } from "../../database/entities/Product";

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

  function deleteProduct(productId) {
    productRepository.delete(productId);
    setChangeCounter(changeCounter + 1);
  }

  function modalConfirmation() {
    return (
      <Modal visible={modalVisible} style={localStyle.modal}>
        <View>
          <Text>Confirm delete!</Text>
          <View style={localStyle.modalButtons}>
            <Pressable
              style={localStyle.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                deleteProduct(deleteProductId);
              }}
            >
              <Text> YES DELETE </Text>
            </Pressable>
            <Pressable
              style={localStyle.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text> Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

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
      {modalConfirmation()}
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
  modal: {
    margin: 20,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtons: {
    marginTop: 25,
    justifyContent: "space-around"
  },
  modalButton: {
    padding: 25,
    backgroundColor: "gray",
    margin: 10
  }
});
