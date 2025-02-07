import { Link } from "react-router-dom";
import BookByCategory from "../view/BookByCategory";

const option = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];



export default function MenuOption({setMenuoption}) {

  function toggleMenu(){
    setMenuoption(false)
    }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: "2px",
        top: "43px",
        width: "110px",
      }}
    >
      {option.map((topic, i) => {
        return (
          <Link
          onClick={toggleMenu}
            style={{
              textDecoration: "none",
              color: "black",
              backgroundColor: "white",
              padding: "4px",
              border: "1px solid black",
              textAlign: "center",
              zIndex: "1",
            }}
            key={i}
            to={`/Book-/BookByCategory/${topic.toLocaleLowerCase()}`}
          >
            {topic}
          </Link>
        );
      })}
    </div>
  );
}
