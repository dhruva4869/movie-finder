import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import './App.css';

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=b6beeb94";

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Detective Conan");
  }, []);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchMovies(event.target.value);
    }
  }

  const personal = {
    fontFamily: 'Georgia, sans-serif',
    fontWeight: 'bold',
    color: 'plum',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize:'50px',
  }

  const fullbg = {
    backgroundImage: './bgop.jpg',
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div className="App" style = {fullbg}>
      <h1 style = {personal}>MovieFinder</h1>

      <div className="search">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search any movie" />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
