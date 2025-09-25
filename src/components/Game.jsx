import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";

// temporary current score
let currentScore = 0;

export default function Game() {
  const {
    enteredPlayerName,
    isFetching,
    quizItems,
    userAnswers,
    setUserAnswers,
  } = useContext(QuizContext);

  console.log(quizItems);

  const activeQuestionIndex = userAnswers.length;

  // decode HTML encoding
  const currentQuestion = decodeHTML(quizItems[activeQuestionIndex].question);

  // save user answers & current score
  function handleSetUserAnswers(selectedAsnwer) {
    setUserAnswers(prevAnswers => {
      return [...prevAnswers, selectedAsnwer];
    });

    if (selectedAsnwer === quizItems[activeQuestionIndex].correct_answer) {
      currentScore += 100;
      console.log(`current score: ${currentScore}`);
    }
  }

  return (
    <div>
      <p>username: {enteredPlayerName}</p>
      <p>current score: 0</p>
      <p>high score: 0</p>
      <ul>
        {isFetching && <p>Loading...</p>}
        <li>
          {!isFetching && quizItems.length > 0 && <p>{currentQuestion}</p>}
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
