import Question from "./Question";

export default function Quiz({ playerName, quizItems, isFetching }) {
  return (
    <div>
      <p>username: {playerName}</p>
      <p>current score: {currentScore}</p>
      <p>high score: 0</p>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <Question quizItems={quizItems} isFetching={isFetching} />
      )}
    </div>
  );
}
