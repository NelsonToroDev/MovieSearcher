import { useState } from 'react'
import './App.css'
import responseMovies from './mocks/with-results.json'
import noResult from './mocks/no-result.json'

function App() {
  const foundMovies = responseMovies.Search
  const hasMovies = foundMovies?.length > 0

  return (
    <div className='page'>
      <header>
        <h1>Movies Searcher</h1>
        <form>
          <input placeholder='Avenger, Matrix, Star Wars...' />
          <button type='submit'>Search</button>
        </form>
      </header>
      <main>
        {hasMovies ? (
          <ul>
            {foundMovies.map((movie) => (
              <li key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Any movie found</p>
        )}
      </main>
    </div>
  )
}

export default App
