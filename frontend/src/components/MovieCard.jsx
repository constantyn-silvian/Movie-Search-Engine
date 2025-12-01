import { use, useEffect, useState } from "react";
import {Heart} from "lucide-react"

export default function MovieCard({ movie }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        toggleLike();
    }, [])

    const toggleLike = () => {
        if (!localStorage.getItem(`FavoriteMovie:${movie.id}`)) {
            localStorage.setItem(`FavoriteMovie:${movie.id}`, JSON.stringify(movie));
            setLiked(true);
        }
        else {
            localStorage.removeItem(`FavoriteMovie:${movie.id}`);
            setLiked(false);
        }
    }
    return (
        <div >
        <div className="container group relative h-[55vh] flex flex-col border-2 border-gray-600 hover:border-gray-400  rounded-md m-1 p-1 bg-slate-800 ">
            {/* Black Cover */}
            <div className="absolute h-full w-full z-22 scale-100 group-hover:z-20 group-hover:bg-black/10 top-0 left-0 rounded-xl transition-all bg-black/50"></div>
            
            {/* Content */}
            <img className="w-full h-full select-none rounded-md" src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} ></img>
            <div className="flex flex-row container justify-between mt-2 ">
                <div className=" text-left text-[clamp(10px,1.2vw,40px)] text-gray-300 font-semibold">
                    <h3 >{movie.title}</h3>
                    <p >{movie.release_date}</p>
                </div>
                <button className="z-21 transition-all group" onClick={toggleLike}>{liked ? <Heart className="scale-100 hover:scale-125 w-[70%] h-[70%] text-red-600 fill-red-600 active:fill-red-700" /> : <Heart className="scale-100 hover:scale-125 w-[70%] h-[70%]"/>}</button>
            </div>
        </div>
        </div>
    )
}
