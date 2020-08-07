import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import CountDown from "react-native-countdown-component";
import Questions from "./Questions";
import Description from "./Description";
import Answer from "./Answer";

export default function PlayScreen({ navigation }) {
  const [questionId, setQuestionId] = useState(0);
  const [playerOne, seplayerOne] = useState(0);
  const [playerTwo, setPlayerTwo] = useState(0);
  const [countdownTimer, setCountdownTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [hideDescription, setHideDescription] = useState(false);
  const [hideAnswer, setHideAnswer] = useState(false);
  const [disabledAnswers, setDisabledAnswers] = useState(false);
  const [answerPressed, setAnswerPressed] = useState(false);
  const [earlyAnswer, setEarlyAnswer] = useState(true);
  //answer states
  const [answerA, setAnswerA] = useState(false);
  const [answerB, setAnswerB] = useState(false);
  const [answerC, setAnswerC] = useState(false);
  const [answerD, setAnswerD] = useState(false);

  useEffect(() => {
    Alert.alert(
      "გაეცანით წესებს",
      "გმადლობთ რომ სარგებლობთ შვენი აპლიკაციით! აპლიკაცია არის ცნობილი თამაშის რა სად როდის - ის პროტოტიპი, აპლიკაციაში შეტანილია რეალური სირთულის კითხვები თქვენ გეძლევად 60 წამი თითო კითხვისთვის 50 წამი საფიქრელად ხოლო დარჩენილ 10 წამში ეკრანზე გამოჩდება სავარაუდო პასუხები, პასუხის ვერ გაცემის შემთხვევაში ქულა ჩაეთვლება მოწინააღმდეგეს.შეგახსენებთ თამაში მიმდინარეობს 6 ქულამმდე",
      [{ text: "OK", onPress: () => setIsActive(!isActive) }],
      { cancelable: false }
    );
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(
        () => setCountdownTimer((countdownTimer) => countdownTimer - 1),
        1000
      );
    } else if (!isActive && countdownTimer !== 0) {
      clearInterval(interval);
    }

    if (countdownTimer <= 0) {
      if (playerTwo === 5) {
        Alert.alert(
          "მარცხი !!!! ",
          "თქვენ დამარცხდით",
          [{ text: "OK", onPress: () => endingScene() }],
          { cancelable: false }
        );
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, countdownTimer]);

  useEffect(() => {
    setDisabledAnswers(false);
    if (countdownTimer <= 10) {
      setHideAnswer(true);
      setEarlyAnswer(false);
    } else {
      setHideAnswer(false);
      setEarlyAnswer(true);
    }

    if (countdownTimer <= 0) {
      setHideDescription(true);
      setDisabledAnswers(true);
      setCountdownTimer(0);
    } else {
      setHideDescription(false);
    }
  }, [countdownTimer]);

  const endingScene = () => {
    navigation.navigate("Home");
  };

  function answerBackground() {
    if (Questions[questionId].correctAnswer === "a") {
      setAnswerA(true);
      setAnswerB(false);
      setAnswerC(false);
      setAnswerD(false);
    } else if (Questions[questionId].correctAnswer === "b") {
      setAnswerA(false);
      setAnswerB(true);
      setAnswerC(false);
      setAnswerD(false);
    } else if (Questions[questionId].correctAnswer === "c") {
      setAnswerA(false);
      setAnswerB(false);
      setAnswerC(true);
      setAnswerD(false);
    } else if (Questions[questionId].correctAnswer === "d") {
      setAnswerA(false);
      setAnswerB(false);
      setAnswerC(false);
      setAnswerD(true);
    }
  }

  function checkAnswer(curr) {
    answerBackground();
    setAnswerPressed(true);
    if (Questions[questionId].correctAnswer == curr) {
      if (playerOne === 5) {
        Alert.alert(
          "გილოცავთ!!!! ",
          "თქვენ გაიმარჯვეთ",
          [{ text: "OK", onPress: () => endingScene() }],
          { cancelable: false }
        );
      }
      seplayerOne(playerOne + 1);
      setCountdownTimer(0);
    } else {
      if (playerTwo === 5) {
        Alert.alert(
          "მარცხი !!!! ",
          "თქვენ დამარცხდით",
          [{ text: "OK", onPress: () => endingScene() }],
          { cancelable: false }
        );
      }
      setPlayerTwo(playerTwo + 1);
      setCountdownTimer(0);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.timerItem}>
          <Text>{countdownTimer}</Text>
        </View>
        <View style={styles.scoreBar}>
          <Text style={styles.scoreBarItem}>{playerOne}</Text>
          <Text style={styles.scoreBarItem}>:</Text>
          <Text style={styles.scoreBarItem}>{playerTwo}</Text>
        </View>
        <View style={styles.questionBar}>
          <Text style={styles.question}>{Questions[questionId].title}</Text>
        </View>
        <View style={styles.answersBar}>
          <TouchableOpacity
            onPress={() => checkAnswer("a")}
            disabled={disabledAnswers}
          >
            {hideAnswer && (
              <Text
                style={
                  answerA ? styles.answersBarItemGreen : styles.answersBarItem
                }
                // style={[
                //   styles.default,
                //   setAnswerA || setAnswerB || setAnswerC || setAnswerD
                //     ? {
                //         width: "100%",
                //         alignSelf: "center",
                //         padding: 25,
                //         borderColor: "#bbb",
                //         borderWidth: 1,
                //         borderStyle: "dashed",
                //         borderRadius: 10,
                //         margin: 5,
                //       }
                //     : {
                //         width: "100%",
                //         alignSelf: "center",
                //         padding: 25,
                //         borderColor: "#bbb",
                //         borderWidth: 1,
                //         borderStyle: "dashed",
                //         borderRadius: 10,
                //         margin: 5,
                //         backgroundColor: "#f00",
                //       },
                // ]}
                // style={styles.answersBarItem}
              >
                {Questions[questionId].answers.a}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkAnswer("b")}
            disabled={disabledAnswers}
          >
            {hideAnswer && (
              <Text
                style={
                  answerB ? styles.answersBarItemGreen : styles.answersBarItem
                }
              >
                {Questions[questionId].answers.b}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkAnswer("c")}
            disabled={disabledAnswers}
          >
            {hideAnswer && (
              <Text
                style={
                  answerC ? styles.answersBarItemGreen : styles.answersBarItem
                }
              >
                {Questions[questionId].answers.c}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkAnswer("d")}
            disabled={disabledAnswers}
          >
            {hideAnswer && (
              <Text
                style={
                  answerD ? styles.answersBarItemGreen : styles.answersBarItem
                }
              >
                {Questions[questionId].answers.d}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {earlyAnswer && <Answer setCountdownTimer={setCountdownTimer} />}
        {hideDescription && (
          <Description
            endingScene={endingScene}
            playerTwo={playerTwo}
            setPlayerTwo={setPlayerTwo}
            questionId={questionId}
            setQuestionId={setQuestionId}
            setCountdownTimer={setCountdownTimer}
            answerPressed={answerPressed}
            setAnswerPressed={setAnswerPressed}
            setAnswerA={setAnswerA}
            setAnswerB={setAnswerB}
            setAnswerC={setAnswerC}
            setAnswerD={setAnswerD}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    height: "100%",
  },
  timerItem: {
    alignSelf: "flex-end",
    margin: 5,
  },
  timer: {
    padding: 5,
    margin: 15,
  },
  scoreBar: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 50,
  },
  scoreBarItem: {
    padding: "1%",
    fontSize: 40,
    fontWeight: "bold",
  },
  questionBar: {
    width: "92%",
    alignSelf: "center",
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  question: {
    padding: 10,
    fontWeight: "bold",
  },
  answersBar: {
    padding: 15,
  },
  answersBarItem: {
    width: "100%",
    alignSelf: "center",
    padding: 25,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    margin: 5,
  },
  answersBarItemRed: {
    width: "100%",
    alignSelf: "center",
    padding: 25,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#f00",
  },
  answersBarItemGreen: {
    width: "100%",
    alignSelf: "center",
    padding: 25,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#0f0",
  },
  correctAnswer: {
    backgroundColor: "#f00",
  },
});
