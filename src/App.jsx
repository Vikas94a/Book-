import { useState, useEffect, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import './App.css'
import HomeView from './view/Homeview'


export const AppContext = createContext()



function App() {

  const [apiURL, setApiUrl]= useState("https://gutendex.com/books")

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

  return (
    <>

<AppContext.Provider
value={{
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
