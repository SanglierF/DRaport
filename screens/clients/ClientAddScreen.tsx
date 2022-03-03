import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useQuery } from "react-query";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleClientDetails from "./styleClientDetails";
import { nameValidation, priceValidation } from "../../components/Validators";

export default function ClientAddScreen({ navigation, route }: any) {
  const context = React.useContext(DbContext);
  const clientRepository = new ClientRepository(context.dbConnection);
  const [loadingStatus, setLoadingStatus] = React.useState(false);

  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [regon, setRegon] = React.useState("");
  const [voivodeship, setVoivodeship] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [tel, setTel] = React.useState("");


  function addClient() {
    const validFields =
      nameValidation(name) && nameValidation(nickname) ? true : false;

    if (validFields) {
      const newClient = clientRepository.create({
        nickname: nickname,
        name: name,
        nip: nip,
        regon: regon,
        voivodeship: voivodeship,
        city: city,
        zip_code: zip,
        street: street,
        tel_number: tel,
      });
      clientRepository.save(newClient);
      console.log(newClient);
      navigation.goBack();
    }
  }

  function fillData() {
    setLoadingStatus(true);
    refetch();
  }

  async function axi() { //pKluczUzytkownika: "_S7$@3V^4)9T_DKZz*T_"
    return await axios({
      method: "post",
      url:
        "https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/Zaloguj",
      data: {
        pKluczUzytkownika: "_S7$@3V^4)9T_DKZz*T_"
      }
    })
      .then(r => r.data.d)
      .then(sessionId => {
        return axios({
          method: "post",
          url:
            "https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/daneSzukaj",
          headers: {
            sid: sessionId
          },
          data: {
            jestWojPowGmnMiej: true,
            pParametryWyszukiwania: {
              Nip: 5252344078,
              PrzewazajacePKD: false
            }
          }
        });
      });
  }

  const { refetch } = useQuery("gusinfo", async () => axi(), {
    enabled: false,
    onSuccess: result => {
      console.log(result.data.d); // success
      setLoadingStatus(false);
    },
    onError: error => {
      console.log(error);
      setLoadingStatus(false);
    }
  });

  return (
    <View style={styleAdd.containerAdd}>
      <View style={styleAdd.containerInputs}>
        {loadingStatus ? <Text>'Loading data from GUS...'</Text> : null}
        <TextInput
          style={styleAdd.textInput}
          label="Client name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client nickname"
          mode="outlined"
          value={nickname}
          onChangeText={setNickname}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client nip"
          mode="outlined"
          value={nip}
          onChangeText={setNip}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client regon"
          mode="outlined"
          value={regon}
          onChangeText={setRegon}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client voivodeship"
          mode="outlined"
          value={voivodeship}
          onChangeText={setVoivodeship}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client city"
          mode="outlined"
          value={city}
          onChangeText={setCity}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client zip"
          mode="outlined"
          value={zip}
          onChangeText={setZip}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client street"
          mode="outlined"
          value={street}
          onChangeText={setStreet}
          autoComplete="off"
        />
        <TextInput
          style={styleAdd.textInput}
          label="Client tel number"
          mode="outlined"
          value={tel}
          onChangeText={setTel}
          autoComplete="off"
        />
      </View>
      <Button style={styleAdd.buttonAdd} onPress={addClient} mode="contained">
        Add client
      </Button>
      <Button style={styleAdd.buttonAdd} onPress={fillData} mode="contained">
        Fill data
      </Button>
    </View>
  );
}

const styleAdd = styleClientDetails;
