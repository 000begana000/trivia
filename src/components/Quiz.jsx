import { useState, useCallback } from "react";
import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";

// current score
let currentScore = 0;

export default function Quiz({ playerName, quizItems, isFetching }) {
  const [answerState, setAnswerState] = useState("unanswered");
  const [userAnswers, setUserAnswers] = useState([]);

  // index of current question
  const activeQuestionIndex =
    answerState === "unanswered" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === 9;

  // reset the current score when player starts new game
  if (isFetching) currentScore = 0;

  // save user answers & current score
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);

      // Safety check
      if (!quizItems || !quizItems[activeQuestionIndex]) {
        console.error("Quiz data not available");
        return;
      }

      setTimeout(() => {
        handleCurrentScore(selectedAnswer);
        setTimeout(() => {
          setAnswerState("unanswered");
        }, 2000);
      }, 1000);
    },
    [quizItems, activeQuestionIndex]
  );

  // distinguish answer and save current score
  function handleCurrentScore(selectedAnswer) {
    let correctAnswer =
      quizItems && quizItems[activeQuestionIndex].correct_answer;

    // Convert both to lowercase strings for comparison
    const normalizedSelected = String(selectedAnswer).toLowerCase();
    const normalizedCorrect = String(correctAnswer).toLowerCase();

    if (normalizedSelected === normalizedCorrect) {
      setAnswerState("correct");
      console.log("correct");

      currentScore += 100;
    } else {
      setAnswerState("wrong");
      console.log("wrong");
    }
  }

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
      <p>username: {playerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
      <ul>
        {isFetching && <p>Loading...</p>}
        {!isFetching && (
          <>
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
                <Button onClick={() => handleSelectAnswer("false")}>
                  False
                </Button>
              </p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
