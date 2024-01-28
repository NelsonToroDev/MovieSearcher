import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'
import { useEffect } from 'react'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const previousSearch = useRef(search)

  // This function will be recreated only one time because it has an ampy array as dependency
  // useCall is the same as useMemo when it return a function
  const getMovies = useCallback(async ({ search }) => {
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
  }, [])

  useEffect(() => {
    console.log('Created a new getMovies')
  }, [getMovies])

  // memorize the result of a calculation based on some dependencies
  // In this case we avoid to make a sort on each rendering
  const sortedMovies = useMemo(() => {
    console.log('useMemo sortedMovies')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  useEffect(() => {
    console.log('Created a new sortedMovies')
  }, [sortedMovies])

  return { movies: sortedMovies, loading, getMovies }
}
