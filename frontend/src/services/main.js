import { api_key } from "./apiKey.js";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: api_key
    }
};

export const searchFavoriteMovies = async () => {
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
    // for(let i = 1; i <= 4; i++)
    // {
    //     allMovies.push({
    //     id:i,
    //     "poster_path" : "/AapTPdddHKlgaIcKUgcMtaDoVYq.jpg",
    //     title: `Test${i}`,
    //     release_date:`${23 + i}`
    // })
    // }
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

// searchMovie("batman")
//     .then(movies => { movies.map(movie => console.log(movie.poster_path)) })
//     .catch(err => console.log(err));

