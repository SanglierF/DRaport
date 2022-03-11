import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";

export default function WarehouseModifyScreen({ route }: any) {
  const localDb = LocalDatabase.getInstance();
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [warehouse, setWarehouse] = React.useState(null);
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");

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
      <Button style={styleItemDetails.buttonAdd} onPress={editWarehouse} mode="contained">
        Edit warehouse
      </Button>
    </View>
  );
}
