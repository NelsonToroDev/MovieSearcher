import responseMovies from '../mocks/with-results.json'
import noResult from '../mocks/no-result.json'

export function useMovies() {
  const foundMovies = responseMovies.Search
  // Mapped Movies help to remove dependency with the contract specified by the API
  // In case the API will be change then we just need to change the mapping instead of change in the whole app
  const mappedMovies = foundMovies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return { movies: mappedMovies }
}
