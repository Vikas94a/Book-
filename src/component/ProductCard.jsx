import './ProductCard.css'
import { AppContext } from '../App'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';




export default function ({image, title, name, id}){

    const {loading, favorite, setFavorite, AddtoFav, book}= useContext(AppContext) //context to manage state 
   const isFavorite = favorite.some((fav)=> fav.id ===id) // check if the book is favorite or not 
    


    return(
        <div className='card'>
           
{loading && <p> Loading....</p> }


        <div className="card-detail" key={id} >
            <img className="image" src={image} alt={title} />
            <Link className='title' to={`/BookView/${id}`}>
            <h5 className="title" >{title}</h5>
            </Link>
            <p>{name}</p>
            <FontAwesomeIcon id='id' className='heart-icon'
                icon={  faHeart  }  
                onClick={()=> AddtoFav({id, image, title,name})}
                style={{
                    float:"right",
                    fontSize:"2rem",
                    color:isFavorite ? "red" :"grey" // change color base on favorite 
                }}
                />
        </div>
       
        </div>
    )
}