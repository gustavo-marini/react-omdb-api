import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const base_api_url = "http://www.omdbapi.com/";
  const api_key = "d9ee1258";
  const [movies, setMovies] = useState([]);

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      var movie_name = e.target.value;

      var url = base_api_url + "?s=" + encodeURI(movie_name) + "&apikey=" + api_key;

      const exec = async() => {
        const resposta = await fetch(url);
        const json = await resposta.json();

        var movies = json.Search;

        setMovies(movies);
      };
      exec();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id="root">
      <div className="header">
        <h1>OMDd API</h1>
        <form id="search_movie" onSubmit={(e) => onSubmit(e)}>
          <label>Nome do filme: </label>
          <input name="movie_name" type="text" onKeyDown={(e) => handleFormSubmit(e)} />
        </form>
      </div>

      <div className="list_movies">
        <ul className="list">
          {movies.map(movie => {
            return (
              <li className="movie">
                <img src={movie.Poster} />
                <div className="movie_info">
                  <span id="title"><strong>Título: </strong>{movie.Title}</span>
                  <span id="year"><strong>Ano de lançamento: </strong>{movie.Year}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
