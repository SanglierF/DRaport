import axios from "axios";
import { useQuery } from "react-query";
let gusKey: string = null;

export default function useGUSRefetch(nip: string, setLoadingData: Function) {
  async function axi() {
    return await axios({
      method: "post",
      url: "https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc/ajaxEndpoint/Zaloguj",
      data: {
        pKluczUzytkownika: gusKey,
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
              Nip: nip, //5252344078
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
    const pKluczUzytkownika = String.fromCharCode(...charArray).slice(19, -1);
    gusKey = pKluczUzytkownika;
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
      console.log("Finished");
    },
  });

  async function fetchGUS() {
    if (nip.length < 10) return null;
    if (!gusKey) {
      await getGusKey();
    }
    const results = await refetch();
    setLoadingData(false);
    return results;
  }

  return fetchGUS;
}
