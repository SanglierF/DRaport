import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductAddScreen({ navigation, route }: any) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Product add screen: {route.params.productId} </Text>
    </View>
  )
}
