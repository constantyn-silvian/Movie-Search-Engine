import express from "express"
import cors from "cors"
import { api_key } from "./apiKey.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

const options = {
    method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: api_key
    }
};

export const searchPopularMovies = async () => {
    const allMovies = [];
    for (let i = 1; i <= 5; i++) {
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`;
        const data = await fetch(url, options).then(res => res.json());
        data.results.forEach(movie => {
            if(!allMovies.includes(movie)){
                allMovies.push(movie);
            }
        });
    }
    return allMovies;
}

export const searchMovie = async (query) => {
    const allMovies = [];
    for (let i = 1; i <= 5; i++) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query.trim())}&include_adult=false&language=en-US&page=${i}`;
        const data = await fetch(url, options).then(res => res.json());
        data.results.map(movie => {
            if (movie.poster_path && !allMovies.includes(movie)) {
                allMovies.push(movie);
            }
        });
    }
    return allMovies;
}
 
app.get("/searchPopularMovies", (req, res) => {
    searchPopularMovies().then(data => res.json(data));
})

app.get("/searchMovie", (req, res) => {
    const title = req.query.title;
    searchMovie(title).then(data => res.json(data));
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`)
})