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

  function addWarehouse(data: {
    nickname: string;
    name: string;
    nip: string;
    regon: string;
    tel: string;
    email: string;
  }) {
    const newWarehouse = warehouseRepository.create({
      nickname: data.nickname,
      name: data.name,
      nip: data.nip !== "" ? Number(data.nip) : null,
      regon: data.regon !== "" ? Number(data.regon) : null,
      tel_number: data.tel,
      email: data.email,
    });
    console.log(newWarehouse);
    warehouseRepository.save(newWarehouse);
    navigation.goBack();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <WarehouseForm warehouseDetails={warehouseDetails} submitWarehouse={addWarehouse} />
    </View>
  );
}
