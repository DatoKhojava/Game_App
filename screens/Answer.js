import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Questions from "./Questions";
import Description from "./Description";

export default function Answer({
  questionId,
  setQuestionId,
  playerOne,
  setPlayerOne,
  playerTwo,
  setPlayerTwo,
  setCountdownTimer,
  endingScene,
}) {
  const [value, onChangeText] = useState("");
  //   const [inputField, setInputField] = useState(false);

  function earlyAnswer() {
    setCountdownTimer(10);
  }

  return (
    <ScrollView>
      <TouchableOpacity style={styles.answer} onPress={() => earlyAnswer()}>
        <Text>ვადამდელი პასუხი</Text>
      </TouchableOpacity>

      {/* {inputField && (
        <TextInput
          style={styles.inputFill}
          onChangeText={(text) => onChangeText(text)}
          onSubmitEditing={() => chackEarlyAnswer()}
          value={value}
        />
      )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  answer: {
    margin: 20,
    padding: 15,
    alignSelf: "center",
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  inputFill: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 150,
    alignSelf: "center",
  },
});
