import { use, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { WarningBox } from "@/components/WarningBox";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    // const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const { token, isLoggedIn } = useAuth();
    const [warn, setWarn] = useState(null);
    const [warnType, setWarnType] = useState("warning");
    const navigate = useNavigate();

    const setPopularMovies = () => {
        setLoading(true);
        fetch("http://localhost:5000/searchPopularMovies").then(res => res.json()).then(data => {
            const listaUnica = [...new Map(data.map(item => [item.id, item])).values()];
            setMovies(listaUnica);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setWarn("Nu ești autentificat! Te rugăm să te loghezi.");
            setWarnType("warning");
            return;
        }
        setPopularMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        try {
            if (searchQuery.trim() != "") {
                setLoading(true);
                fetch(`http://localhost:5000/searchMovie?title=${encodeURIComponent(searchQuery.trim())}`).then(res => res.json()).then(res => { setMovies(res), setLoading(false) }).catch(err => console.log(err));
            }
            else if (searchQuery.trim() === "") {
                setPopularMovies();
            }
            setSearchQuery("");
        } catch (err) {
            console.log(err);
        }
    }

    const handleContent = () => {
        let maxWidth = "1fr";
        if (loading) return <h1 className="text-2xl text-gray-300">Loading...</h1>
        if (movies.length === 0) return <h1>No results found</h1>
        if (movies.length < 4) {
            maxWidth = "300px";
        }
        return (
            <div className={`grid gap-2 p-2`}
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(15vw,${maxWidth}))`,
                }}>
                {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
            </div>
        )
    }

    return (
        <div className="h-full w-full">
            {warn && (
                <WarningBox
                    message={warn}
                    type={warnType}
                    onClose={() => {
                        setWarn(null);
                        navigate("/signin");
                    }}
                />
            )}
            <div className=" flex justify-center ">
                <form onSubmit={handleSearch} className="w-[20vw] h-[8vh] flex flex-row justify-center items-center border border-white hover:border-2 rounded-md p-2 outline-0">
                    <input
                        type='text'
                        placeholder="Search for movies"
                        className="p-2 text-lg text-white/90 outline-0 overflow-hiddenscroll whitespace-nowrap text-ellipsis bg-transparent w-full"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <button type="submit" style={{
                        fontSize: "clamp(10px, 1.5vw, 20px)"
                    }} className="cursor-pointer font-semibold text-lg hover:opacity-80 hover:font-gray-200 active:text-gray-600">Search</button>
                </form>
            </div>
            {handleContent()}

            {/* {dialogboxwindow && (<DialogBox />)} */}
        </div>
    )
}