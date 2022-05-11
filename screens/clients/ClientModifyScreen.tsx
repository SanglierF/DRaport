import * as React from "react";
import { ToastAndroid, View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import styleItemDetails from "../../styles/styleItemDetails";
import ClientForm from "./ClientForm";

const localDb = LocalDatabase.getInstance();

export default function ClientModifyScreen({ route }: any) {
  const [client, setClient] = React.useState(null);
  const [clientDetails, setClientDetails] = React.useState({
    name: "",
    nickname: "",
    nip: "",
    regon: "",
    voivodeship: "",
    city: "",
    zip: "",
    street: "",
    tel: "",
  });
  const [disableSubmit, setDisableSubmit] = React.useState(true);

  React.useEffect(() => {
    async function fetchClient() {
      try {
        const client = await localDb.clientRepository.findById(route.params.clientId);
        setClient(client);
        console.log(client);
        setClientDetails({
          nickname: client.nickname,
          name: client.name,
          nip: client.nip?.toString(),
          regon: client.regon?.toString(),
          voivodeship: client.voivodeship,
          city: client.city,
          zip: client.zip_code,
          street: client.street,
          tel: client.tel_number,
        });
      } catch (error) {
        console.log(error);
      }
      setDisableSubmit(false);
    }
    fetchClient();
  }, [route.params.clientId]);

  function editClient(data) {
    client.name = data.name;
    client.nickname = data.nickname;
    client.nip = data.nip;
    client.regon = data.regon;
    client.voivodeship = data.voivodeship;
    client.city = data.city;
    client.zip_code = data.zip;
    client.street = data.street;
    client.tel_number = data.tel;
    localDb.clientRepository.modify(client);
    (() => ToastAndroid.show("Succesfuly updated", ToastAndroid.SHORT))();
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ClientForm
        clientDetails={clientDetails}
        submitAction={editClient}
        disableSubmit={disableSubmit}
        disableFillData={false}
        submitText={"Update client"}
      />
    </View>
  );
}
