import { StyleSheet } from "react-native";

const styleForm = StyleSheet.create({
  containerForm: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "column",
  },
  image: {
    margin: "auto",
    flex: 0,
    alignSelf: "center",
    height: "30%",
    width: "30%",
  },
  containerInputs: {
    flex: 1,
    flexDirection: "column",
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
  textLabel: {
    margin: "auto",
  },
  textInput: {
    marginBottom: 10,
  },
  buttonAdd: {
    width: "50%",
    alignSelf: "center",
    borderRadius: 20,
  },
});

export default styleForm;
