class Movie {
    constructor(title, year, release, genre, director, writer, plot, poster) {
        this.title = title;
        this.year = year;
        this.release = release;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.plot = plot;
        this.poster = poster;
    }
}

class MovieApp {
    constructor() {
        this.searchQuery = "";
        this.resultMovie = null;
        this.recentMovies = [];
        this.activeMovie = null;
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

    async searchMovie(event) {
        if(event.code === "Enter") {
            event.preventDefault();
            const searchInput = document.querySelector("input");
            const searchQuery = searchInput.value;
            this.searchQuery = searchQuery;
            const apiEndpoint = `http://www.omdbapi.com/?t=${searchQuery}&apikey=45112140`;
            const response = await fetch(apiEndpoint);
            const result = await response.json();
            if(result) {
                console.log(result);
                this.resultMovie = new Movie(
                    result.Title, 
                    result.Year,
                    result.Released,
                    result.Genre,
                    result.Director,
                    result.Writer,
                    result.Plot,
                    result.Poster
                );
                
                const searchResultWrapper = document.querySelector(".search-result-wrapper");
                searchResultWrapper.innerHTML = `
                <div>
                    <img src="${this.resultMovie.poster}"
                        alt="">
                    <h3>${this.resultMovie.title}</h3>
                    <p>${this.resultMovie.genre}</p>
                </div>
                `;
            }
        }
    }

    attachSearchEventListener() {
        const searchInput = document.querySelector("input");
        this.searchInput = searchInput;
        searchInput.addEventListener("keydown", this.searchMovie)
    }
}


const movieAppObject  = new MovieApp();
movieAppObject.attachSearchEventListener();
console.log(movieAppObject);


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