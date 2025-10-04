export default function Player({ playerName, currentScore }) {
  return (
    <div>
      <p>username: {playerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
    </div>
  );
}
