import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";

export default function (){
    const {apiURL, setLoading, setError, loading} = useContext(AppContext)
    const [bookDetail, setBookDetail] = useState(null)
const{id} = useParams()


    useEffect(()=>{
        async function bookdata (){
try{
    setLoading(true)
    setError(null)

    const res = await fetch(`${apiURL}/${id}`)
    const data = await res.json()
console.log(data)
    setBookDetail(data)
}catch(error){
    setError(error)
}finally{
    setLoading(false)
}
        }
        bookdata()
    },[id])

if(loading){
    return <p> Loading...</p>
}if(!bookDetail){
    return <p>No book detail</p>
}

    return(
<div>
    <img src={bookDetail.formats["image/jpeg"]} alt="" />
        <h3>{bookDetail.title}</h3>
        <p> by {bookDetail.authors?.[0].name}</p>
        <p>{bookDetail.summaries}</p>
        </div>
    )
}