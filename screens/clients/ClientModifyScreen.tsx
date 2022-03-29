import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import ClientForm from "./ClientForm";

export default function ClientModifyScreen({ route }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);

  const [loadingStatus, setLoadingStatus] = React.useState(false);
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

  React.useEffect(() => {
    clientRepository.findById(route.params.clientId).then(
      (found) => {
        setClient(found);
        console.log(found);
        setClientDetails({
          nickname: found.nickname,
          name: found.name,
          nip: found.nip?.toString(),
          regon: found.regon?.toString(),
          voivodeship: found.voivodeship,
          city: found.city,
          zip: found.zip_code,
          street: found.street,
          tel: found.tel_number,
        });
      },
      () => {}
    );
  }, []);

  function editClient() {
    if (clientDetails.name && clientDetails.nickname) {
      client.name = clientDetails.name;
      client.nickname = clientDetails.nickname;
      client.nip = clientDetails.nip;
      client.regon = clientDetails.regon;
      client.voivodeship = clientDetails.voivodeship;
      client.city = clientDetails.city;
      client.zip_code = clientDetails.zip;
      client.street = clientDetails.street;
      client.tel_number = clientDetails.tel;
      clientRepository.modify(client);
    }
  }

  return (
    <View style={styleItemDetails.containerAdd}>
      <ClientForm
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        loadingStatus={loadingStatus}
        fillData={() => {}}
        disableFillData={true}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={editClient} mode="contained">
        Edit client
      </Button>
    </View>
  );
}
