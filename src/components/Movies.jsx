import '../App.css'

function MoviesList ({ movies }) {
  return (
    <ul className='moviesList'>
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return <p>No movies found</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0
  return hasMovies ? <MoviesList movies={movies} /> : <NoMovies />
}
