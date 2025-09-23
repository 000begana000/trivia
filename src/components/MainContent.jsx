import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Login from "../components/Login";
import Categories from "./Categories";
import Game from "../components/Game";

export default function MainContent() {
  const { selectedCategoryCode, enteredPlayerName } = useContext(QuizContext);

  console.log(selectedCategoryCode);

  return (
    <>
      {!enteredPlayerName && <Login />}
      {enteredPlayerName && !selectedCategoryCode && <Categories />}
      {selectedCategoryCode && <Game />}
    </>
  );
}
