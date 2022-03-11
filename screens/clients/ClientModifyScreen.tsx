import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleItemDetails from "../../styles/styleItemDetails";

export default function ClientModifyScreen({ route }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);

  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    clientRepository.findById(route.params.clientId).then(
      (found) => {
        setClient(found);
        setName(found.name);
        setNickname(found.nickname);
      },
      () => {}
    );
  }, []);

  function editClient() {
    if (name && nickname) {
      client.name = name;
      client.nickname = nickname;
      client.nip = nip;
      client.regon = regon;
      client.voivodeship = voivodeship;
      client.city = city;
      client.zip_code = zip;
      client.street = street;
      client.tel_number = tel;
      clientRepository.modify(client);
    }
  }

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [voivodeship, setVoivodeship] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [tel, setTel] = React.useState("");

  return (
    <View style={styleItemDetails.containerAdd}>
      <View style={styleItemDetails.containerInputs}>
        <TextInput
          style={styleItemDetails.textInput}
          label="Client name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client nickname"
          mode="outlined"
          value={nickname}
          onChangeText={setNickname}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client nip"
          mode="outlined"
          value={nip}
          onChangeText={setNip}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client regon"
          mode="outlined"
          value={regon}
          onChangeText={setRegon}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client voivodeship"
          mode="outlined"
          value={voivodeship}
          onChangeText={setVoivodeship}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client city"
          mode="outlined"
          value={city}
          onChangeText={setCity}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client zip"
          mode="outlined"
          value={zip}
          onChangeText={setZip}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client street"
          mode="outlined"
          value={street}
          onChangeText={setStreet}
          autoComplete="off"
        />
        <TextInput
          style={styleItemDetails.textInput}
          label="Client tel number"
          mode="outlined"
          value={tel}
          onChangeText={setTel}
          autoComplete="off"
        />
      </View>
      <Button style={styleItemDetails.buttonAdd} onPress={editClient} mode="contained">
        Edit client
      </Button>
    </View>
  );
}
