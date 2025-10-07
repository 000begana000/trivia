import { useState, useCallback } from "react";

import { decodeHTML } from "../store/htmlDecoder";

import Player from "./Player";
import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  playerName,
  quizItems,
  isFetching,
  onStartNewGame,
}) {
  const [answerState, setAnswerState] = useState("unanswered");
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);

  // Reset score when fetching new quiz
  if (isFetching && currentScore !== 0) setCurrentScore(0);

  // index of current question
  const activeQuestionIndex =
    answerState === "unanswered" ? userAnswers.length : userAnswers.length - 1;

  // decode HTML encoding
  const currentQuestion =
    !isFetching &&
    quizItems.length > 0 &&
    decodeHTML(quizItems[activeQuestionIndex].question);

  // quiz is complete after 10 questions
  const quizIsComplete = activeQuestionIndex === 9;

  // updating progress bar depends on the answerState
  let timer = 10000;
  if (answerState === "answered") {
    timer = 1000;
  }
  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000;
  }

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

      setCurrentScore(prevScore => prevScore + 100);
    } else {
      setAnswerState("wrong");
      console.log("wrong");
    }
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
      {isFetching && <p>Loading...</p>}
      <Player
        currentScore={currentScore}
        playerName={playerName}
        answerState={answerState}
      />
      {!isFetching && (
        <div>
          {!isFetching && quizItems.length > 0 && <p>{currentQuestion}</p>}
          <QuestionTimer
            key={timer}
            timeout={timer}
            onTimeout={handleSkipAnswer}
            answerState={answerState}
          />
          <p>
            <Button onClick={() => handleSelectAnswer("true")}>True</Button>
            <Button onClick={() => handleSelectAnswer("false")}>False</Button>
          </p>
        </div>
      )}
    </div>
  );
}
