import * as React from "react";
import { ToastAndroid, View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import WarehouseRepository from "../../database/repositories/WarehouseRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import WarehouseForm from "./WarehouseForm";

export default function WarehouseModifyScreen({ route }: any) {
  const dbConnection = React.useRef(LocalDatabase.getInstance().dbConnection);
  const warehouseRepository = React.useRef(new WarehouseRepository(dbConnection.current));

  const [warehouse, setWarehouse] = React.useState(null);
  const [warehouseDetails, setWarehouseDetails] = React.useState({
    name: "",
    nickname: "",
    nip: "",
    regon: "",
    tel: "",
    email: "",
    fetched: false,
  });

  React.useEffect(() => {
    async function fetchWarehouse() {
      try {
        const warehouse = await warehouseRepository.current.findById(route.params.warehouseId);
        setWarehouse(warehouse);
        setWarehouseDetails({
          name: warehouse.name,
          nickname: warehouse.nickname,
          nip: warehouse.nip?.toString(),
          regon: warehouse.regon?.toString(),
          tel: warehouse.tel_number,
          email: warehouse.email,
          fetched: true,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchWarehouse();
  }, [route.params.warehouseId]);

  function editWarehouse(data) {
    warehouse.name = data.name;
    warehouse.nickname = data.nickname;
    warehouse.nip = data.nip;
    warehouse.regon = data.regon;
    warehouse.tel_number = data.tel;
    warehouse.email = data.email;
    warehouseRepository.current.modify(warehouse);
    (() => ToastAndroid.show("Succesfuly updated", ToastAndroid.SHORT))();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <WarehouseForm warehouseDetails={warehouseDetails} submitWarehouse={editWarehouse} />
    </View>
  );
}
