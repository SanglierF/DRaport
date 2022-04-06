import * as React from "react";
import { ToastAndroid, View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import WarehouseForm from "./WarehouseForm";

export default function WarehouseModifyScreen({ navigation, route }: any) {
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

  function editWarehouse(data) {
    if (data.name && data.nickname) {
      warehouse.name = data.name;
      warehouse.nickname = data.nickname;
      warehouse.nip = data.nip;
      warehouse.regon = data.regon;
      warehouse.tel_number = data.tel;
      warehouse.email = data.email;
      warehouseRepository.modify(warehouse);
      (() => ToastAndroid.show("Succesfuly updated", ToastAndroid.SHORT))();
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <WarehouseForm warehouseDetails={warehouseDetails} submitWarehouse={editWarehouse} />
    </View>
  );
}
