import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route,Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorView from './view/ErrorView.jsx'
import HomeView from './view/Homeview.jsx'
import BookByCategory from './view/BookByCategory.jsx'
import BookView from './view/BookView.jsx'
import FavBookView from './view/FavBookView.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  errorElement :<ErrorView/>,
  children:[{
    path:"/",
    element:<HomeView/>
        },
        {
          path:"/HomeView/",
          element:<HomeView/>
    
        },{
          path:"/BookByCategory/:topic",
          element:<BookByCategory/>
        },{
          path:"/BookView/:id",
          element:<BookView/>
        },{
          path:"/FavBookView/",
          element: <FavBookView/>
        }

]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/> 
  </StrictMode>,
)
