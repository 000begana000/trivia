import { useRef, useContext } from "react";

import { QuizContext } from "../store/quiz-context";

import Button from "./UI/Button";

export default function Login() {
  const { savePlayer } = useContext(QuizContext);

  const enteredPlayerName = useRef();

  // save player name
  function handleSavePlayerName() {
    savePlayer(enteredPlayerName.current.value);
    enteredPlayerName.current.value = "";
  }

  // fetch players data

  // save player data

  return (
    <div>
      <p>Please enter player name</p>
      <form>
        <input
          type="text"
          name=""
          id=""
          ref={enteredPlayerName}
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
