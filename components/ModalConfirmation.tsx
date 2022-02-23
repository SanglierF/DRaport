import * as React from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Button, Modal } from "react-native-paper";

const ModalConfirmation = ({
  deleteObjectFn,
  objectId,
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
      <View>
        <Text style={modalStyle.modalText}>Confirm delete!</Text>
        <View style={modalStyle.modalButtons}>
          <Pressable
            style={modalStyle.modalButton}
            onPress={() => {
              setModalVisible(false);
              deleteObjectFn(objectId);
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
      </View>
    </Modal>
  );
};

export default ModalConfirmation;

const modalStyle = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: "45%",
    height: "35%",
    marginHorizontal: "20%",
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
