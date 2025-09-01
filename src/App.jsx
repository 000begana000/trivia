import Header from "./components/Header";
import Login from "./components/Login";

import { QuizContext } from "./store/quiz-context";

function App() {
  return (
    <QuizContext.Provider>
      <Header />
      <Login />
    </QuizContext.Provider>
  );
}

export default App;
