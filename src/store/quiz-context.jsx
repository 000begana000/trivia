import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext({
  selectedCategoryCode: "",
  quizItems: [],
  selectCategoryCode: () => {},
});

export default function QuizContextProvider({ children }) {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [quizItems, setQuizItems] = useState([]);

  useEffect(() => {
    // prevent too many requests
    if (!selectedCategoryCode) return;

    fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategoryCode}&difficulty=easy&type=boolean`
    )
      .then(response => {
        return response.json();
      })
      .then(resData => {
        setQuizItems(resData.results);
      });
  }, [selectedCategoryCode]);

  function handleSelectCategoryCode(codeNum) {
    setSelectedCategoryCode(codeNum);
  }

  const ctxValue = {
    quizItems,
    selectedCategoryCode,
    selectCategoryCode: handleSelectCategoryCode,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
