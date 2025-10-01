import { createContext, useState, useEffect } from "react";

import { fetchQuizItems } from "../http";

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
    // prevent too many requests
    if (!selectedCategoryCode) return;

    async function fetchQuiz() {
      setIsFetching(true);

      try {
        const quizItems = await fetchQuizItems(selectedCategoryCode);

        setQuizItems(quizItems);
        setIsFetching(false);
      } catch (error) {
        setError({ message: error.message || "Could not fetch quiz items." });
        setIsFetching(false);
      }
    }

    fetchQuiz();
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
