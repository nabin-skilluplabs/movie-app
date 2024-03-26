const API_KEY = 'd41d8bb0db419dbf25b142defe21dabb';
const READ_TOKEN_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDFkOGJiMGRiNDE5ZGJmMjViMTQyZGVmZTIxZGFiYiIsInN1YiI6IjY2MDEzYTU5MDQ3MzNmMDE3ZGVlZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QkmxyS6I5bPzVw-7l2SoG6cc9wO7C5JQXWPaTJmdGZI';

class Movie {
    constructor(title, release, plot, poster) {
        this.title = title;
        this.release = release;
        this.plot = plot;
        this.poster = poster;
    }
}

class MovieApp {
    #cookie = '';
    constructor() {
        this.searchQuery = "";
        this.resultMovie = null;
        this.recentMovies = () => {
            const cookie = document.cookie;
            console.log(cookie);
        };
        this.activeMovie = null;
       
    }

    get cookie() {
        return document.cookie;
    }
    set cookie(value) {
        document.cookie = value;
    }


    showResult() {
        const searchResultWrapper = document.querySelector(".search-result-wrapper");
        searchResultWrapper.innerHTML(`
        <div>
            <img src="${this.resultMovie.poster}"
                alt="">
            <h3>${this.resultMovie.title}</h3>
            <p>${this.resultMovie.genre}</p>
        </div>
        `)
    }

    renderRecentMovies() {
        const recentElements =  this.recentMovies.map(movie => {
            return `
            <img src="${`https://image.tmdb.org/t/p/w500${movie.poster_path}`}"
            alt="">
            `
        });
        const recentWrapper = document.querySelector(".recent-wrapper div");
        recentWrapper.innerHTML = recentElements.join("");
    }

    async searchMovie(event) {
        if(event.code === "Enter") {
            event.preventDefault();
            const searchInput = document.querySelector("input");
            const searchQuery = searchInput.value;
            this.searchQuery = searchQuery;
            // const apiEndpoint = `http://www.omdbapi.com/?t=${searchQuery}&apikey=45112140`;
            const apiEndpoint = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}&api_key=${API_KEY}`;
            const response = await fetch(apiEndpoint);
            const responseData = await response.json();
            console.log(responseData);
            const movies = responseData.results.filter(result => result.title && result.poster_path && result.release_date).slice(0, 10);
            if(movies.length) {
                this.recentMovies.unshift(movies[0].poster_path);
                this.renderRecentMovies();
                const date = new Date();
                const expireDateAndTime = date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 7);
                
                this.cookie = `recentMovies=${JSON.stringify(this.recentMovies)};expires=${new Date(expireDateAndTime)};path=/`;

                const resultElements = movies.map(result => {
                    this.resultMovie = new Movie(
                        result.title, 
                        result.release_date,
                        result.overview,
                        `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    );
                    return `
                        <div>
                            <img src="${this.resultMovie.poster}"
                                alt="">
                            <h3>${this.resultMovie.title}</h3>
                            <p>${this.resultMovie.release}</p>
                        </div>
                    `;
                });
                const searchResultWrapper = document.querySelector(".search-result-wrapper");
                searchResultWrapper.innerHTML = resultElements.join("");
            }
        }
    }

    attachSearchEventListener() {
        const searchInput = document.querySelector("input");
        this.searchInput = searchInput;
        searchInput.addEventListener("keydown", (event) => {
            this.searchMovie(event);
        })
    }
}


const movieAppObject  = new MovieApp();
movieAppObject.attachSearchEventListener();
console.log(movieAppObject.recentMovies());

const movieObject = new Movie(
    'Guardians of the Galaxy Vol. 2',
    '2024',
    '29 Mar 2024',
    'Action, Adventure, Sci-Fi',
    'Adam Wingard',
    'Terry Rossio, Simon Barrett, Jeremy Slater',
    "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
    "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
);

console.log(movieObject);