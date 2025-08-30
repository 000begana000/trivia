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
        <div>
          <input type="text" name="" id="" ref={playerName} />
          <Button onClick={handleSavePlayerName}>save</Button>
        </div>
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
