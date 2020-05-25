import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CountDown from "react-native-countdown-component";
import Questions from "./Questions";

export default function PlayScreen({ navigation }) {
  const [questionId, setQuestionId] = useState(0);
  const [playerOne, seplayerOne] = useState(0);
  const [playerTwo, setplayerTwo] = useState(0);
  const [countdownTimer, setCountdownTimer] = useState(90);
  const [isRunning, setIsRunning] = useState(false);

  const timerTriger = () => {
    setIsRunning(true);
    // if (countdownTimer == 0) {
    //   setQuestionId(questionId + 1);
    //   setplayerTwo(playerTwo + 1);
    // }
  };

  useEffect(() => {
    Alert.alert(
      "გაეცანით წესებს",
      "ავრცელებული მოსაზრებით, Lorem Ipsum შემთხვევითი ტექსტი სულაც არაა. მისი ფესვები ჯერკიდევ ჩვ. წ. აღ-მდე 45 წლის დროინდელი კლასიკური ლათინური ლიტერატურიდან მოდის. ვირჯინიის შტატში მდებარე ჰემპდენ-სიდნეის კოლეჯის პროფესორმა რიჩარდ მაკკლინტოკმა აიღო ერთ-ერთი ყველაზე იშვიათი ლათინური სიტყვა Lorem Ipsum-პასაჟიდან და გადაწყვიტა მოეძებნა იგი კლასიკურ ლიტერატურაში. ძიება შედეგიანი აღმოჩნდა — ტექსტი Lorem Ipsum გადმოწერილი ყოფილა ციცერონის-ის 1.10.32 და 1.10.33 თავებიდან. ეს წიგნი ეთიკის თეორიის ტრაქტატია, რომელიც რენესანსის პერიოდში ძალიან იყო გავრცელებული. Lorem Ipsum-ის პირველი ხაზი, სწორედ ამ წიგნის 1.10.32 თავიდანაა.",
      [{ text: "OK", onPress: () => timerTriger() }],
      { cancelable: false }
    );
  }, []);

  const endingScene = () => {
    navigation.navigate("Home");
  };

  function checkAnswer(curr) {
    setQuestionId(questionId + 1);

    if (Questions[questionId].correctAnswer == curr) {
      seplayerOne(playerOne + 1);
      if (playerOne === 5) {
        Alert.alert(
          "გილოცავთ!!!! ",
          "თქვენ გაიმარჯვეთ",
          [{ text: "OK", onPress: () => endingScene() }],
          { cancelable: false }
        );
      }
    } else {
      setplayerTwo(playerTwo + 1);
      if (playerTwo === 5) {
        Alert.alert(
          "მარცხი !!!! ",
          "თქვენ დამარცხდით",
          [{ text: "OK", onPress: () => endingScene() }],
          { cancelable: false }
        );
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.timerItem}>
          <CountDown
            until={countdownTimer}
            timeToShow={["M", "S"]}
            digitStyle={{ backgroundColor: "#ff0066" }}
            size={20}
            style={styles.timer}
            running={isRunning}
          />
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
          <TouchableOpacity onPress={() => checkAnswer("a")}>
            <Text style={styles.answersBarItem}>
              {Questions[questionId].answers.a}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkAnswer("b")}>
            <Text style={styles.answersBarItem}>
              {Questions[questionId].answers.b}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkAnswer("c")}>
            <Text style={styles.answersBarItem}>
              {Questions[questionId].answers.c}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkAnswer("d")}>
            <Text style={styles.answersBarItem}>
              {Questions[questionId].answers.d}
            </Text>
          </TouchableOpacity>
        </View>
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
});
