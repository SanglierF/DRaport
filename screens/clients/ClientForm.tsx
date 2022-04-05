import * as React from "react";
import { Text, View, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useQuery } from "react-query";
import ClientFormInput from "./ClientFormInput";
import styleForm from "../../styles/styleForm";
import ClientType from "./ClientType";

export default function ClientForm({
  clientDetails,
  setClientDetails,
  disableFillData = true,
}: {
  clientDetails: ClientType;
  setClientDetails: any;
  disableFillData: boolean;
}) {
  const [loadingStatus, setLoadingStatus] = React.useState(false);

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
    <ScrollView style={{flex: 1}}>
      <View style={styleForm.containerInputs}>
        {loadingStatus ? <Text>'Loading data from GUS...'</Text> : null}
        <ClientFormInput clientDetails={clientDetails} setClientDetails={setClientDetails} />
      </View>
      {disableFillData ? null : (
        <Button style={styleForm.buttonAdd} onPress={fillData} mode="contained">
          Fill data
        </Button>
      )}
    </ScrollView>
  );
}
