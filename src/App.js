import React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    //API URL
    const API_URL = 'http://www.omdbapi.com/?apikey=a8fecd9e';

    //Function to search movies
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };
    
    //Execute searchMovies function on page load
    useEffect(() => {
        searchMovies('man');
    }, []);

    return (
        <div className="app">
           <h1>MovieLand</h1>

           <div className="search">
                <input type="text"
                 placeholder="Search for a movie..."
                 value={searchTerm}
                 onChange={(event) => setSearchTerm(event.target.value)}
                 />
            <img 
            src={SearchIcon}
            alt="Search"
            onClick={() => searchMovies(searchTerm)}
            />
            </div>

            {
                movies?.length > 0 
                ?  (
                    <div className="container">
                        {movies.map((movie) => (
                         <MovieCard    movie={movie} />
                        ))}
                   </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>

    );
};

export default App;