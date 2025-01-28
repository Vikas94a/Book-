import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";
export default function FavBookView (){

    const {favorites, setFavorits, loading} = useContext(AppContext)

    useEffect(()=>{
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }, [favorites])
      

    return(
       <div>
       {loading && <p>Loading...</p> }
       {favorites.map((e)=>{
        return(
          <ProductCard
          key={e.id}
          image={e.image}
          />
        )
       })}
       </div>
    )
}