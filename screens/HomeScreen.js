import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("../assets/brain.png")}
            style={{
              resizeMode: "contain",
              width: 300,
              height: 300,
              margin: 100,
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Play")}
        style={{
          padding: 20,
          margin: 15,
          borderWidth: 5,
          borderRadius: 50,
          borderColor: "#ff80b3",
        }}
      >
        <Text
          style={{
            width: 100,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 27,
          }}
        >
          Play
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("About")}
        style={{
          padding: 20,
          margin: 15,
          borderWidth: 5,
          borderRadius: 50,
          borderColor: "#ff80b3",
        }}
      >
        <Text
          style={{
            width: 100,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 27,
          }}
        >
          About
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
