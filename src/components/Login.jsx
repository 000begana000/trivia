import { useRef, useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Button from "./UI/Button";

export default function Login() {
  const quizCtx = useContext(QuizContext);

  const playerName = useRef();

  // save player name
  function handleSavePlayerName() {
    quizCtx.savePlayerName(playerName.current.value);
    console.log(enteredPlayerName);
    playerName.current.value = "";
  }

  return (
    <div>
      <p>Please enter player name</p>
      <form>
        <input
          type="text"
          name=""
          id=""
          ref={playerName}
          required
          minLength={5}
          onInvalid={e =>
            e.target.setCustomValidity("Player name is required.")
          }
        />
        <Button onClick={handleSavePlayerName}>save</Button>
      </form>
    </div>
  );
}
