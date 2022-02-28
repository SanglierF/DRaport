import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button} from "react-native-paper";
import DbContext from "../../DbContext";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleWarehouseDetails from "./styleWarehouseDetails";

export default function WarehouseModifyScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const warehouseRepository = new WarehouseRepository(context.dbConnection);

  const [warehouse, setWarehouse] = React.useState(null);

  React.useEffect(() => {
    warehouseRepository.findById(route.params.warehouseId).then(
      found => {
        setWarehouse(found);
        setName(found.name);
        setPrice(found.nickname);
      },
      () => {}
    );
  }, []);

  function editWarehouse() {

    if (name && nickname) {
      warehouse.name = name;
      warehouse.nickname = nickname;
      warehouseRepository.modify(warehouse);
    }
  }

  const [name, setName] = React.useState("");
  const [nickname, setPrice] = React.useState("");

  return (
    <View style={styleModify.containerAdd}>
      <View style={styleModify.containerInputs}>
      <TextInput style={styleModify.textInput} label="Warehouse name" mode='outlined' value={name} onChangeText={setName} autoComplete='off'/>
      <TextInput style={styleModify.textInput} label="Warehouse nickname" mode='outlined' value={nickname} onChangeText={setPrice} autoComplete='off'/>
      </View>
      <Button style={styleModify.buttonAdd} onPress={editWarehouse} mode='contained'>
      Edit warehouse
      </Button>
    </View>
  );
}

const styleModify = styleWarehouseDetails;
