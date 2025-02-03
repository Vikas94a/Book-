import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";


export default function FavBookView (){
const {favorite, loading} =useContext(AppContext)  
      console.log(favorite)

    return(
       <div>
       {loading && <p>Loading...</p> }
       {favorite && <div  style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}> 
        {favorite.map((e)=>{
            console.log(e)
        return(
          <ProductCard
          key={e.id}
          id={e.id}
          image={e.image || e.formats["image/jpeg"]}
          title={e.title}
          />
        )
       })}
       </div> }
       </div>
    )
}