import { useState, useEffect } from "react";

export default function Player({ playerName, currentScore, answerState }) {
  const [playerLife, setPlayerLife] = useState(5);

  useEffect(() => {
    if (answerState === "wrong") {
      setPlayerLife(prevLife => prevLife - 1);
    }
  }, [answerState]);

  return (
    <div>
      <p>username: {playerName}</p>
      <p>life: {playerLife}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
    </div>
  );
}
