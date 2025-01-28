import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";

export default function BookByCategory() {
  const { topic } = useParams(); // get the current topic

  const { apiURL, setLoading, setError, loading, error } =
    useContext(AppContext); // gloval variable 
  const [booksByTopic, setBooksByTopic] = useState([]); // Array of book
  const [currentPage, setCurrentPage] = useState(`${apiURL}?topic=${topic}`); // dynamic URL
  const [nextPage, setNextPage] = useState(""); // next page url
  const [previousPage, setPreviousPage] = useState("");// previous page url
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // setLoading true while fetching data
        setError(null); // clear previous errors

        const res = await fetch(`${currentPage}`);// fetch data from current page
        const data = await res.json();
        setBooksByTopic(data.results); // update state
        setNextPage(data.next);// update state 
        setPreviousPage(data.previous); // update state
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [topic, currentPage]); // run whenever topic or currentpage change


  // handle next page btn function
  function handleNextPage() {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  }

  // handle previous page function
  function handlePreviousPage() {
    if (previousPage) {
      setCurrentPage(previousPage);
    }
  }

  return (
    <>
      {loading && <p>Loading ....</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {booksByTopic.map((e) => {
          return (
            <ProductCard
              key={e.id}
              id={e.id}
              image={e.formats["image/jpeg"]}
              title={e.title}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {previousPage ? (
          <button
            style={{
              backgroundColor: "transparent",
              fontSize: "1.2rem",
              padding: "4px",
              border: "none",
              outline: "2px double blue",
            }}
            onClick={handlePreviousPage}
          >
            {" "}
            Previous{" "}
          </button>
        ) : (
          ""
        )}
        <button
          style={{
            backgroundColor: "transparent",
            fontSize: "1.2rem",
            padding: "4px",
            border: "none",
            outline: "2px double blue",
          }}
          onClick={handleNextPage}
        >
          {" "}
          Next
        </button>
      </div>
    </>
  );
}
