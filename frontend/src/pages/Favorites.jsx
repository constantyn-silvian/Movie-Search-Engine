import { useEffect, useState } from "react"
import MovieCard from "../components/movieCard";

export default function Favorites() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        setFavoriteMovies(Object.keys(localStorage));
    }, []);

    useEffect(() => {
        setFavoriteMovies(Object.keys(localStorage));
    }, [localStorage.length])

    const handleContent = () => {
        let maxWidth = "1fr";
        if(!favoriteMovies || favoriteMovies.length === 0) return <p className="text-lg">You don't have any favorites for the moment</p>
        if(favoriteMovies.length < 4) {maxWidth = "400px";}
        return (
            <div className={`grid grid-cols-[repeat(auto-fit,minmax(250px,${maxWidth}))] gap-1 p-2`} >
                    {favoriteMovies.map((movie_key) => (<MovieCard movie={JSON.parse(localStorage.getItem(movie_key))} source={"favorites"} key={movie_key} />))}
            </div>
        )   
    }
    return (
        <div>
            <h1 className="text-5xl text-red-600 font-black">Favorite Movies:</h1>
            {handleContent()}
        </div>
    )
}