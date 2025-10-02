import Question from "./Question";

// current score
let currentScore = 0;

export default function Quiz({
  playerName,
  quizItems,
  isFetching,
  onStartNewGame,
}) {
  return (
    <div>
      <p>username: {playerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <Question
          quizItems={quizItems}
          isFetching={isFetching}
          onStartNewGame={onStartNewGame}
        />
      )}
    </div>
  );
}
