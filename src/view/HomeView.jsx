import { Route } from "react-router-dom"
import { useState, useContext } from "react"
import { AppContext } from "../App"
import ProductCard from "../component/ProductCard"

export default function HomeView(){
const{ apiURL, setError, loading, book} =useContext(AppContext)



    return(
        
        <div style={{display:"flex", flexWrap:"wrap", gap:"", justifyContent:"center", alignItems:"center", }}>

            
            {loading && <p>loading...</p> }
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
    )
    
}