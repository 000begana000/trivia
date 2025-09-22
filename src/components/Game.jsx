import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { decodeHTML } from "../store/htmlDecoder";

export default function Game() {
  const { quizItems } = useContext(QuizContext);

  return (
    <div>
      <p>username</p>
      <p>current score</p>
      <p>high score</p>
      <ul>
        {quizItems.map(item => {
          const decodedString = decodeHTML(item.question);
          return <li key={item.question}>{decodedString}</li>;
        })}
      </ul>
    </div>
  );
}
