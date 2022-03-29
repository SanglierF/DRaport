import * as React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useQuery } from "react-query";
import styleForm from "../../styles/styleForm";

export default function ClientForm({clientDetails, setClientDetails, disableFillData=true}) {
  const [loadingStatus, setLoadingStatus] = React.useState(false);

  const handleChange = (key, value) => {
    setClientDetails({ ...clientDetails, [key]: value });
  };

  function fillData() {
    setLoadingStatus(true);
    refetch();
  }

  async function axi() {
    //pKluczUzytkownika: "_S7$@3V^4)9T_DKZz*T_"
    return await axios({
      method: "post",
      url: "https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/Zaloguj",
      data: {
        pKluczUzytkownika: "_S7$@3V^4)9T_DKZz*T_",
      },
    })
      .then((r) => r.data.d)
      .then((sessionId) => {
        return axios({
          method: "post",
          url: "https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/daneSzukaj",
          headers: {
            sid: sessionId,
          },
          data: {
            jestWojPowGmnMiej: true,
            pParametryWyszukiwania: {
              Nip: 5252344078,
              PrzewazajacePKD: false,
            },
          },
        });
      });
  }

  const { refetch } = useQuery("gusinfo", async () => axi(), {
    enabled: false,
    onSuccess: (result) => {
      console.log(result.data.d); // success
      setLoadingStatus(false);
    },
    onError: (error) => {
      console.log(error);
      setLoadingStatus(false);
    },
    onSettled: () => {
      console.log("xdd");
      setLoadingStatus(false);
    },
  });

  return (
    <View style={styleForm.containerForm}>
      <View style={styleForm.containerInputs}>
        {loadingStatus ? <Text>'Loading data from GUS...'</Text> : null}
        <TextInput
          style={styleForm.textInput}
          label="Client name"
          mode="outlined"
          value={clientDetails.name}
          onChangeText={(newName) => handleChange("name", newName)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="nickname"
          mode="outlined"
          value={clientDetails.nickname}
          onChangeText={(newNickname) => handleChange("nickname", newNickname)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client nip"
          mode="outlined"
          value={clientDetails.nip}
          onChangeText={(newNip) => handleChange("nip", newNip)}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client regon"
          mode="outlined"
          value={clientDetails.regon}
          onChangeText={(newRegon) => handleChange("regon", newRegon)}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client voivodeship"
          mode="outlined"
          value={clientDetails.voivodeship}
          onChangeText={(newVoivodeship) => handleChange("voivodeship", newVoivodeship)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client city"
          mode="outlined"
          value={clientDetails.city}
          onChangeText={(newCity) => handleChange("city", newCity)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client zip"
          mode="outlined"
          value={clientDetails.zip}
          onChangeText={(newZip) => handleChange("zip", newZip)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client street"
          mode="outlined"
          value={clientDetails.street}
          onChangeText={(newStreet) => handleChange("street", newStreet)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Client tel number"
          mode="outlined"
          value={clientDetails.tel}
          onChangeText={(newTel) => handleChange("tel", newTel)}
          autoComplete="off"
        />
      </View>
      { disableFillData? null: <Button style={styleForm.buttonAdd} onPress={fillData} mode="contained">
        Fill data
      </Button>}
    </View>
  );
}
