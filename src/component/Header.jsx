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
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Header() {
  const { topic } = useParams(); // get topic pram from URL
  const [query, setQuery] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // track if menu is open or not
  const navigate = useNavigate();
  const {search, setSearch} = useContext(AppContext)
  


  // function for search submission
  function handleSubmit(e) { // prevent page relode
    e.preventDefault();
    if (query.trim()) {
      setSearch(true)
      navigate(`/Book-/BookByCategory/${query}`); // redirect to Category page 
    }
  }


  return (
    <div className="header">
      <Link to={`/Book-/HomeView`}>
      <h3 className="logo">Book Store</h3>
      </Link>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // update query state 
            placeholder="Search for a Book..."
          />
          <button className="search-icon" type="submit">
            <FontAwesomeIcon icon={faSearch} />  {/*serach icon*/} 
          </button>
        </form>
      </div>
      <div className="menu-icon">
        <Link to={`/Book-/FavBookView/`}>  {/*Navigate to FavBookView page*/} 
          <FontAwesomeIcon className="header-icon" icon={faHeart} />
        </Link>
        <FontAwesomeIcon
      className="toggle-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          icon={isMenuOpen ? faTimes : faBars}
        />
        {isMenuOpen && <MenuOption option={setIsMenuOpen} />}
      </div>

    </div>
  );
}
