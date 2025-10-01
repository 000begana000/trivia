import { useRef } from "react";

import Button from "./UI/Button";

export default function Login({ savePlayerName }) {
  const playerName = useRef();

  // save player name
  function handleSavePlayerName() {
    savePlayerName(playerName.current.value);
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
