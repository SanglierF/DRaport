import * as React from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styleForm from "../../styles/styleForm";

export default function WarehouseForm({ warehouseDetails, setWarehouseDetails }) {
  const handleChange = (key, value) => {
    setWarehouseDetails({ ...warehouseDetails, [key]: value });
  };

  return (
    <View style={styleForm.containerForm}>
      <View style={styleForm.containerInputs}>
        <TextInput
          style={styleForm.textInput}
          label="Warehouse nickname"
          mode="outlined"
          value={warehouseDetails.nickname}
          onChangeText={(newNickname) => handleChange("nickname", newNickname)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Warehouse name"
          mode="outlined"
          value={warehouseDetails.name}
          onChangeText={(newName) => handleChange("name", newName)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Warehouse nip"
          mode="outlined"
          value={warehouseDetails.nip}
          onChangeText={(newNip) => handleChange("nip", newNip)}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleForm.textInput}
          label="Warehouse regon"
          mode="outlined"
          value={warehouseDetails.regon}
          onChangeText={(newRegon) => handleChange("regon", newRegon)}
          autoComplete="off"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styleForm.textInput}
          label="Warehouse tel_number"
          mode="outlined"
          value={warehouseDetails.tel}
          onChangeText={(newTel) => handleChange("tel", newTel)}
          autoComplete="off"
        />
        <TextInput
          style={styleForm.textInput}
          label="Warehouse email"
          mode="outlined"
          value={warehouseDetails.email}
          onChangeText={(newEmail) => handleChange("email", newEmail)}
          autoComplete="off"
        />
      </View>
    </View>
  );
}
