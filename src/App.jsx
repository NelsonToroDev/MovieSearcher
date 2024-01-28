import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  // Value that will persist through many renderings
  const counter = useRef(0)
  counter.current++
  console.log(counter)

  // Value that will NOT persist through many renderings
  let i = 0 // will be created and assigned to zero on each rendering
  i++
  console.log(i)

  // Uncontrolled way to get data from a form
  // It's uncontrolled because we use directly the DOM object without using React
  const handleSubmit = (event) => {
    event.preventDefault()
    // event.target is control receiver of the click. In this case the form
    const formData = new window.FormData(event.target)
    // let's create an Object based on formData
    // in this objects we will get all values from all controls
    const fields = Object.fromEntries(formData)
    const { query } = fields
    if (query === '') {
      console.log(query)
    }
  }

  // Controlled way to get data from a form
  // It's controlled because we use React to access to the controler
  // On each change or on each typing it will fire a re-rendering
  // So it's unefficient way because of continous rendering
  // commonly used for validations
  const handleChange = (event) => {
    // target will be the input control
    const newQuery = event.target.value
    // Pre validation. It will avoid updating the query state if a space was typed
    if (newQuery === ' ') {
      return
    }

    setQuery(newQuery)

    if (newQuery === '') {
      setError('Please specify a Movie to search')
      return
    }

    if (newQuery.match(/^\d+$/)) {
      setError('You cannot search movies that starts with a number')
      return
    }

    if (newQuery.length < 3) {
      setError('Please specify at least three characters to search a movie')
      return
    }

    setError(null)
  }

  useEffect(() => {}, [query])

  // Using useRef referencing a component
  const inputRef = useRef()
  const handleClick = () => {
    const value = inputRef.current.value // always to current to access its last value
    alert(value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies Searcher</h1>
        <form onSubmit={handleSubmit}>
          {/* Controled Way */}
          <input
            onChange={handleChange}
            value={query}
            name='queryControlled'
            placeholder='Avenger, Matrix, Star Wars...'
          />
          {/* Uncontroled way */}
          <input name='query' placeholder='Avenger, Matrix, Star Wars...' />
          {/* Controled Way using UseRef */}
          <input
            ref={inputRef}
            name='queryUseRef'
            placeholder='Avenger, Matrix, Star Wars...'
          />
          <button onClick={handleClick} type='submit'>
            Search
          </button>
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
