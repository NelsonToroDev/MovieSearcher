// TODO: move it to secret
const API_KEY = '4287ad07'
const API_URL = 'https://www.omdbapi.com/'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
    const jsonMovies = await response.json()
    const movies = jsonMovies.Search ?? []

    // Mapped Movies help to remove dependency with the contract specified by the API
    // In case the API will be change then we just need to change the mapping instead of change in the whole app
    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (err) {
    throw new Error('An Error occurs get movies')
  }
}
