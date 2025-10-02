import { useState, useEffect } from "react";

import { fetchQuizItems } from "../http";

import Login from "../components/Login";
import Categories from "./Categories";
import Quiz from "./Quiz";

export default function MainContent() {
  const [playerName, setPlayerName] = useState("Begana");
  const [categoryId, setCategoryId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [error, setError] = useState();

  // fetch quiz items & start new game
  useEffect(() => {
    if (!categoryId) return; // prevent to many request

    async function fetchQuiz(categoryId) {
      setIsFetching(true);

      try {
        const resData = await fetchQuizItems(categoryId);
        setQuizItems(resData);
        setIsFetching(false);
      } catch (error) {
        setError({ message: error.message || "Could not fetch quiz items." });
        setIsFetching(false);
      }
    }

    fetchQuiz(categoryId);
  }, [categoryId]);

  // save player name
  function handleSavePlayerName(enteredPlayerName) {
    setPlayerName(enteredPlayerName);
  }

  // select category
  function handleSelectCategoryId(selectedCategoryId) {
    setCategoryId(selectedCategoryId);
  }

  return (
    <>
      {!playerName && <Login savePlayerName={handleSavePlayerName} />}
      {playerName && !categoryId && (
        <Categories
          key={categoryId}
          playerName={playerName}
          selectCategory={handleSelectCategoryId}
        />
      )}
      {categoryId && (
        <Quiz
          playerName={playerName}
          quizItems={quizItems}
          isFetching={isFetching}
        />
      )}
    </>
  );
}
