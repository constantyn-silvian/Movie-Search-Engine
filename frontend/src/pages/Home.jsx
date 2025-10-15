import MovieCard from "../components/movieCard"

export default function Home() {
    const movies = [
        { id: 1, title: 'John Wick', releaseDate: '2024' },
        { id: 2, title: 'Terminator', releaseDate: '1980' },
        { id: 3, title: 'Sonic the Hedgehog', releaseDate: '2000' },
    ]

    return (
        <div>
            <p>Search</p>
            <div>
                {movies.map((movie) => ( <MovieCard movie={movie} key={movie.id} /> ))}
            </div>
        </div>
    )
}