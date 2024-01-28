import { useState } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState()

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
    setQuery(event.target.value)
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
          <button type='submit'>Search</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
