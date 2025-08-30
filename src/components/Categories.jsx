import Button from "./UI/Button";

const CATEGORIES = [
  "all category",
  "television",
  "music",
  "science",
  "sports",
  "geography",
  "history",
  "art",
  "animals",
  "film",
];

export default function Categories() {
  return (
    <ul>
      {CATEGORIES.map(category => (
        <li key={category}>
          <Button>{category}</Button>
        </li>
      ))}
    </ul>
  );
}
