import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuOption from "./MenuOption";
import "./Header.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 


export default function Header() {
    const { topic } = useParams(); 
    const [query, setQuery] = useState(""); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate(); 

    
    useEffect(() => {
        if (topic) {
            setQuery(topic);
        }
    }, [topic]);

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/BookByCategory/${query}`); 
        }
    }

    return (
        
        <div className="header">
            <h3>Book Store</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a category..."
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
            <FontAwesomeIcon
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                icon={isMenuOpen ? faTimes : faBars}
            />
            {isMenuOpen && <MenuOption />}
        </div>
    );
}
