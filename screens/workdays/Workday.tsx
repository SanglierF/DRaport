import * as React from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { List, Button, FAB, Divider, Modal } from "react-native-paper";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import DbContext from "../../DbContext";
import ClientRepository from "../../database/repositories/ClientRepository";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function Workday({ navigation, route }: any) {
  return (
    <View>
      <Text>Przykladowy dzien</Text>
      <Text>route.params.workdayId</Text>
    </View>
  );
}
