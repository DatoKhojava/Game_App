import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/rube.png")}
        style={{
          resizeMode: "contain",
          width: "100%",
        }}
      />
      <Text style={styles.text}>
        საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად
        1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის
        საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე
        შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად
        მოაღწია.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
  },
});
