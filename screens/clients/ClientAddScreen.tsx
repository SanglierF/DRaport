import * as React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useQuery } from "react-query";
import LocalDatabase from "../../database/LocalDatabase";
import ClientRepository from "../../database/repositories/ClientRepository";
import styleItemDetails from "../../styles/styleItemDetails";
import { nameValidation } from "../../components/Validators";
import ClientForm from "./ClientForm";

export default function ClientAddScreen({ navigation }: any) {
  const localDb = LocalDatabase.getInstance();
  const clientRepository = new ClientRepository(localDb.dbConnection);

  const [loadingStatus, setLoadingStatus] = React.useState(false);
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
    <View style={{flex: 1}}>
      <ClientForm
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        loadingStatus={loadingStatus}
        fillData={() => {
          fillData();
        }}
        disableFillData={false}
      />
      <Button style={styleItemDetails.buttonAdd} onPress={addClient} mode="contained">
        Add client
      </Button>
    </View>
  );
}
