import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext({
  selectedCategoryCode: "",
  quizItems: [],
  isFetching: "",
  enteredPlayerName: "",
  savePlayerName: () => {},
  startGame: () => {},
});

export default function QuizContextProvider({ children }) {
  const [enteredPlayerName, setEnteredPlayerName] = useState("Begana");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [quizItems, setQuizItems] = useState([]);

  useEffect(() => {
    // prevent too many requests
    if (!selectedCategoryCode) return;

    setIsFetching(true); // loading state

    fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategoryCode}&difficulty=easy&type=boolean`
    )
      .then(response => {
        console.log("fetching");
        return response.json();
      })
      .then(resData => {
        setQuizItems(resData.results);
        setIsFetching(false); // loading state
      });
  }, [selectedCategoryCode]);

  // save player name
  function handleSavePlayerName(playerName) {
    setEnteredPlayerName(playerName);
  }

  function handleStartGame(categoryId) {
    setSelectedCategoryCode(categoryId);
  }

  const ctxValue = {
    quizItems,
    selectedCategoryCode,
    isFetching,
    enteredPlayerName,
    savePlayerName: handleSavePlayerName,
    startGame: handleStartGame,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
