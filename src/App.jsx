import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // avoid validation on first rendering
    if (isFirstInput.current) {
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

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  // Uncontrolled way to get data from a form
  // It's uncontrolled because we use directly the DOM object without using React
  const handleSubmit = (event) => {
    event.preventDefault()

    // event.target is control receiver of the click. In this case the form
    const formData = new window.FormData(event.target)
    // let's create an Object based on formData
    // in this objects we will get all values from all controls
    const fields = Object.fromEntries(formData)
    const { search } = fields
    if (search === '') {
      console.log(search)
    }
  }

  // Controlled way to get data from a form
  // It's controlled because we use React to access to the controler
  // On each change or on each typing it will fire a re-rendering
  // So it's unefficient way because of continous rendering
  // commonly used for validations
  const handleChange = (event) => {
    // target will be the input control
    const newQuery = '' + event.target.value
    // Pre validation. It will avoid updating the query state if a space was typed
    if (newQuery.startsWith(' ')) {
      return
    }

    updateSearch(newQuery)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies Searcher</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='search'
            placeholder='Avenger, Matrix, Star Wars...'
          />
          <button type='submit'>Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
