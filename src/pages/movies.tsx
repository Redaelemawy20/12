import MovieList from '../components/movies_list';
import Pagination from '../components/Pagination';
import SearchForm from '../components/SearchForm';
import { useEffect } from 'react';
import { loadMovies } from '../store/actionCreators';
import { useAppDispatch } from '../types/hooks';
const Movies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMovies(20));
  }, [dispatch]);

  return (
    <>
      <header className="p-4  bg-secondary">
        <SearchForm />
      </header>
      <main className=" bg-primary flex flex-wrap justify-center items-center flex-col">
        <Pagination />
        <MovieList />
      </main>
    </>
  );
};

export default Movies;
