function MoviesList({movies}) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return (<p>Any movie found</p>)
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0
  return hasMovies ? <MoviesList movies={movies} /> : <NoMovies />
}
