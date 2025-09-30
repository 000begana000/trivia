import { useContext, useCallback } from "react";

import { QuizContext } from "../store/quiz-context";
import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";

// current score
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

  const quizIsComplete = activeQuestionIndex === 9;

  // save user answers & current score
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      selectAnswer(selectedAnswer);

      // Safety check
      if (!quizItems || !quizItems[activeQuestionIndex]) {
        console.error("Quiz data not available");
        return;
      }

      let correctAnswer =
        quizItems && quizItems[activeQuestionIndex].correct_answer;

      // Convert both to lowercase strings for comparison
      const normalizedSelected = String(selectedAnswer).toLowerCase();
      const normalizedCorrect = String(correctAnswer).toLowerCase();

      if (normalizedSelected === normalizedCorrect) {
        currentScore += 100;
      }
    },
    [quizItems, activeQuestionIndex, selectAnswer]
  );

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
            <Button onClick={() => handleSelectAnswer("true")}>True</Button>
            <Button onClick={() => handleSelectAnswer("false")}>False</Button>
          </p>
        </li>
      </ul>
    </div>
  );
}
