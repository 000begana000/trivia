export default function Player({ playerName, currentScore, playerLife }) {
  return (
    <div>
      <p>username: {playerName}</p>
      <p>life: {playerLife}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
    </div>
  );
}
