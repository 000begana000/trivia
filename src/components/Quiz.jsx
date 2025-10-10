import { useState, useEffect } from "react";

import { fetchQuizItems } from "../http";

import Login from "./Login";
import Categories from "./Categories";
import Question from "./Question";

export default function Quiz() {
  const [playerName, setPlayerName] = useState("Begana");
  const [categoryId, setCategoryId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [error, setError] = useState();
  const [playedCategories, setPlayedCategories] = useState([]);

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

  function handleSelectCategory(categoryId) {
    setPlayedCategories(prevCategories =>
      prevCategories.includes(categoryId)
        ? prevCategories
        : [...prevCategories, categoryId]
    );
  }

  function handleStartNewGame() {
    setCategoryId("");
  }

  return (
    <>
      {!playerName && <Login savePlayerName={handleSavePlayerName} />}
      {playerName && !categoryId && (
        <Categories
          key={categoryId}
          playerName={playerName}
          selectCategoryId={handleSelectCategoryId}
          playedCategories={playedCategories}
          selectCategory={handleSelectCategory}
        />
      )}
      {categoryId && (
        <Question
          playerName={playerName}
          quizItems={quizItems}
          isFetching={isFetching}
          onStartNewGame={handleStartNewGame}
          selectCategoryId={handleSelectCategoryId}
          playedCategories={playedCategories}
          selectCategory={handleSelectCategory}
        />
      )}
    </>
  );
}
