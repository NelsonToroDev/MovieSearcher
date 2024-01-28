import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const previousSearch = useRef(search)

  const getMovies = async () => {
    // Avoid performing the same search twice
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      console.log(`fecthing '${search}'`)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // This method as well as others will be recreated on each rendering
  const getSortedMovies = () => {
    const sortedMovies = sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    console.log('getSortedMovies')
    return sortedMovies
  }

  return { movies: getSortedMovies(), loading, getMovies }
}
