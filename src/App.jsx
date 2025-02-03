import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import "./App.css";
import HomeView from "./view/Homeview";

export const AppContext = createContext(); //global context to share state and function

function App() {
  const [apiURL, setApiUrl] = useState("https://gutendex.com/books");//Base Api
  const [favorite, setFavorite] = useState(() => {
    //favorite books from localstorage or empty arry if none exist
    const updateLocalStorage = localStorage.getItem("favoriteList");
    return updateLocalStorage ? JSON.parse(updateLocalStorage) : [];
  });
  const [loading, setLoading] = useState(false); // loading state 
  const [error, setError] = useState(null);// error state 
  const [book, setBook] = useState([]); // store the list of book
  const [search, setSearch] = useState(false)

  useEffect(() => {
    async function fetchData() { // fetch api async function
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(apiURL);
        const data = await res.json();
        // console.log(data.results)
        setBook(data.results); // update book state 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData(); 
  }, []); // empty arry that only run once

  function AddtoFav(bookList) { // function to add or remove in the favorite list 
    let updateFav;
    setFavorite((prevFav) => {
      let exist = prevFav.some((fav) => fav.id === bookList.id); 
      if (exist) { // check condition if it allready exist
        return (updateFav = prevFav.filter((fav) => fav.id !== bookList.id));
      } else {
        updateFav = [...prevFav, bookList]; // if book dose not exist, add it to favorite
      }
      localStorage.setItem("favoriteList", JSON.stringify(updateFav)); // update local storage 

      return updateFav;
    });
  }

  return (
    <>
      <AppContext.Provider
        value={{
          favorite,
          setFavorite,
          AddtoFav,
          apiURL,
          book,
          loading,
          setLoading,
          setError,
          search,
          setSearch
        }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </AppContext.Provider>
    </>
  );
}

export default App;
