import { useState, useRef } from "react";

import Button from "./UI/Button";
import Categories from "./Categories";

export default function Login() {
  const [enteredPlayerName, setEnteredPlayerName] = useState("");

  const playerName = useRef();

  // save player name
  function handleSavePlayerName() {
    setEnteredPlayerName(playerName.current.value);
    console.log(enteredPlayerName);
    playerName.current.value = "";
  }

  let login;

  if (!enteredPlayerName) {
    login = (
      <>
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
      </>
    );
  } else {
    login = (
      <>
        <p>Hello, {enteredPlayerName}! please choose a category</p>
        <Categories />
      </>
    );
  }

  return <div>{login}</div>;
}
