import { useState, useContext } from "react";

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
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const { quiz, player, selectCategoryId } = useContext(QuizContext);

  // choose category id and category name
  function handleSelectCategory(category) {
    setCategoryId(category.id);
    setCategoryName(category.name);
  }

  function handleStartGame() {
    selectCategoryId(categoryId);
  }

  return (
    <>
      <p>Welcome, {player.playerName}!</p>
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}>
            <Button
              disabled={quiz.playedCategoryIds.includes(category.id)}
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
      {categoryName && <p>You selected "{categoryName}" theme!</p>}
      <Button onClick={handleStartGame}>Start new game</Button>
    </>
  );
}
