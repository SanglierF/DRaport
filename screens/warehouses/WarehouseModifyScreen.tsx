import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DbContext from "../../DbContext";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleWarehouseDetails from "./styleWarehouseDetails";

export default function WarehouseModifyScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const warehouseRepository = new WarehouseRepository(context.dbConnection);

  const [warehouse, setWarehouse] = React.useState(null);

  React.useEffect(() => {
    warehouseRepository.findById(route.params.warehouseId).then(
      (found) => {
        setWarehouse(found);
        setName(found.name);
        setNickname(found.nickname);
      },
      () => {}
    );
  }, []);

  function editWarehouse() {
    if (name && nickname) {
      warehouse.name = name;
      warehouse.nickname = nickname;
      warehouse.nip = nip;
      warehouse.regon = regon;
      warehouse.tel_number = tel;
      warehouse.email = email;
      warehouseRepository.modify(warehouse);
    }
  }

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <View style={styleModify.containerAdd}>
      <View style={styleModify.containerInputs}>
        <TextInput
          style={styleModify.textInput}
          label="Warehouse name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleModify.textInput}
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
      <Button style={styleModify.buttonAdd} onPress={editWarehouse} mode="contained">
        Edit warehouse
      </Button>
    </View>
  );
}

const styleModify = styleWarehouseDetails;
