import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import styleForm from "../../styles/styleForm";
import { priceValidation } from "../../utils/validators";

export default function ProductForm({ productDetails, submitProduct, submitText = "Submit" }) {
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
      price: "",
      image: "",
    },
  });
  const onSubmit = (data) => submitProduct(data);

  React.useEffect(() => {
    setValue("name", productDetails.name);
    setValue("price", productDetails.price);
  }, [productDetails, setValue]);

  //TODO add custom validator to price
  return (
    <ScrollView style={styleForm.containerForm}>
      <Image
        style={styleForm.image}
        source={require("../../assets/icon.png")}
        accessibilityIgnoresInvertColors={true}
      />
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
              error={errors.name ? true : false}
            />
          )}
          name="name"
        />
        {errors.name ? <Text style={{ color: "red" }}>Nickname required</Text> : null}
      </View>
      <View style={styleForm.containerInputs}>
        <Text style={styleForm.textLabel}>Price</Text>
        <Controller
          control={control}
          rules={{ required: false, maxLength: 20, validate: priceValidation }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Price"
              mode="outlined"
              onChangeText={onChange}
              autoComplete="off"
              onBlur={onBlur}
              value={value}
              keyboardType="decimal-pad"
              error={errors.price ? true : false}
            />
          )}
          name="price"
        />
        {errors.price ? <Text style={{ color: "red" }}>Price required</Text> : null}
      </View>
      <Button
        style={styleForm.buttonAdd}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        disabled={!productDetails.fetched}
      >
        {submitText}
      </Button>
    </ScrollView>
  );
}
