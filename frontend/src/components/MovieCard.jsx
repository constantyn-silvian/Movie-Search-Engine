export default function MovieCard({ movie }) {
    return (
        <div className="border-2 border-gray-600 hover:border-gray-400 hover:border-3 rounded-md m-1 p-2 max-w-[350px] bg-slate-800 ">
            <div>
                <img className="object-fill w-full" src={movie.url} ></img>
            </div>
            <div className="flex flex-row justify-between mt-2 ">
                <div className=" text-left text-[clamp(20px,1.2vw,50px)] font-gray-200">
                    <h3 >{movie.title}</h3>
                    <p >{movie.releaseDate}</p>
                </div>
                <button>♡</button>
            </div>
        </div>
    )
}