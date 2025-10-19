import { use, useEffect, useState } from "react";

export default function MovieCard({ movie, source }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        toggleLike();
    }, [])

    const toggleLike = () => {
        if (!localStorage.getItem(`${movie.id}`)) {
            localStorage.setItem(`${movie.id}`, JSON.stringify(movie));
            setLiked(true);
        }
        else {
            localStorage.removeItem(`${movie.id}`);
            setLiked(false);
        }
    }
    return (
        <div className="flex flex-col  border-2 border-gray-600 hover:border-gray-400 hover:border-3 rounded-md m-1 p-1 bg-slate-800 ">
            <img className="object- w-full min-h-[150px]" src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} ></img>
            <div className="flex flex-row justify-between mt-2 ">
                <div className=" text-left text-[clamp(10px,1.2vw,40px)] text-gray-300 font-semibold">
                    <h3 >{movie.title}</h3>
                    <p >{movie.release_date}</p>
                </div>
                {(source == "home") && <button onClick={toggleLike}>{liked ? "❤︎" : "♡"}</button>}
                {(source == "favorites") && <button >❤︎</button>}
            </div>
        </div>
    )
}
