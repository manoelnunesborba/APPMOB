import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>WSHHH LEKIPPPPPP</Text>
      <StatusBar style="auto" />
      <Button
        title="Appuyez ici pour continuer"
        onPress={() => Alert.alert('HAHA GOT YOU')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
