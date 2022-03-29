import * as React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";
import ClientForm from "./ClientForm";

export default function ClientAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);


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

  function addClient() {
    // const validFields = nameValidation(name) && nameValidation(nickname) ? true : false;

    if (true) {
      //validFields
      const newClient = clientRepository.create({
        nickname: clientDetails.nickname,
        name: clientDetails.name,
        nip: clientDetails.nip,
        regon: clientDetails.regon,
        voivodeship: clientDetails.voivodeship,
        city: clientDetails.city,
        zip_code: clientDetails.zip,
        street: clientDetails.street,
        tel_number: clientDetails.tel,
      });
      clientRepository.save(newClient);
      console.log(newClient);
      navigation.goBack();
    }
  }



  return (
    <View style={{flex: 1}}>
      <ClientForm
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        disableFillData={false}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={addClient} mode="contained">
        Add client
      </Button>
    </View>
  );
}
