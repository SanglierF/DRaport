import * as React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function HomeScreen({navigation}: any) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
      title="Go to ProductList"
      onPress={() => navigation.navigate('Products')}
      />
    </View>
  )
}
