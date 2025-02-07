import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Velkommen til ClimaSense!</Text>
      <Button title="Se vejrudsigten" onPress={() => navigation.navigate("Weather")} />
    </View>
  );
}
