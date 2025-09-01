import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Login from "../components/Login";
import MainGame from "../components/Game";

export default function MainContent() {
  const { selectedCategoryCode } = useContext(QuizContext);

  return (
    <>
      {selectedCategoryCode && <MainGame />}
      {!selectedCategoryCode && <Login />}
    </>
  );
}
