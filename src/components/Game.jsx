import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";

// temporary current score
let currentScore = 0;

export default function Game() {
  const {
    enteredPlayerName,
    isFetching,
    quizItems,
    userAnswers,
    selectAnswer,
  } = useContext(QuizContext);

  console.log(quizItems);

  const activeQuestionIndex = userAnswers.length;

  // decode HTML encoding
  const currentQuestion =
    !isFetching &&
    quizItems.length > 0 &&
    decodeHTML(quizItems[activeQuestionIndex].question);

  // save user answers & current score
  function handleSelectAnswer(selectedAsnwer) {
    selectAnswer(prevAnswers => {
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
          <QuestionTimer
            timeout={10000}
            onTimeout={() => handleSelectAnswer(null)}
          />
        </li>
        <li>
          <p>
            <Button onClick={() => handleSelectAnswer("True")}>True</Button>
            <Button onClick={() => handleSelectAnswer("False")}>False</Button>
          </p>
        </li>
      </ul>
    </div>
  );
}
