import { useState, useEffect, useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Button from "./UI/Button";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const quizCtx = useContext(QuizContext);

  function handleSelectCategoryCode(codeNum) {
    quizCtx.selectCategoryCode(codeNum);
  }

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(respones => {
        return respones.json();
      })
      .then(resData => {
        setCategories(resData.trivia_categories);
      });
  }, []);

  return (
    <ul>
      {categories.map(category => (
        <li key={category.id}>
          <Button onClick={() => handleSelectCategoryCode(category.id)}>
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
