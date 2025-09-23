import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Button from "./UI/Button";

const CATEGORIES = [
  { id: 9, name: "General Knowledge" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 15, name: "Video Games" },
  { id: 17, name: "Science & Nature" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 27, name: "Animals" },
  { id: 31, name: "Japanese Anime & Manga" },
];

export default function Categories() {
  const quizCtx = useContext(QuizContext);
  const playerName = quizCtx.enteredPlayerName;
  let categoryId;

  function handleSelectCategoryId(selectedCategoryId) {
    categoryId = selectedCategoryId;
  }

  function handleStartGame() {
    quizCtx.startGame(categoryId);
  }

  return (
    <>
      <p>Welcome, {playerName}!</p>
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}>
            <Button onClick={() => handleSelectCategoryId(category.id)}>
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={handleStartGame}>Start new game</Button>
    </>
  );
}
