import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleWarehouseDetails from "./styleWarehouseDetails";
import { nameValidation, priceValidation } from "../../components/Validators"

export default function WarehouseAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const warehouseRepository = new WarehouseRepository(context.dbConnection);

  function addWarehouse() {
    let validFields = false;
    validFields = (nameValidation(name) && nameValidation(nickname))? true: false;

    if (validFields) {
      const newWarehouse = warehouseRepository.create({ nickname: nickname, name: name});
      console.log(newWarehouse);
      warehouseRepository.save(newWarehouse)
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
          label="Warehouse name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Warehouse nickname"
          mode="outlined"
          value={nickname}
          onChangeText={setNickname}
          autoComplete="off"
        />
      </View>
      <Button style={styleAdd.buttonAdd} onPress={addWarehouse} mode="contained">
        Add warehouse
      </Button>
    </View>
  );
}

const styleAdd = styleWarehouseDetails;
