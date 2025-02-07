import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorView from './view/ErrorView.jsx'
import HomeView from './view/Homeview.jsx'
import BookByCategory from './view/BookByCategory.jsx'
import BookView from './view/BookView.jsx'
import FavBookView from './view/FavBookView.jsx'


const router = createBrowserRouter([{
  path: "/Book-",
  element: <App/>,
  errorElement :<ErrorView/>,
  children:[{
    path:"/Book-",
    element:<HomeView/>
        },
        {
          path:"/Book-/HomeView/",
          element:<HomeView/>
    
        },{
          path:"/Book-/BookByCategory/:topic",
          element:<BookByCategory/>
        },{
          path:"/Book-/BookView/:id",
          element:<BookView/>
        },{
          path:"/Book-/FavBookView/",
          element: <FavBookView/>
        }

]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/> 
  </StrictMode>,
)
