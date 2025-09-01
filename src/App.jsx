import Header from "./components/Header";
import MainContent from "./components/MainContent";

import QuizContextProvider from "./store/quiz-context";

function App() {
  return (
    <QuizContextProvider>
      <Header />
      <MainContent />
    </QuizContextProvider>
  );
}

export default App;
