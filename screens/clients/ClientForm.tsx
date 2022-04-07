import * as React from "react";
import { Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import styleForm from "../../styles/styleForm";
import ClientType from "./ClientType";
import useGUSRefetch from "./apiGUS";

export default function ClientForm({
  clientDetails,
  submitAction,
  submitText = "Submit",
  disableFillData = true,
  disableSubmit = false,
}: {
  clientDetails: ClientType;
  submitAction: Function;
  disableFillData: boolean;
  disableSubmit: boolean;
  submitText: string;
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
      name: "",
      nickname: "",
      nip: "",
      regon: "",
      voivodeship: "",
      city: "",
      zip: "",
      street: "",
      tel: "",
    },
  });
  const onSubmit = (data) => submitAction(data);
  const [loadingStatus, setLoadingStatus] = React.useState(false); //TODO change showing from text to some floating thingy
  const fetchGUSData = useGUSRefetch(setLoadingStatus);

  React.useEffect(() => {
    setValue("nickname", clientDetails.nickname);
    setValue("name", clientDetails.name);
    setValue("nip", clientDetails.nip);
    setValue("regon", clientDetails.regon);
    setValue("voivodeship", clientDetails.tel);
    setValue("city", clientDetails.tel);
    setValue("zip", clientDetails.tel);
    setValue("street", clientDetails.tel);
  }, [setValue, clientDetails]);

  function fillData() {
    setLoadingStatus(true);
    const response = fetchGUSData();
    console.log(response);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Controller
        control={control}
        rules={{ required: true, maxLength: 50 }}
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
      <Controller
        control={control}
        rules={{ required: false, maxLength: 50 }}
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
      <Controller
        control={control}
        rules={{ required: false, maxLength: 50 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleForm.textInput}
            label="Voivodeship"
            mode="outlined"
            onChangeText={onChange}
            autoComplete="off"
            onBlur={onBlur}
            value={value}
            error={errors.name ? true : false}
          />
        )}
        name="voivodeship"
      />
      <Controller
        control={control}
        rules={{ required: false, maxLength: 50 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleForm.textInput}
            label="City"
            mode="outlined"
            onChangeText={onChange}
            autoComplete="off"
            onBlur={onBlur}
            value={value}
            error={errors.name ? true : false}
          />
        )}
        name="city"
      />
      <Controller
        control={control}
        rules={{ required: false, maxLength: 10 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleForm.textInput}
            label="Zip code"
            mode="outlined"
            onChangeText={onChange}
            autoComplete="off"
            onBlur={onBlur}
            value={value}
            error={errors.name ? true : false}
          />
        )}
        name="zip"
      />
      <Controller
        control={control}
        rules={{ required: false, maxLength: 50 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleForm.textInput}
            label="Street"
            mode="outlined"
            onChangeText={onChange}
            autoComplete="off"
            onBlur={onBlur}
            value={value}
            error={errors.name ? true : false}
          />
        )}
        name="street"
      />
      <Controller
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleForm.textInput}
            label="Phone number"
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
      <View style={styleForm.containerInputs}>
        {loadingStatus ? <Text>&aposLoading data from GUS...&apos</Text> : null}
      </View>
      {disableFillData ? null : (
        <Button style={styleForm.buttonAdd} onPress={fillData} mode="contained">
          Fill data
        </Button>
      )}
      <Button
        style={styleForm.buttonAdd}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        disabled={disableSubmit}
      >
        {submitText}
      </Button>
    </ScrollView>
  );
}
