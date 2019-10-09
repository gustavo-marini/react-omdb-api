import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './App.css';

function App() {
	const base_api_url = "http://www.omdbapi.com/";
	const api_key = "d9ee1258";
	const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [compareMovies, setCompareMovies] = useState([]);

	useEffect(() => {
		var tmp = localStorage.getItem("favorites");
		if (tmp) {
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
		if (id) {
			if (favorites.includes(id)) {
				for (var i = 0; i < favorites.length; i++) {
					if (favorites[i] === id) {
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
    
    const addCompareMovie = (e) => {
        if(compareMovies.length < 2) {
            var id = ReactDOM.findDOMNode(e.target).parentNode.id;
            if (compareMovies.includes(id) === false) {
                var index = -1;
                for(var i = 0; i < movies.length; i++) {
                    if(movies[i].imdbID === id) {
                        index = i;
                        break;
                    }
                }
                compareMovies.push(movies[index]);

                setCompareMovies(compareMovies);

                window.scrollTo(0,document.body.scrollHeight);
            }
        }
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
                                <img onClick={(e) => addCompareMovie(e)} className="compare-movie" src="/compare-icon.png" />
								<img className="poster" src={movie.Poster} />
								<div className="movie_info">
									<span id="title"><strong>Título: </strong>{movie.Title}</span>
									<span id="year"><strong>Ano de lançamento: </strong>{movie.Year}</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

            <div className="list_movies">
                <ul className="list">
                    {compareMovies.map(cMovie => {
						return (
							<li id={cMovie.imdbID} key={cMovie.imdbID} className="movie">
								<img className="poster" src={cMovie.Poster} />
								<div className="movie_info">
									<span id="title"><strong>Título: </strong>{cMovie.Title}</span>
									<span id="year"><strong>Ano de lançamento: </strong>{cMovie.Year}</span>
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
