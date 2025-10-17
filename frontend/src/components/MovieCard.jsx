export default function MovieCard({ movie }) {
    return (
        <div className="border-2 border-gray-600 rounded-md m-4 p-2 bg-slate-800 mx-auto ">
            <div>
                <img src={movie.url} ></img>
                <button>♡</button>
            </div>
            <div>
                <h3 >{movie.title}</h3>
                <p>{movie.releaseDate}</p>
            </div>
        </div>      
    )
}