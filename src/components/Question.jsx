import { useState, useCallback } from "react";

import { decodeHTML } from "../store/htmlDecoder";

import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";

// current score
let currentScore = 0;

export default function Question({
  playerName,
  quizItems,
  isFetching,
  onStartNewGame,
}) {
  const [answerState, setAnswerState] = useState("unanswered");
  const [userAnswers, setUserAnswers] = useState([]);

  // reset the current score when player starts new game
  if (isFetching) currentScore = 0;

  // index of current question
  const activeQuestionIndex =
    answerState === "unanswered" ? userAnswers.length : userAnswers.length - 1;

  // decode HTML encoding
  const currentQuestion =
    !isFetching &&
    quizItems.length > 0 &&
    decodeHTML(quizItems[activeQuestionIndex].question);

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

  // skip answer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
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

  const quizIsComplete = activeQuestionIndex === 9;

  let timer = 10000;

  if (answerState === "answered") {
    timer = 1000;
  }

  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000;
  }

  // display game over message
  if (quizIsComplete) {
    return (
      <>
        <h1>Quiz is complete / total score: {currentScore}</h1>
        <button onClick={onStartNewGame}>Start New Game</button>
      </>
    );
  }

  return (
    <div>
      <p>username: {playerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <ul>
          <li>
            {!isFetching && quizItems.length > 0 && <p>{currentQuestion}</p>}
          </li>
          <li>
            <QuestionTimer
              key={timer}
              timeout={timer}
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
      )}
    </div>
  );
}
