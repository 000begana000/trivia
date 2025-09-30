import { useContext, useCallback } from "react";

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

  const activeQuestionIndex = userAnswers.length;

  // quiz is complete message displays too early
  const quizIsComplete = activeQuestionIndex === quizItems.length;

  const currentAnswer = !quizIsComplete
    ? quizItems[activeQuestionIndex].correct_answer
    : null;

  // save user answers & current score
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    selectAnswer(selectedAnswer);
    if (selectedAnswer === currentAnswer) {
      // doesn't work correctly
      currentScore += 100;
    }
  },
  []);

  // skip answer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // display game over message
  if (quizIsComplete) {
    return <h1>Quiz is complete / total score: {currentScore}</h1>;
  }

  // decode HTML encoding
  const currentQuestion =
    !isFetching &&
    quizItems.length > 0 &&
    decodeHTML(quizItems[activeQuestionIndex].question);

  return (
    <div>
      <p>username: {enteredPlayerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
      <ul>
        {isFetching && <p>Loading...</p>}
        <li>
          {!isFetching && quizItems.length > 0 && <p>{currentQuestion}</p>}
        </li>
        <li>
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeout={handleSkipAnswer}
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
