import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import db from "./db.js";
import { registerUser, login } from "./users.js";
import { jwtMiddleware } from "./jwt.js";
import { isInFavorites, getFavoriteMovies, toggleMovieinFavorites} from "./movies.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())
const api_key = process.env.API_KEY || "Bearer "; // Paste API key after Bearer; Ex: Bearer 12345678


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
            if (!allMovies.includes(movie)) {
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
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const result = await registerUser(username, password)
    res.json(result)
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password)
    res.json(result)
})

app.post("/setFavorite", jwtMiddleware, async (req, res) => {
    try {
        const { movie_id, movie_data } = req.body;
        const userId = req.user.id;

        if(!movie_id || !movie_data){
            return res.status(400).json({success:false, message: "Lipsesc datele filmului."});
        }
        // console.log("Received request to toggle favorite for movie ID:", movie_id, "by user ID:", movie_data);
        const result = await toggleMovieinFavorites(userId, movie_id, movie_data);
        if (result.success){
            res.status(200).json(result);
        }
        else{
            res.status(400).json(result);
        }
    }
    catch(err){
        res.status(500).json({success: false, message: "Eroare internă de server."});
    }
})

app.get("/isfavorite/:movie_id", jwtMiddleware, async (req, res) => {
    const movieId = req.params.movie_id;
    const userId = req.user.id;
    try{
        const isFavorite = await isInFavorites(userId, movieId);
        res.json({ success: true, isFavorite });
    } catch (err) {
        res.status(500).json({ success: false, message: `Eroare internă de server: ${err.message}` });
    }
});

app.get("/getFavorites", jwtMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await getFavoriteMovies(userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: `Eroare internă de server: ${err.message}` });
    }
});

app.get("/searchPopularMovies", (req, res) => {
    searchPopularMovies().then(data => res.json(data));
})

app.get("/searchMovie", (req, res) => {
    const title = req.query.title;
    searchMovie(title).then(data => res.json(data));
})

app.get("/", (req, res) => {
    res.json('Cosmin Drignei')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`)
})
