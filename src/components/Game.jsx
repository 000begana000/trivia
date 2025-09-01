import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function Game() {
  const { quizItems } = useContext(QuizContext);

  console.log(quizItems);

  return (
    <div>
      <p>username</p>
      <p>current score</p>
      <p>high score</p>
      <ul>
        {quizItems.map(item => {
          return <li key={item.question}>{item.question}</li>;
        })}
      </ul>
    </div>
  );
}
