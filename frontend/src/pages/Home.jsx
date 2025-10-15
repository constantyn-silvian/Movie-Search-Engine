import { use, useState } from "react"
import MovieCard from "../components/movieCard"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: 'John Wick', releaseDate: '2024' },
        { id: 2, title: 'Terminator', releaseDate: '1980' },
        { id: 3, title: 'Sonic the Hedgehog', releaseDate: '2000' },
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery("")
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type='text'
                    placeholder="Search for movies"
                    className="border-1 border-white rounded-md  p-1"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {movies.map((movie) => (movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} /> ))}
            </div>
        </div>
    )
}