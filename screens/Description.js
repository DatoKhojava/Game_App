import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import Questions from "./Questions";

export default function Description({
  playerTwo,
  setPlayerTwo,
  questionId,
  setQuestionId,
  setCountdownTimer,
  answerPressed,
  setAnswerPressed,
  setAnswerA,
  setAnswerB,
  setAnswerC,
  setAnswerD,
  endingScene,
}) {
  const nextQuestion = () => {
    if (playerTwo === 5) {
      Alert.alert(
        "მარცხი !!!! ",
        "თქვენ დამარცხდით",
        [{ text: "OK", onPress: () => endingScene() }],
        { cancelable: false }
      );
    } else {
      if (answerPressed == false) {
        setPlayerTwo(playerTwo + 1);
        setQuestionId(questionId + 1);
        setCountdownTimer(60);
      } else {
        setQuestionId(questionId + 1);
        setCountdownTimer(60);
      }
    }
    setAnswerPressed(false);
    //answers reset
    setAnswerA(false);
    setAnswerB(false);
    setAnswerC(false);
    setAnswerD(false);
  };

  return (
    <ScrollView style={styles.description}>
      <Text>{Questions[questionId].description}</Text>
      <TouchableOpacity onPress={() => nextQuestion()}>
        <Text style={styles.button}>შემდეგი</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    padding: 15,
  },
  button: {
    margin: 15,
    fontWeight: "bold",
    alignSelf: "flex-end",
    borderWidth: 1,
    padding: 15,
  },
});
