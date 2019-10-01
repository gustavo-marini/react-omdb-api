import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsDown, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

function App() {
  const base_api_url = "http://www.omdbapi.com/";
  const api_key = "d9ee1258";
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    var tmp = localStorage.getItem("favorites");
    if(tmp) {
      var fav = tmp.split(",");
      setFavorites(fav);
    } else {
      setFavorites([]);
    }
  }, []);

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      var movie_name = e.target.value;

      var url = base_api_url + "?s=" + encodeURI(movie_name) + "&apikey=" + api_key;

			fetch(url)
				.then(response => response.json())
				.then(json => setMovies(json.Search));
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const favoriteMovie = (e) => {
    var id = ReactDOM.findDOMNode(e.target).parentNode.parentNode.id;
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

    setFavorites(favorites);
    localStorage.setItem("favorites", favorites);
  }

  return (
    <div id="root">
	  	<div className="favorites_menu">
	  		<Link to={{
          pathname: '/favorites',
          state: favorites
        }}>
				  <FontAwesomeIcon icon={faHeart} /><span>Favoritos</span>		
		  	</Link>
	  	</div>

      <div className="header">
        <Link className="link-tag" to="/"><h1>OMDd API</h1></Link>
        <form id="search_movie" onSubmit={(e) => onSubmit(e)}>
          <label>Nome do filme: </label>
          <input name="movie_name" type="text" onKeyDown={(e) => handleFormSubmit(e)} />
        </form>
      </div>

      <div className="list_movies">
        <ul className="list">
          {movies.map(movie => {
            return (
              <li id={movie.imdbID} key={movie.imdbID} className="movie">
				<FontAwesomeIcon onClick={(e) => favoriteMovie(e)} icon={faHeart} />
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
