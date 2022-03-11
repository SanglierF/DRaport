import * as React from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Button, Modal } from "react-native-paper";

const ModalList = ({
  selectedClient,
  clientList,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      visible={modalVisible}
      style={modalStyle.modal}
      onDismiss={() => {
        setModalVisible(false);
      }}
    >
        <Text style={modalStyle.modalText}>Choose client!</Text>
        <View style={modalStyle.modalButtons}>
          <Pressable
            style={modalStyle.modalButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>Yes</Text>
          </Pressable>
          <Pressable
            style={modalStyle.modalButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
    </Modal>
  );
};

export default ModalList;

const modalStyle = StyleSheet.create({
  modal: {
    flex: 1,
    height: 150,
    width: 350,
    marginTop: "50%",
    marginStart: "10%",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
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
    justifyContent: "space-between",
    flexDirection: "row"
  },
  modalButton: {
    padding: 25,
    backgroundColor: "gray",
    margin: 10,
    textAlign: "center"
  },
  modalText: {
    alignSelf: "center",
    marginBottom: "5%"
  }
});
