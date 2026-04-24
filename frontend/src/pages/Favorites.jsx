import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { WarningBox } from "@/components/WarningBox";

export default function Favorites() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { token, isLoggedIn } = useAuth();
    const [warn, setWarn] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            setWarn("Nu ești autentificat! Te rugăm să te loghezi.");
            return;
        }
        const fetchFavorites = async () => {
            try {
                const response = await fetch("http://localhost:5000/getFavorites", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setFavoriteMovies(data.favorites);
            } catch (err) {
                console.error("Error fetching favorite movies:", err);
            }
        };
        fetchFavorites();
        console.log("Favorite movies fetched:", favoriteMovies[0]);
    }, []);

    const handleContent = () => {
        let maxWidth = "1fr";
        if (!favoriteMovies || favoriteMovies.length === 0) return <p className="text-lg">You don't have any favorites for the moment</p>
        if (favoriteMovies.length < 5) { maxWidth = "300px"; }
        return (
            <div className={`grid gap-1 p-2`}
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(250px,${maxWidth}))`
                }}>
                {favoriteMovies.map((movie) => (<MovieCard movie={movie} key={movie.id + movie.title} />))}

            </div>
        )
    }
    return (
        <div>
            {warn && (
                <WarningBox
                    message={warn}
                    type="warning"
                    onClose={() => {
                        setWarn(null);
                        navigate("/signin");
                    }}
                />
            )}
            <h1 className="text-5xl mb-2 text-shadow-2xl font-semibold text-shadow-red-600 text-red-600 font-black selection:bg-red-600 selection:text-white">Favorite Movies:</h1>
            {handleContent()}
        </div>
    )
}