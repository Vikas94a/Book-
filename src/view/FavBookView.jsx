import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";
import ReactLoading from 'react-loading';


export default function FavBookView (){
const {favorite, loading} =useContext(AppContext)  


   return(
    <>
    {loading ? <ReactLoading type="spin" color="#fff"/>: <div>
      <div style={{display:"flex"}}>
        {/* <img src={favorite.image} alt="" /> */}
       
       {loading && <p>Loading...</p> }
       {favorite && <div  style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}> 
        {favorite.map((e)=>{
        
        return(
          <ProductCard
          key={e.id}
          id={e.id}
          image={ e.image || e.formats["image/jpeg"]}
          title={e.title}
          />
         
        )
       }
       )}
       </div> }
       </div>
    </div> }
    </>
   )
}