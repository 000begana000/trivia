import { useState, useEffect } from "react";

import Button from "./UI/Button";

export default function Categories() {
  const [categories, setCategories] = useState([]);

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
          <Button>{category.name}</Button>
        </li>
      ))}
    </ul>
  );
}
