import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button} from "react-native-paper";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleClientDetails from "./styleClientDetails";

export default function ClientModifyScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const clientRepository = new ClientRepository(context.dbConnection);

  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    clientRepository.findById(route.params.clientId).then(
      found => {
        setClient(found);
        setName(found.name);
        setPrice(found.nickname);
      },
      () => {}
    );
  }, []);

  function editClient() {

    if (name && nickname) {
      client.name = name;
      client.nickname = nickname;
      clientRepository.modify(client);
    }
  }

  const [name, setName] = React.useState("");
  const [nickname, setPrice] = React.useState("");

  return (
    <View style={styleModify.containerAdd}>
      <View style={styleModify.containerInputs}>
      <TextInput style={styleModify.textInput} label="Client name" mode='outlined' value={name} onChangeText={setName} autoComplete='off'/>
      <TextInput style={styleModify.textInput} label="Client nickname" mode='outlined' value={nickname} onChangeText={setPrice} autoComplete='off'/>
      </View>
      <Button style={styleModify.buttonAdd} onPress={editClient} mode='contained'>
      Edit client
      </Button>
    </View>
  );
}

const styleModify = styleClientDetails;
