import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";

export default function Game() {
  const { isFetching, quizItems, userAnswers, setUserAnswers } =
    useContext(QuizContext);

  const activeQuestionIndex = userAnswers.length;
  console.log(activeQuestionIndex);

  function handleSetUserAnswers(selectedAsnwer) {
    setUserAnswers(prevAnswers => {
      return [...prevAnswers, selectedAsnwer];
    });
  }

  return (
    <div>
      <p>username</p>
      <p>current score</p>
      <p>high score</p>
      <ul>
        {isFetching && <p>Loading...</p>}
        <li>
          {!isFetching && quizItems.length > 0 && (
            <p>{quizItems[activeQuestionIndex].question}</p>
          )}
        </li>
        <li>
          <p>
            <Button onClick={() => handleSetUserAnswers("True")}>True</Button>
          </p>
          <p>
            <Button onClick={() => handleSetUserAnswers("False")}>False</Button>
          </p>
        </li>
      </ul>
    </div>
  );
}
