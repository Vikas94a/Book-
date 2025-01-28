import './ProductCard.css'
import { AppContext } from '../App'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';




export default function ({image, title, name, id}){

    const {loading, favorites, setFavorites, toggleFav, book}= useContext(AppContext)
const isFavorites = favorites.some(fav=> fav.id !==book.id)
    console.log(isFavorites)


    return(
        <div className='card'>
           
{loading && <p> Loading....</p> }


        <div className="card-detail" key={id} >
            <img className="image" src={image} alt={title} />
            <Link to={`/BookView/${id}`}>
            <h5 className="title" >{title}</h5>
            </Link>
            <p>{name}</p>
            <FontAwesomeIcon
                icon={  faHeart  }   
                onClick={() => toggleFav({id, title,image,name})}
                style={{cursor:"pointer",
                    fontSize:"1.5rem",
                    color: isFavorites ? "red": "grey"
                
                }}
                />
        </div>
       
        </div>
    )
}