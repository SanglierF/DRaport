import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import WarehouseForm from "./WarehouseForm";

export default function WarehouseModifyScreen({ route }: any) {
  const localDb = LocalDatabase.getInstance();
  const warehouseRepository = new WarehouseRepository(localDb.dbConnection);

  const [warehouse, setWarehouse] = React.useState(null);
  const [warehouseDetails, setWarehouseDetails] = React.useState({
    name: "",
    nickname: "",
    nip: "",
    regon: "",
    tel: "",
    email: "",
  });

  React.useEffect(() => {
    warehouseRepository.findById(route.params.warehouseId).then(
      (found) => {
        setWarehouse(found);
        setWarehouseDetails({
          name: found.name,
          nickname: found.nickname,
          nip: found.nip?.toString(),
          regon: found.regon?.toString(),
          tel: found.tel_number,
          email: found.email,
        });
      },
      () => {}
    );
  }, []);

  function editWarehouse() {
    if (warehouseDetails.name && warehouseDetails.nickname) {
      warehouse.name = warehouseDetails.name;
      warehouse.nickname = warehouseDetails.nickname;
      warehouse.nip = warehouseDetails.nip;
      warehouse.regon = warehouseDetails.regon;
      warehouse.tel_number = warehouseDetails.tel;
      warehouse.email = warehouseDetails.email;
      warehouseRepository.modify(warehouse);
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <WarehouseForm
        warehouseDetails={warehouseDetails}
        setWarehouseDetails={setWarehouseDetails}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={editWarehouse} mode="contained">
        Edit warehouse
      </Button>
    </View>
  );
}
