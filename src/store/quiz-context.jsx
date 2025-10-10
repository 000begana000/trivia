import { createContext, useState } from "react";

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
  async: {
    isFetching: false,
    error: null,
  },
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

  const ctxValue = {
    players,
    player,
    quiz,
    async,
  };

  return <QuizContextProvider value={ctxValue}>{children}</QuizContextProvider>;
}
