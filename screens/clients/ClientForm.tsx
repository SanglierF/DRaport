import * as React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styleForm from "../../styles/styleForm";

export default function ClientForm({clientDetails, setClientDetails, loadingStatus, fillData=()=>{}, disableFillData=true}) {
  const handleChange = (key, value) => {
    setClientDetails({ ...clientDetails, [key]: value });
  };

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
