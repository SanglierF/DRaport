import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text } from "react-native";
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
    <View style={styleForm.containerForm}>
      <View>
        <Image
          style={styleForm.image}
          source={require("../../assets/icon.png")}
          accessibilityIgnoresInvertColors={true}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Product nickname"
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
        {errors.name ? <Text style={{ color: "red" }}>Required</Text> : null}
        <Controller
          control={control}
          rules={{ required: false, maxLength: 20, validate: priceValidation }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styleForm.textInput}
              label="Product price"
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
      </View>
      <Button
        style={styleForm.buttonAdd}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        disabled={!productDetails.fetched}
      >
        {submitText}
      </Button>
    </View>
  );
}
