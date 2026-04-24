import db from "./db.js";

export const toggleMovieinFavorites = async (userId, movieId, movieData) => {
    const queryAdd = 'INSERT INTO movies (user_id, movie_id, movie_data) VALUES ($1, $2, $3) ON CONFLICT (user_id, movie_id) DO NOTHING RETURNING *';
    const queryRemove = 'DELETE FROM movies WHERE user_id = $1 AND movie_id = $2 RETURNING *';
    const values = [userId, movieId, movieData];
    try {
        const res = await db.query(queryAdd, values);
        if (res.rows.length === 0) {
            const resRemove = await db.query(queryRemove, [userId, movieId]);
            if (resRemove.rows.length === 0) {
                return { success: false, message: "Movie was not in favorites" };
            }
            // console.log("Movie removed from favorites:", movieId);

            return { success: true, favorite: null };
        }
        // console.log("Movie added to favorites:", movieId);
        return { success: true, favorite: res.rows[0] };
    }
    catch (err) {
        console.error("Eroare la setarea filmului în favorite", err.message);
        throw err;
    }
}

export const isInFavorites = async (userId, movieId) => {
    const query = 'SELECT * FROM movies WHERE user_id = $1 AND movie_id = $2';
    try {
        const res = await db.query(query, [userId, movieId]);
        return res.rows.length > 0;
    }
    catch (err) {
        console.error("Eroare la verificarea filmului în favorite", err.message);
        throw err;
    }
}

export const getFavoriteMovies = async (userId) => {
    const query = 'SELECT movie_data FROM movies WHERE user_id = $1';
    try {
        const res = await db.query(query, [userId]);
        // console.log("Favorite movies retrieved for user ID:", userId, "Movies:", res.rows);
        const movies = res.rows.map(row => row.movie_data);
        return { success: true, favorites: movies};
    } catch (err) {
        console.error("Eroare la obținerea filmelor favorite", err.message);
        throw err;
    }
}
// toggleMovieinFavorites()
// getFavoriteMovies(25).then(res => console.log(res)).catch(err => console.log(err))
