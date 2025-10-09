import { useState } from "react";

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

let playedCategories = [];

let categoryId = {};

export default function Categories({ playerName, selectCategory }) {
  const [categoryName, setCategoryName] = useState("");

  // choose category id and category name
  function handleSelectCategory(category) {
    categoryId = category.id;
    setCategoryName(category.name);
  }

  function handleStartGame() {
    selectCategory(categoryId);
    playedCategories.push(categoryId);
    console.log(playedCategories);
  }

  return (
    <>
      <p>Welcome, {playerName}!</p>
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}>
            <Button onClick={() => handleSelectCategory(category)}>
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
