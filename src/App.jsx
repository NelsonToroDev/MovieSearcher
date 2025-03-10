import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // avoid validation on first rendering
    if (isFirstInput.current) {
      console.log('first input')
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Please specify a Movie to search')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('You cannot search movies that starts with a number')
      return
    }

    if (search.length < 3) {
      setError('Please specify at least three characters to search a movie')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // Uncontrolled way to get data from a form if we use just Javascript
  // It's uncontrolled because we use directly the DOM object without using React

  // handle Submit
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  // We can't put the debounce directly in the body of the component because 
  // on each render we are going to create a new debounce function so timeout never occurs
  // So we need to use UseCallback to avoid the recreation of debounce function, debaunce should be created only once
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log(`debounce fired with ${search}`)
      getMovies({ search })
    }, 300),
    []
  )

  // Controlled way to get data from a form
  // It's controlled because we use React to access to the controler
  // On each change or on each typing it will fire a re-rendering
  // So it's unefficient way because of continous rendering
  // commonly used for validations
  const handleChange = (event) => {
    // target will be the input control
    const newSearch = '' + event.target.value
    // Pre validation. It will avoid updating the query state if a space was typed
    if (newSearch.startsWith(' ')) {
      return
    }

    updateSearch(newSearch)
    // debounce
    // When typing make a request to GetMovies on each input
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Searcher</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='search'
            placeholder='Avenger, Matrix...'
          />
          <button type='submit'>Search</button>
        </form>
        <label>
          <input type='checkbox' onChange={handleSort} checked={sort} />
          sort
        </label>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        {loading === true ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
