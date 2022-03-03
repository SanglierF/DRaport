import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleWarehouseDetails from "./styleWarehouseDetails";
import { nameValidation, priceValidation } from "../../components/Validators";

export default function WarehouseAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const warehouseRepository = new WarehouseRepository(context.dbConnection);

  function addWarehouse() {
    const validFields =
      nameValidation(name) && nameValidation(nickname) ? true : false;

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

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");

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
        <TextInput
          style={styleAdd.textInput}
          label="Warehouse nip"
          mode="outlined"
          value={nip}
          onChangeText={setNip}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Warehouse regon"
          mode="outlined"
          value={regon}
          onChangeText={setRegon}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Warehouse tel_number"
          mode="outlined"
          value={tel}
          onChangeText={setTel}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Warehouse email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoComplete="off"
        />
      </View>
      <Button
        style={styleAdd.buttonAdd}
        onPress={addWarehouse}
        mode="contained"
      >
        Add warehouse
      </Button>
    </View>
  );
}

const styleAdd = styleWarehouseDetails;
