import { useState, useEffect, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import './App.css'
import HomeView from './view/Homeview'


export const AppContext = createContext()



function App() {

  const [apiURL, setApiUrl]= useState("https://gutendex.com/books")
const [favorites, setFavorites] = useState(() => {
  const storedFavorites = localStorage.getItem('favoriteBooks');
  return storedFavorites ? JSON.parse(storedFavorites) : [];});
const[loading, setLoading] = useState(false)
const [error, setError]= useState(null)
const[book, setBook] = useState([])


useEffect(()=>{

async function fetchData() {
  try{
    setLoading(true)
    setError(null)

    const res = await fetch(apiURL)
    const data = await res.json()
// console.log(data.results)
    setBook(data.results)
  
  }catch(error){
    setError(error)
  }finally{
    setLoading(false)
  }
}
  fetchData()
},[])

function toggleFav (book){
setFavorites((prefav)=>{
  const favList = prefav.some((fav)=>fav.id ===book.id)
  if(favList){
   return prefav.filter((fav)=> fav.id !== book.id);
  }
return [...prefav, book];
});
console.log(favorites)
}


  return (
    <>

<AppContext.Provider
value={{
  book,
  favorites,
  setFavorites,
  toggleFav,
    apiURL,
    book,
    loading,
    setLoading,
    setError
  }}
>

<Header/>
<main>
<Outlet/>
</main>
</AppContext.Provider>
     
    </>
  )
}

export default App
