
import { useState, useContext } from "react"
import { AppContext } from "../App"
import ProductCard from "../component/ProductCard"
import ReactLoading from 'react-loading';

export default function HomeView(){
const{ dynamic,setDynamic, gutendexArray, loading,book, nextPage, prevPage} =useContext(AppContext)

function handleNextPage() {
      setDynamic(nextPage);
  }
console.log(gutendexArray.count)

  {loading && <p>loading...</p> }
    return(
        <div style={{display:"flex", minHeight:"80vh", justifyContent:"center" , alignItems:"center"}}>
      {loading ? <ReactLoading  type={"spin"} color="#007BFF"  />:  <div>
      <div style={{display:"flex", flexWrap:"wrap", gap:"", justifyContent:"center", alignItems:"center", }}>
{/* {console.log(nextPage)} */}     
{/* <p>{gutendexArray.count}</p> */}
       {book.map((book)=>{
return(
    <ProductCard
    image={book.formats["image/jpeg"]}
    title={book.title}
    key={book.id}
    id={book.id}
    />
)
       })}
      
       </div>
       <div style={{width:"90%", justifyContent:"center", display:"flex",padding:"15px"}}>
       {prevPage && <button style={{
                backgroundColor: "orange",
                fontSize: "1.2rem",
                padding: "9px",
                color:"white",
                border: "none",
               borderRadius:"7px",
                 marginRight:"18px"
              }} onClick={()=>setDynamic(prevPage)}>Previous</button>}
        <button style={{
                backgroundColor: "orange",
                fontSize: "1.2rem",
                padding: "9px",
                color:"white",
                border: "none",
               borderRadius:"7px",
                marginLeft:"18px"
              }} onClick={handleNextPage}>Next</button>
       </div>
      </div> }


       </div>
    )
    
}