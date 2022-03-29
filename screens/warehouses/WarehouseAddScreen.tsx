import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";
import WarehouseForm from "./WarehouseForm";

export default function WarehouseAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [warehouseDetails, setWarehouseDetails] = React.useState({
    name: "",
    nickname: "",
    nip: "",
    regon: "",
    tel: "",
    email: "",
  });

  function addWarehouse() {
    const validFields =
      nameValidation(warehouseDetails.name) && nameValidation(warehouseDetails.nickname)
        ? true
        : false;

    if (validFields) {
      const newWarehouse = warehouseRepository.create({
        nickname: warehouseDetails.nickname,
        name: warehouseDetails.name,
        nip: warehouseDetails.nip!=="" ? Number(warehouseDetails.nip) : null,
        regon: warehouseDetails.regon!=="" ? Number(warehouseDetails.regon) : null,
        tel_number: warehouseDetails.tel,
        email: warehouseDetails.email,
      });
      console.log(newWarehouse);
      warehouseRepository.save(newWarehouse);
      navigation.goBack();
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <WarehouseForm
        warehouseDetails={warehouseDetails}
        setWarehouseDetails={setWarehouseDetails}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={addWarehouse} mode="contained">
        Add warehouse
      </Button>
    </View>
  );
}
