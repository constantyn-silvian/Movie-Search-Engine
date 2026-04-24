import { use, useEffect, useState } from "react";
import {Heart} from "lucide-react"
import useAuth from "@/hooks/useAuth";

export default function MovieCard({ movie }) {
    const [liked, setLiked] = useState(false);
    const {token, isLoggedIn} = useAuth();
    useEffect(() => {
        const checkFavorite = async () => {
            const response = await fetch(`http://localhost:5000/isFavorite/${movie.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setLiked(data.isFavorite);
        };
        checkFavorite();
    }, [movie.id]);

    const toggleLike = async () => {
        await fetch(`http://localhost:5000/setFavorite`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , authorization: `Bearer ${token}`},
            body: JSON.stringify({ movie_id: movie.id, movie_data: movie })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setLiked(!liked);
            }
        });
    }
    return (
        <div >
        <div className="container group relative h-[55vh] flex flex-col border-2 border-gray-600 hover:border-gray-400  rounded-md m-1 p-1 bg-slate-800 ">
            {/* Black Cover */}
            <div className="absolute h-full w-full z-22 scale-100 group-hover:z-20 group-hover:bg-black/10 top-0 left-0 rounded-xl transition-all bg-black/20"></div>
            
            {/* Content */}
            <img className="w-full h-[80%] select-none rounded-md" src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} ></img>
            <div className="h-[20%] flex flex-row container justify-between mt-2 ">                
                <div className="text-left text-[clamp(5px,1.1vw,40px)] text-gray-300 font-semibold overflow-autox">

                    <h3 >{movie.title}</h3>
                    <p >{movie.release_date}</p>
                </div>
                <button className="z-21 transition-all group" onClick={toggleLike}>{liked ? <Heart className="scale-100 hover:scale-125 w-[70%] h-[70%] text-red-600 fill-red-600 active:fill-red-700" /> : <Heart className="scale-100 hover:scale-125 w-[70%] h-[70%]"/>}</button>
            </div>
        </div>
        </div>
    )
}
