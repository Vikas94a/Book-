import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";






export default function BookByCategory(){

    const {topic} =useParams()

    const{apiURL, setLoading, setError, loading, error} = useContext(AppContext)
    const[booksByTopic, setBooksByTopic] = useState([])

    useEffect(()=>{
    async function fetchData(){
        try{
            setLoading(true)
            setError(null)

            const res = await fetch( `${apiURL}?topic=${topic}`)
            const data = await res.json()
console.log(data.results)
setBooksByTopic(data.results)
        }catch(error){
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    fetchData()
}, [topic, apiURL])

    return(
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"100%", justifyContent:"center", alignItems:"center"}}>
            {loading && <p>Loading ....</p> }
    
        {booksByTopic.map((e)=>{
    return(
        <ProductCard
        key={e.id}
        image={e.formats["image/jpeg"]}
        title={e.title}
        />
    )
  })
        }
     </div>
    )
}