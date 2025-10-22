import { use, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    // const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/searchPopularMovies").then(res => res.json()).then(data => { setMovies(data); setLoading(false);}).catch(err => console.log(err));
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() != "") {
            setLoading(true);
            fetch(`http://localhost:5000/searchMovie?title=${encodeURIComponent(searchQuery.trim())}`).then(res => res.json()).then(res => {setMovies(res), setLoading(false)}).catch(err => console.log(err));
        }
        setSearchQuery("");
    }

    const handleContent = () => {
        let maxWidth = "1fr";
        if (loading) return <h1 className="text-2xl text-gray-300">Loading...</h1>
        if (movies.length === 0) return <h1>No results found</h1>
        if (movies.length < 4) {
            maxWidth = "400px";
        }
        return (
            <div className={`grid gap-1 p-2`}
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(250px,${maxWidth}))`
                }}>
                {movies.map((movie) => (<MovieCard movie={movie} source={"home"} key={movie.id} />))}
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder="Search for movies"
                    className="border-1 border-white hover:border-3 rounded-md p-2 text-lg outline-[0px]"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <button type="submit" className="text-lg p-3 hover:font-bold hover:font-gray-200 active:text-gray-600">Search</button>
            </form>
            {handleContent()}
        </div>
    )
}