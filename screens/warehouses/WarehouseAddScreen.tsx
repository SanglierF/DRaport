import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";

export default function WarehouseAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");

  function addWarehouse() {
    const validFields = nameValidation(name) && nameValidation(nickname) ? true : false;

    if (validFields) {
      const newWarehouse = warehouseRepository.create({
        nickname: nickname,
        name: name,
        regon: regon,
        tel_number: tel,
        email: email,
      });
      console.log(newWarehouse);
      warehouseRepository.save(newWarehouse);
      navigation.goBack();
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <View style={styleItemDetails.containerInputs}>
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse nickname"
          mode="outlined"
          value={nickname}
          onChangeText={setNickname}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse nip"
          mode="outlined"
          value={nip}
          onChangeText={setNip}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse regon"
          mode="outlined"
          value={regon}
          onChangeText={setRegon}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse tel_number"
          mode="outlined"
          value={tel}
          onChangeText={setTel}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Warehouse email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoComplete="off"
        />
      </View>
      <Button style={styleItemDetails.buttonAdd} onPress={addWarehouse} mode="contained">
        Add warehouse
      </Button>
    </View>
  );
}
