export default function GameOver({ currentScore, onStartNewGame }) {
  return (
    <div>
      <h1>Quiz is complete / total score: {currentScore}</h1>
      <button onClick={onStartNewGame}>Start New Game</button>
    </div>
  );
}
