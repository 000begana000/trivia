import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Login from "./Login";
import Categories from "./Categories";
import Question from "./Question";

export default function Quiz() {
  const { player, quiz } = useContext(QuizContext);

  return (
    <>
      {!player.playerName && <Login />}
      {player.playerName && !quiz.categoryId && <Categories />}
      {quiz.categoryId && <Question />}
    </>
  );
}
