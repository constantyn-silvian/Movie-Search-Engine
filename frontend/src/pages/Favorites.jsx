import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";

export default function Favorites() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        setFavoriteMovies(Object.keys(localStorage));
    }, []);

    const handleContent = () => {
        let maxWidth = "1fr";
        if (!favoriteMovies || favoriteMovies.length === 0) return <p className="text-lg">You don't have any favorites for the moment</p>
        if (favoriteMovies.length < 4) { maxWidth = "400px"; }
        return (
            <div className={`grid gap-1 p-2`}
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(250px,${maxWidth}))`
                }}>
                {favoriteMovies.map((movie_key) => (<MovieCard movie={JSON.parse(localStorage.getItem(movie_key))} key={movie_key} />))}
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-5xl text-shadow-2xl text-shadow-red-600 text-red-600 font-black selection:bg-red-600 selection:text-white">Favorite Movies:</h1>
            {handleContent()}
        </div>
    )
}