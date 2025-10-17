import { useCallback, useContext } from "react";

import { decodeHTML } from "../store/htmlDecoder";

import { QuizContext } from "../store/quiz-context";

import Player from "./Player";
import Button from "./UI/Button";
import QuestionTimer from "./QuestionTimer";
import GameOver from "./GameOver";
import Categories from "./Categories";

export default function Question() {
  const { player, quiz, async, startNewGame, selectAnswer } =
    useContext(QuizContext);

  // index of current question
  const activeQuestionIndex =
    quiz.answerState === ""
      ? player.answers?.length ?? 0
      : (player.answers?.length ?? 0) - 1;

  // quiz is complete after 10 questions
  const quizIsComplete = activeQuestionIndex === 3;

  // continue game when player still have playerLife
  if (quizIsComplete && player.life > 0) {
    return <Categories />;
  }

  // decode HTML encoding
  const currentQuestion =
    !async.isFetching &&
    quiz.items.length > 0 &&
    !quizIsComplete &&
    decodeHTML(quiz.items[activeQuestionIndex].question);

  // updating progress bar depends on the answerState
  let timer = 10000;
  if (quiz.answerState === "answered") {
    timer = 1000;
  }
  if (quiz.answerState === "correct" || quiz.answerState === "wrong") {
    timer = 2000;
  }

  // save user answers & current score
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      selectAnswer(selectedAnswer, activeQuestionIndex);
      console.log("handle select answer");
    },
    [quiz.items, activeQuestionIndex]
  );

  // skip answer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer, activeQuestionIndex]
  );

  // display game over message
  if (quizIsComplete && playerLife === 0) {
    return (
      <>
        <GameOver
          currentScore={player.currentScore}
          onStartNewGame={startNewGame}
        />
      </>
    );
  }

  return (
    <div>
      {async.isFetching && <p>Loading...</p>}
      <Player
        currentScore={player.currentScore}
        playerName={player.playerName}
        playerLife={player.life}
      />
      {!async.isFetching && (
        <div>
          {!async.isFetching && quiz.items.length > 0 && (
            <p>{currentQuestion}</p>
          )}
          <QuestionTimer
            key={timer}
            timeout={timer}
            onTimeout={handleSkipAnswer}
            answerState={quiz.answerState}
          />
          <p>
            <Button
              disabled={quiz.answerState}
              onClick={() => handleSelectAnswer("true")}
            >
              True
            </Button>
            <Button
              disabled={quiz.answerState}
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
