import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsDown, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

function Favorites() {
  const base_api_url = "http://www.omdbapi.com/";
  const api_key = "d9ee1258";
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    var fav = localStorage.getItem("favorites");
    if(fav) {
      var favorites = fav.split(",");
      var response = [];

      favorites.map(function(el, i) {
        var url = base_api_url + "?i=" + el + "&apikey=" + api_key;
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var movie_json = JSON.parse(xhr.responseText);
              response.push({
                "imdbID": movie_json.imdbID,
                "Poster": movie_json.Poster,
                "Title": movie_json.Title,
                "Year": movie_json.Year
              });
            }
          }
        };
        xhr.send(null);
      });

      setMovies(response);
    } else {
      setMovies([]);
    }
  }, []);

  const unfavoriteMovie = (e) => {
    var id = ReactDOM.findDOMNode(e.target).parentNode.parentNode.id;
    var favorites = localStorage.getItem("favorites");
    if(favorites) {
      favorites = favorites.split(",");
      if(id) {
        if(favorites.includes(id)) {
          for( var i = 0; i < favorites.length; i++){ 
            if ( favorites[i] === id) {
              favorites.splice(i, 1); 
            }
         }
        } else {
          favorites.push(id);
        }
      }
    }
		
    localStorage.setItem("favorites", favorites);


    var response = [];

    favorites.map(function(el, i) {
      var url = base_api_url + "?i=" + el + "&apikey=" + api_key;
      
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var movie_json = JSON.parse(xhr.responseText);
            response.push({
              "imdbID": movie_json.imdbID,
              "Poster": movie_json.Poster,
              "Title": movie_json.Title,
              "Year": movie_json.Year
            });
          }
        }
      };
      xhr.send(null);
    });

    setMovies(response);
  }

  return (
    <div id="root">
      <div className="header">
        <Link className="link-tag" to="/"><h1>OMDd API</h1></Link>
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
