import { createContext, useState, useEffect } from "react";

import { fetchQuizItems } from "../http";

export const QuizContext = createContext({
  players: [],
  player: {
    playerName: "",
    currentScore: 0,
    highscore: 0,
    life: 5,
    answers: [],
  },
  quiz: {
    categoryId: "",
    playedCategoryIds: [],
    items: [],
    answerState: "",
  },
  savePlayer: enteredPlayerName => {},
  selectCategoryId: selectedCategoryId => {},
  savePlayedCategoryIds: categoryId => {},
  startNewGame: () => {},
});

export default function QuizContextProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    playerName: "",
    currentScore: 0,
    highscore: 0,
    life: 5,
    answers: [],
  });
  const [quiz, setQuiz] = useState({
    categoryId: "",
    playedCategoryIds: [],
    items: [],
    answerState: "",
  });

  const [async, setAsync] = useState({
    isFetching: false,
    error: null,
  });

  // fetch quiz items & start new game
  useEffect(() => {
    if (!quiz.categoryId) return; // prevent to many request

    async function fetchQuiz(categoryId) {
      setAsync(prevAsync => ({ ...prevAsync, isFetching: true }));

      try {
        const resData = await fetchQuizItems(categoryId);
        setQuiz(prevQuiz => ({ ...prevQuiz, items: resData }));
        setAsync(prevAsync => ({ ...prevAsync, isFetching: false }));
      } catch (error) {
        setAsync(prevAsync => ({
          ...prevAsync,
          error: { message: error.message || "Could not fetch quiz items." },
        }));
        setAsync(prevAsync => ({ ...prevAsync, isFetching: false }));
      }
    }

    fetchQuiz(quiz.categoryId);
  }, [quiz.categoryId]);

  // Save player information
  function handleSavePlayer(enteredPlayerName) {
    setPlayer(prevPlayer => ({ ...prevPlayer, playerName: enteredPlayerName }));
  }

  // Select category id
  function handleSelectCategoryId(selectedCategoryId) {
    setQuiz(prevQuiz => ({ ...prevQuiz, categoryId: selectedCategoryId }));
  }

  // Save played category id
  function handleSavePlayedCategoryIds(categoryId) {
    setQuiz(prevQuiz =>
      prevQuiz.playedCategoryIds.includes(categoryId)
        ? { ...prevQuiz }
        : {
            ...prevQuiz,
            playedCategoryIds: [...prevQuiz.playedCategoryIds, categoryId],
          }
    );
  }

  // Start new game
  function handleStartNewGame() {
    setQuiz({ ...prevQuiz, categoryId: "" });
  }

  const ctxValue = {
    players,
    player,
    quiz,
    async,
    savePlayer: handleSavePlayer,
    selectCategoryId: handleSelectCategoryId,
    savePlayedCategoryIds: handleSavePlayedCategoryIds,
    startNewGame: handleStartNewGame,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
