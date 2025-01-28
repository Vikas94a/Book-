import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBars,
  faTimes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuOption from "./MenuOption";
import "./Header.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Header() {
  const { topic } = useParams(); // get topic pram from URL
  const [query, setQuery] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // track if menu is open or not
  const navigate = useNavigate();


  // function for search submission
  function handleSubmit(e) { // prevent page relode
    e.preventDefault();
    if (query.trim()) {
      navigate(`/BookByCategory/${query}`); // redirect to Category page 
    }
  }


  return (
    <div className="header">
      <h3>Book Store</h3>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // update query state 
            placeholder="Search for a category..."
          />
          <button className="search-icon" type="submit">
            <FontAwesomeIcon icon={faSearch} />  {/*serach icon*/} 
          </button>
        </form>
      </div>
      <div className="menu-icon">
        <Link to={`/FavBookView/`}>  {/*Navigate to FavBookView page*/} 
          <FontAwesomeIcon className="heart-icon" icon={faHeart} />
        </Link>
        <FontAwesomeIcon
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          icon={isMenuOpen ? faTimes : faBars}
        />
        {isMenuOpen && <MenuOption />}
      </div>
    </div>
  );
}
