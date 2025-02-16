import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";

import ProductCard from "../component/ProductCard";
import ReactLoading from "react-loading";

export default function BookByCategory() {
  const { topic, query } = useParams(); // get the current topic
  const { apiURL, setLoading, setError, loading, error, search, setSearch } =
    useContext(AppContext);
  const [booksByTopic, setBooksByTopic] = useState(null|| []);
  const [currentPage, setCurrentPage] = useState(null);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  // Set the current page based on topic or search
  useEffect(() => {
    if (search) {
      setCurrentPage(`${apiURL}?search=${topic}`);
     
    } else if (topic) {
      setCurrentPage(`${apiURL}?topic=${topic}`);
    }
  }, [search, topic, apiURL]);

  // Fetch data when currentPage or topic changes
  useEffect(() => {
    async function fetchData() {
      if (!currentPage) return; // Prevent fetching when currentPage is null
console.log(currentPage)
      try {
        setLoading(true);
        setError(null);
        // setSearch(false);

        const res = await fetch(currentPage);

        if (!res.ok) throw new Error(error)

        const data = await res.json();
        setBooksByTopic(data.results);
        console.log(data)
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, topic]);

  // Handle pagination
  function handleNextPage() {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  }

  function handlePreviousPage() {
    if (previousPage) {
      setCurrentPage(previousPage);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      {loading ? (
        <ReactLoading type="spin" color="#F38D3B" />
      ) : (
        <div>
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
            <div >
              {booksByTopic && (
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection:"row" }}>
                  {booksByTopic.map((e) => (
                    <ProductCard
                      key={e.id}
                      id={e.id}
                      image={e.formats["image/jpeg"]}
                      title={e.title}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              padding: "18px",
              gap: "22px",
            }}
          >
            {previousPage && (
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
                Previous
              </button>
            )}
            {nextPage && (
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
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
