import { useState } from 'react'
import './App.css'
import responseMovies from './mocks/with-results.json'
import noResult from './mocks/no-result.json'
import { Movies } from './components/Movies'

function App() {
  const foundMovies = responseMovies.Search

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
        <Movies movies={foundMovies} />
      </main>
    </div>
  )
}

export default App
