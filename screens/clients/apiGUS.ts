import axios from "axios";
import { useQuery } from "react-query";

export default function useGUSRefetch(setLoadingData: Function) {
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
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("xdd");
    },
  });

  async function fetchGUS() {
    const results = await refetch();
    setLoadingData(false);
    return results;
  }

  return fetchGUS;
}
