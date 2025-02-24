import { Link } from "react-router-dom";
import BookByCategory from "../view/BookByCategory";

const option = [
  "fiction",
  "mystery",
  "thriller",
  "romance",
  "fantasy",
  "morality",
  "society",
  "power",
  "justice",
  "adventure",
  "tragedy",
  "war",
  "philosophy",
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
        right: "12px",
        top: "53px",
        width: "110px",
      }}
    >
      {option.map((topic, i) => {
        return (
          <Link
          // onClick={toggleMenu}
            style={{
              paddingBottom:"6px",
              textDecoration: "none",
              color: "black",
              backgroundColor: "white",
              padding: "8px",
              width:"100px",
              fontFamily:"poppins",
              border: "1px solid black",
              textAlign: "center",
              zIndex: "1",
            }}
            key={i}
            to={`/Book-/BookByCategory/${topic}`}
          >
            {topic.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
