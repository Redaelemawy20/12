import { moviesInCurrentPage, uiSelector } from '../store/reducer';
import MovieCard from './MovieCard';
import { useAppSelector } from '../types/hooks';
const MovieList = () => {
  const movies = useAppSelector(moviesInCurrentPage);
  const { loading } = useAppSelector(uiSelector);
  if (!loading) {
    return (
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default MovieList;
