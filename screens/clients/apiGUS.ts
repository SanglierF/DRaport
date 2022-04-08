import axios from "axios";
import { useQuery } from "react-query";
import { DOMParser } from "xmldom";
let gusKey: string = null;

export default function useGUSRefetch(setLoadingData: Function) {
  async function axi() {
    //pKluczUzytkownika: "_S7$@3V^4)9T_DKZz*T_
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

  async function getGusKey() {
    const response = await axios.get("https://wyszukiwarkaregon.stat.gov.pl/appBIR/index.aspx");
    const document = response.data;
    const docEnd = document.slice(-600).split("script");
    const script = docEnd[2];
    const charsString = script.split("eval(String.fromCharCode(")[1].split(")")[0];
    const charArray = charsString.split(",").map((charC) => Number(charC));
    let pKluczUzytkownika = "";
    console.log(String.fromCharCode(...charArray));
  ]
    console.log(pKluczUzytkownika);
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
    if (!gusKey) {
      await getGusKey();
    }
    // const results = await refetch();
    setLoadingData(false);
    return "hrh";
  }

  return fetchGUS;
}
