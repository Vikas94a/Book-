import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

export default function () {
  const { apiURL, setLoading, favorite, AddtoFav, setError, loading } =
    useContext(AppContext); // global variable

  const [bookDetail, setBookDetail] = useState(null); //state for bok det
  const { id } = useParams(); // update url when id change

  useEffect(() => {
    async function bookdata() {
      try {
        setLoading(true); // set loading true
        setError(null); // clear error

        const res = await fetch(`${apiURL}/${id}`); // fetch data
        const data = await res.json();

        setBookDetail(data); // update book
      } catch (error) {
        setError(error); //capture any error during the fetch
      } finally {
        setLoading(false); // set loading to false after the fetch
      }
    }
    bookdata();
  }, [id]); // re-run whenever id change

  if (loading) {
    return;
  }
  if (!bookDetail) {
    return <p>No book detail</p>;
  }
  const isFavorite = favorite.some((fav) => fav.id === bookDetail.id);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "30%",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ display: "inline-block", height: "460px" }}
            src={bookDetail.formats["image/jpeg"]}
            alt=""
          />

          {
            <FontAwesomeIcon
              id="id"
              className="heart-icon"
              icon={faHeart}
              onClick={() => AddtoFav(bookDetail)}
              style={{
                height: "50px",
                top: "426px",
                left: "340px",
                fontSize: "2rem",
                color: isFavorite ? "red" : "grey", // change color base on favorite
              }}
            />
          }
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <h3 style={{ padding: "4px", fontSize: "1.8rem",   overflow: "hidden", textOverflow: "ellipsis",  whiteSpace: "nowrap", width:"500px"  }}>
            {bookDetail.title}
          </h3>
          <p style={{ color: "red", marginBottom: "33px" }}>
            {" "}
            by {bookDetail.authors?.[0].name}
          </p>
          <p style={{ maxWidth: "540px", color: "gray" }}>
            {bookDetail.summaries}
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              gap: "20px",
            }}
          >
            <a
     href={bookDetail.formats[ "application/x-mobipocket-ebook"]}
              style={{
                backgroundColor: "orange",
                border: "none",
                padding: "10px",
                color: "white",
                fontWeight: "700",
                borderRadius: "8px",
              }}
            >
              Read online
            </a>
            <a
             href={bookDetail.formats["application/octet-stream"]}
              style={{
                backgroundColor: "transparent",
                border: "1px solid orange",
                padding: "10px",
                color: "black",
                fontWeight: "500",
                borderRadius: "8px",
              }}
            >
              Download ebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
