import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsDown, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg';
import './App.css';

function Favorites() {
  const base_api_url = "http://www.omdbapi.com/";
  const api_key = "d9ee1258";
  const [movies, setMovies] = useState([]);

  const unfavoriteMovie = (e) => {

  }

  return (
    <div id="root">
      <div className="header">
        <h1>OMDd API</h1>
      </div>

      <div className="list_movies">
        <ul className="list">
          {movies.map(movie => {
            return (
              <li id={movie.imdbID} key={movie.imdbID} className="movie">
				        <FontAwesomeIcon onClick={(e) => unfavoriteMovie(e)} icon={faHeart} />
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

export default Favorites;
