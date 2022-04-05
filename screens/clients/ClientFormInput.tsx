import * as React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styleForm from "../../styles/styleForm";
import ClientType from "./ClientType";

export default function ClientFormInput({
  clientDetails,
  setClientDetails,
}: {
  clientDetails: ClientType;
  setClientDetails: any;
}) {
  const [keyArray, setKeyArray] = React.useState([
    "name",
    "nickname",
    "nip",
    "regon",
    "voivodeship",
    "city",
    "zip",
    "street",
    "tel",
  ]);

  const handleChange = (key, value) => {
    setClientDetails({ ...clientDetails, [key]: value });
  };

  return (
    <View>
      {keyArray.map((key) => {
        return (
          <TextInput
          key={key}
            style={styleForm.textInput}
            label={`Client ${key}`}
            mode="outlined"
            value={clientDetails[key]}
            onChangeText={(changedText) => handleChange(key, changedText)}
            autoComplete="off"
          />
        );
      })}
    </View>
  );
}
