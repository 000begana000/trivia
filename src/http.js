export async function fetchQuizItems(selectedCategoryId) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${selectedCategoryId}&difficulty=easy&type=boolean`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Faild to fetch quiz items.");
  }

  console.log(resData.results);

  return resData.results;
}
