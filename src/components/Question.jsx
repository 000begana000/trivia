import { useState, useCallback } from "react";

import { decodeHTML } from "../store/htmlDecoder";

import Player from "./Player";
import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";
import GameOver from "./GameOver";
import Categories from "./Categories";

export default function Question({
  playerName,
  quizItems,
  isFetching,
  onStartNewGame,
  selectCategoryId,
  selectCategory,
  playedCategories,
}) {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [playerLife, setPlayerLife] = useState(5);

  // Reset score when fetching new quiz
  if (isFetching && currentScore !== 0) setCurrentScore(0);

  // index of current question
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  // quiz is complete after 10 questions
  const quizIsComplete = activeQuestionIndex === 3;

  // decode HTML encoding
  const currentQuestion =
    !isFetching &&
    quizItems.length > 0 &&
    !quizIsComplete &&
    decodeHTML(quizItems[activeQuestionIndex].question);

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
          setAnswerState("");
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
      setPlayerLife(prevLife => prevLife - 1);
      console.log("wrong");
    }
  }

  // display game over message
  if (quizIsComplete && playerLife === 0) {
    return (
      <>
        <GameOver currentScore={currentScore} onStartNewGame={onStartNewGame} />
      </>
    );
  }

  // continue game when player still have playerLife
  if (quizIsComplete && playerLife > 0) {
    return (
      <Categories
        playerName={playerName}
        selectCategoryId={selectCategoryId}
        selectCategory={selectCategory}
        playerLife={playerLife}
        playedCategories={playedCategories}
      />
    );
  }

  return (
    <div>
      {isFetching && <p>Loading...</p>}
      <Player
        currentScore={currentScore}
        playerName={playerName}
        playerLife={playerLife}
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
            <Button
              disabled={answerState}
              onClick={() => handleSelectAnswer("true")}
            >
              True
            </Button>
            <Button
              disabled={answerState}
              onClick={() => handleSelectAnswer("false")}
            >
              False
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}
