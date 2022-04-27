import { StyleSheet } from "react-native";

const styleForm = StyleSheet.create({
  containerForm: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "30%",
    height: 150,
    alignSelf: "center",
  },
  containerInputs: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  textLabel: {
    width: "25%",
    alignSelf: "center",
    marginRight: "5%",
  },
  textInput: {
    width: "70%",
    marginBottom: 10,
  },
  buttonAdd: {
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    margin: 5,
  },
});

export default styleForm;
