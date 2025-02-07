import { Route } from "react-router-dom"
import { useState, useContext } from "react"
import { AppContext } from "../App"
import ProductCard from "../component/ProductCard"
import ReactLoading from 'react-loading';

export default function HomeView(){
const{ dynamic,setDynamic, setError, loading,book, nextPage, prevPage} =useContext(AppContext)

function handleNextPage() {
      setDynamic(nextPage);
  }
console.log(dynamic)

  {loading && <p>loading...</p> }




    return(
        <div style={{display:"flex", minHeight:"80vh", justifyContent:"center" , alignItems:"center"}}>
      {loading ? <ReactLoading  type={"spin"} color="#F38D3B"  />:  <div>
      <div style={{display:"flex", flexWrap:"wrap", gap:"", justifyContent:"center", alignItems:"center", }}>
{/* {console.log(nextPage)} */}
            
            
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
                backgroundColor: "transparent",
                fontSize: "1.2rem",
                padding: "4px",
                border: "none",
                outline: "2px double blue",
                 marginRight:"18px"
              }} onClick={()=>setDynamic(prevPage)}>Previous</button>}
        <button style={{
                backgroundColor: "transparent",
                fontSize: "1.2rem",
                padding: "4px",
                border: "none",
                outline: "2px double blue",
                marginLeft:"18px"
              }} onClick={handleNextPage}>Next</button>
       </div>
      </div> }


       </div>
    )
    
}