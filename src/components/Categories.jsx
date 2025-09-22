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

  function handleSelectCategoryCode(codeNum) {
    quizCtx.selectCategoryCode(codeNum);
  }

  return (
    <ul>
      {CATEGORIES.map(category => (
        <li key={category.id}>
          <Button onClick={() => handleSelectCategoryCode(category.id)}>
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
