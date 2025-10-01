import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext({
  selectedCategoryCode: "",
  quizItems: [],
  userAnswers: [],
  isFetching: "",
  enteredPlayerName: "",
  savePlayerName: () => {},
  startGame: () => {},
  selectAnswer: () => {},
});

export default function QuizContextProvider({ children }) {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [error, setError] = useState();
  const [enteredPlayerName, setEnteredPlayerName] = useState("Begana");
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    // prevent too many requests
    if (!selectedCategoryCode) return;

    async function fetchQuizItems() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${selectedCategoryCode}&difficulty=easy&type=boolean`
        );
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Faild to fetch quiz items.");
        }

        setQuizItems(resData.results);
      } catch (error) {
        setError({ message: error.message || "Could not fetch quiz items." });
      }
      setIsFetching(false);
    }
    fetchQuizItems();
  }, [selectedCategoryCode]);

  // save player name
  function handleSavePlayerName(playerName) {
    setEnteredPlayerName(playerName);
  }

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
  }

  function handleStartGame(categoryId) {
    setSelectedCategoryCode(categoryId);
  }

  const ctxValue = {
    quizItems,
    userAnswers,
    selectedCategoryCode,
    isFetching,
    enteredPlayerName,
    savePlayerName: handleSavePlayerName,
    startGame: handleStartGame,
    selectAnswer: handleSelectAnswer,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
