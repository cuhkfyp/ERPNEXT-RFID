import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { Alert } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Button title="Click Me" onPress={() => Alert.alert("Button Pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }, */
});
