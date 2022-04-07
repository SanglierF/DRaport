import * as React from "react";
import { View } from "react-native";
import LocalDatabase from "../../database/LocalDatabase";
import ClientForm from "./ClientForm";

const localDb = LocalDatabase.getInstance();

export default function ClientAddScreen({ navigation }: any) {
  const [clientDetails] = React.useState({
    name: "",
    nickname: "",
    nip: "",
    regon: "",
    voivodeship: "",
    city: "",
    zip: "",
    street: "",
    tel: "",
    fetched: true,
  });

  function addClient(data) {
    const newClient = localDb.clientRepository.create({
      nickname: data.nickname,
      name: data.name,
      nip: data.nip,
      regon: data.regon,
      voivodeship: data.voivodeship,
      city: data.city,
      zip_code: data.zip,
      street: data.street,
      tel_number: data.tel,
    });
    localDb.clientRepository.save(newClient);
    console.log(newClient);
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <ClientForm
        clientDetails={clientDetails}
        submitAction={addClient}
        disableFillData={false}
        disableSubmit={false}
        submitText={"Add client"}
      />
    </View>
  );
}
