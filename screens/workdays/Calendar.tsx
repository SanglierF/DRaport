import * as React from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function Calendar({ navigation, route }: any) {
  function goToWorkday(date: string) {
    console.log(date);
    const workdayId = 0;
    // navigation.navigate("Workday", {workdayId: workdayId})
  }

  return (
    <Button
      onPress={() => {
        goToWorkday("testczydiala");
      }}
    >
      Test workday
    </Button>
  );
}
