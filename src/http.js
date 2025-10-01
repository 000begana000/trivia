export async function fetchQuizItems(selectedCategoryCode) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${selectedCategoryCode}&difficulty=easy&type=boolean`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch quiz items.");
  }

  return resData.results;
}
