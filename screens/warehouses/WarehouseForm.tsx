import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import styleForm from "../../styles/styleForm";

export default function WarehouseForm({
  warehouseDetails,
  submitWarehouse,
  submitText = "Submit",
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nickname: "",
      name: "",
      nip: "",
      regon: "",
      tel: "",
      email: "",
    },
  });
  const onSubmit = (data) => submitWarehouse(data);

  React.useEffect(() => {
    setValue("nickname", warehouseDetails.nickname);
    setValue("name", warehouseDetails.name);
    setValue("nip", warehouseDetails.nip);
    setValue("regon", warehouseDetails.regon);
    setValue("tel", warehouseDetails.tel);
    setValue("email", warehouseDetails.email);
  }, [setValue, warehouseDetails]);

  return (
    <ScrollView style={styleForm.containerForm}>
      <View style={styleForm.containerInputs}>
        <Text style={styleForm.textLabel}>Nickname</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Nickname"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              error={errors.nickname ? true : false}
            />
          )}
          name="nickname"
        />
        {errors.nickname ? <Text style={{ color: "red" }}>Required</Text> : null}
        <Text style={styleForm.textLabel}>Name</Text>
        <Controller
          control={control}
          rules={{ required: false, maxLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Name"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              error={errors.name ? true : false}
            />
          )}
          name="name"
        />
        <Text style={styleForm.textLabel}>NIP</Text>
        <Controller
          control={control}
          rules={{ required: false, maxLength: 9 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="NIP"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              keyboardType="decimal-pad"
              error={errors.nip ? true : false}
            />
          )}
          name="nip"
        />
        <Text style={styleForm.textLabel}>Regon</Text>
        <Controller
          control={control}
          rules={{ maxLength: 9 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Regon"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              keyboardType="decimal-pad"
              error={errors.regon ? true : false}
            />
          )}
          name="regon"
        />
        <Text style={styleForm.textLabel}>Telephone number</Text>
        <Controller
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Tel number"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              error={errors.tel ? true : false}
            />
          )}
          name="tel"
        />
        <Text style={styleForm.textLabel}>Email</Text>
        <Controller
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Email"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              error={errors.email ? true : false}
            />
          )}
          name="email"
        />
      </View>
      <Button
        style={styleForm.buttonAdd}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        disabled={!warehouseDetails.fetched} //TODO change to separate var/function
      >
        {submitText}
      </Button>
    </ScrollView>
  );
}
