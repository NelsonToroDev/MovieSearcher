function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return <p>Any movie found</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0
  return hasMovies ? <MoviesList movies={movies} /> : <NoMovies />
}
