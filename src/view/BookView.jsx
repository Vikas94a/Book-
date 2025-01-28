import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";

export default function (){
    const {apiURL, setLoading, setError, loading} = useContext(AppContext) // global variable
    const [bookDetail, setBookDetail] = useState(null) //state for bok det
const{id} = useParams() // update url when id change 


    useEffect(()=>{
        async function bookdata (){
try{
    setLoading(true) // set loading true
    setError(null) // clear error

    const res = await fetch(`${apiURL}/${id}`) // fetch data 
    const data = await res.json()

    setBookDetail(data) // update book
}catch(error){
    setError(error) //capture any error during the fetch
}finally{
    setLoading(false)// set loading to false after the fetch
}
        }
        bookdata()
    },[id]) // re-run whenever id change 

if(loading){
    return <p> Loading...</p>
}if(!bookDetail){
    return <p>No book detail</p>
}

    return(
<div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"4px"}}>
    <img src={bookDetail.formats["image/jpeg"]} alt="" />
        <h3 style={{padding:"4px"}}>{bookDetail.title}</h3>
        <p style={{marginBottom:"5px", color:"red"}}> by {bookDetail.authors?.[0].name}</p>
        <p>{bookDetail.summaries}</p>
        </div>
    )
}