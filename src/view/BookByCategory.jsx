import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";




export default function BookByCategory() {
 
  const { topic } = useParams(); // get the current topic
console.log(topic)

  const { apiURL, setLoading, setError, loading, error, search, setSearch } =
    useContext(AppContext); // global variable 
  const [booksByTopic, setBooksByTopic] = useState(null); // Array of book
  const [currentPage, setCurrentPage] = useState(null); // dynamic URL
  const [nextPage, setNextPage] = useState(""); // next page url
  const [previousPage, setPreviousPage] = useState("");// previous page url
  
  

  useEffect(()=>{
    if (search) { 
    setCurrentPage(`${apiURL}?search=${topic}`)}

    else if (!search) {
    setCurrentPage(`${apiURL}?topic=${topic}`)}
  },[topic])
// setCurrentPage(ieruv)

// setCurrentPage((prevPage) =>)

  console.log(currentPage)
  useEffect(() => {
    
    async function fetchData() {
      try {
        setLoading(true); // setLoading true while fetching data
        setError(null); // clear previous errors
setSearch(false)
console.log(currentPage)
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
  }, [ currentPage]); // run whenever topic or currentpage change


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
 
  {loading  &&
  <p>Loading ....</p>}
   {console.log(booksByTopic)}
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

     {!loading && booksByTopic && (
      
      <div>
        {console.log(booksByTopic)}
          {booksByTopic.map((e) => {
          return (
            <ProductCard
              key={e.id}
              id={e.id}
              image={ e.formats["image/jpeg"]}
              title={e.title}
            />
          );
        })}
        </div>)
      }
        
      </div>
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          padding: "18px",
          gap: "22px"
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
          "" )}

          {
            nextPage? ( <button
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
            </button>): ("")
          }
       
      </div>
    </>
  );
}
