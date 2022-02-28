import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleClientDetails from "./styleClientDetails";
import { nameValidation, priceValidation } from "../../components/Validators"

export default function ClientAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const clientRepository = new ClientRepository(context.dbConnection);

  function addClient() {
    let validFields = false;
    validFields = (nameValidation(name) && nameValidation(nickname))? true: false;

    if (validFields) {
      const newClient = clientRepository.create({ nickname: nickname, name: name});
      console.log(newClient);
      clientRepository.save(newClient)
      navigation.goBack();
    }
  }

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");

  return (
    <View style={styleAdd.containerAdd}>
      <View style={styleAdd.containerInputs}>
        <TextInput
          style={styleAdd.textInput}
          label="Client name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client nickname"
          mode="outlined"
          value={name}
          onChangeText={setNickname}
          autoComplete="off"
        />
      </View>
      <Button style={styleAdd.buttonAdd} onPress={addClient} mode="contained">
        Add client
      </Button>
    </View>
  );
}

const styleAdd = styleClientDetails;
