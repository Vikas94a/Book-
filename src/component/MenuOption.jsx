import { Link } from "react-router-dom"
import BookByCategory from "../view/BookByCategory"



const option=  ["Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"] 


export default function MenuOption(){


return(

            <div style={{display:"flex", flexDirection:"column", position:"absolute", right:"2px", top:"33px"}}>
    {option.map((topic, i)=>{
        return(

            <Link  key={i} to={`/BookByCategory/${topic.toLocaleLowerCase()}`}>{topic}</Link>
            
        )
    })}
    </div>
    
)

}